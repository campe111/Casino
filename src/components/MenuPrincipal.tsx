import { Vista } from '../App';

interface MenuPrincipalProps {
  cambiarVista: (vista: Vista) => void;
  usuarioActual: any;
}

function MenuPrincipal({ cambiarVista, usuarioActual }: MenuPrincipalProps) {
  return (
    <div className="menu-principal">
      <div className="menu-card">
        <h2>Bienvenido al Casino KING OF COINS</h2>
        {usuarioActual && (
          <div className="usuario-info-badge">
            Usuario: {usuarioActual.getNombreUsuario()} | 
            Saldo: ${usuarioActual.getSaldo()}
          </div>
        )}
        
        <div className="menu-buttons">
          <button 
            className="btn btn-primary" 
            onClick={() => cambiarVista('registro')}
          >
            Registrar Nuevo Usuario
          </button>
          
          <button 
            className="btn btn-primary" 
            onClick={() => cambiarVista('acceso')}
          >
            Acceder a un Usuario
          </button>
          
          <button 
            className="btn btn-secondary" 
            onClick={() => cambiarVista('info')}
          >
            Mostrar Información del Usuario
          </button>
          
          <button 
            className="btn btn-secondary" 
            onClick={() => cambiarVista('billetera')}
          >
            Gestionar Billetera
          </button>
          
          <button 
            className="btn btn-success" 
            onClick={() => cambiarVista('juegos')}
          >
            Juegos
          </button>
          
          <button 
            className="btn btn-info" 
            onClick={() => cambiarVista('instrucciones')}
          >
            Instrucciones
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuPrincipal;

