import { Component, OnInit } from '@angular/core';
import * as faker from 'faker';
import { User } from 'src/app/models/user.interface';
import { ChatService } from 'src/app/services/chat.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  public users: Observable<User[]>;

  constructor(private chat: ChatService) {}

  ngOnInit() {
    this.users = this.chat.getUsers();
  }

  lastMessage(user: User) {
    this.chat
      .conversation(user)
      .pipe(
        map(messages => messages.length > 0 && messages[messages.length - 1])
      );
  }
}
