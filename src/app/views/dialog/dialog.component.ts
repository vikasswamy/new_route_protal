import { Component, OnInit } from "@angular/core";
import {MatDialog, MatDialogRef, MatDialogModule, MatDialogContent} from '@angular/material/dialog';
@Component({
    selector: 'dialog',
    templateUrl: 'dialog.component.html',
  })
  export class DialogComponent implements OnInit {
    constructor() {}
    ngOnInit(): void {
      alert('hi sravan I reached dialog');
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
    
  }