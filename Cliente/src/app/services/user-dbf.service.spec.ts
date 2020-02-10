import { TestBed } from '@angular/core/testing';

import { UserDbfService } from './user-dbf.service';

describe('UserDbfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDbfService = TestBed.get(UserDbfService);
    expect(service).toBeTruthy();
  });
});
