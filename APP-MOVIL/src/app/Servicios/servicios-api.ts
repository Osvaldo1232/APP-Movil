import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Capacitor } from '@capacitor/core';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class ServiciosApi {
  
  private baseUrl = 'https://unknown-corrie-utsemintegradora-b23357e2.koyeb.app';
  private apiUrl = 'https://unknown-corrie-utsemintegradora-b23357e2.koyeb.app/prestamos';
  private baseUrP = 'https://unknown-corrie-utsemintegradora-b23357e2.koyeb.app/prestamos/detalles';
  private baseUrlLI = 'https://unknown-corrie-utsemintegradora-b23357e2.koyeb.app/libros';
  private apiusuario = 'https://unknown-corrie-utsemintegradora-b23357e2.koyeb.app/usuarios';
  private baseUrlc = 'https://unknown-corrie-utsemintegradora-b23357e2.koyeb.app/carreras';
  private baseUrlA = 'https://unknown-corrie-utsemintegradora-b23357e2.koyeb.app/alumnos';
  private baseUrlP = 'https://unknown-corrie-utsemintegradora-b23357e2.koyeb.app/Profesores';
  private baseUrlC = 'https://unknown-corrie-utsemintegradora-b23357e2.koyeb.app/categorias';
  private baseUrlAu = 'https://unknown-corrie-utsemintegradora-b23357e2.koyeb.app/autores';

  constructor(private http: HttpClient, private router: Router) { }

  // Método helper para determinar si estamos en nativo
  private isNative(): boolean {
    return Capacitor.isNativePlatform();
  }

  // Método helper para obtener headers
  private getHeaders(): any {
    const token = this.getToken();
    const headers: any = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Método genérico para GET
  private get<T>(url: string, params?: HttpParams): Observable<T> {
    if (this.isNative()) {
      const options: HttpOptions = {
        url: url,
        headers: this.getHeaders()
      };

      if (params) {
        const paramsObj: any = {};
        params.keys().forEach(key => {
          paramsObj[key] = params.get(key);
        });
        options.params = paramsObj;
      }

      return from(CapacitorHttp.get(options)).pipe(
        map((response: HttpResponse) => response.data as T)
      );
    } else {
      return this.http.get<T>(url, { params });
    }
  }

  // Método genérico para POST
  private post<T>(url: string, body: any): Observable<T> {
    if (this.isNative()) {
      const options: HttpOptions = {
        url: url,
        headers: this.getHeaders(),
        data: body
      };

      return from(CapacitorHttp.post(options)).pipe(
        map((response: HttpResponse) => response.data as T)
      );
    } else {
      return this.http.post<T>(url, body);
    }
  }

  // Método genérico para PUT
  private put<T>(url: string, body: any): Observable<T> {
    if (this.isNative()) {
      const options: HttpOptions = {
        url: url,
        headers: this.getHeaders(),
        data: body
      };

      return from(CapacitorHttp.put(options)).pipe(
        map((response: HttpResponse) => response.data as T)
      );
    } else {
      return this.http.put<T>(url, body);
    }
  }

  // Método genérico para PATCH
  private patch<T>(url: string, body: any = {}): Observable<T> {
    if (this.isNative()) {
      const options: HttpOptions = {
        url: url,
        headers: this.getHeaders(),
        data: body
      };

      return from(CapacitorHttp.patch(options)).pipe(
        map((response: HttpResponse) => response.data as T)
      );
    } else {
      return this.http.patch<T>(url, body);
    }
  }

  // Método genérico para DELETE
  private delete<T>(url: string): Observable<T> {
    if (this.isNative()) {
      const options: HttpOptions = {
        url: url,
        headers: this.getHeaders()
      };

      return from(CapacitorHttp.delete(options)).pipe(
        map((response: HttpResponse) => response.data as T)
      );
    } else {
      return this.http.delete<T>(url);
    }
  }

  // MÉTODOS DE AUTENTICACIÓN
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.post<any>(`${this.baseUrl}/Autenticacion/login`, body)
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
    localStorage.removeItem('auth_token');
    this.router.navigate(['/home']);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // USUARIOS
  obtenerUsuarioLogueado(id: string): Observable<any> {
    return this.get<any>(`${this.apiusuario}/info/${id}`);
  }

  obtenerUsuarios(): Observable<any[]> {
    return this.get<any[]>(`${this.apiusuario}/activos`);
  }

  // CARRERAS
  crearCarrera(carrera: any): Observable<any> {
    return this.post<any>(`${this.baseUrlc}`, carrera);
  }

  actualizarEstatus(id: string, estatus: string): Observable<any> {
    const url = `${this.baseUrlc}/${id}/estatus?estatus=${estatus}`;
    return this.patch(url, {});
  }

  actualizarCarrera(id: string, carrera: any): Observable<any> {
    return this.put<any>(`${this.baseUrlc}/${id}`, carrera);
  }

  obtenerCarreras(): Observable<any[]> {
    return this.get<any[]>(this.baseUrlc);
  }

  obtenerCarrerasA(): Observable<any[]> {
    return this.get<any[]>(`${this.baseUrlc}/activosC`);
  }

  obtenerCarreraPorId(id: string): Observable<any> {
    return this.get<any>(`${this.baseUrlc}/${id}`);
  }

  // ESTUDIANTES
  obtenerEstudiantes(): Observable<any[]> {
    return this.get<any[]>(`${this.baseUrlP}/alumnos`);
  }

  crearEstudiante(estudiante: any): Observable<any> {
    return this.post<any>(`${this.apiusuario}/alumno`, estudiante);
  }

  actualizarEstudiante(id: string, estudiante: any): Observable<any> {
    return this.put<any>(`${this.baseUrlP}/alumno/${id}`, estudiante);
  }

  // EMPLEADOS
  obtenerEmpleado(): Observable<any[]> {
    return this.get<any[]>(`${this.baseUrlP}`);
  }

  crearempleado(empleado: any): Observable<any> {
    return this.post<any>(`${this.apiusuario}/empleado`, empleado);
  }

  actualizarempleado(id: string, empleado: any): Observable<any> {
    return this.put<any>(`${this.baseUrlP}/empleado/${id}`, empleado);
  }

  // PROFESORES
  obtenerprofesor(): Observable<any[]> {
    return this.get<any[]>(`${this.baseUrlP}/profesores`);
  }

  crearprofesor(empleado: any): Observable<any> {
    return this.post<any>(`${this.apiusuario}/profesor`, empleado);
  }

  actualizarprofesor(id: string, empleado: any): Observable<any> {
    return this.put<any>(`${this.baseUrlP}/profesor/${id}`, empleado);
  }

  // CATEGORÍAS
  obtenerCategorias(): Observable<any[]> {
    return this.get<any[]>(this.baseUrlC);
  }

  crearCategoria(categoria: Partial<any>): Observable<any> {
    return this.post<any>(this.baseUrlC, categoria);
  }

  actualizarCategoria(id: string, categoria: Partial<any>): Observable<any> {
    return this.put<any>(`${this.baseUrlC}/${id}`, categoria);
  }

  // LIBROS
  registrarLibro(libro: any): Observable<any> {
    return this.post(`${this.baseUrlLI}`, libro);
  }

  actualizarLibro(id: string, payload: any) {
    return this.put(`${this.baseUrlLI}/${id}`, payload);
  }

  obtenerLibrosA(): Observable<any[]> {
    return this.get<any[]>(`${this.baseUrlLI}/activosl`);
  }

  obtenerLibros(): Observable<any[]> {
    return this.get<any[]>(this.baseUrlLI);
  }

  obtenerLibrosM(titulo?: string): Observable<any[]> {
    let params = new HttpParams();
    if (titulo && titulo.trim() !== '') {
      params = params.set('titulo', titulo.trim());
    }
    return this.get<any[]>(`${this.baseUrlLI}/LibrosActivos`, params);
  }

  // AUTORES
  obtenerAutores(): Observable<any[]> {
    return this.get<any[]>(this.baseUrlAu);
  }

  crearAutor(autor: any): Observable<any> {
    return this.post<any>(this.baseUrlAu, autor);
  }

  actualizarAutor(id: string, autor: any): Observable<any> {
    return this.put<any>(`${this.baseUrlAu}/${id}`, autor);
  }

  // PRÉSTAMOS
  obtenerPrestamos(): Observable<any[]> {
    return this.get<any[]>(this.baseUrP);
  }

  Apartar(data: any): Observable<any> {
    return this.post<any>(`${this.apiUrl}/apartar`, data);
  }

  getSancion(id: any): Observable<any> {
    return this.get<any>(`${this.apiUrl}/info/${id}`);
  }

  PrestamosUsuarios(usuarioId: string): Observable<any[]> {
    return this.get<any[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  RegresarVencido(prestamoId: string, motivo: string): Observable<any[]> {
    const params = new HttpParams().set('motivo', motivo);
    
    if (this.isNative()) {
      const options: HttpOptions = {
        url: `${this.apiUrl}/actualizar-vencido/${prestamoId}`,
        headers: this.getHeaders(),
        params: { motivo }
      };

      return from(CapacitorHttp.post(options)).pipe(
        map((response: HttpResponse) => response.data as any[])
      );
    } else {
      return this.http.post<any[]>(
        `${this.apiUrl}/actualizar-vencido/${prestamoId}`, 
        {}, 
        { params }
      );
    }
  }

  Confirmar(usuarioId: string): Observable<any[]> {
    return this.put<any[]>(`${this.apiUrl}/confirmar-apartado/${usuarioId}`, null);
  }

  cancelar(usuarioId: string): Observable<any[]> {
    return this.put<any[]>(`${this.apiUrl}/cancelar-prestamo/${usuarioId}`, null);
  }

  registrarPrestamo(data: any): Observable<any> {
    return this.post<any>(`${this.apiUrl}/crear`, data);
  }

  devolverPrestamo(idPrestamo: string, cantidadDevuelta: string) {
    const params = new HttpParams().set('cantidad', cantidadDevuelta);
    
    if (this.isNative()) {
      const options: HttpOptions = {
        url: `${this.apiUrl}/${idPrestamo}/devolver`,
        headers: this.getHeaders(),
        params: { cantidad: cantidadDevuelta }
      };

      return from(CapacitorHttp.post(options)).pipe(
        map((response: HttpResponse) => response.data)
      );
    } else {
      return this.http.post(`${this.apiUrl}/${idPrestamo}/devolver`, null, { params });
    }
  }

  buscarPrestamos(
    fechaPrestamo: string,
    usuarioNombre: string,
    libroTitulo: string,
    estatus: string = 'VENCIDO'
  ): Observable<any> {
    let params = new HttpParams();
    if (fechaPrestamo) params = params.set('fechaPrestamo', fechaPrestamo);
    if (usuarioNombre) params = params.set('usuarioNombre', usuarioNombre);
    if (libroTitulo) params = params.set('libroTitulo', libroTitulo);
    if (estatus) params = params.set('estatus', estatus);

    return this.get(`${this.apiUrl}/filtrar`, params);
  }

  obtenerTop10Fechas(): Observable<any[]> {
    return this.get<any[]>(`${this.apiUrl}/top10-fechas`);
  }

  obtenerTop10Libros(): Observable<any[]> {
    return this.get<any[]>(`${this.apiUrl}/top10-libros`);
  }

  // UTILIDADES
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