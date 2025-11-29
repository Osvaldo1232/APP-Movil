import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioDa } from '../modelos/LoginResponse';
import { ServiciosApi } from '../Servicios/servicios-api';

@Component({
  selector: 'app-admnistrador',
  templateUrl: './admnistrador.page.html',
  styleUrls: ['./admnistrador.page.scss'],
  standalone:false

})

export class AdmnistradorPage implements OnInit {

  sidebarVisible: boolean = true;
  isMobile: boolean = false;
logueado:any;
usuarios!: UsuarioDa;
  usuario:any;
  constructor(private router: Router, private loginService: ServiciosApi ) {}

  ngOnInit() {
    this.checkScreenSize();

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
