import {Component, OnDestroy,OnInit} from '@angular/core';
import {TasksListService} from './tasks-list.service';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {TimelineModule} from 'primeng/timeline';
import {CardModule} from 'primeng/card';
import {RouterLink} from '@angular/router';
import {MatButtonModule, MatFabButton, MatIconAnchor, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogComponent} from '../../share/components/mat-dialog/mat-dialog.component';
import { interval,Subscription } from 'rxjs';
import { Task } from './tasks-list.service';

@Component({
  selector: 'app-tasks-list',
  imports: [
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
    MatFabButton,
    MatButtonModule,
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit , OnDestroy{
  private intervalSub!:Subscription;

  constructor(private taskService: TasksListService, private dialog: MatDialog) {
  }
  checkInProgressTask:any;
  checkedInProgress=new Set<number>()
  dueIntervalId:any;
  checkedTasks=new Set<number>()
  tasks: any[] = [];
  todayTasks: any[] = [];
  tomorrowTasks: any[] = [];
  findTasks: any[] = [];
  showInput: boolean = false;
  searchText: string = '';
  isOpen = false;
  currentTab: 'today' | 'tomorrow' = 'today';


  ngOnInit() {
    this.getTasks();
    this.checkDueTasks();
    this.doneInprogress();
  }
  ngOnDestroy() {
    if (this.dueIntervalId){
      clearInterval(this.dueIntervalId)
    }
    if(this.checkInProgressTask){
      clearInterval(this.checkInProgressTask);
    }
  }

  getTasks() {
    this.taskService.getAllTasks().subscribe(res => {
      this.tasks = res;
      this.separateTasks();
    });
  }
  checkDueTasks(){
    this.dueIntervalId=setInterval(() => {
        const now = new Date().getTime();

        this.tasks.forEach(task => {
          if (!task.due_date || this.checkedTasks.has(task.id)) return; // اگه قبلاً چک شده بی‌خیال شو

          const dueTime = new Date(task.due_date).getTime();

          // فقط وقتی زمان سر رسیده یا گذشته
          if (now >= dueTime && (task.status === 'todo' || task.status === 'missed')) {
            this.checkedTasks.add(task.id); // تا دوباره پاپ‌آپ نیاد

            const dialogRef = this.dialog.open(MatDialogComponent, {
              width: '400px',
              data: {
                title: 'Task Due!',
                message: `Do you want to start task "${task.title}" now?`,
              },
            });

            dialogRef.afterClosed().subscribe((result: boolean) => {
              const newStatus = result ? 'in_progress' : 'missed';

              this.taskService.updateTask(task.id, { status: newStatus }).subscribe({
                next: () => {
                  task.status = newStatus;
                  console.log(`Task "${task.title}" updated to ${newStatus}`);
                },
                error: (err) => {
                  console.error('Failed to update task:', err);
                },
              });
            });
          }
        });
      }, 5000);
  }
  doneInprogress(){
    this.checkInProgressTask=setInterval(()=>{
      const now = new Date().getTime();
      this.tasks.filter(task=>task.status === 'in_progress' && !this.checkedInProgress.has(task.id)).forEach(task=>{
        const endTime=new Date(task.due_date).getTime()+(task.Time_required || 60)*60000;
        if (now>=endTime){
          this.checkedInProgress.add(task.id);
          const dialogRef=this.dialog.open(MatDialogComponent,{
            width:'400px',
            data:{
              title:"Task Finished!",
              message:`Task"${task.title}" is done.Mark as done?`,
            },
          });
          dialogRef.afterClosed().subscribe((result:boolean)=>{
            const newStatus = result ? 'done':'missed';
            this.taskService.updateTask(task.id,{status:newStatus}).subscribe({
              next:()=>{
                task.status=newStatus;
                console.log(`Task"${task.title}" updated to ${newStatus}`);
              },
              error:err=>console.error('Failed to update task:',err),
            });
            this.taskService.updateTask(task.id,{is_complete:true}).subscribe({
              next:()=>{
                task.is_complete=true;
              },
              error:err=>console.error('Failed to update task:',err),
            });
          });
        }
      });
    },5000)
  }
  separateTasks() {
    const todayDate = new Date().toDateString();
    const tomorrowDate = new Date(Date.now() + 86400000).toDateString(); // 24 hours in ms

    this.todayTasks = this.tasks.filter(task => new Date(task.due_date).toDateString() === todayDate);
    this.tomorrowTasks = this.tasks.filter(task => new Date(task.due_date).toDateString() === tomorrowDate);
  }

  getCurrentTasks() {
    return this.currentTab === 'today' ? this.todayTasks : this.tomorrowTasks;
  }

  formatDateTime(date: string) {
    return new Date(date).toLocaleString('fa-IR', {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatTime(date: string | Date): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  addMinutes(dateStr: string, minutes: number): string {
    const date = new Date(dateStr);
    date.setMinutes(date.getMinutes() + minutes);
    return date.toISOString();
  }

  toggleSearch() {
    this.isOpen = !this.isOpen;

    if (!this.isOpen) {
      this.searchText = '';
      this.findTasks = [];
    }
  }

  searchTask(searchText: string) {
    if (!searchText?.trim()) return;

    this.taskService.getTaskByTitle(searchText).subscribe(res => {
      this.findTasks = res;
    });
  }

  toggleComplete(task: any) {
    const newComplete = !task.is_complete;

    this.taskService.updateTask(task.id, {is_complete: newComplete}).subscribe({
      next: (res) => {
        task.is_complete = newComplete;
        this.separateTasks();
      },
      error: (error) => {
        console.error('Error updating task completion status', error);
        task.is_complete = !newComplete;
      }
    });
  }

  deleteTask(id: number) {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Task',
        message: 'Are you sure you want to delete the task?',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.separateTasks();

        this.taskService.deleteTask(id).subscribe({
          next: (res) => {
            console.log('Task deleted successfully', res);
          },
          error: (err) => {
            console.error('Delete failed, but UI already updated', err);
          }
        });
      }
    });
  }
}
