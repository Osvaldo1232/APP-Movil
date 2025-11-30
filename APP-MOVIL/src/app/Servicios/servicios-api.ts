import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Autor, Carrera, Categoria, Combo, EmpleadoA, Estudiante, Estudiantes, Libro, Libros, LoginResponse, Prestamo, PrestamoCre, PrestamoCrear, PrestamoFecha, PrestamoRespuesta, TopLibros, UsuarioDa, UsuarioInfo } from '../modelos/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class ServiciosApi {
  


  
 private baseUrl = 'http://localhost:8000';
private apiUrl = 'http://localhost:8000/prestamos';
 private baseUrP = 'http://localhost:8000/prestamos/detalles';

 private baseUrlLI = 'http://localhost:8000/libros';
  private apiusuario = 'http://localhost:8000/usuarios';
 private baseUrlc = 'http://localhost:8000/carreras';
 private baseUrlA = 'http://localhost:8000/alumnos';
 private baseUrlP = 'http://localhost:8000/Profesores';

 private baseUrlC = 'http://localhost:8000/categorias';
 private baseUrlAu = 'http://localhost:8000/autores';
  constructor(private http: HttpClient, private router: Router) { }

obtenerUsuarioLogueado(id: string): Observable<UsuarioInfo> {
    return this.http.get<UsuarioInfo>(`${this.apiusuario}/info/${id}`);
  }
 crearCarrera(carrera: Carrera): Observable<Carrera> {
  return this.http.post<Carrera>(`${this.baseUrlc}`, carrera);
}

actualizarEstatus(id: string, estatus: string): Observable<any> {
  const url = `${this.baseUrlc}/${id}/estatus?estatus=${estatus}`;
  return this.http.patch(url, {}); 
}


actualizarCarrera(id: string, carrera: Carrera): Observable<Carrera> {
  return this.http.put<Carrera>(`${this.baseUrlc}/${id}`, carrera);
}

  obtenerCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.baseUrlc);
  }
  obtenerCarrerasA(): Observable<Combo[]> {
    return this.http.get<Combo[]>(`${this.baseUrlc}/activosC`);
  }

  

  obtenerCarreraPorId(id: string): Observable<Carrera> {
    return this.http.get<Carrera>(`${this.baseUrl}/${id}`);
  }

  


  login(email: string, password: string): Observable<LoginResponse> {
    const body = { email, password };
    return this.http.post<LoginResponse>(`${this.baseUrl}/Autenticacion/login`, body)
      .pipe(
        tap(res => {
          


          this.storeToken(res.token);
          this.storeUUID(res.uuid);
          this.storeRoles([res.rol]); 
        })
      );
  }

   
 private storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  private storeUUID(uuid: string): void {
    localStorage.setItem('uuid', uuid);
  }

  private storeRoles(roles: string[]): void {
    localStorage.setItem('roles', JSON.stringify(roles));
  }
    logueado(): string | null {
    return localStorage.getItem('uuid');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('uuid');

    this.router.navigate(['/home']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

     obtenerEstudiantesA(): Observable<Combo[]> {
    return this.http.get<Combo[]>(`${this.baseUrlP}/activosAL`);
  }

  obtenerEstudiantes(): Observable<Estudiantes[]> {
    return this.http.get<Estudiantes[]>(`${this.baseUrlP}/alumnos`);
  }


  crearEstudiante(estudiante: Estudiantes): Observable<Estudiantes> {
    return this.http.post<Estudiantes>(`${this.apiusuario}/alumno`, estudiante);
  }

  actualizarEstudiante(id: string, estudiante: Estudiantes): Observable<Estudiantes> {
    return this.http.put<Estudiantes>(`${this.baseUrlP}/alumno/${id}`, estudiante);
  }



  obtenerEmpleado(): Observable<EmpleadoA[]> {
    return this.http.get<EmpleadoA[]>(`${this.baseUrlP}`);
  }


  crearempleado(empleado: EmpleadoA): Observable<EmpleadoA> {
    return this.http.post<EmpleadoA>(`${this.apiusuario}/empleado`, empleado);
  }

  actualizarempleado(id: string, empleado: EmpleadoA): Observable<EmpleadoA> {
    return this.http.put<EmpleadoA>(`${this.baseUrlP}/empleado/${id}`, empleado);
  }




  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.baseUrlC);
  }

    obtenerPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.baseUrP);
  }

  crearCategoria(categoria: Partial<Categoria>): Observable<Categoria> {
    return this.http.post<Categoria>(this.baseUrlC, categoria);
  }

  actualizarCategoria(id: string, categoria: Partial<Categoria>): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.baseUrlC}/${id}`, categoria);
  }
 registrarLibro(libro: any): Observable<any> {
    return this.http.post(`${this.baseUrlLI}`, libro);
  }

 actualizarLibro(id: string, payload: any) {
  return this.http.put(`${this.baseUrlLI}/${id}`, payload);
}

   obtenerLibrosA(): Observable<Combo[]> {
    return this.http.get<Combo[]>(`${this.baseUrlLI}/activosl`);
  }

   obtenerLibros(): Observable<Libros[]> {
    return this.http.get<Libros[]>(this.baseUrlLI);
  }

  obtenerAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.baseUrlAu);
  }
 
  crearAutor(autor: Autor): Observable<Autor> {
    return this.http.post<Autor>(this.baseUrlAu, autor);
  }
  actualizarAutor(id: string, autor: Autor): Observable<Autor> {
    return this.http.put<Autor>(`${this.baseUrlAu}/${id}`, autor);
  }

  registrarPrestamo(data: PrestamoCre): Observable<PrestamoRespuesta> {
    return this.http.post<PrestamoRespuesta>(this.apiUrl, data);
  }

  devolverPrestamo(idPrestamo: string, idLibro: string, cantidadDevuelta: number) {
  const url = `${this.apiUrl}/${idPrestamo}/devolver`;

  const params = {
    cantidadDevuelta: cantidadDevuelta,
    idLibro: idLibro
  };

  return this.http.put(url, null, { params });
}

 buscarPrestamos(
    fechaPrestamo: string,
    alumnoNombre: string,
    libroTitulo: string,
    
    estatus: string = 'VENCIDO'
  ): Observable<any> {

    let params = new HttpParams();

    if (fechaPrestamo) params = params.set('fechaPrestamo', fechaPrestamo);
    if (alumnoNombre) params = params.set('alumnoNombre', alumnoNombre);
    if (libroTitulo) params = params.set('libroTitulo', libroTitulo);
    if (estatus) params = params.set('estatus', estatus);

    return this.http.get(`${this.apiUrl}/buscar`, { params });
  }

   obtenerTop10Fechas(): Observable<PrestamoFecha[]> {
    return this.http.get<PrestamoFecha[]>(`${this.apiUrl}/top10-fechas`);
  }

   obtenerTop10Libros(): Observable<TopLibros[]> {
    return this.http.get<TopLibros[]>(`${this.apiUrl}/top10-libros`);
  }


  Usuario(): string {
    return localStorage.getItem('uuid') || '';
  }

  getUserRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }


  getTokenExpirationDate(token: string): Date | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload.exp) return null;

    const date = new Date(0);
    date.setUTCSeconds(payload.exp);
    return date;
  } catch {
    return null;
  }
}

  isTokenExpired(): boolean {
  const token = this.getToken();
  if (!token) return true;

  const expirationDate = this.getTokenExpirationDate(token);
  return !expirationDate || expirationDate < new Date();
}

isAuthenticated(): boolean {
  return !!this.getToken() && !this.isTokenExpired();
}
}
