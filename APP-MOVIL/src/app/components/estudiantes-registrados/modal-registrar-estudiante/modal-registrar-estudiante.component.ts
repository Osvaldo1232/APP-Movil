import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertService } from 'src/app/shared/alert-service';
import { Combo } from 'src/app/modelos/LoginResponse';
import { ServiciosApi } from 'src/app/Servicios/servicios-api';

@Component({
  selector: 'app-modal-registrar-estudiante',
  templateUrl: './modal-registrar-estudiante.component.html',
  styleUrls: ['./modal-registrar-estudiante.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class ModalRegistrarEstudianteComponent implements OnInit {

  @Input() estudiante: any = {
    id: null,
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    matricula: '',
    email: '',
    password: '',
    fechaNacimiento: '',
    sexo: 'MASCULINO',
    estatus: 'ACTIVO',
    carreraId: '',
    carreraNombre: ''
  };

  carreras: Combo[] = [];
activar=true;
  constructor(
    private modalController: ModalController,
    private estudiantesService: ServiciosApi,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.cargarCarreras();

    if(this.estudiante.id!=null){
      this.activar=false;
    }
  }

  cargarCarreras() {
    this.estudiantesService.obtenerCarrerasA().subscribe({
      next: (data) => {
        this.carreras = data;
      },
      error: () => {
        this.alertService.show('No se pudieron cargar las carreras', 'danger', 'Error');
      }
    });
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  aceptar() {

    const estudiantePayload = {
      id: this.estudiante.id,
      nombre: this.estudiante.nombre,
      apellidoPaterno: this.estudiante.apellidoPaterno,
      apellidoMaterno: this.estudiante.apellidoMaterno,
      matricula: this.estudiante.matricula,
      email: this.estudiante.email,
      password: this.estudiante.password,
      fechaNacimiento: this.estudiante.fechaNacimiento,
      sexo: this.estudiante.sexo,
      estatus: this.estudiante.estatus,
    };

    if (this.estudiante.id) {
      this.estudiantesService.actualizarEstudiante(this.estudiante.id, estudiantePayload)
        .subscribe({
          next: (resp) => {
            this.alertService.show('El estudiante se actualizó correctamente', 'success', 'Éxito');
            this.modalController.dismiss({ estudiante: resp });
          },
          error: (err) => {
              this.alertService.show('El estudiante se actualizó correctamente', 'success', 'Éxito');

             this.modalController.dismiss({ estudiante: true });
              this.cerrarModal();

          }
        });
    } else {
      this.estudiantesService.crearEstudiante(estudiantePayload)
        .subscribe({
          next: (resp) => {
            this.alertService.show('El estudiante se registró correctamente', 'success', 'Éxito');
            this.modalController.dismiss({ estudiante: resp });
          },
          error: (err) => {
            this.alertService.show(err.error.error, 'danger', 'Error');
          }
        });
    }
  }

 
}
