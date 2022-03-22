import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DailyStatistics } from '../../../types/daily-statistics.interface';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DailyStatistics) {
    console.log(this.data);
  }

  ngOnInit(): void {}
}
