import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppHttpClient } from 'src/app/app-http-client';
import { Item, Task, TaskItemPayload, TaskPayload } from '../types/todo.config';

@Injectable({
    providedIn: 'root'
})
export class TaskItemService extends AppHttpClient {

    constructor(protected httpClient: HttpClient) {
        super(httpClient, 'todoApi', 'todo');
    }

    // getAll(): Observable<Task[]> {
    //     return super.get("/tasks");
    // }

    // create(taskPayload: TaskPayload): Observable<Task> {
    //     return super.post("/tasks", taskPayload);
    // }

    changeStatusTaskItem(itemId: number, taskItemPayload: TaskItemPayload): Observable<Item> {
        return super.put("/taskItems/" + itemId + "/changeStatus", taskItemPayload);
    }
}