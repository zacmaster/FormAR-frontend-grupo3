import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioDisponibilidadComponent } from './calendario-disponibilidad.component';

describe('CalendarioDisponibilidadComponent', () => {
  let component: CalendarioDisponibilidadComponent;
  let fixture: ComponentFixture<CalendarioDisponibilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioDisponibilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioDisponibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
