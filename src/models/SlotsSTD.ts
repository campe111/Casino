import { Apuesta } from "./Interfaz";
import { Juego } from "./Juego";
import { Billetera } from "./Billetera";

export class SlotsSTD extends Juego implements Apuesta {
    public rodillos: string[];
    public apuestaActual: number;
    protected saldoGanado: number;
    protected saldoPerdido: number;
    private premioSlost: number;
    private premioBasico: number;
    private apuestaMinimaPermitida: number;
    private apuestaMaximaPermitida: number;

    constructor(billetera: Billetera) {
        super("Slots STD", "Juego de Casino", 10, billetera);
        this.rodillos = ["🍒", "🍑", "🍐", "🍏"];
        this.premioSlost = 10;
        this.premioBasico = 2;
        this.apuestaActual = 0;
        this.saldoGanado = 0;
        this.saldoPerdido = 0;
        this.apuestaMinimaPermitida = 20;
        this.apuestaMaximaPermitida = 500;
    }

    realizarApuesta(monto: number): void {
        if (monto < this.apuestaMinimaPermitida) {
            throw new Error("La apuesta es menor que la mínima permitida.");
        } else if (monto > this.apuestaMaximaPermitida) {
            throw new Error("La apuesta supera el máximo permitido.");
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
        }
    }

    dineroGanado(): number {
        return this.saldoGanado;
    }

    dineroPerdido(): number {
        return this.saldoPerdido;
    }

    apuestaMinima(): number {
        return this.apuestaMinimaPermitida;
    }

    apuestaMaxima(): number {
        return this.apuestaMaximaPermitida;
    }

    generarResultado(cantidadDeRodillos: number = 4): string[] {
        return Array.from(
            { length: cantidadDeRodillos },
            () => this.rodillos[Math.floor(Math.random() * this.rodillos.length)]
        );
    }

    jugar(): { resultado: string[]; ganancia: number; mensaje: string } {
        if (this.apuestaActual === 0) {
            throw new Error("Debes realizar una apuesta antes de jugar.");
        }

        const resultado = this.generarResultado(4);
        const simboloMasFrecuente = resultado.reduce((maxSimbolo, simbolo) => {
            return resultado.filter(s => s === simbolo).length > resultado.filter(s => s === maxSimbolo).length ? simbolo : maxSimbolo;
        }, resultado[0]);

        const cantidadMaxima = resultado.filter(s => s === simboloMasFrecuente).length;
        let ganancia = 0;
        let mensaje = "";

        if (cantidadMaxima === 4) {
            mensaje = "¡Cuatro iguales! Has ganado un premio especial.";
            ganancia = this.apuestaActual * this.premioSlost;
            this.saldoGanado += ganancia;
        } else if (cantidadMaxima === 3) {
            mensaje = "¡Tres iguales! Has ganado un premio.";
            ganancia = this.apuestaActual * this.premioBasico;
            this.saldoGanado += ganancia;
        } else if (cantidadMaxima === 2) {
            mensaje = "¡Hay Dos iguales! Has ganado un premio.";
            ganancia = this.apuestaActual * this.premioBasico;
            this.saldoGanado += ganancia;
        } else {
            mensaje = "Perdiste.";
            this.saldoPerdido += this.apuestaActual;
        }

        if (ganancia > 0) {
            this.billetera.agregarSaldo(ganancia);
        }

        // NO resetear apuestaActual - mantener la apuesta para la siguiente ronda
        // this.apuestaActual = 0;
        this.saldoGanado = 0;
        this.saldoPerdido = 0;

        return { resultado, ganancia, mensaje };
    }
}

