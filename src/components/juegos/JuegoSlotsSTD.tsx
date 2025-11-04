import { useState, useEffect } from 'react';
import { SlotsSTD } from '../../models/SlotsSTD';
import { Usuario } from '../../models/Usuario';

interface JuegoSlotsSTDProps {
  juego: SlotsSTD;
  volver: () => void;
  usuario?: Usuario | null;
  actualizarUsuario?: (usuario: Usuario | null) => void;
}

function JuegoSlotsSTD({ juego, volver, usuario, actualizarUsuario }: JuegoSlotsSTDProps) {
  const [apuesta, setApuesta] = useState('');
  const [resultado, setResultado] = useState<any>(null);
  const [error, setError] = useState('');
  const [saldo, setSaldo] = useState(juego.billetera.obtenerSaldo());
  const [mostrarFormularioApuesta, setMostrarFormularioApuesta] = useState(juego.apuestaActual === 0);

  // Actualizar saldo del usuario cuando cambia la billetera
  useEffect(() => {
    if (usuario && actualizarUsuario) {
      const saldoBilletera = juego.billetera.obtenerSaldo();
      usuario.setSaldo(saldoBilletera);
      actualizarUsuario(usuario);
    }
  }, [saldo, usuario, actualizarUsuario]);

  const handleApuesta = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResultado(null);

    const monto = parseFloat(apuesta);
    if (isNaN(monto)) {
      setError('Por favor ingrese un monto válido.');
      return;
    }

    try {
      juego.realizarApuesta(monto);
      const nuevoSaldo = juego.billetera.obtenerSaldo();
      setSaldo(nuevoSaldo);
      // Actualizar saldo del usuario
      if (usuario && actualizarUsuario) {
        usuario.setSaldo(nuevoSaldo);
        actualizarUsuario(usuario);
      }
      setApuesta('');
      setMostrarFormularioApuesta(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleJugar = () => {
    setError('');
    setResultado(null);
    try {
      const resultadoJuego = juego.jugar();
      setResultado(resultadoJuego);
      const nuevoSaldo = juego.billetera.obtenerSaldo();
      setSaldo(nuevoSaldo);
      // Actualizar saldo del usuario
      if (usuario && actualizarUsuario) {
        usuario.setSaldo(nuevoSaldo);
        actualizarUsuario(usuario);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="juego-container">
      <div className="juego-card">
        <h2>🎰 Slots STD</h2>
        
        <div className="saldo-display">
          <h3>Saldo: ${saldo}</h3>
          <p>Apuesta mínima: ${juego.apuestaMinima()} | Máxima: ${juego.apuestaMaxima()}</p>
          {juego.apuestaActual > 0 && (
            <div className="apuesta-actual">
              <p><strong>Apuesta actual: ${juego.apuestaActual}</strong></p>
            </div>
          )}
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {resultado && (
          <div className="resultado-juego">
            <div className="rodillos-display">
              {resultado.resultado.map((simbolo: string, index: number) => (
                <span key={index} className="rodillo">{simbolo}</span>
              ))}
            </div>
            <div className={`resultado-mensaje ${resultado.ganancia > 0 ? 'ganancia' : 'perdida'}`}>
              <p>{resultado.mensaje}</p>
              {resultado.ganancia > 0 && (
                <p className="ganancia-amount">Ganaste: ${resultado.ganancia}</p>
              )}
            </div>
          </div>
        )}

        {mostrarFormularioApuesta && (
          <form onSubmit={handleApuesta} className="form">
            <div className="form-group">
              <label htmlFor="apuesta">
                {juego.apuestaActual > 0 ? 'Cambiar Apuesta:' : 'Apuesta:'}
              </label>
              <input
                type="number"
                id="apuesta"
                value={apuesta}
                onChange={(e) => setApuesta(e.target.value)}
                min={juego.apuestaMinima()}
                max={juego.apuestaMaxima()}
                step="1"
                placeholder={`Min: ${juego.apuestaMinima()}, Max: ${juego.apuestaMaxima()}`}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {juego.apuestaActual > 0 ? 'Cambiar Apuesta' : 'Realizar Apuesta'}
              </button>
              {juego.apuestaActual > 0 && (
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setMostrarFormularioApuesta(false);
                    setApuesta('');
                  }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        )}
        
        {!mostrarFormularioApuesta && juego.apuestaActual > 0 && (
          <div className="apuesta-info">
            <button 
              className="btn btn-secondary"
              onClick={() => setMostrarFormularioApuesta(true)}
            >
              Cambiar Apuesta
            </button>
          </div>
        )}

        <div className="juego-actions">
          {!resultado && juego.apuestaActual > 0 && (
            <button 
              onClick={handleJugar} 
              className="btn btn-success btn-large"
              disabled={saldo <= 0}
            >
              🎰 Jugar (Apuesta: ${juego.apuestaActual})
            </button>
          )}
          {resultado && juego.apuestaActual > 0 && (
            <button 
              onClick={() => {
                setResultado(null);
                setError('');
                handleJugar();
              }} 
              className="btn btn-success btn-large"
            >
              🎰 Jugar de Nuevo (Apuesta: ${juego.apuestaActual})
            </button>
          )}
          <button onClick={volver} className="btn btn-secondary">
            Volver a Juegos
          </button>
        </div>
      </div>
    </div>
  );
}

export default JuegoSlotsSTD;

