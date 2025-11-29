import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdmnistradorPage } from './admnistrador/admnistrador.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },


  {
  path: 'admnistrador',
  component: AdmnistradorPage,
  children: [
    {
      path: 'carreras',
      loadChildren: () => import('./carreras/carreras.module').then(m => m.CarrerasPageModule)
    },
    {
      path: 'alumnos',
      loadChildren: () => import('./alumnos/alumnos.module').then(m => m.AlumnosPageModule)
    },
    {
      path: 'categorias',
      loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasPageModule)
    },
    {
      path: 'autores',
      loadChildren: () => import('./autores/autores.module').then(m => m.AutoresPageModule)
    },
    {
      path: 'libros',
      loadChildren: () => import('./libros/libros.module').then(m => m.LibrosPageModule)
    },
    {
      path: 'prestamos',
      loadChildren: () => import('./prestamos/prestamos.module').then(m => m.PrestamosPageModule)
    },

      {
    path: 'libros-mas-prestados',
    loadChildren: () => import('./libros-mas-prestados/libros-mas-prestados.module').then( m => m.LibrosMasPrestadosPageModule)
  },
  {
    path: 'libros-mas-prestados-fecha',
    loadChildren: () => import('./libros-mas-prestados-fecha/libros-mas-prestados-fecha.module').then( m => m.LibrosMasPrestadosFechaPageModule)
  },
  {
    path: 'prestamos',
    loadChildren: () => import('./prestamos/prestamos.module').then( m => m.PrestamosPageModule)
  },
  {
    path: 'prestamos-vencidos',
    loadChildren: () => import('./prestamos-vencidos/prestamos-vencidos.module').then( m => m.PrestamosVencidosPageModule)
  },
   {
    path: 'empleado',
    loadChildren: () => import('./empleado/empleado.module').then( m => m.EmpleadoPageModule)
  },
    {
      path: '',
      redirectTo: 'carreras',
      pathMatch: 'full'
    }
  ]
}
,
  
 
  

  {
    path: 'admnistrador',
    loadChildren: () => import('./admnistrador/admnistrador.module').then( m => m.AdmnistradorPageModule)
  },
 
  {
    path: 'estudiante',
    loadChildren: () => import('./estudiante/estudiante.module').then( m => m.EstudiantePageModule)
  },
  {
    path: 'apartar-libro',
    loadChildren: () => import('./apartar-libro/apartar-libro.module').then( m => m.ApartarLibroPageModule)
  },
  {
    path: 'historial-libros',
    loadChildren: () => import('./historial-libros/historial-libros.module').then( m => m.HistorialLibrosPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
