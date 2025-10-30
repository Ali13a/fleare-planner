import {Injectable} from '@angular/core';
import {ApiServiceService} from '../../core/services/api-service.service';
import {environment} from '../../../environments/environmet';

@Injectable({
  providedIn: 'root'
})
export class EditTaskService {

  apiUrl = 'tasks/update/';

  constructor(private apiService: ApiServiceService) {
  }

  getTask(id: number) {
    return this.apiService.get(`${environment.path}tasks/${id}`);
  }

  updateTask(id: number, body: any) {
    return this.apiService.put(`${environment.path}${this.apiUrl}${id}`, body);
  }

}
