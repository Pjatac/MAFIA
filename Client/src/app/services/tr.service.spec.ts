import { TestBed } from '@angular/core/testing';

import  TrService  from './tr.service';

describe('TrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrService = TestBed.get(TrService);
    expect(service).toBeTruthy();
  });
});
