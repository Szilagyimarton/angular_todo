import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MakeFirstLetterUppercaseService {

  constructor() { }

  firstLetter(str:string){
  
   let letters = str.trim().split("")
   letters[0] = letters[0].toUpperCase()
   return letters.join("")
  }
}
