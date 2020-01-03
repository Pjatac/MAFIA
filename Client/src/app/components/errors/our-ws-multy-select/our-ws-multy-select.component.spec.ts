import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurWsMultySelectComponent } from './our-ws-multy-select.component';

describe('OurWsMultySelectComponent', () => {
  let component: OurWsMultySelectComponent;
  let fixture: ComponentFixture<OurWsMultySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurWsMultySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurWsMultySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
