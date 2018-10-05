import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactosListComponent } from './contactos-list.component';

describe('ContactosListComponent', () => {
  let component: ContactosListComponent;
  let fixture: ComponentFixture<ContactosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
