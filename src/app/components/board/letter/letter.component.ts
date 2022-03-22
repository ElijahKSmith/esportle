import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { LetterType } from '../../../types/letter-types.enum';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
})
export class LetterComponent implements OnInit, OnChanges {
  @Input() letter!: string;
  @Input() type: LetterType = LetterType.UNKNOWN;

  letterClass!: { [key: string]: boolean };

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.letterClass = await this.getLetterClass();
  }

  async ngOnChanges(): Promise<void> {
    this.letterClass = await this.getLetterClass();
  }

  async getLetterClass(): Promise<{ [key: string]: boolean }> {
    switch (this.type) {
      case LetterType.WRONG:
        return { 'wrong-letter': true };
      case LetterType.MOVE:
        return { 'move-letter': true };
      case LetterType.CORRECT:
        return { 'correct-letter': true };
      default:
        return { 'unknown-letter': true };
    }
  }
}
