import { Apuesta } from "./Interfaz";
import { Juego } from "./Juego";


class BlackJack extends Juego implements Apuesta {
    mano: number[] = [];
    saldo: number;
    resultado: string = '';
    ganancias: number = 0;
    perdidas: number = 0;
    apuestaActual: number = 0;
    juegoEnCurso: boolean = false;

    constructor(nombre: string, tipoDeJuego: string, premio: number, saldo: number) {
        super(nombre, tipoDeJuego, premio);
        this.saldo = saldo;
    }
    repartirCartas(numeroDeCartas: number = 2): void {
        this.mano = [];
        for (let i = 0; i < numeroDeCartas; i++) {
            this.mano.push(this.generarCartaAleatoria());
        }
        this.juegoEnCurso = true;
    }

    plantarse(): void {
        if (this.juegoEnCurso) {
            this.calcularSumaDeCartas(); // Calcula la suma al plantarse
        }
    }

    calcularSumaDeCartas(): void {
        let suma = 0;
        let tieneAs = false;

        for (let valor of this.mano) {
            if (valor > 10) {
                suma += 10; // Cartas J, Q, K valen 10
            } else if (valor === 1) {
                tieneAs = true;
                suma += 11; // As inicialmente vale 11
            } else {
                suma += valor;
            }
        }

        // Ajuste si el jugador se pasa de 21 y tiene un As
        if (tieneAs && suma > 21) {
            suma -= 10; // El As pasa a valer 1 en lugar de 11
        }

        // Actualización de las ganancias y pérdidas en función de la apuesta
        if (suma > 21) {
            this.perdidas += this.apuestaActual; // Registrando la pérdida
            this.resultado = 'Perdiste, te pasaste de 21.';
        } else {
            this.ganancias += this.apuestaActual * this.premio; // Registrando la ganancia
            this.resultado = `La suma de tus cartas es ${suma}. Ganaste $${this.apuestaActual * this.premio}.`;
        }
        console.log(this.resultado); // Mostrar el resultado

    }

    // Método para generar una carta aleatoria
    private generarCartaAleatoria(): number {
        const valores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // 1: As, 11: J, 12: Q, 13: K
        return valores[Math.floor(Math.random() * valores.length)];
    }

    // Métodos de la interfaz
    realizarApuesta(monto: number): void {
        if (monto < this.apuestaMinima()) {
            console.log("Saldo insuficiente para realizar la apuesta.");
        } else if (monto <= this.saldo) {
            this.saldo -= monto;
            this.apuestaActual = monto; // Registrar la apuesta actual
            console.log(`Apuesta realizada con éxito. Monto apostado: $${monto}`);
        } else {
            console.log("Saldo insuficiente.");
        }
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
}
export { BlackJack }; 
const blackJack = new BlackJack("Blackjack", "BlackJack", 1000, 100);
blackJack.iniciarJuego();
blackJack.repartirCartas(2);
blackJack.plantarse();
blackJack.calcularSumaDeCartas();
blackJack.cargarSaldo(100);
blackJack.restarSaldo(50);
