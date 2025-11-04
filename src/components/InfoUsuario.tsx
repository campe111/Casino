import { useState } from 'react';
import { Casino } from '../models/Casino';
import { Vista } from '../App';

interface InfoUsuarioProps {
  casino: Casino;
  cambiarVista: (vista: Vista) => void;
}

function InfoUsuario({ casino, cambiarVista }: InfoUsuarioProps) {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [usuario, setUsuario] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setUsuario(null);

    const usuarioEncontrado = casino.mostrarInfoUsuario(nombreUsuario);
    if (usuarioEncontrado) {
      setUsuario(usuarioEncontrado);
    } else {
      setError('Usuario no encontrado.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Información del Usuario</h2>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="nombreUsuario">Nombre de Usuario:</label>
            <input
              type="text"
              id="nombreUsuario"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Buscar
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

        {error && <div className="alert alert-error">{error}</div>}

        {usuario && (
          <div className="info-display">
            <h3>Información del Usuario</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>Nombre:</strong> {usuario.getNombreUsuario()}
              </div>
              <div className="info-item">
                <strong>DNI:</strong> {usuario.getDni()}
              </div>
              <div className="info-item">
                <strong>Edad:</strong> {usuario.getEdad()} años
              </div>
              <div className="info-item">
                <strong>Saldo:</strong> ${usuario.getSaldo()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoUsuario;

