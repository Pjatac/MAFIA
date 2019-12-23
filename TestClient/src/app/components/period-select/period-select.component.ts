import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

  @Output() changePeriod = new EventEmitter();
  selectedPeriod;
  periods: Period[] = [
    {value: '1', viewValue: '1 minute'},
    {value: '5', viewValue: '5 minutes'},
    {value: '15', viewValue: '15 minutes'},
    {value: '30', viewValue: '30 minutes'},
    {value: '60', viewValue: '1 hour'}
  ];
  constructor() { }

  ngOnInit() {
  }
  newSelection() {
    this.changePeriod.emit(this.selectedPeriod);
  }
}
