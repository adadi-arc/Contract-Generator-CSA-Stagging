import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatironContractComponent } from './flatiron-contract.component';

describe('FlatironContractComponent', () => {
  let component: FlatironContractComponent;
  let fixture: ComponentFixture<FlatironContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlatironContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatironContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
