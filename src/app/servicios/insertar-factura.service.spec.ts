import { TestBed } from '@angular/core/testing';

import { InsertarFacturaService } from './insertar-factura.service';

describe('InsertarFacturaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsertarFacturaService = TestBed.get(InsertarFacturaService);
    expect(service).toBeTruthy();
  });
});
