import { TestBed } from '@angular/core/testing';

import { ResourceService } from "./resource.service";
import { Iresource } from '../interfaces/iresource';
import { Resource } from '../componentes/resource';

describe('ResourceServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourceService<Resource,Iresource> = TestBed.get(ResourceService);
    expect(service).toBeTruthy();
  });
});
