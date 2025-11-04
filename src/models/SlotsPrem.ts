import { Apuesta } from "./Interfaz";
import { SlotsSTD } from "./SlotsSTD";
import { Billetera } from './Billetera';

export class SlotsPrem extends SlotsSTD implements Apuesta {
    private multiplicador: number;
    private multiplicadorMasSimbolos: number;
    private multiplicadorBonus: number;
    private bonus: number;

    constructor(billetera: Billetera) {
        super(billetera);
        this.rodillos = ["🍒", "🍑", "🍐", "🍏", "🍎", "🍋", "🍇"];
        this.multiplicador = 2;
        this.multiplicadorMasSimbolos = 8;
        this.multiplicadorBonus = 10;
        this.bonus = 2000;
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

    jugar(): { resultado: string[]; ganancia: number; mensaje: string } {
        if (this.apuestaActual === 0) {
            throw new Error("Debes realizar una apuesta antes de jugar.");
        }

        const resultado = this.generarResultado(7);
        const simboloMasFrecuente = resultado.reduce((maxSimbolo, simbolo) => {
            return resultado.filter(s => s === simbolo).length > resultado.filter(s => s === maxSimbolo).length ? simbolo : maxSimbolo;
        }, resultado[0]);

        const cantidadMaxima = resultado.filter(s => s === simboloMasFrecuente).length;
        let ganancia = 0;
        let mensaje = "";

        if (cantidadMaxima === 7) {
            ganancia = this.apuestaActual * this.multiplicadorBonus + this.bonus;
            mensaje = "¡Jackpot! Todos los símbolos son iguales. ¡Felicitaciones!";
            this.billetera.agregarSaldo(ganancia);
        } else if (cantidadMaxima === 6) {
            mensaje = "¡Seis iguales! Has ganado un premio especial.";
            ganancia = this.apuestaActual * this.multiplicadorMasSimbolos;
            this.billetera.agregarSaldo(ganancia);
        } else if (cantidadMaxima === 5) {
            mensaje = "¡Cinco iguales! Has ganado un premio increíble.";
            ganancia = this.apuestaActual * this.multiplicadorMasSimbolos;
            this.billetera.agregarSaldo(ganancia);
        } else if (cantidadMaxima === 4) {
            mensaje = "¡Cuatro iguales! Has ganado un premio especial.";
            ganancia = this.apuestaActual * this.multiplicadorMasSimbolos;
            this.billetera.agregarSaldo(ganancia);
        } else if (cantidadMaxima === 3) {
            mensaje = "¡Tres iguales! Has ganado un premio.";
            ganancia = this.apuestaActual * this.multiplicador;
            this.billetera.agregarSaldo(ganancia);
        } else if (cantidadMaxima === 2) {
            mensaje = "¡Hay Dos iguales! Has ganado un premio.";
            ganancia = this.apuestaActual * this.multiplicador;
            this.billetera.agregarSaldo(ganancia);
        } else {
            mensaje = "Perdiste.";
        }

        // NO resetear apuestaActual - mantener la apuesta para la siguiente ronda
        // this.apuestaActual = 0;
        return { resultado, ganancia, mensaje };
    }
}

