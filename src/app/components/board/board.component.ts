import { Component, Input, OnInit } from '@angular/core';

import { BoardState } from 'src/app/types/board-state.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() state!: BoardState[];

  constructor() {}

  ngOnInit(): void {}
}
