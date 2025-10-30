import {Injectable} from '@angular/core';
import {ApiServiceService} from '../../core/services/api-service.service';
import {environment} from '../../../environments/environmet';
import {Observable} from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  due_date?: string | null;
  status?: 'todo' | 'in_progress' | 'done' | 'archived';
  priority?: number;
  tags?: 'administrative' | 'normal';
  Time_required?: number;
  is_complete: boolean;
  created_at?: string;
  updated_at?: string;
  is_deleted?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class TasksListService {

  apiUrl: string = 'tasks';

  constructor(private apiServiceService: ApiServiceService) {
  }

  getAllTasks(): Observable<Task[]> {
    return this.apiServiceService.get(environment.path + this.apiUrl);
  }

  getTaskByTitle(title: string): Observable<Task[]> {
    return this.apiServiceService.get(`${environment.path}${this.apiUrl}/title/${title}`);
  }

  updateTask(id: number, updates: Partial<Task>): Observable<Task> {
    return this.apiServiceService.put(`${environment.path}${this.apiUrl}/update/${id}`, updates);
  }

  deleteTask(id: number): Observable<Task> {
    return this.apiServiceService.delete(`${environment.path}${this.apiUrl}/${id}`)
  }
}
