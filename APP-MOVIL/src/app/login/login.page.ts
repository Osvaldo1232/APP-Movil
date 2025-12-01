import { Component, HostListener, OnInit } from '@angular/core';
import { UsuarioDa } from '../modelos/LoginResponse';
import { Router, RouterModule } from '@angular/router';
import { ServiciosApi } from '../Servicios/servicios-api';
import { AlertService } from '../shared/alert-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false

})
export class LoginPage {
 usuario: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(private router: Router, private authService: ServiciosApi, private alert:AlertService ) {}

 login() {
  this.authService.login(this.usuario, this.password).subscribe({
    next: (res) => {
      const rol = res.rol; 
      switch (rol) {
        case 'ADMINISTRADOR':
          this.router.navigate(['/admnistrador']);
          break;
        case 'EMPLEADO':
          this.router.navigate(['/dashboardempleado']);
          break;
        case 'ALUMNO':
          this.router.navigate(['/estudiante']);
          break;
        default:
          this.router.navigate(['/login']);
          break;
      }
    },
    error: (err) => {
      console.error(err);
      this.alert.show(
        'Usuario o contraseña incorrectos. Verifica tus datos.',
        'danger',
        'Error de autenticación'
      );
    }
  });
}



}
