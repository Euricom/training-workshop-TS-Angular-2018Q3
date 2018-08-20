import { Component } from '@angular/core';
import { Task, TaskService } from './services/taskService';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>{{ title }}</h1>
      <ul>
        <li *ngFor="let task of tasks">
          {{task.name}}
        </li>
      </ul>
      <button (click)="onClick()">Go</button>
    </div>
  `,
})
export class AppComponent {
  title = 'app works!';
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  onClick() {
    this.taskService.getTasks().subscribe(
      tasks => {
        this.tasks = tasks;
      },
      error => {
        console.log('ERROR', error);
      }
    );
  }
}