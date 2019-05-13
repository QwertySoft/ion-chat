import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Action } from '../models/action.interface';
import { Message } from '../models/message.interface';
import { BehaviorSubject, of } from 'rxjs';
import { filter, merge, map } from 'rxjs/operators';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private ws: WebSocket;
  private messages = new BehaviorSubject<Message[]>([]);
  private users = new BehaviorSubject<User[]>([]);
  private me: User;

  constructor() {
    this.ws = new WebSocket(environment.url);

    this.ws.onmessage = event => {
      const action = JSON.parse(event.data) as Action;
      this.reduce(action);
    };
  }

  public conversation(user: User) {
    const { username } = user;
    return of(this.messages.value)
      .pipe(merge(this.messages.asObservable()))
      .pipe(
        map(messages =>
          messages.filter(
            ({ from, to }) =>
              from.username === username || to.username === username
          )
        )
      );
  }

  public currentUsers() {
    return this.users.value;
  }

  public getUsers() {
    return of(this.currentUsers()).pipe(merge(this.users.asObservable()));
  }

  public send(to: User, body: string) {
    this.ws.send(JSON.stringify({ to, body }));
    this.reduce({
      type: 'NEW_MESSAGE',
      payload: {
        body,
        to,
        from: this.me,
        date: new Date()
      }
    } as Action<Message>);
  }

  private reduce({ type, payload }: Action) {
    switch (type) {
      case 'CONNECT':
        const { user } = payload;
        this.users.next([...this.currentUsers(), user]);
        break;
      case 'DISCONNECT':
        const { username } = payload.user;
        this.users.next(
          this.currentUsers().filter(u => u.username !== username)
        );
        break;
      case 'NEW_MESSAGE':
        this.messages.next([...this.messages.value, payload]);
        break;
      case 'REGISTER':
        this.users.next(payload.users);
        this.me = payload.user as User;
        break;
    }
  }
}
