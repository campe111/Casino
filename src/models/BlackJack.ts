import { Apuesta } from "./Interfaz";
import { Juego } from "./Juego";
import { Billetera } from './Billetera';

class BlackJack extends Juego implements Apuesta {
    public mano: number[] = [];
    resultado: string = '';
    ganancias: number = 0;
    perdidas: number = 0;
    public apuestaActual: number = 0;
    public juegoEnCurso: boolean = false;

    constructor(billetera: Billetera) {
        super('BlackJack', 'Cartas', 50, billetera);
    }

    repartirCartas(numeroDeCartas: number = 2): void {
        this.mano = [];
        for (let i = 0; i < numeroDeCartas; i++) {
            this.mano.push(this.generarCartaAleatoria());
        }
        this.juegoEnCurso = true;
    }

    pedirCarta(): void {
        if (this.juegoEnCurso) {
            this.mano.push(this.generarCartaAleatoria());
        }
    }

    plantarse(): { suma: number; mensaje: string; ganancia: number } {
        if (!this.juegoEnCurso) {
            throw new Error("Debes repartir cartas primero.");
        }

        const suma = this.calcularSumaDeCartas();
        let ganancia = 0;
        let mensaje = "";

        if (suma > 21) {
            this.perdidas += this.apuestaActual;
            mensaje = 'Perdiste, te pasaste de 21.';
        } else {
            ganancia = this.apuestaActual * this.premio;
            this.ganancias += ganancia;
            this.billetera.agregarSaldo(ganancia);
            mensaje = `La suma de tus cartas es ${suma}. Ganaste $${ganancia}.`;
        }

        this.juegoEnCurso = false;
        // NO resetear apuestaActual - permite jugar otra ronda con la misma apuesta
        // Solo se resetea si el usuario hace una nueva apuesta

        return { suma, mensaje, ganancia };
    }

    calcularSumaDeCartas(): number {
        let suma = 0;
        let tieneAs = false;

        for (let valor of this.mano) {
            if (valor > 10) {
                suma += 10;
            } else if (valor === 1) {
                tieneAs = true;
                suma += 11;
            } else {
                suma += valor;
            }
        }

        if (tieneAs && suma > 21) {
            suma -= 10;
        }

        return suma;
    }

    private generarCartaAleatoria(): number {
        const valores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        return valores[Math.floor(Math.random() * valores.length)];
    }

    realizarApuesta(monto: number): void {
        if (monto < this.apuestaMinima()) {
            throw new Error("El monto apostado es menor que la apuesta mínima.");
        } else if (monto > this.billetera.obtenerSaldo()) {
            throw new Error("Saldo insuficiente para realizar la apuesta.");
        } else {
            // Si ya hay una apuesta activa y se está haciendo una nueva, restar solo la diferencia
            // Si no hay apuesta activa o es la primera vez, restar el monto completo
            if (this.apuestaActual > 0 && this.apuestaActual !== monto) {
                // Cambio de apuesta: restar la diferencia
                if (monto > this.apuestaActual) {
                    const diferencia = monto - this.apuestaActual;
                    if (diferencia > this.billetera.obtenerSaldo()) {
                        throw new Error("Saldo insuficiente para aumentar la apuesta.");
                    }
                    this.billetera.restarSaldo(diferencia);
                } else {
                    // Reducir apuesta: devolver la diferencia
                    const diferencia = this.apuestaActual - monto;
                    this.billetera.agregarSaldo(diferencia);
                }
            } else if (this.apuestaActual === 0) {
                // Primera apuesta o nueva apuesta después de resetear
                this.billetera.restarSaldo(monto);
            }
            // Si la apuesta es la misma, no hacer nada
            
            this.apuestaActual = monto;
            this.resultado = '';
            this.juegoEnCurso = false; // Resetear juego si hay una nueva apuesta
        }
    }

    dineroGanado(): number {
        return this.ganancias;
    }

    dineroPerdido(): number {
        return this.perdidas;
    }

    apuestaMinima(): number {
        return 100;
    }

    obtenerCartaNombre(valor: number): string {
        if (valor === 1) return 'As';
        if (valor === 11) return 'J';
        if (valor === 12) return 'Q';
        if (valor === 13) return 'K';
        return valor.toString();
    }
}

export { BlackJack };

