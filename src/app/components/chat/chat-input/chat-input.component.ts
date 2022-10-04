import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
})
export class ChatInputComponent implements OnInit, OnDestroy {
  @Input() public focus: EventEmitter<any>;
  @Output() public send = new EventEmitter();
  @Output() public dismiss = new EventEmitter();
  @ViewChild('message', { static: true }) private _message: ElementRef;

  private _focusSub: Subscription;

  ngOnInit(): void {
    this._focusSub = this.focus?.subscribe(() => {
      this._focus();
    });
  }

  ngOnDestroy(): void {
    this._focusSub?.unsubscribe();
  }

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
