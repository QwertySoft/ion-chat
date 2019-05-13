import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import * as faker from 'faker';
import { User } from '../models/user.interface';
import { ChatService } from '../services/chat.service';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private chat: ChatService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const username = route.params.user as string;
    return this.chat.currentUsers().find(user => user.username === username);
  }
}
