import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { todo } from '../homepage/homepage.component';
import { FormsModule } from '@angular/forms';
import { MakeFirstLetterUppercaseService } from '../services/make-first-letter-uppercase.service';

@Component({
  selector: 'app-new-todo',
  standalone: true,
  imports: [NgStyle, FormsModule],
  templateUrl: './new-todo.component.html',
  styleUrl: './new-todo.component.css'
})
export class NewTodoComponent {

constructor(private makeUppercase:MakeFirstLetterUppercaseService){}

  @Output() todoAdded = new EventEmitter<todo>()

  newTodo: todo = {
    title:"",
    date:"",
    description:""  
  }

  allFieldIsRequired: string = ""


  addTodo(){
    if(this.newTodo.title && this.newTodo.date && this.newTodo.description){
      this.allFieldIsRequired = ""
      this.newTodo.title = this.makeUppercase.firstLetter(this.newTodo.title)
      this.newTodo.date = this.makeUppercase.firstLetter(this.newTodo.date)
      this.newTodo.description = this.makeUppercase.firstLetter(this.newTodo.description)
      this.todoAdded.emit(this.newTodo)
      this.newTodo = { title: '', date: '', description: '' }
    }else{
      this.allFieldIsRequired = "All field is required!"
    }
  }

}
