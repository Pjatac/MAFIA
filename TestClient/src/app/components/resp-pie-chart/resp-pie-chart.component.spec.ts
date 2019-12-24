import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespPieChartComponent } from './resp-pie-chart.component';

describe('RespPieChartComponent', () => {
  let component: RespPieChartComponent;
  let fixture: ComponentFixture<RespPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
