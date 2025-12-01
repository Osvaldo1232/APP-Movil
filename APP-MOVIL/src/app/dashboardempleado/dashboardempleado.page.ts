import { Component, HostListener, OnInit } from '@angular/core';
import { UsuarioInfo } from '../modelos/LoginResponse';
import { ServiciosApi } from '../Servicios/servicios-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboardempleado',
  templateUrl: './dashboardempleado.page.html',
  styleUrls: ['./dashboardempleado.page.scss'],
  standalone:false
})
export class DashboardempleadoPage implements OnInit {

   sidebarVisible: boolean = true;
    isMobile: boolean = false;
  logueado:any;
  usuarios!: UsuarioInfo;
    usuario:any;
    constructor(private router: Router, private loginService: ServiciosApi ) {}
  
    ngOnInit() {
      this.checkScreenSize();
      this.loginService.logueado();
  
      this.logueado=this.loginService.logueado();
       this.loginService.obtenerUsuarioLogueado(this.logueado).subscribe({
        next: (data) => {
          this.usuarios = data;
        }
      });
    }
  
    @HostListener('window:resize', [])
    onResize() {
      this.checkScreenSize();
    }
  
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 768;
      this.sidebarVisible = !this.isMobile; 
    }
  
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    }
  
    closeSidebarOnMobile() {
      if (this.isMobile) {
        this.sidebarVisible = false;
      }
    }
  
      logout(): void {
      this.loginService.logout();
      this.router.navigate(['/login']);
    }
  
}
