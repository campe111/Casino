import { Apuesta } from "./Interfaz";
import { Juego } from "./Juego";
import { Billetera } from "./Billetera";

export class SlotsSTD extends Juego implements Apuesta {
    protected rodillos: string[]; // Símbolos del juego
    protected apuestaActual: number; // Cantidad apostada en este momento
    protected saldoGanado: number; // Total de dinero ganado
    protected saldoPerdido: number; // Total de dinero perdido
    public saldo: number; // Saldo disponible del jugador
    private apuestaMinimaPermitida: number; // Apuesta mínima permitida
    private apuestaMaximaPermitida: number; // Apuesta máxima permitida

    constructor(billetera: Billetera) {
        super("Slots STD", "Juego de Casino", 100, billetera); // Ajusté el premio a 100 para simplificación
        this.rodillos = ["🍒", "🍑", "🍐", "🍏"]; // Posibles símbolos del juego
        this.apuestaActual = 0; // Al principio no hay apuesta
        this.saldoGanado = 0; // No se ha ganado nada todavía
        this.saldoPerdido = 0; // No se ha perdido nada todavía
        this.saldo = 0; // El saldo inicial es 0
        this.apuestaMinimaPermitida = 20; // Apuesta mínima de 20
        this.apuestaMaximaPermitida = 500; // Apuesta máxima de 1000
    }

    // Método para cargar saldo
    cargarSaldo(monto: number): void {
        if (monto <= 0) {
            console.log("El monto a cargar debe ser positivo.");
            return;
        }
        this.saldo += monto;
        console.log(`Saldo cargado: $${monto}. Saldo total: $${this.saldo}`);
    }

    // Método para realizar una apuesta
    realizarApuesta(monto: number): void {
        if (monto < 20) {
            console.log("La apuesta es menor que la mínima permitida.");
        } else if (monto > 500) {
            console.log("La apuesta supera el máximo permitido.");
        } else if (monto > this.billetera.obtenerSaldo()) {
            console.log("Saldo insuficiente para realizar la apuesta.");
        } else {
            this.billetera.restarSaldo(monto);
            console.log(`Apuesta realizada: ${monto}`);
        }
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
        // Generar resultado con cantidad dinámica de rodillos
        return Array.from(
            { length: cantidadDeRodillos },
            () => this.rodillos[Math.floor(Math.random() * this.rodillos.length)]
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

        // Lógica de resultados con más combinaciones ganadoras
        if (resultado.every((simbolo) => simbolo === resultado[0])) {
            // Jackpot: todos los símbolos son iguales
            console.log("¡Jackpot! Los símbolos son iguales.");
            this.saldoGanado += this.apuestaActual * 15; // Gran premio con multiplicador x15
        } else if (
            resultado.slice(0, 3).every((simbolo) => simbolo === resultado[0])
        ) {
            // Tres símbolos iguales
            console.log("¡Tres iguales! Has ganado un premio.");
            this.saldoGanado += this.apuestaActual * 5; // Premio por tres iguales
        } else if (new Set(resultado).size === 2) {
            // Dos pares iguales
            console.log("¡Ganaste! Dos pares iguales.");
            this.saldoGanado += this.apuestaActual * 3; // Premio por dos pares iguales
        } else if (resultado[0] === resultado[1]) {
            // Caso de dos símbolos iguales
            console.log("¡Ganaste! Dos símbolos iguales.");
            this.saldoGanado += this.apuestaActual * 2; // Premio pequeño por dos iguales
        } else {
            console.log("Perdiste.");
            this.saldoPerdido += this.apuestaActual; // Pierdes lo que apostaste
        }

        // Actualizar saldo y mostrar resultados finales
        this.saldo + this.saldoGanado;
        this.saldo - this.saldoPerdido;

        // Reiniciar apuestas y ganancias
        this.apuestaActual = 0;
        this.saldoGanado = 0;
        this.saldoPerdido = 0;
    }

    // Método para mostrar el saldo actual
    actualizarSaldo(): void {
        console.log(`Saldo actual del jugador: $${this.saldo}`);
    }

    // Método para mostrar las instrucciones del juego
    instruccionJuego(): void {
        console.log(
            `Instrucciones del juego "${this.nombre}": Este es un juego de tipo "${this.tipoDeJuego}". Sigue las reglas para ganar el premio de ${this.premio} puntos.`
        );
    }
}
