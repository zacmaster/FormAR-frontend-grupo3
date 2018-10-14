import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructoresComponent } from './instructores.component';

describe('InstructoresComponent', () => {
  let component: InstructoresComponent;
  let fixture: ComponentFixture<InstructoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
