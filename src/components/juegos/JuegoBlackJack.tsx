import { useState, useEffect } from 'react';
import { BlackJack } from '../../models/BlackJack';
import { Usuario } from '../../models/Usuario';

interface JuegoBlackJackProps {
  juego: BlackJack;
  volver: () => void;
  usuario?: Usuario | null;
  actualizarUsuario?: (usuario: Usuario | null) => void;
}

function JuegoBlackJack({ juego, volver, usuario, actualizarUsuario }: JuegoBlackJackProps) {
  const [apuesta, setApuesta] = useState('');
  const [error, setError] = useState('');
  const [saldo, setSaldo] = useState(juego.billetera.obtenerSaldo());
  const [resultado, setResultado] = useState<any>(null);
  const [mostrarFormularioApuesta, setMostrarFormularioApuesta] = useState(juego.apuestaActual === 0);
  const [fuerzaActualizacion, setFuerzaActualizacion] = useState(0); // Para forzar re-render cuando cambia la mano

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
      juego.repartirCartas(2);
      setApuesta('');
      setMostrarFormularioApuesta(false);
      setFuerzaActualizacion(prev => prev + 1); // Forzar actualización
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlePedirCarta = () => {
    try {
      juego.pedirCarta();
      setResultado(null);
      setFuerzaActualizacion(prev => prev + 1); // Forzar actualización para mostrar nueva carta
      const suma = juego.calcularSumaDeCartas();
      
      // Si se pasó de 21, terminar automáticamente
      if (suma > 21) {
        // Esperar un poco para que se vea la carta antes de terminar
        setTimeout(() => {
          handlePlantarse();
        }, 500);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlePlantarse = () => {
    try {
      const resultadoJuego = juego.plantarse();
      setResultado(resultadoJuego);
      setFuerzaActualizacion(prev => prev + 1); // Forzar actualización para mostrar crupier
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

  const suma = juego.mano.length > 0 ? juego.calcularSumaDeCartas() : 0;
  const sePasoDe21 = suma > 21;
  const esBlackJack = suma === 21 && juego.mano.length === 2;
  const manoCrupier = juego.getManoCrupier();
  const sumaCrupier = manoCrupier.length > 0 ? juego.calcularSumaDeCartasCrupier() : 0;

  return (
    <div className="juego-container">
      <div className="juego-card">
        <h2>🃏 Blackjack</h2>
        
        <div className="saldo-display">
          <h3>Saldo: ${saldo}</h3>
          <p>Apuesta mínima: ${juego.apuestaMinima()}</p>
          {juego.apuestaActual > 0 && (
            <div className="apuesta-actual">
              <p><strong>Apuesta actual: ${juego.apuestaActual}</strong></p>
            </div>
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
            <div className="cartas-blackjack">
              {juego.mano.map((carta, index) => {
                const cartaInfo = juego.obtenerCarta(carta);
                return (
                  <div 
                    key={`${index}-${fuerzaActualizacion}-${carta.valor}-${carta.palo}`} 
                    className={`carta-blackjack ${cartaInfo.esRoja ? 'carta-roja' : 'carta-negra'}`}
                  >
                    <div className="carta-superior">
                      <span className="carta-valor">{cartaInfo.nombre}</span>
                      <span className="carta-palo">{cartaInfo.palo}</span>
                    </div>
                    <div className="carta-centro">
                      <span className="carta-palo-grande">{cartaInfo.palo}</span>
                    </div>
                    <div className="carta-inferior">
                      <span className="carta-palo">{cartaInfo.palo}</span>
                      <span className="carta-valor">{cartaInfo.nombre}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="suma-cartas-container">
              <p className={`suma-cartas ${sePasoDe21 ? 'suma-perdida' : esBlackJack ? 'suma-blackjack' : ''}`}>
                Suma: {suma}
                {esBlackJack && <span className="blackjack-badge"> 🎉 BLACKJACK!</span>}
                {sePasoDe21 && <span className="perdida-badge"> ❌ Te pasaste!</span>}
              </p>
              {juego.juegoEnCurso && !sePasoDe21 && (
                <p className="instruccion-juego">
                  {suma < 17 ? '💡 Consejo: Puedes pedir más cartas' : suma < 21 ? '💡 Considera plantarte' : ''}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Cartas del Crupier */}
        {juego.juegoEnCurso && (
          <div className="cartas-display crupier-oculto">
            <h3>Crupier:</h3>
            <div className="cartas-blackjack">
              <div className="carta-blackjack carta-oculta">
                <div className="carta-superior">
                  <span className="carta-valor">?</span>
                  <span className="carta-palo">?</span>
                </div>
                <div className="carta-centro">
                  <span className="carta-palo-grande">?</span>
                </div>
                <div className="carta-inferior">
                  <span className="carta-palo">?</span>
                  <span className="carta-valor">?</span>
                </div>
              </div>
            </div>
            <p className="instruccion-juego">Carta oculta</p>
          </div>
        )}

        {juego.getCrupierRevelado() && manoCrupier.length > 0 && (
          <div className="cartas-display">
            <h3>Crupier:</h3>
            <div className="cartas-blackjack">
              {manoCrupier.map((carta, index) => {
                const cartaInfo = juego.obtenerCarta(carta);
                return (
                  <div 
                    key={`crupier-${index}-${fuerzaActualizacion}-${carta.valor}-${carta.palo}`} 
                    className={`carta-blackjack ${cartaInfo.esRoja ? 'carta-roja' : 'carta-negra'}`}
                  >
                    <div className="carta-superior">
                      <span className="carta-valor">{cartaInfo.nombre}</span>
                      <span className="carta-palo">{cartaInfo.palo}</span>
                    </div>
                    <div className="carta-centro">
                      <span className="carta-palo-grande">{cartaInfo.palo}</span>
                    </div>
                    <div className="carta-inferior">
                      <span className="carta-palo">{cartaInfo.palo}</span>
                      <span className="carta-valor">{cartaInfo.nombre}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="suma-cartas-container">
              <p className={`suma-cartas ${sumaCrupier > 21 ? 'suma-perdida' : ''}`}>
                Suma Crupier: {sumaCrupier}
                {sumaCrupier > 21 && <span className="perdida-badge"> ❌ Se pasó!</span>}
              </p>
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
                step="1"
                placeholder={`Mínimo: ${juego.apuestaMinima()}`}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {juego.apuestaActual > 0 ? 'Cambiar Apuesta y Repartir' : 'Realizar Apuesta y Repartir'}
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
        
        {!mostrarFormularioApuesta && juego.apuestaActual > 0 && !juego.juegoEnCurso && (
          <div className="apuesta-info">
            <button 
              className="btn btn-secondary"
              onClick={() => setMostrarFormularioApuesta(true)}
            >
              Cambiar Apuesta
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => {
                try {
                  juego.repartirCartas(2);
                  const nuevoSaldo = juego.billetera.obtenerSaldo();
                  setSaldo(nuevoSaldo);
                  if (usuario && actualizarUsuario) {
                    usuario.setSaldo(nuevoSaldo);
                    actualizarUsuario(usuario);
                  }
                  setResultado(null);
                  setError('');
                  setFuerzaActualizacion(prev => prev + 1); // Forzar actualización
                } catch (err: any) {
                  setError(err.message);
                }
              }}
            >
              Repartir Cartas (Apuesta: ${juego.apuestaActual})
            </button>
          </div>
        )}

        {juego.juegoEnCurso && !resultado && !sePasoDe21 && (
          <div className="juego-actions">
            <button onClick={handlePedirCarta} className="btn btn-primary btn-large">
              🃏 Pedir Carta
            </button>
            <button onClick={handlePlantarse} className="btn btn-success btn-large">
              ✅ Plantarse ({suma} puntos)
            </button>
          </div>
        )}

        {sePasoDe21 && !resultado && (
          <div className="juego-actions">
            <div className="alert alert-error">
              <p><strong>¡Te pasaste de 21!</strong></p>
              <p>Has perdido esta ronda. Tu apuesta se ha perdido.</p>
            </div>
            <button 
              onClick={() => {
                const resultadoPerdida = juego.plantarse();
                setResultado(resultadoPerdida);
                setFuerzaActualizacion(prev => prev + 1);
                const nuevoSaldo = juego.billetera.obtenerSaldo();
                setSaldo(nuevoSaldo);
                if (usuario && actualizarUsuario) {
                  usuario.setSaldo(nuevoSaldo);
                  actualizarUsuario(usuario);
                }
              }} 
              className="btn btn-secondary btn-large"
            >
              Continuar
            </button>
          </div>
        )}

        {resultado && juego.apuestaActual > 0 && (
          <div className="juego-actions">
            <button 
              onClick={() => {
                try {
                  juego.repartirCartas(2);
                  const nuevoSaldo = juego.billetera.obtenerSaldo();
                  setSaldo(nuevoSaldo);
                  if (usuario && actualizarUsuario) {
                    usuario.setSaldo(nuevoSaldo);
                    actualizarUsuario(usuario);
                  }
                  setResultado(null);
                  setError('');
                  setFuerzaActualizacion(prev => prev + 1); // Forzar actualización
                } catch (err: any) {
                  setError(err.message);
                }
              }} 
              className="btn btn-success btn-large"
            >
              🃏 Jugar de Nuevo (Apuesta: ${juego.apuestaActual})
            </button>
            <button onClick={volver} className="btn btn-secondary">
              Volver a Juegos
            </button>
          </div>
        )}
        
        {!resultado && !juego.juegoEnCurso && juego.apuestaActual === 0 && (
          <button onClick={volver} className="btn btn-secondary">
            Volver a Juegos
          </button>
        )}
      </div>
    </div>
  );
}

export default JuegoBlackJack;

