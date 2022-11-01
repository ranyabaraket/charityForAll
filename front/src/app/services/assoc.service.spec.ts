import { TestBed } from '@angular/core/testing';

import { AssocService } from './assoc.service';

describe('AssocService', () => {
  let service: AssocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
