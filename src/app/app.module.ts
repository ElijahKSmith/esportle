import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';

import { BoardModule } from './components/board/board.module';
import { DailyComponent } from './components/daily/daily.component';
import { DialogModule } from './components/dialog/dialog.module';
import { HeaderComponent } from './components/header/header.component';
import { KeyboardModule } from './components/keyboard/keyboard.module';
import { WordService } from './services/word.service';

@NgModule({
  declarations: [DailyComponent, HeaderComponent],
  imports: [
    BoardModule,
    BrowserAnimationsModule,
    BrowserModule,
    DialogModule,
    FlexLayoutModule,
    KeyboardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
  ],
  providers: [WordService],
  bootstrap: [DailyComponent, HeaderComponent],
})
export class AppModule {}
