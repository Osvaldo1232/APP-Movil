import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardempleadoPage } from './dashboardempleado.page';

describe('DashboardempleadoPage', () => {
  let component: DashboardempleadoPage;
  let fixture: ComponentFixture<DashboardempleadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardempleadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
