import { TestBed } from '@angular/core/testing';

import { ListModifiedService } from './list-modified.service';

describe('ListModifiedService', () => {
  let service: ListModifiedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListModifiedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
