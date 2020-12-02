import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { ModalFormData } from '../modal-form/modal-form.config';
import { ActionPanel, CollapsePanelConfig } from './collapse-panel.config';

@Component({
    selector: 'app-collapse-panel',
    templateUrl: './collapse-panel.component.html',
    styleUrls: ['./collapse-panel.component.scss']
})
export class CollapsePanelComponent implements OnInit {
    @Input() config: CollapsePanelConfig;

    @Output() eventPanelAction: EventEmitter<ActionPanel> = new EventEmitter()

    @ViewChild("appModalForm") private appModalForm: ModalFormComponent;
    
    isLoading: boolean = false;
    labelNameForm: string;
    formData: ModalFormData;

    constructor(protected taskService: TaskService) { }

    ngOnInit(): void {
    }

    onMenuDropDownAction(action: string) {
        console.log(this.config);
        let actionPanel: ActionPanel = {
            action: action === 'edit' ? 'edit' : 'delete',
            data: this.config
        }
        this.eventPanelAction.emit(actionPanel);
    }

    onAddItemAction() {
        console.log(" add item");
        this.labelNameForm = "Add new Item";
        this.appModalForm.showModal();
    }

    onActiveChange(status: boolean) {
        if(status) {
            this.isLoading = true;
            this.config.items = [];
            this.taskService.getAllTaskItems(this.config.id).subscribe(items => {
                items.map(item => {
                    this.config.items.push({
                        id: item.id,
                        description: item.name
                    })
                });
                this.isLoading = false;
            }, error => {
                console.error(error);
                this.isLoading = false;
            });
        }
    }

    onEventFormAction(formData: ModalFormData) {
        if(formData) {
            this.isLoading = true;
            let taskPayload = { name: formData.name };

            // if(!formData.id) {
            //     this.createTask(taskPayload);
            // } else {
            //     this.editTask(formData.id, taskPayload);
            // }
        }
    }
}
