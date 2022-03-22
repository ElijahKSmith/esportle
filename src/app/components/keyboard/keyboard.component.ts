import { EventEmitter, Output } from '@angular/core';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  keyRegex = new RegExp('^Key.|Enter|Backspace$');

  @Output() newInput: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:keydown', ['$event'])
  keyInput(event: KeyboardEvent): void {
    if (event.code.match(this.keyRegex)) {
      this.newInput.emit(event.code);
    }
  }
}
