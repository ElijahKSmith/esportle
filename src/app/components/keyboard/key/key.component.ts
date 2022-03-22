import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

import { LetterType } from 'src/app/types/letter-types.enum';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss'],
})
export class KeyComponent implements OnInit, OnChanges {
  @Input() letter!: string;
  @Input() type: 'letter' | 'enter' | 'backspace' = 'letter';
  status: 'correct' | 'wrong' | 'move' | 'unknown' = 'unknown';

  keyClass!: { [key: string]: boolean };

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.keyClass = await this.getKeyClass();
  }

  async ngOnChanges(): Promise<void> {
    this.keyClass = await this.getKeyClass();
  }

  async getKeyClass(): Promise<{ [key: string]: boolean }> {
    switch (this.status) {
      case LetterType.WRONG:
        return { 'wrong-key': true };
      case LetterType.MOVE:
        return { 'move-key': true };
      case LetterType.CORRECT:
        return { 'correct-key': true };
      default:
        return { 'unknown-key': true };
    }
  }
}
