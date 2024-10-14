import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheParTypeComponent } from './recherche-par-type.component';

describe('RechercheParTypeComponent', () => {
  let component: RechercheParTypeComponent;
  let fixture: ComponentFixture<RechercheParTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RechercheParTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RechercheParTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
