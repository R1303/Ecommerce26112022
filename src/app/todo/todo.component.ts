import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo,User } from '../list-todos/list-todos.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  
  id:number
  todo:Todo
  user:User
  password:string
  constructor(private todoService:TodoDataService,
    private router:ActivatedRoute,
    private routerNavigate:Router) { }

  ngOnInit() {
    this.id=this.router.snapshot.params['id'];
    this.user=new User(this.id,'','','','','');
    this.password=this.user.userPassword;
    if(this.id!=-1){
    this.todoService.getUser(this.id).subscribe(
      data => this.user=data
    )
    }
  }

  saveTodo(){
    if(this.id==-1){
       this.addTodo();
    }
    else{
    this.todoService.UpdateUser(this.id,this.user).subscribe(
      date => this.routerNavigate.navigate(['listTodos'])
    )
  }
}

  addTodo(){
    this.todoService.addTodo(this.user).subscribe(
    date => this.routerNavigate.navigate(['listTodos'])
    )
  }
  



}
