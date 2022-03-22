import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { LetterType } from '../../../types/letter-types.enum';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
})
export class WordComponent implements OnInit, OnChanges {
  @Input() word!: string;
  @Input() evaluations!: LetterType[];

  letters!: string[];

  constructor() {}

  async ngOnInit(): Promise<void> {
    await this.generateLetters(this.word, this.evaluations);
  }

  async ngOnChanges(): Promise<void> {
    await this.generateLetters(this.word, this.evaluations);
  }

  async generateLetters(word: string, evaluations: string[]): Promise<void> {
    const letters = word.split('');

    if (word?.length === evaluations.length) {
      this.letters = letters;
    } else {
      this.letters = evaluations.map((_, i) => {
        if (i < letters.length) {
          return letters[i];
        } else {
          return '';
        }
      });
    }
  }
}
