import { TestBed } from '@angular/core/testing';

import { MediaTRecebidasService } from './media-trecebidas.service';

describe('MediaTRecebidasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaTRecebidasService = TestBed.get(MediaTRecebidasService);
    expect(service).toBeTruthy();
  });
});
