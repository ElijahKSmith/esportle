import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { BoardStatus } from '../types/board-state.interface';
import { DailyStatistics } from '../types/daily-statistics.interface';

import { StorageKeys } from '../types/storage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  statsSubject: Subject<DailyStatistics> = new Subject();
  statistics$ = this.statsSubject.asObservable();

  constructor() {
    this.initialize();
  }

  initialize(): void {
    const statsStr = localStorage.getItem(StorageKeys.STATISTICS);

    if (statsStr) {
      this.statsSubject.next(JSON.parse(statsStr));
    } else {
      this.statsSubject.next(this.newDailyStatistics());
    }
  }

  newDailyStatistics(): DailyStatistics {
    const stats: DailyStatistics = {
      currentStreak: 0,
      maxStreak: 0,
      guesses: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        fail: 0,
      },
      winPercentage: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      averageGuesses: 0,
    };

    return stats;
  }

  updateStats(
    stats: DailyStatistics,
    guesses: number,
    result: BoardStatus
  ): void {
    stats.gamesPlayed++;

    if (result === BoardStatus.LOSE) {
      stats.currentStreak = 0;
      stats.guesses.fail++;
    } else if (result === BoardStatus.WIN) {
      if (stats.currentStreak === stats.maxStreak) {
        stats.maxStreak++;
      }

      stats.currentStreak++;
      stats.guesses[guesses + 1]++;
      stats.gamesWon++;

      stats.averageGuesses = Math.round(
        (stats.guesses[1] +
          2 * stats.guesses[2] +
          3 * stats.guesses[3] +
          4 * stats.guesses[4] +
          5 * stats.guesses[5] +
          6 * stats.guesses[6]) /
          stats.gamesPlayed
      );
    }

    stats.winPercentage = Math.round(
      (stats.gamesWon / stats.gamesPlayed) * 100
    );

    localStorage.setItem(StorageKeys.STATISTICS, JSON.stringify(stats));
    this.statsSubject.next(stats);
  }
}
