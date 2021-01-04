import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetpointComponent } from './setpoint.component';

describe('SetpointComponent', () => {
  let component: SetpointComponent;
  let fixture: ComponentFixture<SetpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetpointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
