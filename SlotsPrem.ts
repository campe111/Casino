import { Apuesta } from "./Interfaz";
import { SlotsSTD } from "./SlotsSTD";

export class SlotsPrem extends SlotsSTD implements Apuesta {
    private multiplicador: number;
    private bonus: number;

    constructor() {
        super();
        this.rodillos = ["🍒", "🍑", "🍐", "🍏", "🍎", "🍋", "🍇"]; // Posibles símbolos
        this.multiplicador = 5;
        this.saldoGanado = 0;
        this.saldoPerdido = 0;
        this.apuestaActual = 0;
        this.bonus = 2000;
    }

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
        
        // Lógica específica de SlotsPrem
        if (resultado.every((simbolo) => simbolo === resultado[0])) {
            console.log("¡Jackpot Premium! Los 7 símbolos son iguales.");
            this.saldoGanado += this.apuestaActual * this.multiplicador + this.bonus;
        } else if (new Set(resultado).size === 3) {
            console.log("¡Ganaste! Tres pares iguales.");
            this.saldoGanado += this.apuestaActual * 5;
        } else {
            console.log("Perdiste.");
            this.saldoPerdido += this.apuestaActual; // Pierdes la apuesta
        }
    }

    // Método para mostrar las instrucciones del juego
    instruccionJuego(): void {
        console.log(
            `Instrucciones del juego "${this.nombre}": Este es un juego de tipo "${this.tipoDeJuego}". Sigue las reglas si deseas ganar el premio de ${this.premio} puntos.`
        );
    }
}
