import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrsUniversityParkComponent } from './trs-university-park.component';

describe('TrsUniversityParkComponent', () => {
  let component: TrsUniversityParkComponent;
  let fixture: ComponentFixture<TrsUniversityParkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrsUniversityParkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrsUniversityParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
