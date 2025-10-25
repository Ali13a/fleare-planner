import { Injectable } from '@angular/core';
import {ApiServiceService} from '../../core/services/api-service.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environmet';

@Injectable({
  providedIn: 'root'
})
export class CreateTaskService {

  apiUrl = 'tasks/create';

  constructor(private apiService: ApiServiceService) { }

  createTask(body: any): Observable<any> {
    return this.apiService.post(environment.path + this.apiUrl, body);
  }
}
