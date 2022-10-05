import { Injectable } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { ChatWidgetComponent } from '../components/chat/chat-widget/chat-widget.component';

@Injectable({
  providedIn: 'root',
})
export class ChatWidgetService {
  /**
   * 使用 custom-element 方法將 chat-widget 加入 DOM
   */
  showAsElement() {
    // 建立元素
    const el: NgElement & WithProperties<ChatWidgetComponent> = document.createElement(
      'ng-chat-widget'
    ) as any;
    document.body.appendChild(el);
  }
}
