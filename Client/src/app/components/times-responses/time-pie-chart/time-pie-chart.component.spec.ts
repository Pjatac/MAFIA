import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePieChartComponent } from './time-pie-chart.component';

describe('TimePieChartComponent', () => {
  let component: TimePieChartComponent;
  let fixture: ComponentFixture<TimePieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimePieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
