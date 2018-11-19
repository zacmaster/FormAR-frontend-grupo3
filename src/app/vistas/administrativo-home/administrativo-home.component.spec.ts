import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativoHomeComponent } from './administrativo-home.component';

describe('HomeComponent', () => {
  let component: AdministrativoHomeComponent;
  let fixture: ComponentFixture<AdministrativoHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrativoHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
