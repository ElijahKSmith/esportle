import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';

import { BoardComponent } from './board.component';
import { LetterComponent } from './letter/letter.component';
import { WordComponent } from './word/word.component';

@NgModule({
  declarations: [BoardComponent, LetterComponent, WordComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [BoardComponent],
})
export class BoardModule {}
