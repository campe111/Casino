import { Juego } from "./Juego";
import { Apuesta } from "./Interfaz";

export class BlackJack extends Juego implements Apuesta {
    private apuestaActual: number;
    private saldoGanado: number;

    constructor(nombre: string, tipoDeJuego: string, premio: number) {
        super(nombre, tipoDeJuego, premio);
        this.apuestaActual = 0;
        this.saldoGanado = 0;
    }

    dineroGanado(): number {
        return this.apuestaActual * this.saldoGanado;
    }

    dineroPerdido(): number {
        return this.apuestaActual - this.saldoGanado;
    }

    apuestaMinima(): number {
        if (this.apuestaActual < 100) {
            console.log(`Saldo insuficiente para realizar la apuesta.`);
        } else {
            console.log(`Apuesta realizada con ${this.apuestaActual} puntos.`);
        }
        return this.apuestaActual;
    }

    apuestaMaxima(): number {
        throw new Error("Method not implemented.");
    }

    // Métodos de la Interfaz Apuesta
    realizarApuesta(monto: number): void {
        if (monto < this.apuestaActual) {
            this.apuestaActual = monto;
            this.saldoGanado = this.apuestaActual;
        } else {
            this.saldoGanado = 0;
        }
    }

        //Metodos de la interfaz Juego
        getPremio(): number {
            return this.premio;
        }
        getEstado(): string {
            return this.estado;
        }

        getNombre(): string {
            return this.nombre;
        }
        getTipoDeJuego(): string {
            return this.tipoDeJuego;
        }

        instruccionJuego(): void {
            console.log(
                `Instrucciones del juego "${this.nombre}": Este es un juego de tipo "${this.tipoDeJuego}". Sigue las reglas si deseas ganar el premio de ${this.premio} puntos.`
            );
        }

}