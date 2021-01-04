import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMotorComponent } from './tipo-motor.component';

describe('TipoMotorComponent', () => {
  let component: TipoMotorComponent;
  let fixture: ComponentFixture<TipoMotorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoMotorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoMotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
