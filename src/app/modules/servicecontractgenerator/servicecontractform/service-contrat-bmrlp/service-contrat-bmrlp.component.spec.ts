import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceContratBmrlpComponent } from './service-contrat-bmrlp.component';

describe('ServiceContratBmrlpComponent', () => {
  let component: ServiceContratBmrlpComponent;
  let fixture: ComponentFixture<ServiceContratBmrlpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceContratBmrlpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceContratBmrlpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
