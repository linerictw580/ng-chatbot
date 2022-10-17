import { MessageType } from 'src/app/models/message.model';
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';

export class ChatApi {
  constructor(private _config: { instance: ChatWidgetComponent }) {}

  private get _instance() {
    return this._config.instance;
  }

  setToggleVisible = (value: boolean) => {
    this._instance.toggleVisible = value;
  };

  addBotMessage = (text: string) => {
    this._instance.addBotMessage(text);
  };

  addBotMessageHtml = (html: string) => {
    this._instance.addBotMessage(html, MessageType.HTML);
  };
}
