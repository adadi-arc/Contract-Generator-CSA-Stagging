import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrsCsaComponent } from './trs-csa.component';

describe('TrsCsaComponent', () => {
  let component: TrsCsaComponent;
  let fixture: ComponentFixture<TrsCsaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrsCsaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrsCsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
