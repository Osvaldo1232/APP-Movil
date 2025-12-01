import { Component, OnInit } from '@angular/core';
import { RegistrarPrestamoComponent } from '../components/registrar-prestamo/registrar-prestamo.component';
import { RegresarPrestamosComponent } from '../components/regresar-prestamos/regresar-prestamos.component';
import { Prestamo } from '../modelos/LoginResponse';
import { ModalController, ToastController } from '@ionic/angular';
import { ServiciosApi } from '../Servicios/servicios-api';
import { LoadingService } from '../shared/loading-service';
import { AlertService } from '../shared/alert-service';
import { AlertaConfirmacionService } from '../shared/alerta-confirmacion-service';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.page.html',
  styleUrls: ['./prestamos.page.scss'],
  standalone:false
})
export class PrestamosPage implements OnInit {

   searchTerm: string = "";
  prestamos: Prestamo[] = [];
  prestamosFiltrados: Prestamo[] = [];
  prestamosPaginados: Prestamo[] = [];

  paginaActual = 1;
  elementosPorPagina = 10;
  totalPaginas = 0;
  paginasArray: number[] = [];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private servicio: ServiciosApi,
    private loadingService: LoadingService,

    private alertService: AlertService,
    private alerta: AlertaConfirmacionService
  ) {}

  ngOnInit() {
    this.cargarPrestamos();
  }

  cargarPrestamos() {
    this.loadingService.show();
    this.servicio.obtenerPrestamos().subscribe({
      next: (resp) => {
        this.prestamos = resp;
        this.prestamosFiltrados = [...this.prestamos];

        this.actualizarPaginacion();

        this.loadingService.hide();
      },
      error: (err) => console.error("Error al cargar préstamos:", err)
    });
  }

 
  buscar() {
    const texto = this.searchTerm.trim().toLowerCase();

    if (texto === "") {
      this.prestamosFiltrados = [...this.prestamos];
    } else {
      this.prestamosFiltrados = this.prestamos.filter(p =>
        (p.nombreUsuario + ' ' + p.apellidoPaterno + ' ' + p.apellidoMaterno).toLowerCase().includes(texto) ||
        p.libroTitulo.toLowerCase().includes(texto)
      );
    }

    this.paginaActual = 1;
    this.actualizarPaginacion();
  }

  limpiar() {
    this.searchTerm = "";
    this.prestamosFiltrados = [...this.prestamos];
    this.paginaActual = 1;
    this.actualizarPaginacion();
  }

 
  actualizarPaginacion() {
    this.totalPaginas = Math.ceil(this.prestamosFiltrados.length / this.elementosPorPagina);

    this.paginasArray = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);

    this.actualizarPrestamosPaginados();
  }

  actualizarPrestamosPaginados() {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;

    this.prestamosPaginados = this.prestamosFiltrados.slice(inicio, fin);
  }

  irPagina(pagina: number) {
    this.paginaActual = pagina;
    this.actualizarPrestamosPaginados();
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPrestamosPaginados();
    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPrestamosPaginados();
    }
  }

  irPrimera() {
    this.paginaActual = 1;
    this.actualizarPrestamosPaginados();
  }

  irUltima() {
    this.paginaActual = this.totalPaginas;
    this.actualizarPrestamosPaginados();
  }

 
  async editarPrestamo(prestamo: Prestamo) {
    const modal = await this.modalController.create({
      component: RegresarPrestamosComponent,
      componentProps: { prestamoEditar: prestamo },
      backdropDismiss: false
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    this.cargarPrestamos();
  }


  async nuevoPrestamo() {
    const modal = await this.modalController.create({
      component: RegistrarPrestamoComponent,
      cssClass: 'modal-registrar-prestamo',
      backdropDismiss: false
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    this.cargarPrestamos();
  }

    async cambiarEstatus(alumno: any, event: Event) {
    event.preventDefault();
    
    const confirmado = await this.alerta.mostrar(
      `¿Estás seguro de prestar el libro solicitado?`
    );
    if (!confirmado) {
      return; 
    }
    this.loadingService.show();

    this.servicio.Confirmar(alumno.id).subscribe({
      next: (res) => {
       

        this.alertService.show(
          `El libro se ha confirmado correctamente`,
          'success',
          'Éxito'
        );
    this.cargarPrestamos();

        this.loadingService.hide();
      },
      error: (err) => {
        this.alertService.show(
          'Error al prestar el libro',
          'danger',
          'Error'
        );
    this.cargarPrestamos();

        this.loadingService.hide();
      }
    });
  }


   async cancelar(alumno: any, event: Event) {
    event.preventDefault();
    
    const confirmado = await this.alerta.mostrar(
      `¿Estás seguro de cancelar el libro solicitado?`
    );
    if (!confirmado) {
      return; 
    }
    this.loadingService.show();

    this.servicio.cancelar(alumno.id).subscribe({
      next: (res) => {
       

        this.alertService.show(
          `El libro se ha cancelado correctamente`,
          'success',
          'Éxito'
        );
    this.cargarPrestamos();

        this.loadingService.hide();
      },
      error: (err) => {
        this.alertService.show(
          'Error al cancelar el libro',
          'danger',
          'Error'
        );
    this.cargarPrestamos();

        this.loadingService.hide();
      }
    });
  }
}
