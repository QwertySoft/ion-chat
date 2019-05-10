import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import * as faker from 'faker';
import { User } from '../models/user.interface';

@Injectable()
export class UserResolver implements Resolve<Observable<User>> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot) {
    const username = route.params.user as string;
    return of({
      name: faker.name.firstName(),
      username,
      avatar: faker.internet.avatar()
    });
  }
}
