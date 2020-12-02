import { Component, OnInit, ViewChild } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CollapsePanelConfig } from './components/collapse-panel/collapse-panel.config';
import { ModalFormComponent } from './components/modal-form/modal-form.component';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent {
    title: string = "TO-DO List";
    tasks: CollapsePanelConfig[];

    @ViewChild("appModalForm") private appModalForm: ModalFormComponent;

    constructor(protected modalService: NzModalService) {
        this.tasks = [
            {
                id: "1",
                title: 'Mercado',
                items: [
                    {id: "1", description: 'Jabón'},
                    {id: "2", description: 'Servilletas'}
                ]
            },
            {
                id: "2",
                title: 'Tareas trabajo',
                items: [
                    {id: "3", description: 'Terminar aplicación'},
                    {id: "4", description: 'Hacer lo del ser'}
                ]
            }
        ];
    }

    private confirmationDeleteTask(id: string) {
        this.modalService.confirm({
            nzTitle: 'Are you sure want delete the To-Do List',
            nzOkType: 'danger',
            nzOnOk: () => this.deleteTask(id),
        });
    }

    private deleteTask(id: string){
        console.log("delete");
        //call service.
    }

    onAddTaskAction() {
        console.log("Add task");
        this.appModalForm.showModal();
    }

    onEventPanelAction(action: string) {
        console.log(action);
        if(action === 'edit') {
            this.appModalForm.showModal();
        } else if (action === 'delete') {
            this.confirmationDeleteTask("1");
        }
    }
}
