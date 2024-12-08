import { Apuesta } from "./Interfaz";
import { Juego } from "./Juego";

export class SlotsSTD extends Juego implements Apuesta {
    protected rodillos: string[]; // Símbolos del juego
    protected apuestaActual: number; // Cantidad apostada en este momento
    protected saldoGanado: number; // Total de dinero ganado
    protected saldoPerdido: number; // Total de dinero perdido
    private apuestaMinimaPermitida: number; // Apuesta mínima permitida
    private apuestaMaximaPermitida: number; // Apuesta máxima permitida

    constructor() {
        super('Slots STD', 'Juego de Casino', 10000); // Ajusté el premio a 100 para simplificación
        this.rodillos = ["🍒", "🍑", "🍐", "🍏", "🍎"]; // Posibles símbolos
        this.apuestaActual = 0; // Al principio no hay apuesta
        this.saldoGanado = 0; // No se ha ganado nada todavía
        this.saldoPerdido = 0; // No se ha perdido nada todavía
        this.apuestaMinimaPermitida = 20; // Apuesta mínima de 20
        this.apuestaMaximaPermitida = 1000; // Apuesta máxima de 500
    }

    // Método para realizar una apuesta
    realizarApuesta(monto: number): void {
        if (monto < this.apuestaMinimaPermitida) {
            console.log("La apuesta es menor que la mínima permitida.");
            return;
        }
        if (monto > this.apuestaMaximaPermitida) {
            console.log("La apuesta supera el máximo permitido.");
            return;
        }
        this.apuestaActual = monto; // Guardamos el monto apostado
        console.log(`Apuesta realizada: ${monto}`);
    }

    // Método para obtener el dinero ganado
    dineroGanado(): number {
        return this.saldoGanado; // Devolvemos el saldo ganado
    }

    // Método para obtener el dinero perdido
    dineroPerdido(): number {
        return this.saldoPerdido; // Devolvemos el saldo perdido
    }

    // Método para obtener la apuesta mínima
    apuestaMinima(): number {
        return this.apuestaMinimaPermitida;
    }

    // Método para obtener la apuesta máxima
    apuestaMaxima(): number {
        return this.apuestaMaximaPermitida;
    }

    // Método para generar el resultado
    generarResultado(cantidadDeRodillos: number = 4): string[] {
        return Array.from({ length: cantidadDeRodillos }, () =>
            this.rodillos[Math.floor(Math.random() * this.rodillos.length)]
        );
    }

    // Método para jugar
    jugar(): void {
        if (this.apuestaActual === 0) {
            console.log("Debes realizar una apuesta antes de jugar.");
            return;
        }

        // Generamos el resultado
        const resultado = this.generarResultado(4);
        console.log("Resultado:", resultado.join(""));

        // Lógica de resultados
        if (resultado.every((simbolo) => simbolo === resultado[0])) {
            console.log("¡Jackpot! Los símbolos son iguales.");
            this.saldoGanado += this.apuestaActual * 10; // Gran premio con multiplicador x10
        } else if (new Set(resultado).size === 2) {
            console.log("¡Ganaste! Dos pares iguales.");
            this.saldoGanado += this.apuestaActual * 3; // Premio por dos pares iguales
        } else {
            console.log("Perdiste.");
            this.saldoPerdido += this.apuestaActual; // Pierdes lo que apostaste
        }
    }

    // Método para mostrar las instrucciones del juego
    instruccionJuego(): void {
        console.log(
            `Instrucciones del juego "${this.nombre}": Este es un juego de tipo "${this.tipoDeJuego}". Sigue las reglas si deseas ganar el premio de ${this.premio} puntos.`
        );
    }
}
