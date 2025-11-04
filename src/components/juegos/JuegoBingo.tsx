import { useState } from 'react';
import { Bingo } from '../../models/Bingo';

interface JuegoBingoProps {
  juego: Bingo;
  volver: () => void;
  sincronizarSaldo?: () => void;
}

function JuegoBingo({ juego, volver, sincronizarSaldo }: JuegoBingoProps) {
  const [apuesta, setApuesta] = useState('');
  const [error, setError] = useState('');
  const [saldo, setSaldo] = useState(juego.billetera.obtenerSaldo());
  const [resultado, setResultado] = useState<any>(null);

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
      setSaldo(juego.billetera.obtenerSaldo());
      sincronizarSaldo?.();
      setApuesta('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleJugar = () => {
    setError('');
    setResultado(null); // Limpiar resultado anterior
    try {
      const resultadoJuego = juego.jugar();
      setResultado(resultadoJuego);
      setSaldo(juego.billetera.obtenerSaldo());
      sincronizarSaldo?.();
    } catch (err: any) {
      setError(err.message);
      // Si la apuesta se reseteó por saldo insuficiente, limpiar el estado
      if (juego.apuestaActual === 0) {
        setResultado(null);
      }
    }
  };

  return (
    <div className="juego-container">
      <div className="juego-card">
        <h2>🎲 Bingo</h2>
        
        <div className="saldo-display">
          <h3>Saldo: ${saldo}</h3>
          <p>Apuesta mínima: ${juego.apuestaMinima()}</p>
          {juego.apuestaActual > 0 && (
            <p className="apuesta-activa">Apuesta activa: ${juego.apuestaActual}</p>
          )}
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        
        {resultado && (
          <div className="resultado-juego">
            <div className={`resultado-mensaje ${resultado.bingo ? 'ganancia' : 'perdida'}`}>
              <p>{resultado.mensaje}</p>
              {resultado.bingo && resultado.ganancia > 0 && (
                <p className="ganancia-amount">¡Ganaste: ${resultado.ganancia}!</p>
              )}
            </div>
            
            <div className="bingo-carton">
              <h3>Tu Cartón:</h3>
              <div className="carton-grid">
                {juego.getCarton().map((numero: number, index: number) => {
                  const marcado = juego.getBolasMarcadas().includes(numero);
                  return (
                    <div 
                      key={index} 
                      className={`carton-numero ${marcado ? 'marcado' : ''}`}
                    >
                      {numero} {marcado && '✅'}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {juego.apuestaActual === 0 ? (
          <form onSubmit={handleApuesta} className="form">
            <div className="form-group">
              <label htmlFor="apuesta">Apuesta:</label>
              <input
                type="number"
                id="apuesta"
                value={apuesta}
                onChange={(e) => setApuesta(e.target.value)}
                min={juego.apuestaMinima()}
                step="1"
                placeholder={`Mínimo: ${juego.apuestaMinima()}`}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Realizar Apuesta</button>
            </div>
          </form>
        ) : (
          <div className="apuesta-info">
            <p className="alert alert-info">
              Tienes una apuesta activa de ${juego.apuestaActual}. Puedes jugar múltiples veces con esta apuesta.
            </p>
            <button 
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                juego.apuestaActual = 0;
                setApuesta('');
                setResultado(null);
                setError('');
              }}
            >
              Cambiar Apuesta
            </button>
          </div>
        )}

        <div className="juego-actions">
          {!resultado && (
            <button 
              onClick={handleJugar} 
              className="btn btn-success btn-large"
              disabled={saldo <= 0 || juego.apuestaActual === 0}
            >
              🎲 Jugar Bingo
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

export default JuegoBingo;

