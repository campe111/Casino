import { useState } from 'react';
import { Casino } from '../models/Casino';
import { Usuario } from '../models/Usuario';
import { Vista } from '../App';

interface RegistroUsuarioProps {
  casino: Casino;
  cambiarVista: (vista: Vista) => void;
  establecerUsuario: (usuario: Usuario | null) => void;
}

function RegistroUsuario({ casino, cambiarVista, establecerUsuario }: RegistroUsuarioProps) {
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    dni: '',
    edad: '',
    saldo: ''
  });
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  const validarNombre = (nombre: string): boolean => {
    if (nombre.trim() === '') {
      setError('El nombre no puede estar vacío.');
      return false;
    }
    const usuarioExistente = casino.getUsuarios().find(
      u => u.getNombreUsuario() === nombre
    );
    if (usuarioExistente) {
      setError('El nombre de usuario ya está registrado.');
      return false;
    }
    return true;
  };

  const validarDNI = (dniStr: string): boolean => {
    const dni = parseInt(dniStr, 10);
    if (isNaN(dni)) {
      setError('Debe ingresar un número válido para el DNI.');
      return false;
    }
    if (casino.buscarUsuarioDni(dni)) {
      setError('El DNI ya está registrado.');
      return false;
    }
    return true;
  };

  const validarEdad = (edadStr: string): boolean => {
    const edad = parseInt(edadStr, 10);
    if (isNaN(edad)) {
      setError('Debe ingresar un número válido para la edad.');
      return false;
    }
    if (edad < 18) {
      setError('La edad debe ser mayor o igual a 18 años.');
      return false;
    }
    return true;
  };

  const validarSaldo = (saldoStr: string): boolean => {
    const saldo = parseFloat(saldoStr);
    if (isNaN(saldo)) {
      setError('Debe ingresar un número válido para el saldo.');
      return false;
    }
    if (saldo <= 0) {
      setError('El saldo debe ser mayor que 0.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setExito(false);

    if (!validarNombre(formData.nombreUsuario)) return;
    if (!validarDNI(formData.dni)) return;
    if (!validarEdad(formData.edad)) return;
    if (!validarSaldo(formData.saldo)) return;

    const exitoRegistro = casino.registrarUsuario(
      formData.nombreUsuario,
      parseInt(formData.dni, 10),
      parseInt(formData.edad, 10),
      parseFloat(formData.saldo)
    );

    if (exitoRegistro) {
      setExito(true);
      const nuevoUsuario = casino.accederUsuario(formData.nombreUsuario);
      if (nuevoUsuario) {
        establecerUsuario(nuevoUsuario);
      }
      setTimeout(() => {
        cambiarVista('menu');
      }, 2000);
    } else {
      setError('Error al registrar usuario.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Registrar Nuevo Usuario</h2>
        
        {error && <div className="alert alert-error">{error}</div>}
        {exito && <div className="alert alert-success">Usuario registrado con éxito!</div>}

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="nombreUsuario">Nombre de Usuario:</label>
            <input
              type="text"
              id="nombreUsuario"
              value={formData.nombreUsuario}
              onChange={(e) => setFormData({ ...formData, nombreUsuario: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dni">DNI:</label>
            <input
              type="number"
              id="dni"
              value={formData.dni}
              onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edad">Edad:</label>
            <input
              type="number"
              id="edad"
              value={formData.edad}
              onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
              required
              min="18"
            />
          </div>

          <div className="form-group">
            <label htmlFor="saldo">Saldo Inicial:</label>
            <input
              type="number"
              id="saldo"
              value={formData.saldo}
              onChange={(e) => setFormData({ ...formData, saldo: e.target.value })}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Registrar
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => cambiarVista('menu')}
            >
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistroUsuario;

