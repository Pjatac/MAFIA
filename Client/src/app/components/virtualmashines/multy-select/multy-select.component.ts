import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-multy-select',
  templateUrl: './multy-select.component.html',
  styleUrls: ['./multy-select.component.css']
})
export class MultySelectComponent {
  servers = new FormControl();
  @Input() srvList: string[];
  @Output() changeSelection = new EventEmitter();
  constructor() { }

  newSelection(servers: string[], ms) {
    ms.close();
    this.changeSelection.emit(servers);
  }
}
