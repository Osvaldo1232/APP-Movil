import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IonicModule,  ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AlertService } from 'src/app/shared/alert-service';
import { ServiciosApi } from 'src/app/Servicios/servicios-api';
@Component({
  selector: 'app-regresar-prestamos',
  templateUrl: './regresar-prestamos.component.html',
  styleUrls: ['./regresar-prestamos.component.scss'],
    imports: [CommonModule, FormsModule, IonicModule],
  
})
export class RegresarPrestamosComponent {
  @Input() prestamoEditar: any;
  cantidadOriginal: number = 0;
  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private categoriasService: ServiciosApi,
    private alerta :AlertService
  ) {}

  ngOnInit() {
    this.cantidadOriginal = this.prestamoEditar.cantidad;

  }

  validarCantidad() {
    if (this.prestamoEditar.cantidad > this.cantidadOriginal) {
      this.prestamoEditar.cantidad = this.cantidadOriginal;
    }

    if (this.prestamoEditar.cantidad < 0) {
      this.prestamoEditar.cantidad = 0;
    }
  }

  cerrarModal() {
    this.modalController.dismiss();
  }


  async aceptar() {
  const idPrestamo = this.prestamoEditar.id;
  const cantidadDevuelta = this.prestamoEditar.cantidad;

  try {
    const resp = await this.categoriasService
      .devolverPrestamo(idPrestamo, cantidadDevuelta)
      .toPromise();

    this.alerta.show(
      'El préstamo se devolvió correctamente.',
      'success',
      'Éxito'
    );

    this.modalController.dismiss({
      ok: true,
      prestamoActualizado: resp
    });

  } catch (err: any) {
    console.error(err);

    let mensaje = 'Ocurrió un error inesperado';

    if (err?.error?.error) {
      mensaje = err.error.error; 
    }

    this.alerta.show(
      mensaje,
      'danger',
      'Error'
    );

  }
}



}
