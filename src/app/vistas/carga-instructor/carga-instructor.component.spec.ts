import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaInstructorComponent } from './carga-instructor.component';

describe('CargaInstructorComponent', () => {
  let component: CargaInstructorComponent;
  let fixture: ComponentFixture<CargaInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
