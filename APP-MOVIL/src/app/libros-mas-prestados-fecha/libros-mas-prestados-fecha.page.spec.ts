import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibrosMasPrestadosFechaPage } from './libros-mas-prestados-fecha.page';

describe('LibrosMasPrestadosFechaPage', () => {
  let component: LibrosMasPrestadosFechaPage;
  let fixture: ComponentFixture<LibrosMasPrestadosFechaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrosMasPrestadosFechaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
