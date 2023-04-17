import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceContractUniversityComponent } from './service-contract-university.component';

describe('ServiceContractUniversityComponent', () => {
  let component: ServiceContractUniversityComponent;
  let fixture: ComponentFixture<ServiceContractUniversityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceContractUniversityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceContractUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
