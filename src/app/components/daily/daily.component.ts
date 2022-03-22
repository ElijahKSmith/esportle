import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import {
  BoardState,
  BoardStatus,
  DailyBoardState,
} from '../../types/board-state.interface';
import { DailyStatistics } from '../../types/daily-statistics.interface';
import { StatisticsService } from '../../services/statistics.service';
import { StorageKeys } from '../../types/storage-keys.enum';
import { WordService } from '../../services/word.service';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss'],
})
export class DailyComponent implements OnInit, OnDestroy {
  solutionArray!: string[];
  solutionCounts!: { [key: string]: number };
  state!: DailyBoardState;
  statistics!: DailyStatistics;
  subscription!: Subscription;
  values!: BoardState[];

  keyMatch = new RegExp('^Key(.)$');

  constructor(
    private _snackBar: MatSnackBar,
    private statsService: StatisticsService,
    private wordService: WordService
  ) {}

  async ngOnInit(): Promise<void> {
    this.subscription = this.statsService.statistics$.subscribe((stats) => {
      this.statistics = stats;
    });

    this.state = await this.setupGame(localStorage.getItem(StorageKeys.STATE));
    this.solutionArray = this.state.solution.split('');
    this.solutionCounts = this.wordService.generateSolutionCounts(
      this.state.solution
    );

    this.values = await this.wordService.generateBoardState(this.state);

    if (this.state.gameStatus === BoardStatus.LOSE) {
      this.openSnackBar();
    }
  }

  async ngOnDestroy(): Promise<void> {
    this.subscription.unsubscribe();
  }

  async setupGame(stateString: string | null): Promise<DailyBoardState> {
    if (stateString !== null) {
      const state: DailyBoardState = JSON.parse(stateString);

      if (new Date(state.nextGame) <= new Date()) {
        return await this.wordService.resetDailyState();
      } else {
        return state;
      }
    } else {
      return await this.wordService.resetDailyState();
    }
  }

  newInput(action: string): void {
    const matchKey = action.match(this.keyMatch);

    if (
      this.state.rowIndex < 6 &&
      this.state.gameStatus === BoardStatus.PLAYING
    ) {
      if (
        matchKey &&
        this.values[this.state.rowIndex].word.length <
          this.state.solution.length
      ) {
        this.values[this.state.rowIndex].word = this.values[
          this.state.rowIndex
        ].word.concat(matchKey[1]);
      } else if (action === 'Backspace') {
        this.values[this.state.rowIndex].word = this.values[
          this.state.rowIndex
        ].word.substring(0, this.values[this.state.rowIndex].word.length - 1);
      } else if (
        action === 'Enter' &&
        this.values[this.state.rowIndex].word.length ===
          this.state.solution.length
      ) {
        if (
          this.wordService.doesGuessExist(this.values[this.state.rowIndex].word)
        ) {
          this.submitWord();
        } else {
          this.values[this.state.rowIndex].word = '';
        }
      }
    }
  }

  submitWord(): void {
    this.values[this.state.rowIndex].evaluations =
      this.wordService.evaluateGuess(
        this.values[this.state.rowIndex].word,
        this.solutionArray,
        this.solutionCounts
      );

    this.state.boardState[this.state.rowIndex] =
      this.values[this.state.rowIndex].word;

    this.state.evaluations[this.state.rowIndex] =
      this.values[this.state.rowIndex].evaluations;

    if (
      this.wordService.guessIsCorrect(
        this.state.evaluations[this.state.rowIndex]
      )
    ) {
      this.state.gameStatus = BoardStatus.WIN;
      this.statsService.updateStats(
        this.statistics,
        this.state.rowIndex,
        BoardStatus.WIN
      );
    }

    this.state.rowIndex++;

    if (
      this.state.rowIndex === 6 &&
      this.state.gameStatus !== BoardStatus.WIN
    ) {
      this.state.gameStatus = BoardStatus.LOSE;
      this.statsService.updateStats(
        this.statistics,
        this.state.rowIndex,
        BoardStatus.LOSE
      );
      this.openSnackBar();
    }

    localStorage.setItem(StorageKeys.STATE, JSON.stringify(this.state));
  }

  openSnackBar() {
    this._snackBar.open(
      `Today's word was "${this.state.solution.toUpperCase()}"`,
      'Dismiss'
    );
  }
}
