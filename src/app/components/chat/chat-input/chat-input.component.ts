import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
})
export class ChatInputComponent implements OnInit {
  @Input() public buttonText = '↩︎';
  @Output() public send = new EventEmitter();
  @Output() public dismiss = new EventEmitter();
  @ViewChild('message', { static: true }) private _message: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  private _focus() {
    this._message.nativeElement.focus();
  }

  private _getMessage() {
    return this._message.nativeElement.value;
  }

  private _clearMessage() {
    this._message.nativeElement.value = '';
  }

  onSubmit(): void {
    const message = this._getMessage();
    if (message.trim() === '') {
      return;
    }
    this.send.emit({ message });
    this._clearMessage();
    this._focus();
  }

  onDismiss(): void {
    this.dismiss.emit();
  }
}
