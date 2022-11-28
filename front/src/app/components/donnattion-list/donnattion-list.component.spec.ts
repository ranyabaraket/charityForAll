import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonnattionListComponent } from './donnattion-list.component';

describe('DonnattionListComponent', () => {
  let component: DonnattionListComponent;
  let fixture: ComponentFixture<DonnattionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonnattionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonnattionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
