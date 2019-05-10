import { Component, OnInit } from '@angular/core';
import * as faker from 'faker';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  public users = [1, 2, 4, 5, 6, 7, 8, 9, 10].map(_ => {
    const name = faker.name.firstName();
    return {
      name,
      username: faker.internet.userName(name),
      avatar: faker.internet.avatar(),
      lastMessage: faker.lorem.sentence()
    };
  });

  ngOnInit() {}
}
