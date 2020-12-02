import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalFormData } from './modal-form.config';

@Component({
    selector: 'app-modal-form',
    templateUrl: './modal-form.component.html',
    styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
    @Input() labelName: string;
    @Input() formData: ModalFormData;

    @Output() eventFormAction: EventEmitter<ModalFormData> = new EventEmitter();

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
            name: new FormControl(this.formData, Validators.required)
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
            if (this.formData) {
                this.formData.name = this.validateForm.controls.name.value;
            } else {
                this.formData = {name : this.validateForm.controls.name.value};
            }
            console.log(this.validateForm.controls.name.value);
            this.eventFormAction.emit(this.formData);
            this.validateForm.controls.name.reset();
            this.isVisible = false;
        } 
    }

    handleCancel(): void {
        this.isVisible = false;
    }
}
