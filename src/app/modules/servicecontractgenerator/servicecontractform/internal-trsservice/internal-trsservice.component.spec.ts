import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTRSServiceComponent } from './internal-trsservice.component';

describe('InternalTRSServiceComponent', () => {
  let component: InternalTRSServiceComponent;
  let fixture: ComponentFixture<InternalTRSServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalTRSServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTRSServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
