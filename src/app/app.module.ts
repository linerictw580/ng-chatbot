import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { ChatWidgetComponent } from './components/chat/chat-widget/chat-widget.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatAvatarComponent } from './components/chat/chat-avatar/chat-avatar.component';
import { ChatInputComponent } from './components/chat/chat-input/chat-input.component';

@NgModule({
  declarations: [AppComponent, ChatWidgetComponent, ChatAvatarComponent, ChatInputComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatButtonModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
