import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonneursComponent } from './donneurs.component';

describe('DonneursComponent', () => {
  let component: DonneursComponent;
  let fixture: ComponentFixture<DonneursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonneursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonneursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
