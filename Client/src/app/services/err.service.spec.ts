import { TestBed } from '@angular/core/testing';

import { ErrService } from './err.service';

describe('ErrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrService = TestBed.get(ErrService);
    expect(service).toBeTruthy();
  });
});
