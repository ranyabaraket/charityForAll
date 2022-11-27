import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublierTestComponent } from './publier-test.component';

describe('PublierTestComponent', () => {
  let component: PublierTestComponent;
  let fixture: ComponentFixture<PublierTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublierTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublierTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
