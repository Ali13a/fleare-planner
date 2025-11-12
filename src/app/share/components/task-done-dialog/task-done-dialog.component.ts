import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-done-dialog',
  templateUrl: './task-done-dialog.component.html',
  imports:[
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class TaskDoneDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskDoneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  done() {
    this.dialogRef.close('done');
  }

  missed() {
    this.dialogRef.close('missed');
  }
}
