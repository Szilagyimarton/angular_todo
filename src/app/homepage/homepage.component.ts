import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { TodoComponent } from '../todo/todo.component';
import { NewTodoComponent } from '../new-todo/new-todo.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePadService } from '../services/date-pad.service';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NgFor,TodoComponent, NewTodoComponent, NgIf,HttpClientModule,FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {

  constructor(private datePad:DatePadService){}
 
  todos: todo[] = []
  showNewTodo:boolean = false
  
  filteredByValueTodos: todo[] = []
  filterByPrioirityValue: string = "All"
  
  httpClient = inject(HttpClient)
  today:string = ""

  getToday(){
    let date = new Date()
    let day = this.datePad.pad(date.getDate())
    let month = this.datePad.pad(date.getMonth() + 1)
    let year = this.datePad.pad(date.getFullYear())

    this.today =`${year}-${month}-${day}`
  }

  ngOnInit(): void {
    this.fetchData()
    this.getToday()
  }
  fetchData(){
    this.httpClient.get("http://localhost:1000/records").subscribe(data =>{
      this.todos = Object.values(data)
      this.filteredByValueTodos = Object.values(data)
    })
  }


  toggleShowNewTodo(){
    this.showNewTodo = !this.showNewTodo
  }
  addNewTodo(newtodo:todo){
    this.httpClient.post("http://localhost:1000/newtodo", newtodo).subscribe((response: any) => {
      this.fetchData(); // Refresh the list of todos
    })
  }
  
  filteredByPriority(){
    if(this.filterByPrioirityValue === "All"){
      this.filteredByValueTodos = this.todos
    }else{
      this.filteredByValueTodos = [...this.todos].filter(todo => todo.priority === this.filterByPrioirityValue)
    }
  }
}
export interface todo {
  id?:number,
  title: string,
  date: string,
  description: string,
  priority: string
}