import { TestBed } from '@angular/core/testing';

import { TipoCursoService } from './tipo-curso.service';

describe('TipoCursoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoCursoService = TestBed.get(TipoCursoService);
    expect(service).toBeTruthy();
  });
});
