import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonneurProfileComponent } from './donneur-profile.component';

describe('DonneurProfileComponent', () => {
  let component: DonneurProfileComponent;
  let fixture: ComponentFixture<DonneurProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonneurProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonneurProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
