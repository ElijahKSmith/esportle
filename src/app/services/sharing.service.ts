import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  zeroDay = new Date(1646697600000);
  today = new Date();

  constructor() {
    this.today = new Date(
      this.today
        .toISOString()
        .substring(0, this.today.toISOString().indexOf('T'))
    );
  }
}
