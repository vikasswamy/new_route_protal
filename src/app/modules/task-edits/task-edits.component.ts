import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskEditService } from 'src/app/service/taskedit.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/views/dialog/dialog.component';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
}
@Component({
  selector: 'app-task-edits',
  templateUrl: './task-edits.component.html',
  styleUrls: ['./task-edits.component.scss'],
})

export class TaskEditsComponent implements OnInit {
  items = ['JOE BLOGGS', 'ANDREA TIMMS'];
  expandedIndex = 0;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  public show = false;
   public filterdData : any;
   unAssaignedTask: any = ['Floor 1, Room 3:Disinfect Closet', 'Floor 5, Room 2:pipe clean', 'Floor 2, Room 4:Scrub Tiles', 'Floor 3, Confirence Room 2:Vaccum Carpet', 'Mezzanine,Lobby:Mop Floor'];
   assaignedFloors: any = ['First Floor, Room 3', 'First Floor, Conference', 'First Floor, Kitchen'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  closeResult: string = '';
   constructor(public taskEditService: TaskEditService, public dialog: MatDialog) { 
     
   }
   cleaningTypes = [
    { id: 1, name: 'Disinfect Closet'},
    { id: 2, name: 'Pipe Clean'},
    { id: 3, name: 'Scrub Tiles'},
    { id: 4, name: 'Vacuum Carpet'},
    { id: 5, name: 'Mop Floor'}
  ];
  areas = [
    { id: 1, name: 'amazon'},
    { id: 2, name: 'area'},
    { id: 3, name: 'swim'},
    { id: 4, name: 'testarea'},
  ];
  ngOnInit(): void {
     this.taskEditService.filterdata.subscribe(data => {
         this.filterdData = data;
         console.log(this.filterdData, '@#$@#*&^(*&^%(*&^%*&^%&^%');
     })
  }
   ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079},
    // {position: 2, name: 'Helium', weight: 4.0026},
    // {position: 3, name: 'Lithium', weight: 6.941}
  ];
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = this.ELEMENT_DATA;
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  applyFilter(event: Event) {
    debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.unAssaignedTask = filterValue.trim().toLowerCase().toString();
  }
 
  openDialog() {
    this.show = true;
  }
  closedialog() {
    debugger;
    this.show = false;
  }
}
  //openDialog(enterAnimationDuration: string, exitAnimationDuration: string){

