import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppHttpClient } from 'src/app/app-http-client';
import { Task, TaskPayload } from '../types/todo.config';

@Injectable({
    providedIn: 'root'
})
export class TaskService extends AppHttpClient {

    constructor(protected httpClient: HttpClient) {
        super(httpClient, 'todoApi', 'todo');
    }

    getAll(): Observable<Task[]> {
        return super.get("/tasks");
    }

    create(taskPayload: TaskPayload): Observable<Task> {
        return super.post("/tasks", taskPayload);
    }
}