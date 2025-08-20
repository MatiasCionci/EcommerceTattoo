import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mentoriaplanes } from './mentoriaplanes';

describe('Mentoriaplanes', () => {
  let component: Mentoriaplanes;
  let fixture: ComponentFixture<Mentoriaplanes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mentoriaplanes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mentoriaplanes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
