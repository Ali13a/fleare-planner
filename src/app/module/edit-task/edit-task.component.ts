import {Component, ViewChild} from '@angular/core';
import {FormBuilderNewComponent} from '../../share/components/form-builder-new/form-builder-new.component';
import {Validators} from '@angular/forms';
import {EditTaskService} from './edit-task.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-edit-task',
  imports: [
    FormBuilderNewComponent,
    MatFabButton,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {

  data: any = null;
  callerStatus: any = { closed: true };

  formItem: any[] = [
    {
      type: 'readOnly',
      label: 'id',
      formControlName: 'id',
      disabled: true,
      classList: 'col-3 col-md-12 pt-3',
    },
    {
      type: 'text',
      label: 'Title',
      formControlName: 'title',
      validators: [Validators.required],
      classList: 'col-12 col-md-12 pt-3',
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
      classList: 'col-12 col-md-12 pt-3',
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
      classList: 'col-12 col-md-12 pt-3',
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
      classList: 'col-12 col-md-12 pt-3',
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
      classList: 'col-12 col-md-12 pt-3',
    },
    {
      type: 'toggle',
      label: 'Finished',
      formControlName: 'is_complete',
      validators: [],
      classList: 'col-12 col-md-8 pt-3',
    },
  ];

  constructor(
    private editTaskService: EditTaskService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTask(id);
  }

  loadTask(id: number) {
    this.editTaskService.getTask(id).subscribe(task => {
      this.data = task;
    });
  }

  updateTask(event: any): void {
    this.editTaskService.updateTask(this.data.id, event.value).subscribe(
      res => {
        this.snackBar.open('Task updated successfully', '', { duration: 2000 });
        this.router.navigate(['/tasks']);
      },
      error => {
        this.snackBar.open('Update failed', '', { duration: 2000 });
      }
    );
  }
}
