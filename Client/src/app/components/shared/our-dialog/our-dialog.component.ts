import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-our-dialog',
  templateUrl: './our-dialog.component.html',
  styleUrls: ['./our-dialog.component.css']
})

export class OurDialogComponent implements OnInit {

  constructor(private myDialogRef: MatDialogRef<OurDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }
  
  close(){
    this.myDialogRef.close();
  }
}
