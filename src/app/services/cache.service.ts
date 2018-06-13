import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {

  insertion : any = {};

  values : any = {};

  timeout : number = 10*1000*60;

  constructor() { }

  setTimeout(timeout) {
    this.timeout = timeout;
  }

  setValue(key, val) {
    this.insertion[key] = new Date();
    this.values[key] = val;
  }

  getValue(key) {
    let insertion_date = this.insertion[key] || null;
    if (!insertion_date)
      return null;
    let current_date = new Date().getTime();
    if (current_date < insertion_date.getTime() + this.timeout) {
      return this.values[key];
    } else {
      return null;
    }
  }

}
