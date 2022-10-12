import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chat-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() key: string;
}
