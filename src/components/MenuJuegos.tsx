import { useState } from 'react';
import { Usuario } from '../models/Usuario';
import { Vista } from '../App';
import { SlotsSTD } from '../models/SlotsSTD';
import { SlotsPrem } from '../models/SlotsPrem';
import { BlackJack } from '../models/BlackJack';
import { Bingo } from '../models/Bingo';
import JuegoSlotsSTD from './juegos/JuegoSlotsSTD';
import JuegoSlotsPrem from './juegos/JuegoSlotsPrem';
import JuegoBlackJack from './juegos/JuegoBlackJack';
import JuegoBingo from './juegos/JuegoBingo';

interface MenuJuegosProps {
  usuario: Usuario | null;
  cambiarVista: (vista: Vista) => void;
}

type JuegoSeleccionado = 'menu' | 'slotsSTD' | 'slotsPrem' | 'blackjack' | 'bingo';

function MenuJuegos({ usuario, cambiarVista }: MenuJuegosProps) {
  const [juegoSeleccionado, setJuegoSeleccionado] = useState<JuegoSeleccionado>('menu');
  const [juego, setJuego] = useState<any>(null);

  if (!usuario) {
    return (
      <div className="menu-principal">
        <div className="menu-card">
          <h2>Debes iniciar sesión para jugar</h2>
          <button 
            className="btn btn-secondary"
            onClick={() => cambiarVista('menu')}
          >
            Volver al Menú Principal
          </button>
        </div>
      </div>
    );
  }

  const iniciarJuego = (tipo: JuegoSeleccionado) => {
    // Obtener la billetera sincronizada del usuario
    const billetera = usuario.getBilletera();
    let nuevoJuego;
    
    switch (tipo) {
      case 'slotsSTD':
        nuevoJuego = new SlotsSTD(billetera);
        break;
      case 'slotsPrem':
        nuevoJuego = new SlotsPrem(billetera);
        break;
      case 'blackjack':
        nuevoJuego = new BlackJack(billetera);
        break;
      case 'bingo':
        nuevoJuego = new Bingo(billetera);
        break;
      default:
        return;
    }
    
    setJuego(nuevoJuego);
    setJuegoSeleccionado(tipo);
  };

  const volverAlMenu = () => {
    setJuegoSeleccionado('menu');
    setJuego(null);
  };

  if (juegoSeleccionado === 'menu') {
    return (
      <div className="menu-principal">
        <div className="menu-card">
          <h2>Seleccione el Juego</h2>
          
          <div className="menu-buttons">
            <button 
              className="btn btn-success btn-large" 
              onClick={() => iniciarJuego('slotsSTD')}
            >
              🎰 Slots STD
            </button>
            
            <button 
              className="btn btn-success btn-large" 
              onClick={() => iniciarJuego('slotsPrem')}
            >
              🎰 Slots Premium
            </button>
            
            <button 
              className="btn btn-success btn-large" 
              onClick={() => iniciarJuego('blackjack')}
            >
              🃏 Blackjack
            </button>
            
            <button 
              className="btn btn-success btn-large" 
              onClick={() => iniciarJuego('bingo')}
            >
              🎲 Bingo
            </button>
            
            <button 
              className="btn btn-secondary" 
              onClick={() => cambiarVista('menu')}
            >
              Volver al Menú Principal
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Función para sincronizar el saldo del usuario con la billetera del juego
  const sincronizarSaldo = () => {
    if (usuario && juego) {
      const saldoBilletera = juego.billetera.obtenerSaldo();
      usuario.setSaldo(saldoBilletera);
    }
  };

  if (juegoSeleccionado === 'slotsSTD' && juego) {
    return <JuegoSlotsSTD juego={juego} volver={volverAlMenu} sincronizarSaldo={sincronizarSaldo} />;
  }

  if (juegoSeleccionado === 'slotsPrem' && juego) {
    return <JuegoSlotsPrem juego={juego} volver={volverAlMenu} sincronizarSaldo={sincronizarSaldo} />;
  }

  if (juegoSeleccionado === 'blackjack' && juego) {
    return <JuegoBlackJack juego={juego} volver={volverAlMenu} sincronizarSaldo={sincronizarSaldo} />;
  }

  if (juegoSeleccionado === 'bingo' && juego) {
    return <JuegoBingo juego={juego} volver={volverAlMenu} sincronizarSaldo={sincronizarSaldo} />;
  }

  return null;
}

export default MenuJuegos;

