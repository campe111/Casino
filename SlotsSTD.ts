import { Apuesta } from "./Interfaz";
import { Juego } from "./Juego";
import { Billetera } from "./Billetera";

export class SlotsSTD extends Juego implements Apuesta {
    protected rodillos: string[]; // Símbolos del juego
    protected apuestaActual: number; // Cantidad apostada en este momento
    protected saldoGanado: number; // Total de dinero ganado
    protected saldoPerdido: number; // Total de dinero perdido
    private premioSlost: number;
    private premioBasico: number;
    private apuestaMinimaPermitida: number; // Apuesta mínima permitida
    private apuestaMaximaPermitida: number; // Apuesta máxima permitida
    private resultado: string = '';
    private juegoEnCurso: boolean = false;



    constructor(billetera: Billetera) {
        super("Slots STD", "Juego de Casino", 50, billetera); // Ajusté el premio a 100 para simplificación
        this.rodillos = ["🍒", "🍑", "🍐", "🍏"]; // Posibles símbolos del juego
        this.premioSlost = 10;
        this.premioBasico = 2;
        this.apuestaActual = 0; // Al principio no hay apuesta
        this.saldoGanado = 0; // No se ha ganado nada todavía
        this.saldoPerdido = 0; // No se ha perdido nada todavía
        this.apuestaMinimaPermitida = 20; // Apuesta mínima de 20
        this.apuestaMaximaPermitida = 500; // Apuesta máxima de 500
    }

    // Método para cargar saldo
    cargarSaldo(monto: number): void {
        if (monto <= 0) {
            console.log("El monto a cargar debe ser positivo.");
            return;
        }
        this.billetera.agregarSaldo(monto);
        console.log(`Saldo cargado: $${monto}. Saldo total: $${this.billetera.obtenerSaldo()}`);
    }

    // Método para realizar una apuesta
    realizarApuesta(monto: number): void {
        if (monto < this.apuestaMinimaPermitida) {
            console.log("La apuesta es menor que la mínima permitida.");
        } else if (monto > this.apuestaMaximaPermitida) {
            console.log("La apuesta supera el máximo permitido.");
        } else if (monto > this.billetera.obtenerSaldo()) {
            console.log("Saldo insuficiente para realizar la apuesta.");
        } else {
            this.billetera.restarSaldo(monto);
            this.apuestaActual = monto;
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

        const resultado = this.generarResultado(4);

        console.log("Resultado:", resultado.join(""));

        const simboloMasFrecuente = resultado.reduce((maxSimbolo, simbolo) => {
            return resultado.filter(s => s === simbolo).length > resultado.filter(s => s === maxSimbolo).length ? simbolo : maxSimbolo;
        }, resultado[0]);

        const cantidadMaxima = resultado.filter(s => s === simboloMasFrecuente).length;

        if (cantidadMaxima === 4) {
            console.log("¡Cuatro iguales! Has ganado un premio especial.");
            this.saldoGanado += this.apuestaActual * this.premioSlost;
        } else if (cantidadMaxima === 3) {
            console.log("¡Tres iguales! Has ganado un premio.");
            this.saldoGanado += this.apuestaActual * this.premioBasico;
        } else if (cantidadMaxima === 2) {
            console.log("¡Hay Dos iguales! Has ganado un premio.");
            this.saldoGanado += this.apuestaActual * this.premioBasico;
        } else {
            console.log("Perdiste.");
            this.saldoPerdido - this.apuestaActual; // Pierdes lo que apostaste
        }

        // Actualizar saldo y mostrar resultados finales
        this.billetera.agregarSaldo(this.saldoGanado);
        this.billetera.restarSaldo(this.saldoPerdido);
        console.log(`Saldo actualizado: $${this.billetera.obtenerSaldo()}`);

        // Reiniciar apuestas y ganancias
        this.apuestaActual = 0;
        this.saldoGanado = 0;
        this.saldoPerdido = 0;
    }

    // Método para mostrar el saldo actual
    actualizarSaldo(): void {
        if (this.resultado.includes('Ganaste')) {
            const ganancias = this.apuestaActual * this.premio;
            this.billetera.agregarSaldo(ganancias); // Sumar ganancias al saldo actual
            console.log(`Saldo actualizado: $${this.billetera.obtenerSaldo()}`);
        } else if (this.resultado.includes('Perdiste')) {
            console.log(`Saldo actualizado: $${this.billetera.obtenerSaldo()}`);
        }
        this.juegoEnCurso = false; // Finalizar el juego
        this.apuestaActual = 0; // Reiniciar la apuesta actual
    }

    // Método para mostrar las instrucciones del juego
    instruccionJuego(): void {
        console.log(
            `Instrucciones del juego "${this.nombre}": Este es un juego de tipo "${this.tipoDeJuego}". Sigue las reglas para ganar el premio de ${this.premio} puntos.`
        );
    }
}
