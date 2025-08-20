import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Videosexplicativos } from './videosexplicativos';

describe('Videosexplicativos', () => {
  let component: Videosexplicativos;
  let fixture: ComponentFixture<Videosexplicativos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Videosexplicativos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Videosexplicativos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
