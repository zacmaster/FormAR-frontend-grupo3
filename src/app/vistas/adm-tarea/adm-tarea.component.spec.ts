import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmTareaComponent } from './adm-tarea.component';

describe('AdmTareaComponent', () => {
  let component: AdmTareaComponent;
  let fixture: ComponentFixture<AdmTareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmTareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
