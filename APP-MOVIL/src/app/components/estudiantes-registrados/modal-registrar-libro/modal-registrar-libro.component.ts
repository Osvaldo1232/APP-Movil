import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/shared/alert-service';
import { Autor, Categoria } from 'src/app/modelos/LoginResponse';
import { ServiciosApi } from 'src/app/Servicios/servicios-api';

@Component({
  selector: 'app-modal-registrar-libro',
  templateUrl: './modal-registrar-libro.component.html',
  styleUrls: ['./modal-registrar-libro.component.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class ModalRegistrarLibroComponent implements OnInit {

  @Input() libroEditar: any = null;

  categorias: Categoria[] = [];
  autores: Autor[] = [];

  libro = {
    titulo: '',
    autores: [],
    categoria: null,
    anioPublicacion: null,
    editorial: '',
    totalCopias: '',
    copiasDisponibles:'',
    estatus: true,
    sinopsis: '',
    imagenBase64: ''
  };

  currentYear = new Date().getFullYear();

  constructor(
    private modalController: ModalController,
    private servicio: ServiciosApi,
    private alerta: AlertService
  ) {}

  ngOnInit() {
    this.cargarCategorias();
    this.cargarAutores();

    if (this.libroEditar) {
      this.cargarDatosParaEditar();
    }
  }

  cargarDatosParaEditar() {

    this.libro = {
      titulo: this.libroEditar.titulo,
      autores: this.libroEditar.autoresIds || [],
      categoria: this.libroEditar.categoriaId,
      anioPublicacion: this.libroEditar.anioPublicacion,
      editorial: this.libroEditar.editorial,
      copiasDisponibles:this.libroEditar.copiasDisponibles,
      totalCopias: this.libroEditar.totalCopias,
      estatus: this.libroEditar.estatus === 'ACTIVO',
      sinopsis: this.libroEditar.sinopsis || '',
      imagenBase64: this.libroEditar.imagen || ''
    };
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  aceptar() {
    if (!this.libro.titulo ||
        this.libro.autores.length === 0 ||
        !this.libro.categoria ||
        !this.libro.anioPublicacion ||
        !this.libro.editorial ||
        !this.libro.totalCopias ||
        !this.libro.sinopsis) {

      this.alerta.show('Todos los campos son obligatorios', 'warning', 'Error');
      return;
    }

    const payload = {
      id: this.libroEditar ? this.libroEditar.id : null,
      titulo: this.libro.titulo,
      anioPublicacion: Number(this.libro.anioPublicacion),
      editorial: this.libro.editorial,
      totalCopias: Number(this.libro.totalCopias),
      copiasDisponibles: Number(this.libro.totalCopias),
      categoriaId: this.libro.categoria,
      estatus: this.libro.estatus ? 'ACTIVO' : 'INACTIVO',
      sinopsis: this.libro.sinopsis,
      imagenBase64: this.libro.imagenBase64,
      autoresIds: this.libro.autores
    };

    if (this.libroEditar) {
      this.servicio.actualizarLibro(this.libroEditar.id, payload).subscribe({
        next: () => {
          this.alerta.show('Libro actualizado con éxito', 'success', 'Éxito');
          this.modalController.dismiss({ libroActualizado: payload });
        },
        error: () => {
          this.alerta.show('Error al actualizar el libro', 'danger', 'Error');
        }
      });
      return;
    }

    this.servicio.registrarLibro(payload).subscribe({
      next: () => {
        this.alerta.show('Libro registrado con éxito', 'success', 'Éxito');
        this.modalController.dismiss({ libro: payload });
      },
      error: () => {
        this.alerta.show('Error al registrar el libro', 'danger', 'Error');
      }
    });
  }

  cargarCategorias() {
    this.servicio.obtenerCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (e) => console.error(e)
    });
  }

  cargarAutores() {
    this.servicio.obtenerAutores().subscribe({
      next: (data) => this.autores = data,
      error: (e) => console.error(e)
    });
  }

  convertirImagenBase64(event: any) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = () => {
      let base64 = lector.result as string;

      if (base64.includes(',')) {
        base64 = base64.substring(base64.indexOf(',') + 1);
      }

      this.libro.imagenBase64 = base64;
    };

    lector.readAsDataURL(archivo);
  }

}
