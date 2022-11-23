import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualiteDetailComponent } from './actualite-detail.component';

describe('ActualiteDetailComponent', () => {
  let component: ActualiteDetailComponent;
  let fixture: ComponentFixture<ActualiteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualiteDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualiteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
