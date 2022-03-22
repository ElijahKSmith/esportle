import { Injectable } from '@angular/core';
import seedrandom from 'seedrandom';

import {
  BoardState,
  BoardStatus,
  DailyBoardState,
} from '../types/board-state.interface';
import { LetterType } from '../types/letter-types.enum';
import { StorageKeys } from '../types/storage-keys.enum';
import words from '../../assets/words.json';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  constructor() {}

  async generateBoardState(state: DailyBoardState): Promise<BoardState[]> {
    return state.boardState.map((word, index) => {
      if (word === '') {
        return {
          word: '',
          evaluations: Array(state.solution.length).fill(LetterType.UNKNOWN),
        };
      } else {
        return {
          word,
          evaluations: state.evaluations[index],
        };
      }
    });
  }

  generateSolutionCounts(solution: string): { [key: string]: number } {
    const counts: { [key: string]: number } = {};

    for (let i = 0; i < solution.length; i++) {
      if (counts[solution[i]]) {
        counts[solution[i]]++;
      } else {
        counts[solution[i]] = 1;
      }
    }

    return counts;
  }

  doesGuessExist(word: string): boolean {
    return words.words.includes(word.toLowerCase());
  }

  guessIsCorrect(evaluations: LetterType[]): boolean {
    let correct = true;

    for (let i = 0; i < evaluations.length; i++) {
      if (evaluations[i] !== LetterType.CORRECT) {
        correct = false;
        break;
      }
    }

    return correct;
  }

  evaluateGuess(
    word: string,
    solutionArray: string[],
    solutionCounts: { [key: string]: number }
  ): LetterType[] {
    let evaluations: LetterType[] = [];
    let counts: { [key: string]: number } = {};

    for (let i = 0; i < word.length; i++) {
      const letter = word[i].toLowerCase();

      if (!counts[letter]) {
        counts[letter] = 0;
      }

      if (
        solutionArray.includes(letter) &&
        counts[letter] < solutionCounts[letter]
      ) {
        counts[letter]++;

        if (solutionArray[i] === letter) {
          evaluations.push(LetterType.CORRECT);
        } else {
          evaluations.push(LetterType.MOVE);
        }
      } else {
        evaluations.push(LetterType.WRONG);
      }
    }

    return evaluations;
  }

  async getDailyWord(): Promise<string> {
    const today = new Date().toISOString();
    const seed = today.substring(0, today.indexOf('T'));

    const randomIndex = Math.floor(seedrandom(seed)() * words.words.length);
    return words.words[randomIndex];
  }

  async resetDailyState(): Promise<DailyBoardState> {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tomorrowTime = new Date(
      tomorrow.toISOString().substring(0, tomorrow.toISOString().indexOf('T'))
    ).getTime();

    const newState: DailyBoardState = {
      boardState: ['', '', '', '', '', ''],
      evaluations: [[], [], [], [], [], []],
      rowIndex: 0,
      solution: await this.getDailyWord(),
      gameStatus: BoardStatus.PLAYING,
      nextGame: tomorrowTime,
    };

    localStorage.setItem(StorageKeys.STATE, JSON.stringify(newState));

    return newState;
  }
}
