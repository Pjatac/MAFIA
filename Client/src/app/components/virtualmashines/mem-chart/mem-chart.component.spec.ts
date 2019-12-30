import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemChartComponent } from './mem-chart.component';

describe('MemChartComponent', () => {
  let component: MemChartComponent;
  let fixture: ComponentFixture<MemChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
