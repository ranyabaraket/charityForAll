import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualitesListComponent } from './actualites-list.component';

describe('ActualitesListComponent', () => {
  let component: ActualitesListComponent;
  let fixture: ComponentFixture<ActualitesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualitesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualitesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
