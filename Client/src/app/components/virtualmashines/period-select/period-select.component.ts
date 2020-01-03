import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

export interface Period {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-period-select',
  templateUrl: './period-select.component.html',
  styleUrls: ['./period-select.component.css']
})
export class PeriodSelectComponent implements OnInit {
  @Input() periods: Period[];
  @Output() changePeriod = new EventEmitter();
  selectedPeriod;
  
  constructor() { }

  ngOnInit() {
  }
  newSelection() {
    this.changePeriod.emit(this.selectedPeriod);
  }
}
