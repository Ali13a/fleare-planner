import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private headers = new HttpHeaders();

  constructor(private http: HttpClient) { }

  get(path: string): Observable<any> {
    return this.http.get(path, {headers: this.headers})
  }

  post(id: number, path: string, body: any): Observable<any> {
    return this.http.post(`${path}${id}`, body, {headers: this.headers})
  }

  put(path: string, body: any): Observable<any> {
    return this.http.put(path, body, {headers: this.headers})
  }

  delete(id: number, path: string):Observable<any> {
    return this.http.delete(`${path}${id}`, {headers: this.headers})
  }
}
