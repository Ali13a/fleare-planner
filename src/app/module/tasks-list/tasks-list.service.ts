import { Injectable } from '@angular/core';
import {ApiServiceService} from '../../core/services/api-service.service';
import {environment} from '../../../environments/environmet';
import {Observable} from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string;
  due_date?: string;
  status: 'todo' | 'in_progress' | 'done' | 'archived';
}

@Injectable({
  providedIn: 'root'
})

export class TasksListService {

  apiUrl: string = 'tasks';

  constructor(private apiServiceService: ApiServiceService) { }

  getAllTasks(): Observable<Task[]> {
    return this.apiServiceService.get(environment.path + this.apiUrl);
  }

  getTaskByTitle(title: string): Observable<Task[]> {
    return this.apiServiceService.get(`${environment.path}${this.apiUrl}/title/${title}`);
  }

  deleteTask(id: number): Observable<Task> {
    return this.apiServiceService.delete(`${environment.path}${this.apiUrl}/${id}`)
  }
}
