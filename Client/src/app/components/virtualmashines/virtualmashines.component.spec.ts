import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmashinesComponent } from './virtualmashines.component';

describe('VirtualmashinesComponent', () => {
  let component: VirtualmashinesComponent;
  let fixture: ComponentFixture<VirtualmashinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualmashinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualmashinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
