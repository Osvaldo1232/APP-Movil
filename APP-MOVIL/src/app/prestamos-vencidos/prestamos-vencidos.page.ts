import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../shared/loading-service';
import { ServiciosApi } from '../Servicios/servicios-api';
import { ModalController, ToastController } from '@ionic/angular';
import { RegresarVencidoComponent } from '../components/regresar-vencido/regresar-vencido.component';

@Component({
  selector: 'app-prestamos-vencidos',
  templateUrl: './prestamos-vencidos.page.html',
  styleUrls: ['./prestamos-vencidos.page.scss'],
  standalone:false

})
export class PrestamosVencidosPage implements OnInit {

   prestamos: any[] = [];
  prestamosFiltrados: any[] = [];
  prestamosPaginados: any[] = [];

  fechaPrestamo = '';
  alumnoSeleccionado = '';
  libroSeleccionado = '';
  carreraSeleccionada = '';

  alumnos: string[] = [];
  libros: string[] = [];
  carreras: string[] = [];

  paginaActual = 1;
  itemsPorPagina = 6;
  totalPaginas = 1;
  paginasArray: number[] = [];

  constructor(
    private prestamosService: ServiciosApi,
    private loadingService: LoadingService,
        private modalController: ModalController,
        private toastController: ToastController,
  ) {}

  ngOnInit() {
    this.cargarFiltros();
    this.buscarPrestamos();
  }

  cargarFiltros() {
    this.prestamosService.obtenerUsuarios().subscribe(estudiantes => {
      this.alumnos = estudiantes.map(e => `${e.titulo}`);
    });

    this.prestamosService.obtenerLibros().subscribe(libros => {
      this.libros = libros.map(l => l.titulo);
    });

    this.prestamosService.obtenerCarreras().subscribe(carreras => {
      this.carreras = carreras.map(c => c.nombre);
    });
  }

  buscarPrestamos() {
    this.loadingService.show();

    this.prestamosService.buscarPrestamos(
      this.fechaPrestamo,
      this.alumnoSeleccionado,
      this.libroSeleccionado,
      'VENCIDO'
    ).subscribe({
      next: (data) => {
        this.prestamos = data;
        this.prestamosFiltrados = data;
        this.configurarPaginacion();
        this.loadingService.hide();
      },
      error: (err) => {
        this.loadingService.hide();

      }
    });
  }




 async devolverPrestamo(carrera: any) {
  const modal = await this.modalController.create({
    component: RegresarVencidoComponent,
    componentProps: { 
      carrera: { ...carrera, activo: carrera.estatus === 'ACTIVO' } 
    },
    cssClass: 'modal-registrar-carrera',
    backdropDismiss: false
  });

  await modal.present();

  const { data } = await modal.onWillDismiss();

  if (data?.actualizado) {
    this.buscarPrestamos();

   
  }
}




  limpiarFiltros() {
    this.fechaPrestamo = '';
    this.alumnoSeleccionado = '';
    this.libroSeleccionado = '';
    this.carreraSeleccionada = '';
    this.buscarPrestamos();
  }

 

  configurarPaginacion() {
    this.totalPaginas = Math.ceil(this.prestamosFiltrados.length / this.itemsPorPagina);
    this.paginasArray = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
    this.paginaActual = 1;
    this.actualizarPagina();
  }

  actualizarPagina() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.prestamosPaginados = this.prestamosFiltrados.slice(inicio, fin);
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPagina();
    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPagina();
    }
  }

  irPagina(pagina: number) {
    this.paginaActual = pagina;
    this.actualizarPagina();
  }

  irPrimera() {
    this.paginaActual = 1;
    this.actualizarPagina();
  }

  irUltima() {
    this.paginaActual = this.totalPaginas;
    this.actualizarPagina();
  }
}
