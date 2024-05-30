import { Component, Input, inject } from '@angular/core';
import { HomepageComponent, todo } from '../homepage/homepage.component';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { MakeFirstLetterUppercaseService } from '../services/make-first-letter-uppercase.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [HomepageComponent, NgIf,FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  constructor(private homepageComponent: HomepageComponent, private makeFirstLetter:MakeFirstLetterUppercaseService) { }
  @Input() todo:todo = {
    title: '',
    date: '',
    description: '',
    priority:''
  }
  
  todoToEdit:boolean = false
  httpClient:HttpClient = inject(HttpClient)
  allFieldsRequired:string = ""

  priorityValues = {
    low:"Low",
    medium: "Medium",
    high: "High"
  }
  editedTodo: todo = {
    title:"",
    date:"",
    description:"",
    priority:this.priorityValues.low
  } 

  toggleEditTodo(){
    this.todoToEdit = !this.todoToEdit
  }

  deleteTodo(id:number | undefined){  
    this.httpClient.delete(`http://localhost:1000/delete/${id}`).subscribe(response => {
    this.homepageComponent.fetchData()
   
    })
  } 
  saveEditedTodo(id:number | undefined){
    if(this.editedTodo.date && this.editedTodo.description && this.editedTodo.title){
      this.allFieldsRequired = ""
      this.editedTodo.title = this.makeFirstLetter.firstLetter(this.editedTodo.title)
      this.editedTodo.date = this.makeFirstLetter.firstLetter(this.editedTodo.date)
      this.editedTodo.description = this.makeFirstLetter.firstLetter(this.editedTodo.description)
      this.httpClient.put(`http://localhost:1000/edit/${id}`,this.editedTodo).subscribe(() => {
        this.homepageComponent.fetchData()
      })
    }else{
      this.allFieldsRequired = "All fields is required!"
    }
  }
}

