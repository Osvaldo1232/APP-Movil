import { Component, OnInit } from '@angular/core';
import { Categoria } from '../modelos/LoginResponse';
import { ModalController, ToastController } from '@ionic/angular';
import { LoadingService } from '../shared/loading-service';
import { ServiciosApi } from '../Servicios/servicios-api';
import { ModalesRegistrarCategoriaComponent } from '../components/modales-registrar-categoria/modales-registrar-categoria.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone:false

})
export class CategoriasPage implements OnInit {

  searchTerm: string = '';
  categorias: Categoria[] = [];
  filteredCategorias: Categoria[] = [];
pageSize: number = 10;
currentPage: number = 1;
totalPages: number = 1;

  constructor(
    private router: Router,
    private modalController: ModalController,
    private toastController: ToastController,
    private categoriasService: ServiciosApi,
    private loadingService: LoadingService,
  ) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.loadingService.show();
    this.categoriasService.obtenerCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.filteredCategorias = [...data];
        this.actualizarPaginacion();
        this.loadingService.hide();
      },
      error: async () => {
               this.loadingService.hide();

      },
    });
  }

  buscar() {
  if (this.searchTerm.trim() === '') {
    this.filteredCategorias = [...this.categorias];
  } else {
    const term = this.searchTerm.toLowerCase();
    this.filteredCategorias = this.categorias.filter(c =>
      c.nombre.toLowerCase().includes(term)
    );
  }

  this.currentPage = 1;
  this.actualizarPaginacion();
}

limpiar() {
  this.searchTerm = '';
  this.filteredCategorias = [...this.categorias];
  this.currentPage = 1;
  this.actualizarPaginacion();
}


  async nuevaCategoria() {
    const modal = await this.modalController.create({
      component: ModalesRegistrarCategoriaComponent,
      cssClass: 'modal-registrar-categoria',
      backdropDismiss: false
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.categoria) {
      this.categorias.push(data.categoria);
      this.buscar();
    }
  }

 async editarCategoria(categoria: Categoria) {
  const modal = await this.modalController.create({
    component: ModalesRegistrarCategoriaComponent,
    componentProps: { categoria: { ...categoria } }, 
    cssClass: 'modal-registrar-categoria',
    backdropDismiss: false,
  });

  await modal.present();
  const { data } = await modal.onWillDismiss();

  if (data && data.categoria) {
    this.cargarCategorias();
  }
}

  actualizarPaginacion() {
  this.totalPages = Math.ceil(this.filteredCategorias.length / this.pageSize);
  if (this.currentPage > this.totalPages) {
    this.currentPage = this.totalPages || 1;
  }
}
get categoriasPaginadas() {
  const start = (this.currentPage - 1) * this.pageSize;
  const end = start + this.pageSize;
  return this.filteredCategorias.slice(start, end);
}

verLibros(categoria: Categoria) {
  this.router.navigate(['/admnistrador/libros-visual', categoria.id], {
    queryParams: { nombre: categoria.nombre }
  });
}

}
