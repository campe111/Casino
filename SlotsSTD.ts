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


    // Método para jugar (simula una tirada)
    jugar(): void {
        if (this.apuestaActual === 0) { // Verifica si no se ha realizado ninguna apuesta
            console.log("Debes realizar una apuesta antes de jugar.");
            return;
        }

        // Generamos 3 símbolos aleatorios
        const resultado = [
            this.rodillos[Math.floor(Math.random() * this.rodillos.length)],
            this.rodillos[Math.floor(Math.random() * this.rodillos.length)],
            this.rodillos[Math.floor(Math.random() * this.rodillos.length)],
            this.rodillos[Math.floor(Math.random() * this.rodillos.length)],

        ];

        console.log("Resultado:", resultado);

        // Si los 4 símbolos son iguales, ganas
        if (resultado[0] === resultado[1] && resultado[1] === resultado[2]) {
            console.log("¡Ganaste!");
            this.saldoGanado += this.apuestaActual * 4;
            //Si los 2 símbolos son iguales, ganas
        } else if (resultado[0] === resultado[1] || resultado[1] === resultado[2] || resultado[0] === resultado[2]) {
            console.log("¡Ganaste! Dos símbolos iguales.");
            this.saldoGanado += this.apuestaActual * 2;
        } else {
            console.log("Perdiste.");
            this.saldoPerdido += this.apuestaActual; // Pierdes lo que apostaste
        }
    }
}

