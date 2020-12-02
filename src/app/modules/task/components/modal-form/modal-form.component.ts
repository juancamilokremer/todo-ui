import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-modal-form',
    templateUrl: './modal-form.component.html',
    styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
    @Input() labelName: string;
    @Input() todoName: string;

    @Output() eventFormAction: EventEmitter<string> = new EventEmitter();

    isVisible = false;
    disabledOkButton: boolean = true;
    isValidForm: boolean = false;
    validateForm: FormGroup;

    constructor() { }

    ngOnInit(): void {
        this.initFormControl();
    }

    private initFormControl() {
        this.validateForm = new FormGroup({
            name: new FormControl(this.todoName, Validators.required)
        });

        this.validateForm.statusChanges.subscribe(status => {
            this.isValidForm = status === 'VALID';
            this.disabledOkButton = !this.isValidForm;
        });
    }

    showModal(): void {
        this.isVisible = true;
    }

    handleOk(): void {
        if(this.isValidForm) {
            console.log(this.validateForm.controls.name.value);
            this.eventFormAction.emit(this.validateForm.controls.name.value);
            this.validateForm.controls.name.setValue("");
            this.isVisible = false;
        } 
    }

    handleCancel(): void {
        this.isVisible = false;
    }
}
