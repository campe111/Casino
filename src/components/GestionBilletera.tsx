import { useState } from 'react';
import { Billetera } from '../models/Billetera';
import { Usuario } from '../models/Usuario';
import { Vista } from '../App';

interface GestionBilleteraProps {
  usuario: Usuario | null;
  billetera: Billetera;
  cambiarVista: (vista: Vista) => void;
}

function GestionBilletera({ usuario, billetera, cambiarVista }: GestionBilleteraProps) {
  const [monto, setMonto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleAgregarSaldo = (e: React.FormEvent) => {
    e.preventDefault();
    const cantidad = parseFloat(monto);
    
    if (isNaN(cantidad) || cantidad <= 0) {
      setMensaje('Por favor ingrese un monto válido mayor que 0.');
      return;
    }

    if (usuario) {
      usuario.agregarSaldo(cantidad);
      // Sincronizar billetera con el saldo del usuario
      billetera.establecerSaldo(usuario.getSaldo());
      setMensaje(`Saldo agregado: $${cantidad}. Saldo actual: $${usuario.getSaldo()}`);
    } else {
      billetera.agregarSaldo(cantidad);
      setMensaje(`Saldo agregado: $${cantidad}. Saldo actual: $${billetera.obtenerSaldo()}`);
    }
    setMonto('');
  };

  const saldoActual = usuario ? usuario.getSaldo() : billetera.obtenerSaldo();

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Gestión de Billetera</h2>
        
        <div className="saldo-display">
          <h3>Saldo Actual: ${saldoActual}</h3>
        </div>

        {mensaje && (
          <div className={`alert ${mensaje.includes('agregado') ? 'alert-success' : 'alert-info'}`}>
            {mensaje}
          </div>
        )}

        <form onSubmit={handleAgregarSaldo} className="form">
          <div className="form-group">
            <label htmlFor="monto">Agregar Saldo:</label>
            <input
              type="number"
              id="monto"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              required
              min="0"
              step="0.01"
              placeholder="Ingrese el monto"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Agregar Saldo
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => cambiarVista('menu')}
            >
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GestionBilletera;

