import { Apuesta } from "./Interfaz";
import { Juego } from "./Juego";



export class SlotsSTD extends Juego implements Apuesta {
    protected rodillos: string[]; // Símbolos del juego
    protected apuestaActual: number; // Cantidad apostada en este momento
    protected saldoGanado: number; // Total de dinero ganado
    protected saldoPerdido: number; // Total de dinero perdido
    private apuestaMinimaPermitida: number; // Apuesta mínima permitida
    private apuestaMaximaPermitida: number; // Apuesta máxima permitida

    constructor(nombre: string, tipoDeJuego: string, premio: number) {
        super(nombre, tipoDeJuego, premio); // Llamamos al constructor de la clase padre
        this.rodillos = ["A", "B", "C", "D", "E"]; // Posibles símbolos
        this.apuestaActual = 0; // Al principio no hay apuesta
        this.saldoGanado = 0; // No se ha ganado nada todavía
        this.saldoPerdido = 0; // No se ha perdido nada todavía
        this.apuestaMinimaPermitida = 20;  //apuesta mínima de 20
        this.apuestaMaximaPermitida = 500; // apuesta máxima de 500
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
        return this.saldoGanado += this.apuestaActual; // Devolvemos el saldo ganado
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



    // Método para generar el resultado (modularización)
    generarResultado(cantidadDeRodillos: number = 4): string[] {
        return Array.from({ length: cantidadDeRodillos }, () =>
            this.rodillos[Math.floor(Math.random() * this.rodillos.length)]
        );
    }


    // Método para jugar (usando generarResultado)
    jugar(): void {
        if (this.apuestaActual === 0) {
            console.log("Debes realizar una apuesta antes de jugar.");
            return;
        }

        // Generamos el resultado con 6 rodillos
        const resultado = this.generarResultado(6);

        console.log("Resultado:", resultado);

        // Si los 6 símbolos son iguales
        if (resultado.every((simbolo) => simbolo === resultado[0])) {
            console.log("¡Jackpot! Los 6 símbolos son iguales.");
            this.saldoGanado += this.apuestaActual * 10; // Gran premio con multiplicador x10
        } else if (new Set(resultado).size === 3) {
            console.log("¡Ganaste! Tres pares iguales.");
            this.saldoGanado += this.apuestaActual * 3; // Premio por 3 pares iguales
        } else {
            console.log("Perdiste.");
            this.saldoPerdido += this.apuestaActual; // Pierdes lo que apostaste
        }
    }

    instruccionJuego(): void {
        console.log(
            `Instrucciones del juego "${this.nombre}": Este es un juego de tipo "${this.tipoDeJuego}". Sigue las reglas si deseas ganar el premio de ${this.premio} puntos.`
        );
    }
}

















