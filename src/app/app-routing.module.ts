import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { BuildingViewComponent } from './modules/building-view/building-view.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { FloorViewComponent } from './modules/floor-view/floor-view.component';
import { TaskEditsComponent } from './modules/task-edits/task-edits.component';

const routes: Routes = [{
   path: '',
   component: DefaultComponent,
   children: [
    {
     path: 'dashboard',
     component: DashboardComponent
   },
   {
    path: 'task',
    component: TaskEditsComponent
   },
   {
    path: 'floor-view',
    component: FloorViewComponent
   },
   {
    path: 'building-view',
    component: BuildingViewComponent
   },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
