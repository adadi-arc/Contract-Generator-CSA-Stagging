import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatironCsaComponent } from './flatiron-csa.component';

describe('FlatironCsaComponent', () => {
  let component: FlatironCsaComponent;
  let fixture: ComponentFixture<FlatironCsaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlatironCsaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatironCsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
