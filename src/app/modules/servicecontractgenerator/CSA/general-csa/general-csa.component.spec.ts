import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralCsaComponent } from './general-csa.component';

describe('GeneralCsaComponent', () => {
  let component: GeneralCsaComponent;
  let fixture: ComponentFixture<GeneralCsaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralCsaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralCsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
