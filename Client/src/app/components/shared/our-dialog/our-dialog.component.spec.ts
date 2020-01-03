import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurDialogComponent } from './our-dialog.component';

describe('OurDialogComponent', () => {
  let component: OurDialogComponent;
  let fixture: ComponentFixture<OurDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
