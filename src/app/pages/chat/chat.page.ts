import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Message } from 'src/app/models/message.interface';
import { ChatService } from 'src/app/services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})
export class ChatPage implements OnInit {
  public user?: User;
  public messages: Observable<Message[]>;
  public newMessage = '';

  constructor(private route: ActivatedRoute, private chat: ChatService) {}

  ngOnInit() {
    this.route.data.subscribe(({ user }) => {
      this.user = user;
      this.messages = this.chat.conversation(user);
    });
  }

  send() {
    this.chat.send(this.user, this.newMessage);
    this.newMessage = '';
  }
}
