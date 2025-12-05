import { Component, OnInit } from '@angular/core';
import { LibroVisual } from '../modelos/LoginResponse';
import { ServiciosApi } from '../Servicios/servicios-api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-libros-visual',
  templateUrl: './libros-visual.page.html',
  styleUrls: ['./libros-visual.page.scss'],
  standalone:false
})
export class LibrosVisualPage implements OnInit {
 categoriaId: string = '';

 categoria:string='';
  libros: LibroVisual[] = [];

  constructor(
    private librosService: ServiciosApi,
    private route: ActivatedRoute,
    private router: Router
  ) { }

 ngOnInit() {
  this.categoriaId = this.route.snapshot.paramMap.get('categoriaId') || '';
  this.route.queryParamMap.subscribe(params => {
    const nombre = params.get('nombre') || '';
    this.categoria=nombre;
  });
  this.cargarLibros();
}


  cargarLibros() {
    if (this.categoriaId) {
      this.librosService.obtenerLibrosPorCategoria(this.categoriaId)
        .subscribe(res => {
          this.libros = res;
        });
    }
  }
regresarCategorias() {
  this.router.navigate(['/admnistrador/categorias']); 
}
}
