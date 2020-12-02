import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TaskItemService } from '../../services/task-item.service';
import { TaskService } from '../../services/task.service';
import { TaskItemPayload } from '../../types/todo.config';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { ModalFormData } from '../modal-form/modal-form.config';
import { ActionPanel, CollapsePanelConfig, Item } from './collapse-panel.config';

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
    isModalVisible: boolean = false;

    constructor(protected taskService: TaskService,
                protected taskItemService: TaskItemService) { }

    ngOnInit(): void {
    }

    private loadItems() {
        this.config.items = [];
        this.taskService.getAllTaskItems(this.config.id).subscribe(items => {
            items.map(item => {
                this.config.items.push({
                    id: item.id,
                    description: item.name,
                    isChecked: item.finish
                })
            });
            this.isLoading = false;
        }, error => {
            console.error(error);
            this.isLoading = false;
        });
    }

    private addTaskItem(id: number, payload: TaskItemPayload) {
        this.taskService.addTaskItems(id, payload).subscribe(() => {
            this.loadItems();
        }, error => {
            console.error(error);
        });
    }

    private changeStatusItem(itemId: number, taskItemPayload: TaskItemPayload) {
        this.taskItemService.changeStatusTaskItem(itemId, taskItemPayload)
            .subscribe(() => this.isLoading = false, error => console.error(error));
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
        this.isModalVisible = true;
    }

    onActiveChange(status: boolean) {
        if(status) {
            this.isLoading = true;
            this.loadItems();
        }
    }

    onEventFormAction(formData: ModalFormData) {
        this.isModalVisible = false;
        if(formData) {
            this.isLoading = true;
            let payload: TaskItemPayload = { name: formData.name };

            if(!formData.id) {
                this.addTaskItem(this.config.id, payload);
            } else {
                // this.editTaskItem(formData.id, payload);
            }
        }
    }

    onEventCloseFormAction() {
        this.isModalVisible = false;
    }

    onCheckboxChange(status: boolean, item: Item) {
        this.isLoading = true;
        let taskItemPayload: TaskItemPayload = {
            finish: status
        }
        this.changeStatusItem(item.id, taskItemPayload);
    }
}
