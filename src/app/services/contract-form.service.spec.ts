import { TestBed } from '@angular/core/testing';

import { ContractFormService } from './contract-form.service';

describe('ContractFormService', () => {
  let service: ContractFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
