import { Component, Input, OnInit } from '@angular/core';
import { IMessage, MessageType } from 'src/app/models/message.model';

@Component({
  selector: 'chat-message-content',
  templateUrl: './chat-message-content.component.html',
  styleUrls: ['./chat-message-content.component.scss'],
})
export class ChatMessageContentComponent {
  @Input() message: IMessage;

  get MessageType() {
    return MessageType;
  }
}
