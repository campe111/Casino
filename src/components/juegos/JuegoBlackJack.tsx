import { useState } from 'react';
import { BlackJack } from '../../models/BlackJack';

interface JuegoBlackJackProps {
  juego: BlackJack;
  volver: () => void;
  sincronizarSaldo?: () => void;
}

function JuegoBlackJack({ juego, volver, sincronizarSaldo }: JuegoBlackJackProps) {
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
      juego.repartirCartas(2);
      setApuesta('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlePedirCarta = () => {
    try {
      juego.pedirCarta();
      setResultado(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlePlantarse = () => {
    try {
      const resultadoJuego = juego.plantarse();
      setResultado(resultadoJuego);
      setSaldo(juego.billetera.obtenerSaldo());
      sincronizarSaldo?.();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const suma = juego.mano.length > 0 ? juego.calcularSumaDeCartas() : 0;

  return (
    <div className="juego-container">
      <div className="juego-card">
        <h2>🃏 Blackjack</h2>
        
        <div className="saldo-display">
          <h3>Saldo: ${saldo}</h3>
          <p>Apuesta mínima: ${juego.apuestaMinima()}</p>
          {juego.apuestaActual > 0 && (
            <p className="apuesta-activa">Apuesta activa: ${juego.apuestaActual}</p>
          )}
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {resultado && (
          <div className={`resultado-mensaje ${resultado.ganancia > 0 ? 'ganancia' : 'perdida'}`}>
            <p>{resultado.mensaje}</p>
            {resultado.ganancia > 0 && (
              <p className="ganancia-amount">Ganaste: ${resultado.ganancia}</p>
            )}
          </div>
        )}

        {juego.mano.length > 0 && (
          <div className="cartas-display">
            <h3>Tu Mano:</h3>
            <div className="cartas">
              {juego.mano.map((carta, index) => (
                <div key={index} className="carta">
                  {juego.obtenerCartaNombre(carta)}
                </div>
              ))}
            </div>
            <p className="suma-cartas">Suma: {suma}</p>
          </div>
        )}

        {juego.apuestaActual === 0 && (
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
              <button type="submit" className="btn btn-primary">Realizar Apuesta y Repartir</button>
            </div>
          </form>
        )}

        {juego.apuestaActual > 0 && !juego.juegoEnCurso && !resultado && (
          <div className="apuesta-info">
            <p className="alert alert-info">
              Tienes una apuesta activa de ${juego.apuestaActual}. Puedes jugar otra ronda con la misma apuesta.
            </p>
            <div className="form-actions">
              <button 
                onClick={() => {
                  juego.repartirCartas(2);
                  setResultado(null);
                  setError('');
                }} 
                className="btn btn-primary"
              >
                Jugar Otra Ronda
              </button>
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
          </div>
        )}

        {juego.juegoEnCurso && !resultado && (
          <div className="juego-actions">
            <button onClick={handlePedirCarta} className="btn btn-primary">
              Pedir Carta
            </button>
            <button onClick={handlePlantarse} className="btn btn-success">
              Plantarse
            </button>
          </div>
        )}

        <div className="juego-actions">
          <button onClick={volver} className="btn btn-secondary">
            Volver a Juegos
          </button>
        </div>
      </div>
    </div>
  );
}

export default JuegoBlackJack;

