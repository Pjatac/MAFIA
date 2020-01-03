import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCountSelectComponent } from './top-count-select.component';

describe('TopCountSelectComponent', () => {
  let component: TopCountSelectComponent;
  let fixture: ComponentFixture<TopCountSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopCountSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCountSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
