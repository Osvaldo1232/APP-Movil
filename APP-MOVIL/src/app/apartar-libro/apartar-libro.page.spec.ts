import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApartarLibroPage } from './apartar-libro.page';

describe('ApartarLibroPage', () => {
  let component: ApartarLibroPage;
  let fixture: ComponentFixture<ApartarLibroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartarLibroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
