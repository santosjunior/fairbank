import { TestBed } from '@angular/core/testing';

import { MediaTRealizadasService } from './media-trealizadas.service';

describe('MediaTRealizadasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaTRealizadasService = TestBed.get(MediaTRealizadasService);
    expect(service).toBeTruthy();
  });
});
