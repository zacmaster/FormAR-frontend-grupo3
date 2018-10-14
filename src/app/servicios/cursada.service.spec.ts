import { TestBed } from '@angular/core/testing';

import { CursadaService } from './cursada.service';

describe('CursadaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CursadaService = TestBed.get(CursadaService);
    expect(service).toBeTruthy();
  });
});
