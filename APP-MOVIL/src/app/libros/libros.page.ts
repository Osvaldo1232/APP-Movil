import { Component, OnInit } from '@angular/core';
import { ModalRegistrarLibroComponent } from '../components/estudiantes-registrados/modal-registrar-libro/modal-registrar-libro.component';
import { Libro, Libros } from '../modelos/LoginResponse';
import { ModalController, ToastController } from '@ionic/angular';
import { LoadingService } from '../shared/loading-service';
import { ServiciosApi } from '../Servicios/servicios-api';
import { AlertService } from '../shared/alert-service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.page.html',
  styleUrls: ['./libros.page.scss'],
  standalone:false

})
export class LibrosPage implements OnInit {

  
  searchTerm: string = '';
  libros: Libros[] = [];
  filteredLibros: Libros[] = [];

  /** PAGINADO */
  librosPaginados: Libros[] = [];
  paginaActual = 1;
  tamanoPagina = 10;  
  totalPaginas = 0;
  paginasArray: number[] = [];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private librosService: ServiciosApi,
    private loadingService: LoadingService,
       private alertService:AlertService

  ) {}

  ngOnInit() {
    this.cargarLibros();
  }

  cargarLibros() {
    this.loadingService.show();
    this.librosService.obtenerLibros().subscribe({
      next: (resp) => {
        this.libros = resp;
        this.filteredLibros = [...this.libros];
        this.resetPaginado();
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  buscar() {
    const texto = this.searchTerm.trim().toLowerCase();

    if (texto === '') {
      this.filteredLibros = [...this.libros];
    } else {
      this.filteredLibros = this.libros.filter(libro =>
        libro.titulo.toLowerCase().includes(texto) ||
        libro.autores.join(', ').toLowerCase().includes(texto)
      );
    }

    this.resetPaginado();
  }

  limpiar() {
    this.searchTerm = '';
    this.filteredLibros = [...this.libros];
    this.resetPaginado();
  }

  resetPaginado() {
    this.totalPaginas = Math.ceil(this.filteredLibros.length / this.tamanoPagina);
    this.paginasArray = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);

    this.paginaActual = 1;
    this.actualizarPaginado();
  }

  actualizarPaginado() {
    const inicio = (this.paginaActual - 1) * this.tamanoPagina;
    const fin = inicio + this.tamanoPagina;

    this.librosPaginados = this.filteredLibros.slice(inicio, fin);
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPaginado();
    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPaginado();
    }
  }

  irPagina(pagina: number) {
    this.paginaActual = pagina;
    this.actualizarPaginado();
  }

  irPrimera() {
    this.paginaActual = 1;
    this.actualizarPaginado();
  }

  irUltima() {
    this.paginaActual = this.totalPaginas;
    this.actualizarPaginado();
  }

async editarLibro(libro: Libro) {
console.log(libro, "Osv")
  const modal = await this.modalController.create({
    component: ModalRegistrarLibroComponent,
    componentProps: { libroEditar: libro },
    cssClass: 'modal-registrar-libro',
    backdropDismiss: false
  });

  await modal.present();
  const { data } = await modal.onWillDismiss();

  if (data && data.libroActualizado) {

    // Actualizar localmente
    const index = this.libros.findIndex(l => l.id === data.libroActualizado.id);
    if (index !== -1) {
      this.libros[index] = data.libroActualizado;
    }

    // 🔄 Recargar todo para que paginado, filtro y tabla queden bien
    this.cargarLibros();
  }
}

  async nuevoLibro() {
    const modal = await this.modalController.create({
      component: ModalRegistrarLibroComponent,
      cssClass: 'modal-registrar-libro',
      backdropDismiss: false
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.libro) {
      this.cargarLibros();
      this.buscar();
    }
  }

  verSinopsis(texto: string | null) {
  if (!texto) texto = "Sin sinopsis disponible.";

  this.alertService.show(texto, "success", "Sinopsis");
}

}
