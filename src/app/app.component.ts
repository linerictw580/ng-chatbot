import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ChatWidgetComponent } from './components/chat/chat-widget/chat-widget.component';
import { ChatWidgetService } from './services/chat-widget.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(injector: Injector, private _chatWidgetService: ChatWidgetService) {
    const ChatWidgetElement = createCustomElement(ChatWidgetComponent, { injector });
    customElements.define('ng-chat-widget', ChatWidgetElement);
  }

  public onClick() {
    this._chatWidgetService.showAsElement();
  }
}
