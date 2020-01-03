import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurDataPickerComponent } from './our-data-picker.component';

describe('OurDataPickerComponent', () => {
  let component: OurDataPickerComponent;
  let fixture: ComponentFixture<OurDataPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurDataPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurDataPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
