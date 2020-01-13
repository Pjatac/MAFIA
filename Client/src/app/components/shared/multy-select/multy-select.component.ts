import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-multy-select',
  templateUrl: './multy-select.component.html',
  styleUrls: ['./multy-select.component.css']
})
export class MultySelectComponent implements OnInit{

  msControl = new FormControl();
  selected;

  @Input() title;
  @Input() msList: string[];
  @Output() changeSelection = new EventEmitter();
  
  constructor() { }
  
  ngOnInit() {
    this.selected = this.msList;
  }
  
  newSelection(selection: string[], ms) {
    ms.close();
    this.changeSelection.emit(selection);
  }
}
