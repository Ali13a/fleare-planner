import { Component } from '@angular/core';
import {FormBuilderNewComponent} from "../../share/components/form-builder-new/form-builder-new.component";
import {Validators} from '@angular/forms';
import {CreateTaskService} from './create-task.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {error} from '@angular/compiler-cli/src/transformers/util';

@Component({
  selector: 'app-create-task',
    imports: [
        FormBuilderNewComponent
    ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {

  data!: any;
  callerStatus: any = {closed: true};

  formItem: any[] = [
    {
      type: 'text',
      label: 'Title',
      formControlName: 'title',
      validators: [Validators.required],
      classList: 'col-12 col-md-8 pt-3',
    },
    {
      type: 'select',
      label: 'Priority',
      formControlName: 'priority',
      options: [
        {name: 'Very High', value: 1},
        {name: 'High', value: 2},
        {name: 'Medium', value: 3},
        {name: 'Low', value: 4},
        {name: 'Very Low', value: 5},
      ],
      validators: [Validators.required],
      classList: 'col-12 col-md-3 pt-3',
    },
    {
      type: 'select',
      label: 'Status',
      formControlName: 'status',
      options: [
        {name: 'todo', value: 'todo'},
        {name: 'in_progress', value: 'in_progress'},
        {name: 'done', value: 'done'},
        {name: 'archived', value: 'archived'},
      ],
      validators: [Validators.required],
      classList: 'col-12 col-md-3 pt-3',
    },
    {
      type: 'select',
      label: 'Tags',
      formControlName: 'tags',
      options: [
        {name: 'normal', value: 'normal'},
        {name: 'administrative', value: 'administrative'},
      ],
      validators: [Validators.required],
      classList: 'col-12 col-md-3 pt-3',
    },
    {
      type: 'textarea',
      label: 'Description',
      formControlName: 'description',
      classList: 'col-12 col-md-12 pt-3',
    },
    {
      type: 'number',
      label: 'Time Required',
      formControlName: 'Time_required',
      validators: [Validators.required],
      classList: 'col-12 col-md-8 pt-3',
    },
    {
      type: 'toggle',
      label: 'Finished',
      formControlName: 'is_complete',
      defaulValue: false,
      validators: [],
      classList: 'col-12 col-md-8 pt-3',
    },
  ];

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private createTask: CreateTaskService) {
  }

  addTask(event: any) {
    this.createTask.createTask(event.value).subscribe({
      next: (result) => {
        console.log(result);

        this.snackBar.open('Task Added', '', {
          duration: 3000,
          horizontalPosition: 'center',
        });

        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        console.log(error);

        this.snackBar.open('Repetitive task️', '', {
          duration: 3000,
          horizontalPosition: 'center',
        });
      }
    });
  }

}
