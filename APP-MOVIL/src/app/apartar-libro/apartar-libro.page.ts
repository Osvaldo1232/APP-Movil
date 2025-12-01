import { Component, OnInit } from '@angular/core';
import { ServiciosApi } from '../Servicios/servicios-api';
import { LibroAc, PrestamoCre } from '../modelos/LoginResponse';
import { formatDate } from '@angular/common';
import { AlertService } from '../shared/alert-service';

@Component({
  selector: 'app-apartar-libro',
  templateUrl: './apartar-libro.page.html',
  styleUrls: ['./apartar-libro.page.scss'],
  standalone: false
})
export class ApartarLibroPage implements OnInit {

  libros: LibroAc[] = [];
  filtroTitulo: string = "";
logueado:any;
  constructor(private librosService: ServiciosApi,     private alertService: AlertService
  ) {}

  ngOnInit() {
    this.cargarLibros();
    this.logueado=this.librosService.logueado();
  }

  cargarLibros() {
    this.librosService.obtenerLibrosM().subscribe(data => {
      this.libros = data.map(libro => ({
        ...libro,
        cantidadSeleccionada: 1
      }));
    });
  }

  buscarLibros() {
    this.librosService.obtenerLibrosM(this.filtroTitulo).subscribe(data => {
      this.libros = data.map(libro => ({
        ...libro,
        cantidadSeleccionada: 1
      }));
    });
  }

  limpiarBusqueda() {
    this.filtroTitulo = "";
    this.cargarLibros();
  }

apartarlo(libro: LibroAc) {
  
  const fechaActual = new Date();
  fechaActual.setDate(fechaActual.getDate() + 10);
  const fechaDevolucion = formatDate(fechaActual, 'yyyy-MM-dd', 'en-US');

  const data: PrestamoCre = {
    usuarioId:   this.logueado,
    libroId: libro.id,
    cantidad: libro.cantidadSeleccionada,
    fechaDevolucion: fechaDevolucion
  };

  this.librosService.Apartar(data).subscribe({
    next: (resp) => {
           this.alertService.show('Libro apartado correctamente', 'success', 'Éxito');
           this.cargarLibros();
    },
    error: (err) => {
           this.alertService.show('Ocurrio un error al apartar el libro', 'danger', 'Error');
           this.cargarLibros();

    }
  });
}

}
