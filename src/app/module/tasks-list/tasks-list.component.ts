import { Component } from '@angular/core';
import {TasksListService} from './tasks-list.service';
import {DatePipe, NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {TimelineModule} from 'primeng/timeline';
import {CardModule} from 'primeng/card';
import {RouterLink} from '@angular/router';
import {MatFabButton, MatIconAnchor, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogComponent} from '../../share/components/mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-tasks-list',
  imports: [
    DatePipe,
    NgIf,
    NgClass,
    TimelineModule,
    CardModule,
    NgForOf,
    RouterLink,
    MatIconButton,
    MatIcon,
    FormsModule,
    MatInput,
    MatIconAnchor,
    MatFabButton
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent {

  constructor(private taskService: TasksListService, private dialog: MatDialog) {}

  tasks: any[] = [];
  findTasks: any[] = [];
  showInput: boolean = false;
  searchText: string = '';


  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getAllTasks().subscribe(res => {
      this.tasks = res;
    });
  }

  format(date: string) {
    return new Date(date).toLocaleString('fa-IR', {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  toggleSearch() {
    this.showInput = !this.showInput;
    if (!this.showInput) {
      this.searchText = '';
      this.findTasks = [];
    }
  }


  searchTask(searchText: string) {
    this.taskService.getTaskByTitle(searchText).subscribe(res => {
      this.findTasks = res;
    })
  }


  deleteTask(id: number) {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Task',
        message: 'Are you sure you want to delete the task ? ',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.taskService.deleteTask(id).subscribe(res => {
          console.log(res)
          this.getTasks();
        })
      } else {
        console.log('errr');
      }
    });
  }
}
