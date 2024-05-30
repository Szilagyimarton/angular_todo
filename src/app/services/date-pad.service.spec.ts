import { TestBed } from '@angular/core/testing';

import { DatePadService } from './date-pad.service';

describe('DatePadService', () => {
  let service: DatePadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatePadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
