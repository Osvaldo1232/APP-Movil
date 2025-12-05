import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibrosVisualPage } from './libros-visual.page';

describe('LibrosVisualPage', () => {
  let component: LibrosVisualPage;
  let fixture: ComponentFixture<LibrosVisualPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrosVisualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
