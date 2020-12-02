import { NgModule } from '@angular/core';

import { NavigationRoutingModule } from './navigation-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';

import { NavigationComponent } from './navigation.component';
import { CommonModule } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';


@NgModule({
  imports: [
    CommonModule,
    NavigationRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
  ],
  declarations: [NavigationComponent],
  exports: [NavigationComponent],
  providers: [NzModalService]
})
export class NavigationModule { }