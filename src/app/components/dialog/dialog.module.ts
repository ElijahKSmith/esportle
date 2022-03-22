import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';

import { AboutDialogComponent } from './about/about.component';
import { StatisticsDialogComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [AboutDialogComponent, StatisticsDialogComponent],
  imports: [CommonModule, FlexLayoutModule, MatButtonModule, MatIconModule],
  exports: [AboutDialogComponent, StatisticsDialogComponent],
})
export class DialogModule {}
