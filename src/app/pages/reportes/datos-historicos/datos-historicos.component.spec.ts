import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosHistoricosComponent } from './datos-historicos.component';

describe('DatosHistoricosComponent', () => {
  let component: DatosHistoricosComponent;
  let fixture: ComponentFixture<DatosHistoricosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosHistoricosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosHistoricosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
