import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

export interface Selection {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-simple-select',
  templateUrl: './simple-select.component.html',
  styleUrls: ['./simple-select.component.css']
})
export class SimpleSelectComponent implements OnInit {
  @Input() title;
  @Input() selections: Selection[];
  @Output() changeSelection = new EventEmitter();
  selected;
  
  constructor() { }

  ngOnInit() {
  }
  newSelection() {
    this.changeSelection.emit(this.selected);
  }
}
