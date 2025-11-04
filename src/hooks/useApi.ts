import { useState, useEffect } from 'react';
import { apiService, localStorageService, UsuarioData } from '../services/api';

const STORAGE_MODE = import.meta.env.VITE_STORAGE_MODE || 'localStorage';

/**
 * Hook para determinar qué servicio usar según la configuración
 */
export const useApi = () => {
  const [mode, setMode] = useState<'api' | 'localStorage'>(STORAGE_MODE as 'api' | 'localStorage');

  useEffect(() => {
    // Verificar si el servicio API está disponible
    if (mode === 'api') {
      apiService.verificarConexion().then((isAvailable) => {
        if (!isAvailable) {
          console.warn('API no disponible, usando localStorage como fallback');
          setMode('localStorage');
        }
      });
    }
  }, [mode]);

  return mode === 'api' ? apiService : localStorageService;
};

/**
 * Hook para manejar usuarios con API
 */
export const useUsuario = () => {
  const service = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const obtenerUsuario = async (nombreUsuario: string): Promise<UsuarioData | null> => {
    setLoading(true);
    setError(null);
    try {
      const usuario = await service.obtenerUsuario(nombreUsuario);
      return usuario;
    } catch (err: any) {
      setError(err.message || 'Error al obtener usuario');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const registrarUsuario = async (usuario: UsuarioData): Promise<UsuarioData | null> => {
    setLoading(true);
    setError(null);
    try {
      const nuevoUsuario = await service.registrarUsuario(usuario);
      return nuevoUsuario;
    } catch (err: any) {
      setError(err.message || 'Error al registrar usuario');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const actualizarSaldo = async (nombreUsuario: string, nuevoSaldo: number): Promise<UsuarioData | null> => {
    setLoading(true);
    setError(null);
    try {
      const usuario = await service.actualizarSaldoUsuario(nombreUsuario, nuevoSaldo);
      return usuario;
    } catch (err: any) {
      setError(err.message || 'Error al actualizar saldo');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    obtenerUsuario,
    registrarUsuario,
    actualizarSaldo,
    loading,
    error
  };
};

