import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-our-data-picker',
  templateUrl: './our-data-picker.component.html',
  styleUrls: ['./our-data-picker.component.css']
})
export class OurDataPickerComponent {
  @Output() changeSelection = new EventEmitter();
  constructor() { }

  dateSelect(date) {
    this.changeSelection.emit(date.value);
  }
}
