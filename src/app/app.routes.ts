import {Routes} from '@angular/router';
import {HomePageComponent} from './module/home-page/home-page.component';
import {TasksListComponent} from './module/tasks-list/tasks-list.component';
import {EditTaskComponent} from './module/edit-task/edit-task.component';
import {CreateTaskComponent} from './module/create-task/create-task.component';


export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'tasks',
    component: TasksListComponent
  },
  {
    path: 'create',
    component: CreateTaskComponent
  },
  {
    path: 'tasks/:id',
    component: EditTaskComponent
  },
  {
    path: '**',
    redirectTo: '',
  }
];
