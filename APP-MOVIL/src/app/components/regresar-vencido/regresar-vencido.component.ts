import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { AlertService } from 'src/app/shared/alert-service';
import { ServiciosApi } from 'src/app/Servicios/servicios-api';
import { Carrera } from 'src/app/modelos/LoginResponse';
@Component({
  selector: 'app-regresar-vencido',
  templateUrl: './regresar-vencido.component.html',
  styleUrls: ['./regresar-vencido.component.scss'],
    standalone: true,
     imports: [CommonModule, FormsModule, IonicModule],
})
export class RegresarVencidoComponent  implements OnInit {



sancion:any;
  
  @Input() carrera: any = {
    id: null,
    nombre: '',
    activo: true 
  };

  constructor(
    private modalController: ModalController,
    private carrerasService: ServiciosApi,
        private alertService: AlertService
  ) {}


ngOnInit() {
}
  cerrarModal() {
    this.modalController.dismiss();
  }

 aceptar() {
  if (!this.sancion) {
    this.alertService.show('Debes ingresar un motivo', 'warning', 'Atención');
    return;
  }

  this.carrerasService.RegresarVencido(
    this.carrera.id,
    this.sancion
  ).subscribe({
    next: (resp) => {
      this.alertService.show('El libro se regresó correctamente', 'success', 'Éxito');

      this.modalController.dismiss({ actualizado: true });
    },
    error: (err) => {
      this.alertService.show('Error al regresar el libro', 'danger', 'Error');
    }
  });
}


}
