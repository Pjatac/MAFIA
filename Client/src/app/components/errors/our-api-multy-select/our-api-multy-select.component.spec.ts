import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurApiMultySelectComponent } from './our-api-multy-select.component';

describe('OurApiMultySelectComponent', () => {
  let component: OurApiMultySelectComponent;
  let fixture: ComponentFixture<OurApiMultySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurApiMultySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurApiMultySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
