import { TestBed } from '@angular/core/testing';

import { InscripcionService } from './inscripcion.service';

describe('InscripcionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InscripcionService = TestBed.get(InscripcionService);
    expect(service).toBeTruthy();
  });
});
