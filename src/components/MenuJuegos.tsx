import { useState, useEffect } from 'react';
import { Billetera } from '../models/Billetera';
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
  billetera: Billetera;
  usuario?: Usuario | null;
  cambiarVista: (vista: Vista) => void;
  actualizarUsuario?: (usuario: Usuario | null) => void;
}

type JuegoSeleccionado = 'menu' | 'slotsSTD' | 'slotsPrem' | 'blackjack' | 'bingo';

function MenuJuegos({ billetera, usuario, cambiarVista, actualizarUsuario }: MenuJuegosProps) {
  const [juegoSeleccionado, setJuegoSeleccionado] = useState<JuegoSeleccionado>('menu');
  const [juego, setJuego] = useState<any>(null);

  // Sincronizar billetera con el saldo del usuario cuando se inicia el componente
  useEffect(() => {
    if (usuario) {
      const saldoUsuario = usuario.getSaldo();
      billetera.establecerSaldo(saldoUsuario);
    }
  }, []);

  const iniciarJuego = (tipo: JuegoSeleccionado) => {
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
    // Sincronizar saldo del usuario con la billetera antes de volver
    if (usuario && actualizarUsuario) {
      const saldoBilletera = billetera.obtenerSaldo();
      usuario.setSaldo(saldoBilletera);
      actualizarUsuario(usuario);
    }
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

  if (juegoSeleccionado === 'slotsSTD' && juego) {
    return <JuegoSlotsSTD juego={juego} volver={volverAlMenu} usuario={usuario} actualizarUsuario={actualizarUsuario} />;
  }

  if (juegoSeleccionado === 'slotsPrem' && juego) {
    return <JuegoSlotsPrem juego={juego} volver={volverAlMenu} usuario={usuario} actualizarUsuario={actualizarUsuario} />;
  }

  if (juegoSeleccionado === 'blackjack' && juego) {
    return <JuegoBlackJack juego={juego} volver={volverAlMenu} usuario={usuario} actualizarUsuario={actualizarUsuario} />;
  }

  if (juegoSeleccionado === 'bingo' && juego) {
    return <JuegoBingo juego={juego} volver={volverAlMenu} usuario={usuario} actualizarUsuario={actualizarUsuario} />;
  }

  return null;
}

export default MenuJuegos;

