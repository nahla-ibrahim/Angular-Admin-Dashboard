import { TestBed } from '@angular/core/testing';

import { ChartsServices } from './charts-services';

describe('ChartsServices', () => {
  let service: ChartsServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
