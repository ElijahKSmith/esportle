import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';

import { KeyComponent } from './key/key.component';
import { KeyboardComponent } from './keyboard.component';

@NgModule({
  declarations: [KeyComponent, KeyboardComponent],
  imports: [CommonModule, FlexLayoutModule, MatButtonModule, MatIconModule],
  exports: [KeyComponent, KeyboardComponent],
})
export class KeyboardModule {}
