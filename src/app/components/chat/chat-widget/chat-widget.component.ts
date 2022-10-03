import { Component, OnInit } from '@angular/core';
import { IClient } from 'src/app/models/client.model';
import { IMessage } from 'src/app/models/message.model';

@Component({
  selector: 'chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss'],
})
export class ChatWidgetComponent implements OnInit {
  public messages: IMessage[];
  public chatbot: IClient;
  public user: IClient;

  public _visible = false;
  public get visible() {
    return this._visible;
  }
  public set visible(value: boolean) {
    this._visible = value;
  }

  constructor() {
    this.messages = [];
    this.chatbot = { name: 'Chatbot', avatar: 'https://randomuser.me/api/portraits/lego/1.jpg' };
    this.user = { name: 'User', avatar: `https://randomuser.me/api/portraits/men/1.jpg` };
  }

  ngOnInit(): void {
    this._addMessage(this.chatbot, '請問有什麼可以為您服務？', 'received');
  }

  private _addMessage(from: IClient, text: string, type: 'sent' | 'received') {
    this.messages.unshift({
      from,
      text,
      type,
      date: new Date().getTime(),
    });
  }

  toggleChat() {
    this._visible = !this.visible;
  }

  onSendMessage({ message }) {
    // console.log(message);
    this._addMessage(this.user, message, 'sent');
  }
}
