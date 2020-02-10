import { TestBed } from '@angular/core/testing';

import { MediaDepositosService } from './media-depositos.service';

describe('MediaDepositosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaDepositosService = TestBed.get(MediaDepositosService);
    expect(service).toBeTruthy();
  });
});
