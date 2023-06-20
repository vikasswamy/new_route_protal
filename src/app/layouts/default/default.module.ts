import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { TaskEditsComponent } from 'src/app/modules/task-edits/task-edits.component';
import { FloorViewComponent } from 'src/app/modules/floor-view/floor-view.component';
import { BuildingViewComponent } from 'src/app/modules/building-view/building-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppMaterialModule } from 'src/app/material.module';
import { MatDialogModule,  } from '@angular/material/dialog';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    TaskEditsComponent,
    FloorViewComponent,
    BuildingViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    MatDialogModule
  ],
  providers: [
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DefaultModule { }
