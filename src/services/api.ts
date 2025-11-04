/**
 * Servicio API para comunicación con el backend
 * 
 * Este servicio abstrae las llamadas HTTP y permite
 * cambiar fácilmente entre diferentes implementaciones
 * (localStorage, API REST, etc.)
 */

// Configuración de la API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export interface UsuarioData {
  nombreUsuario: string;
  dni: number;
  edad: number;
  saldo: number;
}

export interface ApuestaData {
  juegoId: string;
  monto: number;
  resultado: 'ganada' | 'perdida' | 'empate';
  ganancia?: number;
}

export interface HistorialJuego {
  id: string;
  juegoId: string;
  fecha: string;
  apuesta: number;
  resultado: string;
  ganancia: number;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Obtiene un usuario por nombre de usuario
   */
  async obtenerUsuario(nombreUsuario: string): Promise<UsuarioData | null> {
    try {
      const response = await fetch(`${this.baseUrl}/usuarios/${nombreUsuario}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Error al obtener usuario: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en obtenerUsuario:', error);
      throw error;
    }
  }

  /**
   * Registra un nuevo usuario
   */
  async registrarUsuario(usuario: UsuarioData): Promise<UsuarioData> {
    try {
      const response = await fetch(`${this.baseUrl}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al registrar usuario');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en registrarUsuario:', error);
      throw error;
    }
  }

  /**
   * Actualiza el saldo de un usuario
   */
  async actualizarSaldoUsuario(nombreUsuario: string, nuevoSaldo: number): Promise<UsuarioData> {
    try {
      const response = await fetch(`${this.baseUrl}/usuarios/${nombreUsuario}/saldo`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ saldo: nuevoSaldo }),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar saldo: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en actualizarSaldoUsuario:', error);
      throw error;
    }
  }

  /**
   * Registra una apuesta en el historial
   */
  async registrarApuesta(nombreUsuario: string, apuesta: ApuestaData): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/usuarios/${nombreUsuario}/apuestas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apuesta),
      });

      if (!response.ok) {
        throw new Error(`Error al registrar apuesta: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error en registrarApuesta:', error);
      // No lanzamos error para no interrumpir el juego
    }
  }

  /**
   * Obtiene el historial de juegos de un usuario
   */
  async obtenerHistorial(nombreUsuario: string): Promise<HistorialJuego[]> {
    try {
      const response = await fetch(`${this.baseUrl}/usuarios/${nombreUsuario}/historial`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener historial: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en obtenerHistorial:', error);
      return [];
    }
  }

  /**
   * Verifica si el servicio está disponible
   */
  async verificarConexion(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

// Exportar instancia singleton
export const apiService = new ApiService();

// Exportar servicio para uso local (localStorage) como alternativa
export class LocalStorageService {
  private readonly STORAGE_KEY = 'casino_usuarios';
  private readonly HISTORIAL_KEY = 'casino_historial';

  obtenerUsuario(nombreUsuario: string): UsuarioData | null {
    const usuarios = this.obtenerTodosUsuarios();
    return usuarios.find(u => u.nombreUsuario === nombreUsuario) || null;
  }

  registrarUsuario(usuario: UsuarioData): UsuarioData {
    const usuarios = this.obtenerTodosUsuarios();
    
    // Verificar si ya existe
    if (usuarios.some(u => u.dni === usuario.dni || u.nombreUsuario === usuario.nombreUsuario)) {
      throw new Error('Usuario ya registrado');
    }

    usuarios.push(usuario);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuarios));
    return usuario;
  }

  actualizarSaldoUsuario(nombreUsuario: string, nuevoSaldo: number): UsuarioData {
    const usuarios = this.obtenerTodosUsuarios();
    const usuario = usuarios.find(u => u.nombreUsuario === nombreUsuario);
    
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    usuario.saldo = nuevoSaldo;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuarios));
    return usuario;
  }

  registrarApuesta(nombreUsuario: string, apuesta: ApuestaData): void {
    const historial = this.obtenerHistorial(nombreUsuario);
    const nuevaApuesta: HistorialJuego = {
      id: Date.now().toString(),
      juegoId: apuesta.juegoId,
      fecha: new Date().toISOString(),
      apuesta: apuesta.monto,
      resultado: apuesta.resultado,
      ganancia: apuesta.ganancia || 0,
    };

    historial.push(nuevaApuesta);
    const historialCompleto = JSON.parse(localStorage.getItem(this.HISTORIAL_KEY) || '{}');
    historialCompleto[nombreUsuario] = historial;
    localStorage.setItem(this.HISTORIAL_KEY, JSON.stringify(historialCompleto));
  }

  obtenerHistorial(nombreUsuario: string): HistorialJuego[] {
    const historialCompleto = JSON.parse(localStorage.getItem(this.HISTORIAL_KEY) || '{}');
    return historialCompleto[nombreUsuario] || [];
  }

  private obtenerTodosUsuarios(): UsuarioData[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
}

export const localStorageService = new LocalStorageService();

