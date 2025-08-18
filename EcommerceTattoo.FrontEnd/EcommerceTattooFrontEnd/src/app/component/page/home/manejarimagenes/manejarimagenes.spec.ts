import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Manejarimagenes } from './manejarimagenes';
import { Router,RouterLink,RouterOutlet } from '@angular/router';

describe('Manejarimagenes', () => {
  let component: Manejarimagenes;
  let fixture: ComponentFixture<Manejarimagenes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Manejarimagenes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Manejarimagenes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
