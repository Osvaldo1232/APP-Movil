import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ServiciosApi } from 'src/app/Servicios/servicios-api';

@Component({
  selector: 'app-ver-sancion',
  templateUrl: './ver-sancion.component.html',
  styleUrls: ['./ver-sancion.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class VerSancionComponent implements OnInit {
  @Input() sancion: any;  
  sancionInfo: any;       
  cargando = true;

  constructor(
    private modalController: ModalController,
    private serviciosApi: ServiciosApi
  ) { }

  ngOnInit() {

    if (this.sancion?.id) {

      this.cargarSancion(this.sancion.id);
    }
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  cargarSancion(id: string) {
    this.cargando = true;
    this.serviciosApi.getSancion(id).subscribe({
      next: (resp) => {

        this.sancionInfo = resp;
        this.cargando = false;
      },
      error: (err) => {
        this.cargando = false;
      }
    });
  }
}
