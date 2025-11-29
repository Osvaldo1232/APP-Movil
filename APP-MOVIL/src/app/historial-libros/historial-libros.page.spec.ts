import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialLibrosPage } from './historial-libros.page';

describe('HistorialLibrosPage', () => {
  let component: HistorialLibrosPage;
  let fixture: ComponentFixture<HistorialLibrosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialLibrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
