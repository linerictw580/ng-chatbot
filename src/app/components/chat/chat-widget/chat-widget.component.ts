import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { IClient } from 'src/app/models/client.model';
import { IMessage } from 'src/app/models/message.model';
import { ChatApi } from '../chat-api';

@Component({
  selector: 'chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ChatWidgetComponent implements OnInit, AfterViewInit {
  @Output() chatReady = new EventEmitter<any>();
  @Output() inputMessage = new EventEmitter<{ message: string }>();

  public focus: Subject<unknown>;
  public messages: IMessage[];
  public chatbot: IClient;
  public user: IClient;

  public _visible = false;
  public get visible() {
    return this._visible;
  }
  public set visible(value: boolean) {
    this._visible = value;
    if (this._visible) {
      setTimeout(() => this._focusInput(), 0);
    }
  }

  public toggleVisible = true;

  constructor() {
    this.focus = new Subject();
    this.messages = [];
    this.chatbot = { name: 'Chatbot', avatar: 'https://randomuser.me/api/portraits/lego/1.jpg' };
    this.user = { name: 'User', avatar: `https://randomuser.me/api/portraits/men/1.jpg` };
  }

  ngOnInit(): void {
    this.addBotMessage('請問有什麼可以為您服務？');
  }

  ngAfterViewInit(): void {
    // setTimeout 延遲事件發送 (否則外部無法接收到 Angular Elements 在 ngAfterViewInit 所發出的事件)
    setTimeout(() => {
      this.chatReady.emit(new ChatApi({ instance: this }));
    }, 0);
  }

  private _addMessage(from: IClient, text: string, type: 'sent' | 'received') {
    this.messages.unshift({
      from,
      text,
      type,
      date: new Date().getTime(),
    });
  }

  private _focusInput() {
    this.focus.next(null);
  }

  addBotMessage(text: string) {
    this._addMessage(this.chatbot, text, 'received');
  }

  addUserMessage(text: string) {
    this._addMessage(this.user, text, 'sent');
  }

  toggleChat() {
    this.visible = !this.visible;
  }

  onSendMessage($event) {
    const message: string = $event.message;
    // console.log(message);
    this.addUserMessage(message);
    this.inputMessage.emit({ message });
  }
}
