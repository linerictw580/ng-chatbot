import { IClient } from './client.model';

export interface IMessage {
  text: string;
  date: number;
  type: 'sent' | 'received';
  from: IClient;
}
