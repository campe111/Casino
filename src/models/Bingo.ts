import { Apuesta } from "./Interfaz";
import { Juego } from "./Juego";
import { Billetera } from "./Billetera";

class Bingo extends Juego implements Apuesta {
    private carton: number[] = [];
    private resultado: string = '';
    private bolasLlamadas: number[] = [];
    private bolasMarcadas: number[] = [];
    private bolasSalidas: number[] = []; // Números que ya salieron
    private indiceBolaActual: number = 0;
    private maxTiradas: number = 30; // Máximo de tiradas
    public apuestaActual: number = 0;
    private ganancias: number = 0;
    private perdidas: number = 0;
    protected juegoEnCurso: boolean = false;
    private tieneLinea: boolean = false; // Si tiene línea completa
    private cartonCompleto: boolean = false; // Si tiene cartón completo

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

    iniciarJuego(): void {
        if (this.apuestaActual <= 0) {
            throw new Error("Carga saldo y realiza una apuesta antes de jugar.");
        }
        this.juegoEnCurso = true;
        this.bolasSalidas = [];
        this.bolasMarcadas = [];
        this.indiceBolaActual = 0;
        this.tieneLinea = false;
        this.cartonCompleto = false;
        this.resultado = '';
    }

    sacarBola(): { numero: number; marcado: boolean; juegoTerminado: boolean; tieneLinea: boolean; cartonCompleto: boolean } {
        if (!this.juegoEnCurso) {
            throw new Error("El juego no está en curso. Inicia el juego primero.");
        }

        if (this.indiceBolaActual >= this.maxTiradas || this.indiceBolaActual >= this.bolasLlamadas.length) {
            // Se alcanzó el máximo de tiradas sin completar el cartón
            this.juegoEnCurso = false;
            return {
                numero: 0,
                marcado: false,
                juegoTerminado: true,
                tieneLinea: this.tieneLinea,
                cartonCompleto: false
            };
        }

        const bola = this.bolasLlamadas[this.indiceBolaActual];
        this.bolasSalidas.push(bola);
        const marcado = this.carton.includes(bola);
        
        if (marcado) {
            this.bolasMarcadas.push(bola);
            // Verificar si hay línea (5 números seguidos marcados)
            this.tieneLinea = this.verificarLinea();
            // Verificar si el cartón está completo
            this.cartonCompleto = this.bolasMarcadas.length === this.carton.length;
        }

        this.indiceBolaActual++;

        // Si el cartón está completo, terminar el juego
        if (this.cartonCompleto) {
            this.juegoEnCurso = false;
            return {
                numero: bola,
                marcado: marcado,
                juegoTerminado: true,
                tieneLinea: this.tieneLinea,
                cartonCompleto: true
            };
        }

        return {
            numero: bola,
            marcado: marcado,
            juegoTerminado: false,
            tieneLinea: this.tieneLinea,
            cartonCompleto: false
        };
    }

    private verificarLinea(): boolean {
        // Verificar si hay 5 números consecutivos marcados en el cartón ordenado
        const cartonOrdenado = [...this.carton].sort((a, b) => a - b);
        const marcados = this.bolasMarcadas.sort((a, b) => a - b);
        
        // Buscar 5 números consecutivos en el cartón que estén todos marcados
        for (let i = 0; i <= cartonOrdenado.length - 5; i++) {
            const secuencia = cartonOrdenado.slice(i, i + 5);
            if (secuencia.every(num => marcados.includes(num))) {
                return true;
            }
        }
        return false;
    }

    finalizarJuego(): { carton: number[]; bolasMarcadas: number[]; bingo: boolean; mensaje: string; ganancia: number; tieneLinea: boolean } {
        if (this.cartonCompleto) {
            const ganancia = this.apuestaActual + this.premio;
            this.ganancias = this.premio;
            this.billetera.agregarSaldo(ganancia);
            this.resultado = 'Ganaste';
            return {
                carton: this.carton,
                bolasMarcadas: this.bolasMarcadas,
                bingo: true,
                mensaje: "¡Bingo! Has marcado todos los números del cartón.",
                ganancia: ganancia,
                tieneLinea: this.tieneLinea
            };
        } else {
            this.perdidas += this.apuestaActual;
            this.ganancias = 0;
            this.resultado = 'Perdiste';
            return {
                carton: this.carton,
                bolasMarcadas: this.bolasMarcadas,
                bingo: false,
                mensaje: `Se alcanzó el máximo de ${this.maxTiradas} tiradas sin completar el cartón.`,
                ganancia: 0,
                tieneLinea: this.tieneLinea
            };
        }
    }

    getBolasSalidas(): number[] {
        return this.bolasSalidas;
    }

    getTiradasRestantes(): number {
        return Math.max(0, this.maxTiradas - this.indiceBolaActual);
    }

    getTieneLinea(): boolean {
        return this.tieneLinea;
    }

    getCartonCompleto(): boolean {
        return this.cartonCompleto;
    }

    realizarApuesta(monto: number): void {
        if (monto < this.apuestaMinima()) {
            throw new Error("El monto apostado es menor que la apuesta mínima.");
        } else if (monto > this.billetera.obtenerSaldo()) {
            throw new Error("Saldo insuficiente para realizar la apuesta.");
        } else {
            // Si ya hay una apuesta, devolver el saldo de la apuesta anterior
            if (this.apuestaActual > 0) {
                this.billetera.agregarSaldo(this.apuestaActual);
            }
            
            // Descontar la nueva apuesta
            this.billetera.restarSaldo(monto);
            this.apuestaActual = monto;
            this.resultado = '';
            this.bolasMarcadas = [];
            this.bolasSalidas = [];
            this.indiceBolaActual = 0;
            this.tieneLinea = false;
            this.cartonCompleto = false;
            this.carton = this.generarCarton();
            this.bolasLlamadas = this.generarBolas();
            this.juegoEnCurso = false; // Resetear estado del juego para nueva ronda
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

    getResultado(): string {
        return this.resultado;
    }
}

export { Bingo };

