import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-multy-select',
  templateUrl: './multy-select.component.html',
  styleUrls: ['./multy-select.component.css']
})
export class MultySelectComponent implements OnChanges{

  msControl = new FormControl();

  @Input() title;
  @Input() msList: string[];
  @Output() changeSelection = new EventEmitter();
  
  constructor() { }
  
  ngOnChanges(){
    this.msControl.setValue(this.msList);
  }
  
  newSelection(selection: string[], ms) {
    ms.close();
    this.changeSelection.emit(selection);
  }
}
