import { TestBed } from '@angular/core/testing';

import { EventUseCasesService } from './event.use-cases.service';

describe('EventUseCasesService', () => {
  let service: EventUseCasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventUseCasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
