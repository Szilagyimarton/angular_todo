import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { TodoComponent } from '../todo/todo.component';
import { NewTodoComponent } from '../new-todo/new-todo.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NgFor,TodoComponent, NewTodoComponent, NgIf,HttpClientModule,],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
 
  todos: todo[] = []

  httpClient = inject(HttpClient)
  ngOnInit(): void {
    this.fetchData()
  }
  fetchData(){
    this.httpClient.get("http://localhost:1000/records").subscribe(data =>{
      this.todos = Object.values(data)
      console.log(data)

    })
  }

  showNewTodo:boolean = false

  toggleShowNewTodo(){
    this.showNewTodo = !this.showNewTodo
  }
  addNewTodo(newtodo:todo){
    this.httpClient.post("http://localhost:1000/newtodo", newtodo).subscribe((response: any) => {
      this.fetchData(); // Refresh the list of todos
    })
  }
  
}
export interface todo {
  id?:number,
  title: string,
  date: string,
  description: string
}