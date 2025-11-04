import { Apuesta } from "./Interfaz";
import { Juego } from "./Juego";
import { Billetera } from './Billetera';

interface Carta {
    valor: number;
    palo: string;
}

class BlackJack extends Juego implements Apuesta {
    public mano: Carta[] = [];
    private manoCrupier: Carta[] = [];
    resultado: string = '';
    ganancias: number = 0;
    perdidas: number = 0;
    public apuestaActual: number = 0;
    public juegoEnCurso: boolean = false;
    public crupierRevelado: boolean = false;

    constructor(billetera: Billetera) {
        super('BlackJack', 'Cartas', 50, billetera);
    }

    repartirCartas(numeroDeCartas: number = 2): void {
        // Si hay una apuesta y el juego no está en curso, descontar la apuesta para nueva ronda
        if (this.apuestaActual > 0 && !this.juegoEnCurso) {
            // Verificar que hay suficiente saldo
            if (this.apuestaActual > this.billetera.obtenerSaldo()) {
                throw new Error("Saldo insuficiente para jugar con esta apuesta. Carga más saldo o cambia la apuesta.");
            }
            // Descontar la apuesta para la nueva ronda
            this.billetera.restarSaldo(this.apuestaActual);
        }

        this.mano = [];
        this.manoCrupier = [];
        this.resultado = '';
        this.crupierRevelado = false;
        // Repartir cartas al jugador
        for (let i = 0; i < numeroDeCartas; i++) {
            this.mano.push(this.generarCartaAleatoria());
        }
        // Repartir una carta inicial al crupier (oculta)
        this.manoCrupier.push(this.generarCartaAleatoria());
        this.juegoEnCurso = true;
    }

    pedirCarta(): void {
        if (this.juegoEnCurso) {
            this.mano.push(this.generarCartaAleatoria());
            // Verificar automáticamente si se pasó de 21
            const suma = this.calcularSumaDeCartas();
            if (suma > 21) {
                this.juegoEnCurso = false;
            }
        }
    }

    plantarse(): { suma: number; mensaje: string; ganancia: number; sumaCrupier: number } {
        const suma = this.calcularSumaDeCartas();
        
        // Si el jugador se pasó de 21, pierde automáticamente
        if (suma > 21) {
            this.perdidas += this.apuestaActual;
            this.juegoEnCurso = false;
            this.crupierRevelado = true;
            return { 
                suma, 
                mensaje: 'Perdiste, te pasaste de 21.', 
                ganancia: 0,
                sumaCrupier: this.calcularSumaDeCartasCrupier()
            };
        }

        // El crupier juega: saca cartas hasta llegar a 17 o más
        this.jugarCrupier();
        this.crupierRevelado = true;

        const sumaCrupier = this.calcularSumaDeCartasCrupier();
        let ganancia = 0;
        let mensaje = "";

        // Determinar ganador
        if (sumaCrupier > 21) {
            // Crupier se pasó, jugador gana
            ganancia = this.apuestaActual * this.premio;
            this.ganancias += ganancia;
            this.billetera.agregarSaldo(ganancia);
            mensaje = `Crupier se pasó (${sumaCrupier}). Tu suma: ${suma}. ¡Ganaste $${ganancia}!`;
        } else if (suma > sumaCrupier) {
            // Jugador tiene más puntos
            ganancia = this.apuestaActual * this.premio;
            this.ganancias += ganancia;
            this.billetera.agregarSaldo(ganancia);
            mensaje = `Tu suma: ${suma}, Crupier: ${sumaCrupier}. ¡Ganaste $${ganancia}!`;
        } else if (suma === sumaCrupier) {
            // Empate
            this.billetera.agregarSaldo(this.apuestaActual); // Devolver apuesta en empate
            mensaje = `Empate. Tu suma: ${suma}, Crupier: ${sumaCrupier}. Se devuelve tu apuesta.`;
        } else {
            // Crupier tiene más puntos
            this.perdidas += this.apuestaActual;
            mensaje = `Tu suma: ${suma}, Crupier: ${sumaCrupier}. Perdiste.`;
        }

        this.juegoEnCurso = false;
        // NO resetear apuestaActual - mantener la apuesta para la siguiente ronda

        return { suma, mensaje, ganancia, sumaCrupier };
    }

    private jugarCrupier(): void {
        // El crupier saca cartas hasta llegar a 17 o más
        while (this.calcularSumaDeCartasCrupier() < 17) {
            this.manoCrupier.push(this.generarCartaAleatoria());
        }
    }

    calcularSumaDeCartasCrupier(): number {
        let suma = 0;
        let tieneAs = false;

        for (let carta of this.manoCrupier) {
            const valor = carta.valor;
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

    getManoCrupier(): Carta[] {
        return this.crupierRevelado ? this.manoCrupier : [];
    }

    getCrupierRevelado(): boolean {
        return this.crupierRevelado;
    }

    calcularSumaDeCartas(): number {
        let suma = 0;
        let tieneAs = false;

        for (let carta of this.mano) {
            const valor = carta.valor;
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

    private generarCartaAleatoria(): Carta {
        const valores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        const palos = ['♠', '♥', '♦', '♣']; // Espadas, Corazones, Diamantes, Tréboles
        return {
            valor: valores[Math.floor(Math.random() * valores.length)],
            palo: palos[Math.floor(Math.random() * palos.length)]
        };
    }

    obtenerCarta(carta: Carta): { nombre: string; palo: string; valor: number; esRoja: boolean } {
        let nombre = '';
        if (carta.valor === 1) nombre = 'A';
        else if (carta.valor === 11) nombre = 'J';
        else if (carta.valor === 12) nombre = 'Q';
        else if (carta.valor === 13) nombre = 'K';
        else nombre = carta.valor.toString();

        const esRoja = carta.palo === '♥' || carta.palo === '♦';

        return {
            nombre,
            palo: carta.palo,
            valor: carta.valor,
            esRoja
        };
    }

    realizarApuesta(monto: number): void {
        if (monto < this.apuestaMinima()) {
            throw new Error("El monto apostado es menor que la apuesta mínima.");
        } else if (monto > this.billetera.obtenerSaldo()) {
            throw new Error("Saldo insuficiente para realizar la apuesta.");
        } else {
            // Si ya hay una apuesta, devolver el saldo de la apuesta anterior
            if (this.apuestaActual > 0) {
                this.billetera.agregarSaldo(this.apuestaActual);
            }
            
            // Descontar la nueva apuesta
            this.billetera.restarSaldo(monto);
            this.apuestaActual = monto;
            this.resultado = '';
            this.juegoEnCurso = false; // Resetear estado del juego para nueva ronda
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

}

export { BlackJack };

