import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoInscripcionComponent } from './dialogo-inscripcion.component';

describe('DialogoInscripcionComponent', () => {
  let component: DialogoInscripcionComponent;
  let fixture: ComponentFixture<DialogoInscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoInscripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
