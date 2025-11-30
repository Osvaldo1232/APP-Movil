
export interface LoginResponse {
  uuid: string;
  rol: string;
  token: string;
}

export interface Carrera {
  id?: string;      // opcional al crear
  nombre: string;
  estatus: string;  // "ACTIVO" o "INACTIVO"
  activo?: boolean;
}

export interface Combo {
  id: string;      
  titulo: string;
}


export interface Estudiantes {
  id?: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  matricula: string;
  email:string,
password:string,
fechaNacimiento:string,
sexo:string,
  estatus: string; // "ACTIVO" o "INACTIVO"
}


export interface Estudiante {
  id?: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  matricula: string;
  carreraId: string;
  carreraNombre: string;
  estatus: string; // ACTIVO o INACTIVO
}
export interface Autor {
  id?: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nacionalidad: string;
}


export interface Categoria {
  id?: string;
  nombre: string;
}


export interface Libro {
  id: string;
  titulo: string;
  autores: string[];           // ← array de strings
  anioPublicacion: number;
  editorial: string;
  copiasDisponibles: number;
  categoriaId: string;
  categoriaNombre: string;
  estatus: string;             // ACTIVO | INACTIVO

   imagen: string | null;     

}


export interface Libros {
  id: string;
  titulo: string;
  autores: string[];    
  autoresIds: string[];             
  anioPublicacion: number;
  editorial: string;
  copiasDisponibles: number;
  totalCopias: number;

  categoriaId: string;
  categoriaNombre: string;
  estatus: 'ACTIVO' | 'INACTIVO';

   imagen: string | null;     
  sinopsis: string | null; 
}



export interface Prestamo {
  id: string;
  nombreUsuario: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  
  libroTitulo: string;
  cantidad: number;
  fechaPrestamo: string;      // o Date si prefieres
  fechaDevolucion: string;    // o Date si prefieres
  estatus: string;            // libre
}



export interface PrestamoCrear {
  alumnoId: string;
  libroId: string;
  cantidad: number;
  cantidadDevuelta: number;
  fechaDevolucion: string;
  estatus: string;  // lo dejas libre como pediste
}


export interface PrestamoCre {
  usuarioId: string;
  libroId: string;
  cantidad: number;
  fechaDevolucion: string; // YYYY-MM-DD
}

export interface PrestamoRespuesta {
  id: string;
  alumnoId: string;
  libroId: string;
  cantidad: number;
  cantidadDevuelta: number;
  fechaPrestamo: string;
  fechaDevolucion: string;
  estatus: string;
}


export interface PrestamoFecha {
  fecha: string;
  totalPrestamos: number;
}

export interface TopLibros {
  nombreLibro: string;
  totalPrestamos: number;
}

export interface UsuarioInfo {
  nombre: string;
  nombreCompleto: string;
  rol: string;
}


export interface UsuarioDa {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  email: string;
  password: string;
  rol: string;               
  fechaNacimiento: string;   
  sexo: string;             
  estatus: string;          
  departamento: string;
  telefono: string;
}




export interface EmpleadoA {
  id?: string;                 // Opcional → solo en edición
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  email: string;
  password?: string;           // Opcional → no obligatorio al editar
  fechaNacimiento: string;     // YYYY-MM-DD
  sexo: "MASCULINO" | "FEMENINO";
  estatus: "ACTIVO" | "INACTIVO";
  telefono?: string;
  clavePresupuestal?: string;
}



export interface LibroAc {
  id: string;
  titulo: string;
  sinopsis: string;
  copiasDisponibles: number;
  imagenBase64: string;     // Base64
  autores: string;    // Si tu API regresa string; si es array, cambia a string[]
  cantidadSeleccionada: number; // usado solo en el front
}


export interface PrestamoUsuario {
  titulo: string;
  imagen: string;          // Base64 desde backend
  cantidad: number;
  estatus: string;
  fechaPrestamo: string;   // ISO string → puede convertirse a Date
  fechaDevolucion: string;
  autores: string[];       // lista de autores
}
