import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDonneurComponent } from './profile-donneur.component';

describe('ProfileDonneurComponent', () => {
  let component: ProfileDonneurComponent;
  let fixture: ComponentFixture<ProfileDonneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDonneurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDonneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
