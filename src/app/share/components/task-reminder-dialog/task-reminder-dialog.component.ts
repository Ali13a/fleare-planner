import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-task-reminder-dialog',
  standalone:true,
  imports:[MatDialogModule,MatButtonModule,CommonModule],
  templateUrl: './task-reminder-dialog.component.html',
  styleUrls: ['./task-reminder-dialog.component.css']
})
export class TaskReminderDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TaskReminderDialogComponent>
  ) {}

  startTask(): void {
    this.dialogRef.close('start');
  }

  later(): void {
    this.dialogRef.close('later');
  }
}
