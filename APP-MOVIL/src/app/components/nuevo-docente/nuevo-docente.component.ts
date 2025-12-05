import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Combo, EmpleadoA } from 'src/app/modelos/LoginResponse';
import { ServiciosApi } from 'src/app/Servicios/servicios-api';
import { AlertService } from 'src/app/shared/alert-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-nuevo-docente',
  templateUrl: './nuevo-docente.component.html',
  styleUrls: ['./nuevo-docente.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class NuevoDocenteComponent  implements OnInit {

  
  @Input() empleado: EmpleadoA = {
    id: undefined as any,
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    password: '',
    fechaNacimiento: '',
    sexo: 'MASCULINO',
    estatus: 'ACTIVO',
    telefono: '',
    clavePresupuestal: ''
  };

  activar = true;
  carreras: Combo[] = [];

  constructor(
    private modalController: ModalController,
    private empleadosService: ServiciosApi,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    if (this.empleado && this.empleado.id) {
      this.activar = false;
    } else {
      this.activar = true;
      this.empleado.estatus = this.empleado.estatus || 'ACTIVO';
      this.empleado.sexo = this.empleado.sexo || 'MASCULINO';
    }
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  guardarEmpleado() {
    const empleadoPayload: any = {
      nombre: this.empleado.nombre,
      apellidoPaterno: this.empleado.apellidoPaterno,
      apellidoMaterno: this.empleado.apellidoMaterno,
      email: this.empleado.email,
      password: this.empleado.password,
      fechaNacimiento: this.empleado.fechaNacimiento,
      sexo: this.empleado.sexo,
      estatus: this.empleado.estatus,
      telefono: this.empleado.telefono,
      clavePresupuestal: this.empleado.clavePresupuestal
    };

    if (this.empleado && this.empleado.id) {
      empleadoPayload.id = this.empleado.id;
    }

    if (this.empleado && this.empleado.id) {
      this.empleadosService.actualizarempleado(this.empleado.id, empleadoPayload)
        .subscribe({
         next: (resp) => {
            this.alertService.show('El docente se actualizó correctamente', 'success', 'Éxito');
            this.modalController.dismiss({ empleado: resp });
          },
          error: (err) => {
           this.alertService.show('El docente se actualizó correctamente', 'success', 'Éxito');
            this.modalController.dismiss({ empleado: true });
          }
        });
    } else {
      this.empleadosService.crearprofesor(empleadoPayload)
        .subscribe({
          next: (resp: any) => {

              if (resp.codigo === 1000) {
        this.alertService.show(resp.mensaje, 'danger', 'Error');
        return; 
      }
            if (typeof resp === 'string') {
              this.alertService.show(resp, 'success', 'Éxito');
              this.modalController.dismiss({ empleado: true });
            } else {
              const msg = resp.message || 'El docente se registró correctamente';
              this.alertService.show(msg, 'success', 'Éxito');
              const enviado = resp.empleado || resp || true;
              this.modalController.dismiss({ empleado: enviado });
            }
          },
          error: (err) => {
            const errMsg = err?.error ?? err?.message ?? 'Error al crear';
            this.alertService.show(typeof errMsg === 'string' ? errMsg : (errMsg.error || 'Error'), 'danger', 'Error');
          }
        });
    }
  }

}
