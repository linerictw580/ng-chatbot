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
import { MatIconService } from 'src/app/services/mat-icon.service';

const CLOSE_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
`;

const SEND_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
`;

const CHAT_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
`;

@Component({
  selector: 'chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ChatWidgetComponent implements OnInit, AfterViewInit {
  @Output() ready = new EventEmitter<any>();
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

  constructor(private _matIconService: MatIconService) {
    this._matIconService.addSvgIconLiteral('close', CLOSE_ICON);
    this._matIconService.addSvgIconLiteral('send', SEND_ICON);
    this._matIconService.addSvgIconLiteral('chat', CHAT_ICON);

    this.focus = new Subject();
    this.messages = [];
    this.chatbot = { name: 'Chatbot', avatar: 'https://randomuser.me/api/portraits/lego/1.jpg' };
    this.user = { name: 'User', avatar: `https://randomuser.me/api/portraits/men/1.jpg` };
  }

  ngOnInit(): void {
    this._addMessage(this.chatbot, '請問有什麼可以為您服務？', 'received');
  }

  ngAfterViewInit(): void {
    this.ready.emit({
      setToggleVisible: (value: boolean) => {
        this.toggleVisible = value;
      },
    });
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

  toggleChat() {
    this.visible = !this.visible;
  }

  onSendMessage($event) {
    const message: string = $event.message;
    // console.log(message);
    this._addMessage(this.user, message, 'sent');
    this.inputMessage.emit({ message });
  }
}
