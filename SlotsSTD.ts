import { Apuesta } from "./Interfaz";
import { Juego } from "./Juego";
import * as readline from 'readline';  // Importamos readline para interactuar con la consola

export class SlotsSTD extends Juego implements Apuesta {
    protected rodillos: string[]; // Símbolos del juego
    protected apuestaActual: number; // Cantidad apostada en este momento
    protected saldoGanado: number; // Total de dinero ganado
    protected saldoPerdido: number; // Total de dinero perdido
    protected saldo: number; // Saldo disponible del jugador
    private premioSlost: number;
    private premioBasico: number;
    private apuestaMinimaPermitida: number; // Apuesta mínima permitida
    private apuestaMaximaPermitida: number; // Apuesta máxima permitida

    constructor() {
        super('Slots STD', 'Juego de Casino', 10000); // Ajusté el premio a 100 para simplificación
        this.rodillos = ["🍒", "🍑", "🍐", "🍏"]; // Posibles símbolos del juego
        this.premioSlost = 10;
        this.premioBasico = 2;
        this.apuestaActual = 0; // Al principio no hay apuesta
        this.saldoGanado = 0; // No se ha ganado nada todavía
        this.saldoPerdido = 0; // No se ha perdido nada todavía
        this.saldo = 0; // El saldo inicial es 0
        this.apuestaMinimaPermitida = 20; // Apuesta mínima de 20
        this.apuestaMaximaPermitida = 1000; // Apuesta máxima de 1000
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
        if (monto < this.apuestaMinimaPermitida) {
            console.log(`La apuesta mínima es $${this.apuestaMinimaPermitida}.`);
            return;
        }
        if (monto > this.apuestaMaximaPermitida) {
            console.log(`La apuesta máxima es $${this.apuestaMaximaPermitida}.`);
            return;
        }
        if (monto > this.saldo) {
            console.log(`No tienes suficiente saldo. Tu saldo es $${this.saldo} y quieres apostar $${monto}.`);
            return;
        }

        this.apuestaActual = monto; // Guardamos el monto apostado
        this.saldo -= monto; // Restamos el monto apostado del saldo
        console.log(`Apuesta de $${monto} realizada. Saldo restante: $${this.saldo}`);
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

        // Generamos el resultado con 4 rodillos
        const resultado = this.generarResultado(4);

        console.log("Resultado:", resultado.join(""));

        //const simboloMasFrecuente = resultado.reduce método reduce para iterar cada elemento de resultado y encontrar el símbolo que más veces se repite.
        // La función compara la cantidad de veces que el símbolo actual (simbolo) aparece en el array con la cantidad de veces que aparece el símbolo actual más frecuente (maxSimbolo).
        //Si el símbolo actual aparece más veces, lo considera el nuevo maxSimbolo; si no, mantiene el maxSimbolo anterior.
        //const cantidadMaxima = resultado.filter(s => s === simboloMasFrecuente).length:
        //Usa filter para contar cuántas veces aparece el simboloMasFrecuente en el array resultado.
        //La longitud del array filtrado da la cantidad de veces que ese símbolo específico aparece en resultado.

        const simboloMasFrecuente = resultado.reduce((maxSimbolo, simbolo) => {
            return resultado.filter(s => s === simbolo).length > resultado.filter(s => s === maxSimbolo).length ? simbolo : maxSimbolo;
        }, resultado[0]);

        const cantidadMaxima = resultado.filter(s => s === simboloMasFrecuente).length;


        // Jackpot: todos los símbolos son iguales
        if (cantidadMaxima === 4) {
            // Cuatro símbolos iguales
            console.log("¡Cuatro iguales! Has ganado un premio especial.");
            this.saldoGanado += this.apuestaActual * this.premioSlost;
        } else if (cantidadMaxima === 3) {
            // Tres símbolos iguales
            console.log("¡Tres iguales! Has ganado un premio.");
            this.saldoGanado += this.apuestaActual * this.premioBasico;
        } else if (cantidadMaxima === 2) {
            // Caso de dos símbolos iguales en cualquier posición
            this.saldoGanado += this.apuestaActual * this.premioBasico;
            console.log("¡Hay Dos iguales! Has ganado un premio.");
        } else {
            console.log("Perdiste.");
            this.saldoPerdido += this.apuestaActual; // Pierdes lo que apostaste
        }

        // Actualizar saldo y mostrar resultados finales
        this.saldo += this.saldoGanado - this.saldoPerdido;
        this.saldo = Math.max(this.saldo, 0); // Asegura que el saldo no sea negativo


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

//const juego2 = new SlotsSTD();
//juego2.cargarSaldo(500);
//juego2.iniciarJuego()
//juego2.realizarApuesta(50); // Realizar una apuesta de 50
//juego2.actualizarSaldo();  // Mostrar el saldo después de jugar
//juego2.jugar();  // Llama al método jugar() del juego Slots Premium
