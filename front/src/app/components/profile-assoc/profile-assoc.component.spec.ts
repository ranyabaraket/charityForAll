import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAssocComponent } from './profile-assoc.component';

describe('ProfileAssocComponent', () => {
  let component: ProfileAssocComponent;
  let fixture: ComponentFixture<ProfileAssocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAssocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAssocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
