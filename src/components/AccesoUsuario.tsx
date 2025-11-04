import { useState } from 'react';
import { Casino } from '../models/Casino';
import { Usuario } from '../models/Usuario';
import { Vista } from '../App';

interface AccesoUsuarioProps {
  casino: Casino;
  cambiarVista: (vista: Vista) => void;
  establecerUsuario: (usuario: Usuario | null) => void;
}

function AccesoUsuario({ casino, cambiarVista, establecerUsuario }: AccesoUsuarioProps) {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const usuario = casino.accederUsuario(nombreUsuario);
    if (usuario) {
      establecerUsuario(usuario);
      cambiarVista('menu');
    } else {
      setError('Usuario no encontrado.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Acceder a Usuario</h2>
        
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="nombreUsuario">Nombre de Usuario:</label>
            <input
              type="text"
              id="nombreUsuario"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Acceder
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

export default AccesoUsuario;

