import { Apuesta } from "./Interfaz";
import { SlotsSTD } from "./SlotsSTD";
import { Billetera } from './Billetera';

export class SlotsPrem extends SlotsSTD implements Apuesta {
    private multiplicador: number; // Multiplicador de las ganancias
    private multiplicadorMasSimbolos: number;
    private multiplicadorBonus: number;
    private bonus: number; // Bono fijo por Jackpot

    constructor(billetera: Billetera) {
        super( billetera);
        this.rodillos = ["🍒", "🍑", "🍐", "🍏", "🍎", "🍋", "🍇"]; // Símbolos adicionales
        this.multiplicador = 2; // Multiplicador base
        this.multiplicadorMasSimbolos = 8; // Multiplicador para más de 4 símbolos iguales
        this.multiplicadorBonus = 10; // Multiplicador Bonus
        this.bonus = 2000; // Bono fijo por Jackpot
    }

    getMultiplicador(): number {
        return this.multiplicador;
    }

    getBonus(): number {
        return this.bonus;
    }

    generarResultado(cantidadDeRodillos: number = 7): string[] {
        return Array.from({ length: cantidadDeRodillos }, () =>
            this.rodillos[Math.floor(Math.random() * this.rodillos.length)]
        );
    }

    jugar(): void {
        if (this.apuestaActual === 0) {
            console.log("Debes realizar una apuesta antes de jugar.");
            return;
        }

        const resultado = this.generarResultado(7);

        console.log("Resultado:", resultado.join(""));

        const simboloMasFrecuente = resultado.reduce((maxSimbolo, simbolo) => {
            return resultado.filter(s => s === simbolo).length > resultado.filter(s => s === maxSimbolo).length ? simbolo : maxSimbolo;
        }, resultado[0]);

        const cantidadMaxima = resultado.filter(s => s === simboloMasFrecuente).length;

        if (cantidadMaxima === 7) {
            this.billetera.agregarSaldo(this.apuestaActual * this.multiplicadorBonus + this.bonus);
            console.log("¡Jackpot! Todos los símbolos son iguales. ¡Felicitaciones!");
        } else if (cantidadMaxima === 6) {
            console.log("¡Seis iguales! Has ganado un premio especial.");
            this.billetera.agregarSaldo(this.apuestaActual * this.multiplicadorMasSimbolos);
        } else if (cantidadMaxima === 5) {
            console.log("¡Cinco iguales! Has ganado un premio increíble.");
            this.billetera.agregarSaldo(this.apuestaActual * this.multiplicadorMasSimbolos);
        } else if (cantidadMaxima === 4) {
            console.log("¡Cuatro iguales! Has ganado un premio especial.");
            this.billetera.agregarSaldo(this.apuestaActual * this.multiplicadorMasSimbolos);
        } else if (cantidadMaxima === 3) {
            console.log("¡Tres iguales! Has ganado un premio.");
            this.billetera.agregarSaldo(this.apuestaActual * this.multiplicador);
        } else if (cantidadMaxima === 2) {
            console.log("¡Hay Dos iguales! Has ganado un premio.");
            this.billetera.agregarSaldo(this.apuestaActual * this.multiplicador);
        } else {
            console.log("Perdiste.");
        }

        this.apuestaActual = 0;
    }

    instruccionJuego(): void {
        console.log(
            `Instrucciones del juego "${this.nombre}": Este es un juego de tipo "${this.tipoDeJuego}". Sigue las reglas si deseas ganar el premio de ${this.premio} puntos.`
        );
    }
}
