import { Component, OnInit } from '@angular/core';
import { Autor } from '../modelos/LoginResponse';
import { ModalController } from '@ionic/angular';
import { ServiciosApi } from '../Servicios/servicios-api';
import { LoadingService } from '../shared/loading-service';
import { ModalesRegistrarAutoresComponent } from '../components/modales-registrar-autores/modales-registrar-autores.component';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.page.html',
  styleUrls: ['./autores.page.scss'],
  standalone:false

})
export class AutoresPage implements OnInit {

  searchTerm: string = '';
  autores: Autor[] = [];
  filteredAutores: Autor[] = [];

  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private modalController: ModalController,
    private autoresService: ServiciosApi,
    private loadingService: LoadingService,
  ) {}

  ngOnInit() {
    this.cargarAutores();
  }

  cargarAutores() {
    this.loadingService.show();
    this.autoresService.obtenerAutores().subscribe({
      next: (data) => {
        this.autores = data;
        this.filteredAutores = [...data];
        this.actualizarPaginacion();
        this.loadingService.hide();
      },
      error: async () => {
        this.loadingService.hide();
      },
    });
  }

  get autoresPaginados() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredAutores.slice(start, end);
  }

  actualizarPaginacion() {
    this.totalPages = Math.ceil(this.filteredAutores.length / this.pageSize);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }

  buscar() {
    if (this.searchTerm.trim() === '') {
      this.filteredAutores = [...this.autores];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredAutores = this.autores.filter(a =>
        a.nombre.toLowerCase().includes(term) ||
        a.apellidoPaterno.toLowerCase().includes(term) ||
        a.apellidoMaterno.toLowerCase().includes(term) ||
        a.nacionalidad.toLowerCase().includes(term)
      );
    }
    this.currentPage = 1;
    this.actualizarPaginacion();
  }

  limpiar() {
    this.searchTerm = '';
    this.filteredAutores = [...this.autores];
    this.currentPage = 1;
    this.actualizarPaginacion();
  }

  async nuevoAutor() {
    const modal = await this.modalController.create({
      component: ModalesRegistrarAutoresComponent,
      cssClass: 'modal-registrar-autor',
      backdropDismiss: false,
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.autor) {
      this.autores.push(data.autor);
      this.buscar();
    }
  }

  async editarAutor(autor: Autor) {
    const modal = await this.modalController.create({
      component: ModalesRegistrarAutoresComponent,
      componentProps: { autor: { ...autor } },
      cssClass: 'modal-registrar-autor',
      backdropDismiss: false,
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.autor) {
      const index = this.autores.findIndex(a => a.id === data.autor.id);
      if (index !== -1) this.autores[index] = data.autor;

      this.buscar();
    }
  }

}
