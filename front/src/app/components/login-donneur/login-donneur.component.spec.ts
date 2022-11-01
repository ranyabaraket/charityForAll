import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDonneurComponent } from './login-donneur.component';

describe('LoginDonneurComponent', () => {
  let component: LoginDonneurComponent;
  let fixture: ComponentFixture<LoginDonneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginDonneurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDonneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
