import { LetterType } from './letter-types.enum';

export interface DailyBoardState {
  boardState: string[];
  evaluations: LetterType[][];
  rowIndex: number;
  solution: string;
  gameStatus: string;
  nextGame: number;
}

export interface BoardState {
  word: string;
  evaluations: LetterType[];
}

export enum BoardStatus {
  PLAYING = 'playing',
  WIN = 'win',
  LOSE = 'lose',
}
