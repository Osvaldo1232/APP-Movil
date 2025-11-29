import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmnistradorPage } from './admnistrador.page';

describe('AdmnistradorPage', () => {
  let component: AdmnistradorPage;
  let fixture: ComponentFixture<AdmnistradorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmnistradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
