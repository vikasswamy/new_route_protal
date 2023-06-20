import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModal {
  public info: any;

  constructor(private dialogRef: MatDialogRef<InfoModal>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.info = data;
  }

  public close () {
    this.dialogRef.close();
    if(this.info['callback']) {
      this.info['callback']();
    }
  }
}


