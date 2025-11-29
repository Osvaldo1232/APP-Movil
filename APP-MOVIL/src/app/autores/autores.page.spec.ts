import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoresPage } from './autores.page';

describe('AutoresPage', () => {
  let component: AutoresPage;
  let fixture: ComponentFixture<AutoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
