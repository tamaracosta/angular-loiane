/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VerificarEmailService } from './verificar-email.service';

describe('Service: VerificarEmail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerificarEmailService]
    });
  });

  it('should ...', inject([VerificarEmailService], (service: VerificarEmailService) => {
    expect(service).toBeTruthy();
  }));
});
