import { NgModule } from '@angular/core';

import { TaskRoutingModule } from './task-routing.module';

import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

import { TaskComponent } from './task.component';
import { CommonModule } from '@angular/common';
import { CollapsePanelComponent } from './components/collapse-panel/collapse-panel.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaskRoutingModule,
    NzCollapseModule,
    NzCheckboxModule,
    NzButtonModule,
    NzIconModule,
    NzSpaceModule,
    NzDropDownModule,
    NzModalModule,
    NzToolTipModule,
    NzFormModule,
    NzInputModule,
  ],
  declarations: [
    TaskComponent,
    CollapsePanelComponent,
    ModalFormComponent
  ],
  exports: [TaskComponent]
})
export class TaskModule { }
