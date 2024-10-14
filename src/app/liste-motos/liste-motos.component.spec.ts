import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMotosComponent } from './liste-motos.component';

describe('ListeMotosComponent', () => {
  let component: ListeMotosComponent;
  let fixture: ComponentFixture<ListeMotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeMotosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeMotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
