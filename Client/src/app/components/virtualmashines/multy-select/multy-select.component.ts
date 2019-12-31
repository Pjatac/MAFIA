<<<<<<< HEAD
import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
=======
import { Component, Input, Output, EventEmitter } from '@angular/core';
>>>>>>> PjatakBranch
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-multy-select',
  templateUrl: './multy-select.component.html',
  styleUrls: ['./multy-select.component.css']
})
<<<<<<< HEAD
export class MultySelectComponent implements OnChanges {
=======
export class MultySelectComponent {
>>>>>>> PjatakBranch
  servers = new FormControl();
  @Input() srvList: string[];
  @Output() changeSelection = new EventEmitter();
  constructor() { }
<<<<<<< HEAD
  ngOnChanges() {
    this.srvList = [];
  }
=======

>>>>>>> PjatakBranch
  newSelection(servers: string[], ms) {
    ms.close();
    this.changeSelection.emit(servers);
  }
}
