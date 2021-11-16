import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecontractformComponent } from './servicecontractform.component';

describe('ServicecontractformComponent', () => {
  let component: ServicecontractformComponent;
  let fixture: ComponentFixture<ServicecontractformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicecontractformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicecontractformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
