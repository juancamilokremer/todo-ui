import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzMenuItemDirective } from 'ng-zorro-antd/menu';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { CollapsePanelConfig } from './collapse-panel.config';

@Component({
    selector: 'app-collapse-panel',
    templateUrl: './collapse-panel.component.html',
    styleUrls: ['./collapse-panel.component.scss']
})
export class CollapsePanelComponent implements OnInit {
    @Input() config: CollapsePanelConfig;

    @Output() eventPanelAction: EventEmitter<string> = new EventEmitter()

    @ViewChild("appModalForm") private appModalForm: ModalFormComponent;
    
    constructor() { }

    ngOnInit(): void {
    }

    onMenuDropDownAction(action: string) {
        this.eventPanelAction.emit(action);
    }

    onAddItemAction() {
        console.log(" add item");
        this.appModalForm.showModal();
    }
}
