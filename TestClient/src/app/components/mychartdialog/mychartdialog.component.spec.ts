import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MychartdialogComponent } from './mychartdialog.component';

describe('MydialogComponent', () => {
  let component: MychartdialogComponent;
  let fixture: ComponentFixture<MychartdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MychartdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MychartdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
