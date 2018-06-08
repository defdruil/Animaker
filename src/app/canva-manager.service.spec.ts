import { TestBed, inject } from '@angular/core/testing';

import { CanvaManagerService } from './canva-manager.service';

describe('CanvaManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanvaManagerService]
    });
  });

  it('should be created', inject([CanvaManagerService], (service: CanvaManagerService) => {
    expect(service).toBeTruthy();
  }));
});
