import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { ChatWidgetComponent } from './components/chat/chat-widget/chat-widget.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ChatAvatarComponent } from './components/chat/chat-avatar/chat-avatar.component';
import { ChatInputComponent } from './components/chat/chat-input/chat-input.component';
import { createCustomElement } from '@angular/elements';
import { IconComponent } from './components/icon/icon.component';

@NgModule({
  declarations: [AppComponent, ChatWidgetComponent, ChatAvatarComponent, ChatInputComponent, IconComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  // bootstrap: [AppComponent],
})
export class AppModule implements DoBootstrap {
  constructor(private _injector: Injector) {}

  ngDoBootstrap(): void {
    // 將 ChatWidgetComponent 轉換成一個 custom element
    const ChatWidgetElement = createCustomElement(ChatWidgetComponent, {
      injector: this._injector,
    });
    // 將 custom element 註冊給瀏覽器
    customElements.define('ng-chat-widget', ChatWidgetElement);
  }
}
