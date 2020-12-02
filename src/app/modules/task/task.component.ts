import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActionPanel, CollapsePanelConfig } from './components/collapse-panel/collapse-panel.config';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { ModalFormData } from './components/modal-form/modal-form.config';
import { TaskService } from './services/task.service';
import { TaskPayload } from './types/todo.config';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements AfterViewInit{
    isLoading: boolean = true;
    labelName: string;
    formData: ModalFormData;
    title: string = "TO-DO List";
    tasks: CollapsePanelConfig [];

    @ViewChild("appModalForm", {static: false}) private appModalForm: ModalFormComponent;

    constructor(protected modalService: NzModalService,
                protected taskService: TaskService) {
        this.loadTasks();
    }
    
    ngAfterViewInit(): void {
        this.appModalForm.formData = this.formData;
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
        this.isLoading = false;
    }

    private confirmationDeleteTask(id: number) {
        this.modalService.confirm({
            nzTitle: 'Are you sure want to delete the To-Do List?',
            nzOkType: 'danger',
            nzCancelText: 'No',
            nzOkText: 'Yes',
            nzOnOk: () => this.deleteTask(id),
        });
    }

    private deleteTask(id: number){
        this.taskService.deleteTask(id).subscribe(() => {
            this.loadTasks();
        }, error => {
            console.error(error);
        });
    }

    private createTask(taskPayload: TaskPayload) {
        this.taskService.create(taskPayload).subscribe(() => {
            this.loadTasks();
        }, error => {
            console.error(error);
        });
    }

    private editTask(id: number, taskPayload: TaskPayload) {
        this.taskService.update(id, taskPayload).subscribe(() => {
            this.loadTasks();
        }, error => {
            console.error(error);
        });
    }

    onOpenAddTaskPanel() {
        this.labelName = "Add new To-Do";
        this.appModalForm.formData = null;
        this.appModalForm.showModal();
    }

    onEventPanelAction(actionPanel: ActionPanel) {
        console.log(actionPanel);
        if(actionPanel.action === 'edit') {
            this.labelName = "Edit To-Do name";
            this.appModalForm.formData = {
                id: actionPanel.data.id,
                name: actionPanel.data.title,
            };
            console.log(this.formData);
            this.appModalForm.showModal();
        } else if (actionPanel.action === 'delete') {
            this.confirmationDeleteTask(actionPanel.data.id);
        }
    }

    onEventFormAction(formData: ModalFormData) {
        if(formData) {
            this.isLoading = true;
            let taskPayload = { name: formData.name };

            if(!formData.id) {
                this.createTask(taskPayload);
            } else {
                this.editTask(formData.id, taskPayload);
            }
        }
    }
}
