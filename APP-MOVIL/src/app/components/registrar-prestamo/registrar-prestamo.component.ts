import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AlertService } from 'src/app/shared/alert-service';
import { Combo } from 'src/app/modelos/LoginResponse';
import { ServiciosApi } from 'src/app/Servicios/servicios-api';

@Component({
  selector: 'app-registrar-prestamo',
  templateUrl: './registrar-prestamo.component.html',
  styleUrls: ['./registrar-prestamo.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class RegistrarPrestamoComponent implements OnInit {

  alumnos: Combo[] = [];
  alumnosFiltrados: any[] = [];

  libros: Combo[] = [];
  librosFiltrados: any[] = [];

  buscarAlumno = '';
  buscarLibro = '';

  prestamo = {
    usuarioId: '',
    libroId: '',
    cantidad: 0,
    fechaDevolucion: ''
  };

  alertOptionsAlumnos = {
    header: 'Seleccionar Alumno',
    inputs: [{ type: 'text', placeholder: 'Buscar...' }]
  };

  alertOptionsLibros = {
    header: 'Seleccionar Libro',
    inputs: [{ type: 'text', placeholder: 'Buscar...' }]
  };

  constructor(
    private servicio: ServiciosApi,
    private modalCtrl: ModalController,
     private alerta: AlertService
  ) {}

  ngOnInit() {
    this.cargarAlumnos();
    this.cargarLibros();
  }

  cargarAlumnos() {
    this.servicio.obtenerUsuarios().subscribe({
      next: (resp) => {

        this.alumnos = resp;
      }
    });
  }

  cargarLibros() {
    this.servicio.obtenerLibrosA().subscribe({
      next: (resp) => {
        this.libros = resp;
      }
    });
  }


  cerrarModal() {
    this.modalCtrl.dismiss();
  }
 aceptar() {
  if (
    !this.prestamo.usuarioId ||
    !this.prestamo.libroId ||
    !this.prestamo.cantidad ||
    !this.prestamo.fechaDevolucion
  ) {
    this.alerta.show(
      'Todos los campos son obligatorios',
      'danger',
      'Error'
    );
    return;
  }

  this.servicio.registrarPrestamo(this.prestamo).subscribe({
    next: (resp) => {
      this.alerta.show(
        'El préstamo se registró correctamente',
        'success',
        'Éxito'
      );

      this.modalCtrl.dismiss({ prestamo: resp });
    },
    error: (err) => {

      const mensajeBackend =
        err?.error?.error ||       
        err?.message ||            
        'Ocurrió un error al registrar el préstamo';

      this.alerta.show(
        mensajeBackend,
        'danger',
        'Error'
      );
    }
  });
}

}
