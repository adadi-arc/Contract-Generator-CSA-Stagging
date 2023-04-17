import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetwaymanagerTrsServiceComponent } from './getwaymanager-trs-service.component';

describe('GetwaymanagerTrsServiceComponent', () => {
  let component: GetwaymanagerTrsServiceComponent;
  let fixture: ComponentFixture<GetwaymanagerTrsServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetwaymanagerTrsServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetwaymanagerTrsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
