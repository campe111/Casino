import { useState, useEffect } from 'react';
import { Bingo } from '../../models/Bingo';
import { Usuario } from '../../models/Usuario';

interface JuegoBingoProps {
  juego: Bingo;
  volver: () => void;
  usuario?: Usuario | null;
  actualizarUsuario?: (usuario: Usuario | null) => void;
}

function JuegoBingo({ juego, volver, usuario, actualizarUsuario }: JuegoBingoProps) {
  const [apuesta, setApuesta] = useState('');
  const [error, setError] = useState('');
  const [saldo, setSaldo] = useState(juego.billetera.obtenerSaldo());
  const [resultado, setResultado] = useState<any>(null);
  const [mostrarFormularioApuesta, setMostrarFormularioApuesta] = useState(juego.apuestaActual === 0);
  const [juegoEnProgreso, setJuegoEnProgreso] = useState(false);
  const [bolaActual, setBolaActual] = useState<number | null>(null);
  const [mostrarBola, setMostrarBola] = useState(false);
  const [fuerzaActualizacion, setFuerzaActualizacion] = useState(0);

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

  const handleIniciarJuego = () => {
    setError('');
    setResultado(null);
    setJuegoEnProgreso(false);
    setBolaActual(null);
    setMostrarBola(false);
    
    try {
      juego.iniciarJuego();
      setJuegoEnProgreso(true);
      simularTiradas();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const simularTiradas = () => {
    const intervalo = setInterval(() => {
      try {
        const resultadoBola = juego.sacarBola();
        setFuerzaActualizacion(prev => prev + 1); // Forzar actualización del cartón
        
        if (resultadoBola.numero > 0) {
          setBolaActual(resultadoBola.numero);
          setMostrarBola(true);
          
          if (resultadoBola.juegoTerminado) {
            clearInterval(intervalo);
            setTimeout(() => {
              setMostrarBola(false);
              const resultadoFinal = juego.finalizarJuego();
              setResultado(resultadoFinal);
              setJuegoEnProgreso(false);
              setFuerzaActualizacion(prev => prev + 1);
              const nuevoSaldo = juego.billetera.obtenerSaldo();
              setSaldo(nuevoSaldo);
              if (usuario && actualizarUsuario) {
                usuario.setSaldo(nuevoSaldo);
                actualizarUsuario(usuario);
              }
            }, 2000);
            return;
          }
          
          // Ocultar bola después de 1.5 segundos
          setTimeout(() => {
            setMostrarBola(false);
          }, 1500);
        } else {
          // Se terminaron las tiradas
          clearInterval(intervalo);
          const resultadoFinal = juego.finalizarJuego();
          setResultado(resultadoFinal);
          setJuegoEnProgreso(false);
          setFuerzaActualizacion(prev => prev + 1);
          const nuevoSaldo = juego.billetera.obtenerSaldo();
          setSaldo(nuevoSaldo);
          if (usuario && actualizarUsuario) {
            usuario.setSaldo(nuevoSaldo);
            actualizarUsuario(usuario);
          }
        }
      } catch (err: any) {
        clearInterval(intervalo);
        setError(err.message);
        setJuegoEnProgreso(false);
      }
    }, 1800); // Intervalo entre cada bola
  };

  return (
    <div className="juego-container">
      <div className="juego-card">
        <h2>🎲 Bingo</h2>
        
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
        
        {/* Mostrar cartón durante el juego */}
        {juego.apuestaActual > 0 && (
          <div className="bingo-carton">
            <h3>Tu Cartón:</h3>
            <div className="carton-grid">
              {juego.getCarton().map((numero: number, index: number) => {
                const marcado = juego.getBolasMarcadas().includes(numero);
                const tieneLinea = juego.getTieneLinea();
                const cartonCompleto = juego.getCartonCompleto();
                let claseEstado = '';
                
                if (cartonCompleto && marcado) {
                  claseEstado = 'carton-completo';
                } else if (tieneLinea && marcado) {
                  claseEstado = 'linea-completa';
                }
                
                return (
                  <div 
                    key={`${index}-${fuerzaActualizacion}-${numero}`} 
                    className={`carton-numero ${marcado ? 'marcado' : ''} ${claseEstado}`}
                  >
                    {numero} {marcado && '✅'}
                  </div>
                );
              })}
            </div>
            {juegoEnProgreso && (
              <div className="juego-info">
                <p className="tiradas-restantes">Tiradas restantes: {juego.getTiradasRestantes()}</p>
                {juego.getTieneLinea() && (
                  <div className="alert alert-success">
                    <strong>🎉 ¡LÍNEA COMPLETA!</strong>
                  </div>
                )}
                {juego.getCartonCompleto() && (
                  <div className="alert alert-success">
                    <strong>🎊 ¡CARTÓN COMPLETO - BINGO!</strong>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Casilla de números saliendo */}
        {juegoEnProgreso && mostrarBola && bolaActual && (
          <div className="bola-saliendo">
            <div className="bola-display">
              <h3>Número Saliendo:</h3>
              <div className="bola-numero">{bolaActual}</div>
              {juego.getBolasMarcadas().includes(bolaActual) && (
                <p className="bola-marcada">✅ ¡Está en tu cartón!</p>
              )}
            </div>
          </div>
        )}
        
        {/* Números que ya salieron */}
        {juegoEnProgreso && juego.getBolasSalidas().length > 0 && (
          <div className="bolas-salidas">
            <h4>Números que ya salieron:</h4>
            <div className="bolas-salidas-grid">
              {juego.getBolasSalidas().slice(-10).map((bola, index) => (
                <span key={index} className={`bola-salida ${juego.getBolasMarcadas().includes(bola) ? 'marcada' : ''}`}>
                  {bola}
                </span>
              ))}
            </div>
          </div>
        )}
        
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

        {!resultado && (
          <>
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
          </>
        )}

        <div className="juego-actions">
          {!juegoEnProgreso && !resultado && juego.apuestaActual > 0 && (
            <button 
              onClick={handleIniciarJuego} 
              className="btn btn-success btn-large"
              disabled={saldo <= 0}
            >
              🎲 Iniciar Bingo (Apuesta: ${juego.apuestaActual})
            </button>
          )}
          {juegoEnProgreso && (
            <div className="juego-en-progreso">
              <p className="simulando">🎲 Simulando tiradas...</p>
            </div>
          )}
          {resultado && juego.apuestaActual > 0 && (
            <button 
              onClick={handleIniciarJuego} 
              className="btn btn-success btn-large"
            >
              🎲 Jugar de Nuevo (Apuesta: ${juego.apuestaActual})
            </button>
          )}
          <button onClick={volver} className="btn btn-secondary" disabled={juegoEnProgreso}>
            Volver a Juegos
          </button>
        </div>
      </div>
    </div>
  );
}

export default JuegoBingo;

