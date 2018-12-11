import { TestBed, inject } from '@angular/core/testing';

import { NasaDalService } from './nasa-dal.service';

describe('NasaDalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NasaDalService]
    });
  });

  it('should be created', inject([NasaDalService], (service: NasaDalService) => {
    expect(service).toBeTruthy();
  }));
});
