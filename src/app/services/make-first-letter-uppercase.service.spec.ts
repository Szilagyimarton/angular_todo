import { TestBed } from '@angular/core/testing';

import { MakeFirstLetterUppercaseService } from './make-first-letter-uppercase.service';

describe('MakeFirstLetterUppercaseService', () => {
  let service: MakeFirstLetterUppercaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakeFirstLetterUppercaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
 
});
