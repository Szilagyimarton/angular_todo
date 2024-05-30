import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatePadService {

  constructor() { }

  pad(value:number){
    if(value < 10){
      return `0${value}`
    }else{
      return value
    }
  }
}
