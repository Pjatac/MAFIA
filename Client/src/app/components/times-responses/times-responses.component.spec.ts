import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesResponsesComponent } from './times-responses.component';

describe('TimesResponsesComponent', () => {
  let component: TimesResponsesComponent;
  let fixture: ComponentFixture<TimesResponsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesResponsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
