import { Vista } from '../App';

interface InstruccionesProps {
  cambiarVista: (vista: Vista) => void;
}

function Instrucciones({ cambiarVista }: InstruccionesProps) {
  return (
    <div className="instrucciones-container">
      <div className="instrucciones-card">
        <h2>Instrucciones del Juego</h2>
        
        <div className="instrucciones-content">
          <section className="instruccion-section">
            <h3>🎰 Tragamonedas (Slots)</h3>
            <p>
              En el juego de <strong>Tragamonedas</strong> (también conocido como <strong>Slots</strong>), 
              el objetivo es hacer girar los carretes para conseguir combinaciones de símbolos en las líneas de pago.
            </p>
            <ul>
              <li><strong>Apuesta:</strong> Elige el monto de tu apuesta y presiona el botón para girar.</li>
              <li><strong>Giros:</strong> Elige cuántos giros deseas hacer.</li>
              <li><strong>Líneas de pago:</strong> Las combinaciones ganadoras dependen de las líneas de pago.</li>
              <li><strong>Símbolos especiales:</strong> Algunos juegos tienen símbolos especiales como comodines.</li>
            </ul>
            <p className="consejo">💡 <strong>Consejo:</strong> ¡El azar está a tu favor! No olvides jugar con responsabilidad.</p>
          </section>

          <section className="instruccion-section">
            <h3>🎲 Bingo</h3>
            <p>
              El <strong>Bingo</strong> es un juego de azar muy popular. Se juega con tarjetas que contienen una serie de números.
            </p>
            <ul>
              <li><strong>Tarjetas:</strong> Al empezar, recibirás una tarjeta de bingo con números al azar.</li>
              <li><strong>Marcaje de números:</strong> Los números son cantados aleatoriamente. Si tienes ese número en tu tarjeta, márcalo.</li>
              <li><strong>Objetivo:</strong> El objetivo es completar una fila, columna, diagonal o todo el cartón.</li>
              <li><strong>Bingo:</strong> Cuando completes todos los números, grita <strong>Bingo</strong> para ganar.</li>
            </ul>
            <p className="consejo">💡 <strong>Consejo:</strong> ¡Esté atento al llamado de los números y marca rápidamente!</p>
          </section>

          <section className="instruccion-section">
            <h3>🃏 Blackjack</h3>
            <p>
              El <strong>Blackjack</strong> es un juego de cartas en el que el objetivo es tener una mano con un valor total de 
              <strong>21</strong> o lo más cercano posible sin pasarse.
            </p>
            <ul>
              <li><strong>Cartas:</strong> Las cartas numeradas del 2 al 10 valen su valor nominal, las cartas con figuras (J, Q, K) valen 10 puntos y el As puede valer 1 o 11 puntos.</li>
              <li><strong>Juego:</strong></li>
              <ul>
                <li>El crupier reparte dos cartas a ti y a sí mismo.</li>
                <li><strong>Pedir carta:</strong> Si deseas aumentar el valor de tu mano, puedes pedir cartas adicionales.</li>
                <li><strong>Plantarse:</strong> Si estás satisfecho con tu mano, puedes plantarte.</li>
              </ul>
              <li><strong>Ganador:</strong> Ganas si tu mano tiene un valor total más cercano a 21 que la del crupier, sin pasarte de 21.</li>
            </ul>
            <p className="consejo">💡 <strong>Consejo:</strong> ¡Ten cuidado con el As! Puede ser un salvavidas o una maldición si no lo usas bien.</p>
          </section>
        </div>

        <div className="instrucciones-footer">
          <button 
            className="btn btn-primary"
            onClick={() => cambiarVista('menu')}
          >
            Volver al Menú Principal
          </button>
        </div>
      </div>
    </div>
  );
}

export default Instrucciones;

