import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModal {
  constructor(private dialogRef: MatDialogRef<ConfirmModal>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  public yes () {
    this.dialogRef.close();
    this.data['yesCallback'](this.data['callbackArguments']);
  }

  public no () {
    this.dialogRef.close();
    if (this.data['noCallback']) {
      this.data['noCallback'](this.data['callbackArguments']);
    }
  }
}
