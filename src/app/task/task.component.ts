import { Component, OnInit } from '@angular/core';
import { Itask } from '../model/Itask';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  updateIconEnabled :boolean = false;
  todos:Itask[] = [];
  inprogress:Itask[] = [];
  done:Itask[] = [];
  todoForm !: FormGroup;
  updateId !: number;


  constructor(private fb: FormBuilder) { 
    this.todoForm = this.fb.group({
      task: ['', Validators.required]
    })
  }

  updateDescTitle(){
    //To make the first character of task to upper case
    let todoTask = this.todoForm.value.task
    let description = todoTask.charAt(0).toUpperCase();
    //To add the remaining characters from the task
    return description += todoTask.substr(1,todoTask.length);
  }

  //To add tasks in todos array
  addToDo() {
    //To make the first character of task to upper case
    let updatedDescription = this.updateDescTitle();
    this.todos.push({
      description: updatedDescription,
      done:false
    });
    this.todoForm.reset();
  }

  //Update the already added todo task
  updateToDo() {
    this.todos[this.updateId].description = this.updateDescTitle();
    this.updateIconEnabled = false;
    this.todoForm.reset();
  }

  //To update the todo
  editToDo(i: number) {
    this.todoForm.controls['task'].setValue(this.todos[i].description);
    this.updateIconEnabled = true;
    this.updateId = i;
  }

  //Delete task from todos array
  deletetoDoTask(i: number) {
    this.todos.splice(i, 1);
  }

  //Delete task from inprogress array
  deleteinProgressTask(i: number) {
    this.inprogress.splice(i,1);
  }

  //Delete task from done array
  deleteDoneTask(i: number) {
    this.done.splice(i, 1);
  }

  ngOnInit(): void {
  }

  //To perform the drop of todos
  drop(event: CdkDragDrop<Itask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
