import { Component } from '@angular/core';
import { Options, ChangeContext, PointerType } from 'ng5-slider';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.css']
})
export class RangeSliderComponent  {
  title = 'testmaterial';
  minValue: number = 0;
  maxValue: number = 1440;
  options: Options = {
    floor: 0,
    ceil: 1440,
    ticksArray: [60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1260, 1320, 1380],
    showSelectionBarEnd: false,
    step: 5,
    getLegend: (value: number): string => {
      return value / 60 + "h";
    }
  };
  constructor() { }
  onUserChangeEnd(changeContext: ChangeContext): void {
    // `${this.getChangeContextString(changeContext)})\n` });
  }
  inputChanges() {
    //`${this.minValue} ${this.maxValue}`});
  }
  getChangeContextString(changeContext: ChangeContext): string {
    return `{pointerType: ${changeContext.pointerType === PointerType.Min ? 'Min' : 'Max'}, ` +
      `value: ${changeContext.value}, ` +
      `highValue: ${changeContext.highValue}}`;
  }

}
