import { useState } from 'react';
import { Casino } from './models/Casino';
import { Usuario } from './models/Usuario';
import MenuPrincipal from './components/MenuPrincipal';
import RegistroUsuario from './components/RegistroUsuario';
import AccesoUsuario from './components/AccesoUsuario';
import InfoUsuario from './components/InfoUsuario';
import GestionBilletera from './components/GestionBilletera';
import MenuJuegos from './components/MenuJuegos';
import Instrucciones from './components/Instrucciones';
import './App.css';

export type Vista = 'menu' | 'registro' | 'acceso' | 'info' | 'billetera' | 'juegos' | 'instrucciones' | 'usuario';

function App() {
  const [casino] = useState(() => new Casino());
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);
  const [vista, setVista] = useState<Vista>('menu');

  const cambiarVista = (nuevaVista: Vista) => {
    setVista(nuevaVista);
  };

  const establecerUsuario = (usuario: Usuario | null) => {
    setUsuarioActual(usuario);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="casino-title">KING OF COING CASINO</h1>
      </header>
      
      <main className="app-main">
        {vista === 'menu' && (
          <MenuPrincipal 
            cambiarVista={cambiarVista} 
            usuarioActual={usuarioActual}
          />
        )}
        
        {vista === 'registro' && (
          <RegistroUsuario 
            casino={casino} 
            cambiarVista={cambiarVista}
            establecerUsuario={establecerUsuario}
          />
        )}
        
        {vista === 'acceso' && (
          <AccesoUsuario 
            casino={casino} 
            cambiarVista={cambiarVista}
            establecerUsuario={establecerUsuario}
          />
        )}
        
        {vista === 'info' && (
          <InfoUsuario 
            casino={casino} 
            cambiarVista={cambiarVista}
          />
        )}
        
        {vista === 'billetera' && (
          <GestionBilletera 
            usuario={usuarioActual}
            cambiarVista={cambiarVista}
          />
        )}
        
        {vista === 'juegos' && (
          <MenuJuegos 
            usuario={usuarioActual}
            cambiarVista={cambiarVista}
          />
        )}
        
        {vista === 'instrucciones' && (
          <Instrucciones cambiarVista={cambiarVista} />
        )}
      </main>
    </div>
  );
}

export default App;

