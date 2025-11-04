import { useState } from 'react';
import { SlotsSTD } from '../../models/SlotsSTD';

interface JuegoSlotsSTDProps {
  juego: SlotsSTD;
  volver: () => void;
  sincronizarSaldo?: () => void;
}

function JuegoSlotsSTD({ juego, volver, sincronizarSaldo }: JuegoSlotsSTDProps) {
  const [apuesta, setApuesta] = useState('');
  const [resultado, setResultado] = useState<any>(null);
  const [error, setError] = useState('');
  const [saldo, setSaldo] = useState(juego.billetera.obtenerSaldo());

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
        <h2>🎰 Slots STD</h2>
        
        <div className="saldo-display">
          <h3>Saldo: ${saldo}</h3>
          <p>Apuesta mínima: ${juego.apuestaMinima()} | Máxima: ${juego.apuestaMaxima()}</p>
          {juego.apuestaActual > 0 && (
            <p className="apuesta-activa">Apuesta activa: ${juego.apuestaActual}</p>
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
                max={juego.apuestaMaxima()}
                step="1"
                placeholder={`Min: ${juego.apuestaMinima()}, Max: ${juego.apuestaMaxima()}`}
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
          <button 
            onClick={handleJugar} 
            className="btn btn-success btn-large"
            disabled={saldo <= 0 || juego.apuestaActual === 0}
          >
            🎰 Jugar
          </button>
          <button onClick={volver} className="btn btn-secondary">
            Volver a Juegos
          </button>
        </div>
      </div>
    </div>
  );
}

export default JuegoSlotsSTD;

