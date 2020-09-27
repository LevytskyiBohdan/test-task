import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/todos');
  }

  getTask(id): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/' + id);
  }

  editTask(id: number, body: object): Observable<any> {
    return this.http.put('https://jsonplaceholder.typicode.com/todos/' + id, body);
  }

  createTask(body: object): Observable<any> {
    return this.http.post('https://jsonplaceholder.typicode.com/todos', body);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete('https://jsonplaceholder.typicode.com/todos/' + id);
  }
}
