import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from '../task/task.component';
import { NavigationComponent } from './navigation.component';

const routes: Routes = [
    {
        path: '',
        component: NavigationComponent,
        children: [
            {
                path: 'task',
                loadChildren: () => import('../task/task.module').then(m => m.TaskModule)
            },
            {
                path: '',
                component: TaskComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NavigationRoutingModule { }
