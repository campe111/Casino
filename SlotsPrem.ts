
import { Apuesta } from "./Interfaz";
import { SlotsSTD } from "./SlotsSTD";

export class SlotsPrem extends SlotsSTD implements Apuesta {
    private multiplicador: number; // Multiplicador de las ganancias
    private multiplicadorMasSimbolos: number;
    private multiplicadorBonus: number;
    private bonus: number; // Bono fijo por Jackpot

    constructor() {
        super();
        this.rodillos = ["🍒", "🍑", "🍐", "🍏", "🍎", "🍋", "🍇"]; // Símbolos bonus eje ["🍒", "🍑", "🍐", "🍏", "🍎", "🍋", "🍇"] ["🍒", "🍒", "🍒", "🍒", "🍒", "🍒", "🍒"];
        this.multiplicador = 2; // Multiplicador base
        this.multiplicadorMasSimbolos = 8; // Multiplicador mas de 4 simbolos iguales
        this.multiplicadorBonus = 10; // Multiplicador Bonus
        this.saldoGanado = 0;
        this.saldoPerdido = 0;
        this.apuestaActual = 0;
        this.bonus = 2000; // Bono fijo por Jackpot

    }

    // Métodos para obtener el multiplicador y el bonus
    getMultiplicador(): number {
        return this.multiplicador;
    }

    getBonus(): number {
        return this.bonus;
    }

    // Método para generar el resultado (sobrescribe el del padre)
    generarResultado(cantidadDeRodillos: number = 7): string[] {
        return Array.from({ length: cantidadDeRodillos }, () =>
            this.rodillos[Math.floor(Math.random() * this.rodillos.length)]
        );
    }

    // Método para jugar (usando generarResultado del padre)
    jugar(): void {
        if (this.apuestaActual === 0) {
            console.log("Debes realizar una apuesta antes de jugar.");
            return;
        }

        // Generamos el resultado con 7 rodillos
        const resultado = this.generarResultado(7);

        console.log("Resultado:", resultado.join(""));

        const simboloMasFrecuente = resultado.reduce((maxSimbolo, simbolo) => {
            return resultado.filter(s => s === simbolo).length > resultado.filter(s => s === maxSimbolo).length ? simbolo : maxSimbolo;
        }, resultado[0]);

        const cantidadMaxima = resultado.filter(s => s === simboloMasFrecuente).length;


        // Jackpot: todos los símbolos son iguales
        if (cantidadMaxima === 7) {
            this.saldoGanado += this.apuestaActual * this.multiplicadorBonus + this.bonus;
            console.log("¡Jackpot! Todos los símbolos son iguales. ¡Felicitaciones!");
        } else if (cantidadMaxima === 6) {
            // Caso de seis iguales (puede necesitar más condiciones)
            console.log("¡Seis iguales! Has ganado un premio especial.");
            this.saldoGanado += this.apuestaActual * this.multiplicadorMasSimbolos;
        } else if (cantidadMaxima === 5) {
            // Cinco símbolos iguales
            console.log("¡Cinco iguales! Has ganado un premio increíble.");
            this.saldoGanado += this.apuestaActual * this.multiplicadorMasSimbolos;
        } else if (cantidadMaxima === 4) {
            // Cuatro símbolos iguales
            console.log("¡Cuatro iguales! Has ganado un premio especial.");
            this.saldoGanado += this.apuestaActual * this.multiplicadorMasSimbolos;
        } else if (cantidadMaxima === 3) {
            // Tres símbolos iguales
            console.log("¡Tres iguales! Has ganado un premio.");
            this.saldoGanado += this.apuestaActual * this.multiplicador;
        } else if (cantidadMaxima === 2) {
            // Caso de dos símbolos iguales en cualquier posición
            this.saldoGanado += this.apuestaActual * this.multiplicador;
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


    // Método para mostrar las instrucciones del juego
    instruccionJuego(): void {
        console.log(
            `Instrucciones del juego "${this.nombre}": Este es un juego de tipo "${this.tipoDeJuego}". Sigue las reglas si deseas ganar el premio de ${this.premio} puntos.`
        );
    }
}



// Crear una instancia del juego Slots Premium
//const juego1 = new SlotsPrem();
//juego1.cargarSaldo(500);
//juego1.iniciarJuego()
//juego1.realizarApuesta(50); // Realizar una apuesta de 50
//juego1.actualizarSaldo();  // Mostrar el saldo después de jugar
//juego1.jugar();  // Llama al método jugar() del juego Slots Premium