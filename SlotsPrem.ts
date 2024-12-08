
import { Apuesta } from "./Interfaz";
import { SlotsSTD } from "./SlotsSTD";

export class SlotsPrem extends SlotsSTD implements Apuesta {
    private multiplicador: number; // Multiplicador de las ganancias
    private bonus: number; // Bono fijo por Jackpot
    private multiplicadoresExtras: { [key: string]: number }; // Multiplicadores para combinaciones especiales

    constructor() {
        super();
        this.rodillos = ["🍒", "🍑", "🍐", "🍏", "🍎", "🍋", "🍇"]; // Símbolos adicionales
        this.multiplicador = 5; // Multiplicador base
        this.saldoGanado = 0;
        this.saldoPerdido = 0;
        this.apuestaActual = 0;
        this.bonus = 2000; // Bono fijo por Jackpot
        this.multiplicadoresExtras = {
            "tresSimbolosIguales": 10, // Tres símbolos iguales
            "dosSimbolosIguales": 3,   // Dos símbolos iguales
            "paresIguales": 2          // Pareja de símbolos
        };
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
        
        // Lógica de juego de SlotsPrem (con más combinaciones y mejores premios)
        if (resultado.every((simbolo) => simbolo === resultado[0])) {
            // Jackpot Premium: todos los símbolos iguales
            console.log("¡Jackpot Premium! Los 7 símbolos son iguales.");
            this.saldoGanado += this.apuestaActual * this.multiplicador + this.bonus;
        } else if (resultado.slice(0, 3).every((simbolo) => simbolo === resultado[0])) {
            // Tres símbolos iguales
            console.log("¡Ganaste! Tres símbolos iguales.");
            this.saldoGanado += this.apuestaActual * this.multiplicadoresExtras.tresSimbolosIguales;
        } else if (new Set(resultado).size === 3) {
            // Tres pares iguales
            console.log("¡Ganaste! Tres pares iguales.");
            this.saldoGanado += this.apuestaActual * 5;
        } else if (resultado[0] === resultado[1]) {
            // Caso de dos símbolos iguales
            console.log("¡Ganaste! Dos símbolos iguales.");
            this.saldoGanado += this.apuestaActual * this.multiplicadoresExtras.dosSimbolosIguales;
        } else if (resultado[0] === resultado[1] && resultado[1] === resultado[2]) {
            // Ganar por tres símbolos iguales en las primeras posiciones
            console.log("¡Ganaste! Tres símbolos iguales en las primeras posiciones.");
            this.saldoGanado += this.apuestaActual * this.multiplicadoresExtras.tresSimbolosIguales;
        } else {
            console.log("Perdiste.");
            this.saldoPerdido += this.apuestaActual; // Pierdes la apuesta
        }

        // Actualizar saldo y mostrar resultados finales
        this.saldo + this.saldoGanado;
        this.saldo - this.saldoPerdido;
        

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