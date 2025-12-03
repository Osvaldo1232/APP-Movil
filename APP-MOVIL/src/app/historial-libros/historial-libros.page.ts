import { Component, OnInit } from '@angular/core';
import { Estudiantes, PrestamoUsuario } from '../modelos/LoginResponse';
import { ServiciosApi } from '../Servicios/servicios-api';
import { ModalController, ToastController } from '@ionic/angular';
import { LoadingService } from '../shared/loading-service';
import { AlertaConfirmacionService } from '../shared/alerta-confirmacion-service';
import { AlertService } from '../shared/alert-service';
import { VerSancionComponent } from '../components/ver-sancion/ver-sancion.component';

@Component({
  selector: 'app-historial-libros',
  templateUrl: './historial-libros.page.html',
  styleUrls: ['./historial-libros.page.scss'],
  standalone:false

})
export class HistorialLibrosPage implements OnInit {

 
   estudiantes: PrestamoUsuario[] = [];
   estudiantesFiltrados: PrestamoUsuario[] = [];
   busqueda: string = '';
 logueado:any;
   paginaActual = 1;
   itemsPorPagina = 10;
   totalPaginas = 1;
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
     this.logueado=this.servicio.logueado();

     this.cargarEstudiantes();

   }
 
   cargarEstudiantes() {
     this.loadingService.show();

     this.servicio.PrestamosUsuarios(this.logueado).subscribe({
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
         (`${est.titulo}`).toLowerCase().includes(t) 
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
     this.cargarEstudiantes();

        this.loadingService.hide();
      },
      error: (err) => {
        this.alertService.show(
          'Error al cancelar el libro',
          'danger',
          'Error'
        );
     this.cargarEstudiantes();


        this.loadingService.hide();
      }
    });
  }

  async verSancion(sancion: any) {
     const modal = await this.modalController.create({
       component: VerSancionComponent,
       componentProps: { sancion: { ...sancion } }, 
       cssClass: 'modal-registrar-categoria',
       backdropDismiss: false,
     });
   
     await modal.present();
     const { data } = await modal.onWillDismiss();
   
     if (data && data.sancion) {
     }
   }
  

}
