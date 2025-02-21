import { TestBed } from '@angular/core/testing';

import { UserUseCasesService } from './user.use-cases.service';

describe('User.UseCasesService', () => {
  let service: UserUseCasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserUseCasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
