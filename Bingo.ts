import { Apuesta } from "./Interfaz";
import { Juego } from "./Juego";
import { Billetera } from "./Billetera";

class Bingo extends Juego implements Apuesta {
    private carton: number[] = [];
    public saldo: number;
    private resultado: string = '';
    private bolasLlamadas: number[] = [];
    private bolasMarcadas: number[] = [];
    private apuestaActual: number = 0;
    private ganancias: number = 0;
    private perdidas: number = 0;
    protected juegoEnCurso: boolean = false;

    constructor(billetera: Billetera) {
        super("Bingo", "Juego de Casino", 50, billetera);
        this.carton = this.generarCarton();
        this.bolasLlamadas = this.generarBolas();
        this.saldo = 0;  // Iniciar saldo en 0 o puedes definirlo a una cantidad predeterminada si lo deseas
        this.billetera = billetera;
    }

    bingoFinal(): void {
        if (this.juegoEnCurso) {
            this.actualizarSaldo(); // Actualiza el saldo al finalizar el juego
            this.mostrarSaldo();    // Muestra el saldo después de cada juego
        }
    }

    // Genera el cartón de bingo (15 números entre 1 y 90)
    private generarCarton(): number[] {
        const carton: number[] = [];
        while (carton.length < 15) { 
            const numero = Math.floor(Math.random() * 90) + 1; // Genera un número aleatorio entre 1 y 90
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
            this.bolasMarcadas.includes(num) ? `${num}❎` : `${num}`
        );
        console.table("Cartón de Bingo:");
        console.table(cartonMarcado.join(' '));
    }

    // Función principal  del juego
    public jugar(): void {
        if (this.apuestaActual <= 0) {
            console.log("Carga saldo y realiza una apuesta antes de jugar.");
            return; // Si no hay apuesta, no se puede jugar
        }

        console.log("¡Comienza el juego de Bingo!");

        let bingo = false;
        this.mostrarCarton();

        for (const bola of this.bolasLlamadas) {
            console.log(`Bola llamada: ${bola}`);

            // Si la bola está en el cartón, la marcamos
            if (this.carton.includes(bola)) {
                this.bolasMarcadas.push(bola);
                console.log(`¡Marcado! ${bola} ✅`);
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
            this.resultado = 'Ganaste'; // Resultado de ganar
            this.ganancias = this.premio; // Asignar el premio ganado
            console.log(`¡Has ganado $${this.ganancias}!`);
        } else {
            console.log("El juego ha terminado, pero no hay Bingo.");
            this.resultado = 'Perdiste'; // Resultado de perder
            this.ganancias = 0;  // No se gana nada si no hay Bingo
        }

        // Llamar a actualizar el saldo después de la jugada
        this.actualizarSaldo();
    }

    // Métodos de la interfaz Apuesta
    realizarApuesta(monto: number): void {
        if (monto < this.apuestaMinima()) {
            console.log("El monto apostado es menor que la apuesta mínima.");
            return;
        } else if (monto > this.billetera.obtenerSaldo()) {
            console.log("Saldo insuficiente para realizar la apuesta.");
            return;
        } else {
            this.billetera.restarSaldo(monto);
            this.apuestaActual = monto; // Registrar la apuesta actual
            this.resultado = ''; // Reiniciar resultado al realizar una nueva apuesta
            console.log(`Apuesta realizada con éxito. Monto apostado: $${monto}`);
        }
    }


    // Método para actualizar el saldo después de cada jugada
    private actualizarSaldo(): void {
        if (this.resultado === 'Ganaste') {
            // Ganancias netas: Apuesta + Premio
            const gananciasTotales = this.apuestaActual + this.ganancias;
            this.saldo += gananciasTotales; // Sumar la apuesta + las ganancias al saldo
            console.log(`¡Ganaste! Has obtenido $${this.ganancias} de ganancia neta.`);
        } else if (this.resultado === 'Perdiste') {
            // Si el jugador perdió, solo se debe restar la apuesta
            this.saldo -= this.apuestaActual;
            console.log(`Perdiste. Has perdido $${this.apuestaActual}.`);
        }

        console.log(`Saldo actualizado: $${this.billetera.obtenerSaldo() + this.saldo}`);
        this.juegoEnCurso = false; // Finalizar el juego
        this.apuestaActual = 0; // Reiniciar la apuesta actual
    }

    // Método para mostrar el saldo actual
    public mostrarSaldo(): void {
        console.log(`El saldo actual es: $${this.saldo}`);
    }

    dineroGanado(): number {
        return this.ganancias;
    }

    dineroPerdido(): number {
        return this.perdidas;
    }

    apuestaMinima(): number {
        return 100; // Ejemplo: Monto mínimo de apuesta es 100
    }

    // Método para cargar saldo
    cargarSaldo(monto: number): void {
        this.saldo += monto;
        console.log(`Saldo cargado: $${monto}. Saldo actual en billetera: $${this.saldo}`);
    }
}

export { Bingo }