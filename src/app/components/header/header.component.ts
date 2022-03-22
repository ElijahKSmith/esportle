import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { AboutDialogComponent } from '../dialog/about/about.component';
import { DailyStatistics } from '../../types/daily-statistics.interface';
import { StatisticsDialogComponent } from '../dialog/statistics/statistics.component';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  statistics!: DailyStatistics;
  subscription!: Subscription;

  constructor(
    private dialog: MatDialog,
    private statsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.subscription = this.statsService.statistics$.subscribe((stats) => {
      console.log('subscribed');
      this.statistics = stats;
    });
  }

  ngOnDestroy(): void {}

  openAboutDialog(): void {
    this.dialog.open(AboutDialogComponent, { width: '600px' });
  }

  openStatisticDialog(): void {
    console.log(this.statistics);
    this.dialog.open(StatisticsDialogComponent, {
      data: this.statistics,
      width: '600px',
    });
  }
}
