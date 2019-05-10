import { User } from './user.interface';

export interface Message {
  body: string;
  date: Date;
  user: User;
}
