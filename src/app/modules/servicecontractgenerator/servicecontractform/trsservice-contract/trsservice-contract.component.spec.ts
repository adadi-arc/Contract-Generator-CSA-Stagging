import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TRSServiceContractComponent } from './trsservice-contract.component';

describe('TRSServiceContractComponent', () => {
  let component: TRSServiceContractComponent;
  let fixture: ComponentFixture<TRSServiceContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TRSServiceContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TRSServiceContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
