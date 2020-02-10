import { TestBed } from '@angular/core/testing';

import { MediaSaquesService } from './media-saques.service';

describe('MediaSaquesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaSaquesService = TestBed.get(MediaSaquesService);
    expect(service).toBeTruthy();
  });
});
