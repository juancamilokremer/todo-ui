import { Component, OnInit, ViewChild } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CollapsePanelConfig } from './components/collapse-panel/collapse-panel.config';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { TaskService } from './services/task.service';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent {
    labelName: string;
    title: string = "TO-DO List";
    tasks: CollapsePanelConfig [];

    @ViewChild("appModalForm") private appModalForm: ModalFormComponent;

    constructor(protected modalService: NzModalService,
                protected taskService: TaskService) {
        this.loadTasks();
    }

    async loadTasks() {
        this.tasks = [];
        await this.taskService.getAll().toPromise().then(tasks => {
            tasks.map(task => {
                this.tasks.push({
                    id: task.id,
                    title: task.name
                });
            })
        });
    }

    private confirmationDeleteTask(id: string) {
        this.modalService.confirm({
            nzTitle: 'Are you sure want to delete the To-Do List?',
            nzOkType: 'danger',
            nzOnOk: () => this.deleteTask(id),
        });
    }

    private deleteTask(id: string){
        console.log("delete");
        //call service.
    }

    onAddTaskAction() {
        this.labelName = "Add new To-Do";
        this.appModalForm.showModal();
    }

    onEventPanelAction(action: string) {
        if(action === 'edit') {
            this.labelName = "Edit To-Do name";
            this.appModalForm.showModal();
        } else if (action === 'delete') {
            this.confirmationDeleteTask("1");
        }
    }
}
