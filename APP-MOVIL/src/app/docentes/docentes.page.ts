import { Component, OnInit } from '@angular/core';


import { EmpleadoA, Estudiante, Estudiantes } from '../modelos/LoginResponse';
import { ModalController, ToastController } from '@ionic/angular';
import { ServiciosApi } from '../Servicios/servicios-api';
import { LoadingService } from '../shared/loading-service';
import { NuevoDocenteComponent } from '../components/nuevo-docente/nuevo-docente.component';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.page.html',
  styleUrls: ['./docentes.page.scss'],
    standalone:false
})
export class DocentesPage implements OnInit {

 
    estudiantes: EmpleadoA[] = [];
    estudiantesFiltrados: EmpleadoA[] = [];
    busqueda: string = '';
  
    paginaActual = 1;
    itemsPorPagina = 10;
    totalPaginas = 1;
    paginasArray: number[] = [];
  
    constructor(
      private modalController: ModalController,
      private toastController: ToastController,
      private servicio: ServiciosApi,
      private loadingService: LoadingService
    ) {}
  
    ngOnInit() {
      this.cargarEstudiantes();
    }
  
    cargarEstudiantes() {
      this.loadingService.show();
      this.servicio.obtenerprofesor().subscribe({
        next: (data) => {
          this.estudiantes = data;
          this.estudiantesFiltrados = [...data];
          this.configurarPaginado();
          this.loadingService.hide();
        },
        error: async () => {
          this.loadingService.hide();
        },
      });
    }
  
    buscar() {
      if (this.busqueda.trim() === '') {
        this.estudiantesFiltrados = [...this.estudiantes];
      } else {
        const t = this.busqueda.toLowerCase();
        this.estudiantesFiltrados = this.estudiantes.filter((est) =>
          (`${est.nombre} ${est.apellidoPaterno} ${est.apellidoMaterno}`).toLowerCase().includes(t)
        );
      }
  
      this.paginaActual = 1;
      this.configurarPaginado();
    }
  
    limpiar() {
      this.busqueda = '';
      this.estudiantesFiltrados = [...this.estudiantes];
      this.paginaActual = 1;
      this.configurarPaginado();
    }
  
    configurarPaginado() {
      this.totalPaginas = Math.ceil(this.estudiantesFiltrados.length / this.itemsPorPagina);
      this.paginasArray = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
    }
  
    paginaActualDatos() {
      const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
      const fin = inicio + this.itemsPorPagina;
      return this.estudiantesFiltrados.slice(inicio, fin);
    }
  
    irPagina(pagina: number) {
      this.paginaActual = pagina;
    }
  
    paginaAnterior() {
      if (this.paginaActual > 1) this.paginaActual--;
    }
  
    paginaSiguiente() {
      if (this.paginaActual < this.totalPaginas) this.paginaActual++;
    }
  
    irPrimera() {
      this.paginaActual = 1;
    }
  
    irUltima() {
      this.paginaActual = this.totalPaginas;
    }
  
    async agregarNuevo() {
      const modal = await this.modalController.create({
        component: NuevoDocenteComponent,
        cssClass: 'modal-registrar-estudiante',
        backdropDismiss: false,
      });
  
      await modal.present();
      const { data } = await modal.onWillDismiss();
  
      if (data && data.empleado) {
        this.cargarEstudiantes();

        this.buscar();
      }
    }
  
    async editarEstudiante(empleado: EmpleadoA) {

      const modal = await this.modalController.create({
        component: NuevoDocenteComponent,
        componentProps: { empleado: { ...empleado } },
        cssClass: 'modal-registrar-estudiante',
        backdropDismiss: false,
      });
  
      await modal.present();
      const { data } = await modal.onWillDismiss();
  
      if (data && data.empleado) {
        this.cargarEstudiantes();
      }
    }
  


}
