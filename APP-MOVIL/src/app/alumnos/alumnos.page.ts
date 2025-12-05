import { Component, OnInit } from '@angular/core';
import { Estudiante, Estudiantes } from '../modelos/LoginResponse';
import { ModalRegistrarEstudianteComponent } from '../components/estudiantes-registrados/modal-registrar-estudiante/modal-registrar-estudiante.component';
import { ModalController, ToastController } from '@ionic/angular';
import { LoadingService } from '../shared/loading-service';
import { ServiciosApi } from '../Servicios/servicios-api';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
  standalone:false
  
})
export class AlumnosPage implements OnInit {

 
  estudiantes: Estudiantes[] = [];
  estudiantesFiltrados: Estudiantes[] = [];
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
    this.servicio.obtenerEstudiantes().subscribe({
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
        (`${est.nombre} ${est.apellidoPaterno} ${est.apellidoMaterno}`).toLowerCase().includes(t) ||
        est.matricula.toLowerCase().includes(t) 
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
      component: ModalRegistrarEstudianteComponent,
      cssClass: 'modal-registrar-estudiante',
      backdropDismiss: false,
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.estudiante) {
      this.cargarEstudiantes();
     
      this.buscar();
    }
  }

  async editarEstudiante(estudiante: Estudiantes) {
    const modal = await this.modalController.create({
      component: ModalRegistrarEstudianteComponent,
      componentProps: { estudiante: { ...estudiante } },
      cssClass: 'modal-registrar-estudiante',
      backdropDismiss: false,
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
      this.cargarEstudiantes();


    if (data && data.estudiante) {
      this.cargarEstudiantes();
    }
  }

}
