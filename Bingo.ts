import { Apuesta } from "./Interfaz";
import { Juego } from "./Juego";

class Bingo extends Juego implements Apuesta {
    private carton: number[] = [];
    private bolasLlamadas: number[] = [];
    private bolasMarcadas: number[] = [];
    private apuestaActual: number = 0;
    private ganancias: number = 0;
    private perdidas: number = 0;
    protected premio: number = 10000;  // Premio fijo 

    constructor() {
        super("Bingo", "Juego de Casino", 100);
        this.carton = this.generarCarton();
        this.bolasLlamadas = this.generarBolas();
    }

    // Genera el cartón de bingo (15 números entre 1 y 90)
    private generarCarton(): number[] {
        const carton: number[] = [];
        while (carton.length < 15) {
            const numero = Math.floor(Math.random() * 90) + 1;
            if (!carton.includes(numero)) {
                carton.push(numero);
            }
        }
        carton.sort((a, b) => a - b);
        return carton;
    }

    // Genera las bolas sorteadas (90 bolas posibles)
    private generarBolas(): number[] {
        const bolas: number[] = [];
        while (bolas.length < 90) {
            const bola = Math.floor(Math.random() * 90) + 1;
            if (!bolas.includes(bola)) {
                bolas.push(bola);
            }
        }
        return bolas;
    }

    // Función para mostrar el cartón con los números marcados
    private mostrarCarton(): void {
        const cartonMarcado = this.carton.map(num =>
            this.bolasMarcadas.includes(num) ? `${num} (Marcado)` : `${num}`
        );
        console.table("Cartón de Bingo:");
        console.table(cartonMarcado.join(' '));
    }

    // Función principal del juego
    public jugar(): void {
        console.log("¡Comienza el juego de Bingo!");

        let bingo = false;
        this.mostrarCarton();

        for (const bola of this.bolasLlamadas) {
            console.log(`Bola llamada: ${bola}`);

            // Si la bola está en el cartón, la marcamos
            if (this.carton.includes(bola)) {
                this.bolasMarcadas.push(bola);
                console.log(`¡Marcado! Número: ${bola}`);
            }

            // Mostrar el estado del cartón
            this.mostrarCarton();

            // Verificar si se ha alcanzado el Bingo
            if (this.bolasMarcadas.length === this.carton.length) {
                bingo = true;
                break;
            }
        }
            if (bingo) {
            console.log("¡Bingo! Has marcado todos los números.");
            // Aquí ganaste el premio
            this.ganancias = this.premio;
            console.log(`¡Has ganado ${this.ganancias}!`);
        } else {
            console.log("El juego ha terminado, pero no hay Bingo.");
            this.ganancias = 0;  // No se gana nada si no hay Bingo
        } 
    } 

    // Métodos de la interfaz Apuesta
    realizarApuesta(monto: number): void {
        if (monto < this.apuestaMinima()) {
            console.log(`La apuesta mínima es ${this.apuestaMinima()} y no has alcanzado ese monto.`);
            return;
        }

        this.apuestaActual = monto;
        console.log(`Apuesta de ${monto} realizada en el juego ${this.nombre}.`);
    }

    dineroGanado(): number {
        // Se ha calculado el premio al ganar el Bingo
        return this.ganancias;
    }

    dineroPerdido(): number {
        // Se calcula la pérdida 
        this.perdidas = this.apuestaActual - this.ganancias;  // La diferencia entre lo apostado y lo ganado
        return this.perdidas;
    }

    apuestaMinima(): number {
        return 2500; // Ejemplo: Monto mínimo de apuesta es 2500
    }
}

// Simulación del juego
const bingo = new Bingo();
bingo.realizarApuesta(5000);  // Realiza una apuesta
bingo.jugar();                // Juega el Bingo
console.log(`Dinero ganado: ${bingo.dineroGanado()}`);  // Verifica cuánto se ha ganado
console.log(`Dinero perdido: ${bingo.dineroPerdido()}`);  // Verifica la pérdida