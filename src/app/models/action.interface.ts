export interface Action<T = any> {
  type: 'NEW_MESSAGE' | 'CONNECT' | 'DISCONNECT' | 'REGISTER';
  payload: T;
}
