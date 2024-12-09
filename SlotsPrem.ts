
import { Apuesta } from "./Interfaz";
import { SlotsSTD } from "./SlotsSTD";
import { Billetera } from './Billetera';

export class SlotsPrem extends SlotsSTD implements Apuesta {
    private multiplicador: number; // Multiplicador de las ganancias
    private bonus: number; // Bono fijo por Jackpot
    private multiplicadoresExtras: { [key: string]: number }; // Multiplicadores para combinaciones especiales

    constructor(billetera: Billetera) {
        super(billetera)
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

        const resultado = this.generarResultado(7);
        console.log("Resultado:", resultado.join(""));
        
        if (resultado.every((simbolo) => simbolo === resultado[0])) {
            console.log("¡Jackpot Premium! Los 7 símbolos son iguales. 🎉✨");
            this.billetera.agregarSaldo(this.apuestaActual * this.multiplicador + this.bonus);
        } else if (new Set(resultado.slice(0, 3)).size === 1) {
            console.log("¡Ganaste! Tres símbolos iguales.");
            this.billetera.agregarSaldo(this.apuestaActual * this.multiplicadoresExtras.tresSimbolosIguales);
        } else if (new Set(resultado).size === 3) {
            console.log("¡Ganaste! Tres pares iguales.");
            this.billetera.agregarSaldo(this.apuestaActual * 5);
        } else if (resultado[0] === resultado[1]) {
            console.log("¡Ganaste! Dos símbolos iguales.");
            this.billetera.agregarSaldo(this.apuestaActual * this.multiplicadoresExtras.dosSimbolosIguales);
        } else if (resultado[0] === resultado[1] && resultado[1] === resultado[2]) {
            console.log("¡Ganaste! Tres símbolos iguales en las primeras posiciones.");
            this.billetera.agregarSaldo(this.apuestaActual * this.multiplicadoresExtras.tresSimbolosIguales);
        } else {
            console.log("Perdiste.");
            this.billetera.restarSaldo(this.apuestaActual); // Pierdes la apuesta
        }

        // Actualizar saldo y mostrar resultados finales
        console.log(`Saldo actualizado: $${this.billetera.obtenerSaldo()}`);
        
        // Reiniciar apuestas y ganancias
        this.apuestaActual = 0;
    }

    instruccionJuego(): void {
        console.log(
            `Instrucciones del juego "${this.nombre}": Este es un juego de tipo "${this.tipoDeJuego}". Sigue las reglas si deseas ganar el premio de ${this.premio} puntos.`
        );
    }
}
