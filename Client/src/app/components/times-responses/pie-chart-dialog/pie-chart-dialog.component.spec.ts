import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartDialogComponent } from './pie-chart-dialog.component';

describe('PieChartDialogComponent', () => {
  let component: PieChartDialogComponent;
  let fixture: ComponentFixture<PieChartDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieChartDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
