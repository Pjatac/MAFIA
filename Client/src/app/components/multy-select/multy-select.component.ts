import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-multy-select',
  templateUrl: './multy-select.component.html',
  styleUrls: ['./multy-select.component.css']
})
export class MultySelectComponent implements OnInit {
  servers = new FormControl();
  @Input() srvList: string[];
  @Output() changeSelection = new EventEmitter();
  constructor() { }
  ngOnInit() {
    this.srvList = [];
  }
  newSelection(servers: string[], ms) {
    ms.close();
    this.changeSelection.emit(servers);
  }
}
