import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorHomeComponent } from './instructor-home.component';

describe('InstructorHomeComponent', () => {
  let component: InstructorHomeComponent;
  let fixture: ComponentFixture<InstructorHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
