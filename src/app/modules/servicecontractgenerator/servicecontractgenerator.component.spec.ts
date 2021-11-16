import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecontractgeneratorComponent } from './servicecontractgenerator.component';

describe('ServicecontractgeneratorComponent', () => {
  let component: ServicecontractgeneratorComponent;
  let fixture: ComponentFixture<ServicecontractgeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicecontractgeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicecontractgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
