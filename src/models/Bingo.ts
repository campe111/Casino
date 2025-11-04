import { Apuesta } from "./Interfaz";
import { Juego } from "./Juego";
import { Billetera } from "./Billetera";

class Bingo extends Juego implements Apuesta {
    private carton: number[] = [];
    private resultado: string = '';
    private bolasLlamadas: number[] = [];
    private bolasMarcadas: number[] = [];
    public apuestaActual: number = 0;
    private ganancias: number = 0;
    private perdidas: number = 0;
    protected juegoEnCurso: boolean = false;

    constructor(billetera: Billetera) {
        super("Bingo", "Juego de Casino", 50, billetera);
        this.carton = this.generarCarton();
        this.bolasLlamadas = this.generarBolas();
    }

    generarCarton(): number[] {
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

    public jugar(): { carton: number[]; bolasMarcadas: number[]; bingo: boolean; mensaje: string; ganancia: number } {
        if (this.apuestaActual <= 0) {
            throw new Error("Carga saldo y realiza una apuesta antes de jugar.");
        }

        // Verificar que haya suficiente saldo para la apuesta actual
        if (this.apuestaActual > this.billetera.obtenerSaldo()) {
            // Si no hay suficiente saldo, resetear la apuesta
            this.apuestaActual = 0;
            throw new Error("Saldo insuficiente para la apuesta actual. Realiza una nueva apuesta.");
        }

        // Restar la apuesta del saldo antes de jugar
        this.billetera.restarSaldo(this.apuestaActual);

        // Resetear para una nueva partida
        this.bolasMarcadas = [];
        this.carton = this.generarCarton();
        this.bolasLlamadas = this.generarBolas();

        let bingo = false;
        let mensaje = "";
        let ganancia = 0;

        for (let i = 0; i < Math.min(15, this.bolasLlamadas.length); i++) {
            const bola = this.bolasLlamadas[i];
            if (this.carton.includes(bola)) {
                this.bolasMarcadas.push(bola);
            }
            if (this.bolasMarcadas.length === this.carton.length) {
                bingo = true;
                break;
            }
        }

        if (bingo) {
            mensaje = "¡Bingo! Has marcado todos los números.";
            this.resultado = 'Ganaste';
            ganancia = this.apuestaActual + this.premio;
            this.ganancias = this.premio;
            this.billetera.agregarSaldo(ganancia);
        } else {
            mensaje = "El juego ha terminado, pero no hay Bingo.";
            this.resultado = 'Perdiste';
            this.ganancias = 0;
        }

        this.juegoEnCurso = false;
        // NO resetear apuestaActual - permite jugar múltiples veces con la misma apuesta

        return { carton: this.carton, bolasMarcadas: this.bolasMarcadas, bingo, mensaje, ganancia };
    }

    realizarApuesta(monto: number): void {
        if (monto < this.apuestaMinima()) {
            throw new Error("El monto apostado es menor que la apuesta mínima.");
        } else if (monto > this.billetera.obtenerSaldo()) {
            throw new Error("Saldo insuficiente para realizar la apuesta.");
        } else {
            // Solo establecer la apuesta, no restar el saldo todavía
            // El saldo se restará al momento de jugar
            // Si se cambia la apuesta, resetear el juego
            this.apuestaActual = monto;
            this.resultado = '';
            this.bolasMarcadas = [];
            this.carton = this.generarCarton();
            this.bolasLlamadas = this.generarBolas();
            this.juegoEnCurso = false;
        }
    }

    dineroGanado(): number {
        return this.ganancias;
    }

    dineroPerdido(): number {
        return this.perdidas;
    }

    apuestaMinima(): number {
        return 100;
    }

    getCarton(): number[] {
        return this.carton;
    }

    getBolasMarcadas(): number[] {
        return this.bolasMarcadas;
    }
}

export { Bingo };

