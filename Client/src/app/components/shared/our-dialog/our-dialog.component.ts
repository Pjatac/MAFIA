import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-our-dialog',
  templateUrl: './our-dialog.component.html',
  styleUrls: ['./our-dialog.component.css']
})

export class OurDialogComponent {

  constructor(private myDialogRef: MatDialogRef<OurDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {body: string, title: string}) { }
  
  close(){
    this.myDialogRef.close();
  }
}
