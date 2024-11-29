<<<<<<< HEAD
import { Apuesta } from "./interfaz";
import { Juego } from "./juego";
class BlackJack extends Juego implements Apuesta {
    private apuestaActual: number;
    private saldoGanado: number;

    constructor(nombre: string, tipoDeJuego: string, premio: number) {
        super(nombre, tipoDeJuego, premio);
        this.apuestaActual = 0;
        this.saldoGanado = 0;
    }

    dineroGanado(): number {
        return this.apuestaActual * this.saldoGanado;
    }

    dineroPerdido(): number {
        return this.apuestaActual - this.saldoGanado;
    }

    apuestaMinima(): number {
        if (this.apuestaActual < 100) {
            console.log(`Saldo insuficiente para realizar la apuesta.`);
        } else {
            console.log(`Apuesta realizada con ${this.apuestaActual} puntos.`);
        }
        return this.apuestaActual;
    }
    apuestaMaxima(): number {
        throw new Error("Method not implemented.");
    }

    // Métodos de la Interfaz Apuesta
    realizarApuesta(monto: number): void {
        if (monto < this.apuestaActual) {
            this.apuestaActual = monto;
            this.saldoGanado = this.apuestaActual;
        } else {
            this.saldoGanado = 0;
            console.log(
                `El jugador ha perdido ${monto - this.apuestaActual} puntos.`
            );
        }
    }

    //Metodos de la interfaz Juego
    getPremio(): number {
        return this.premio;
    }
    getEstado(): string {
        return this.estado;
    }
    getNombre(): string {
        return this.nombre;
    }
    getTipoDeJuego(): string {
        return this.tipoDeJuego;
    }
    instruccionJuego(): void {
        console.log(
            `Instrucciones del juego "${this.nombre}": Este es un juego de tipo "${this.tipoDeJuego}". Sigue las reglas si deseas ganar el premio de ${this.premio} puntos.`
        );
    }
}
=======
import { Juego } from "./Juego";
import { Apuesta } from "./Interfaz";

class BlackJack extends Juego implements Apuesta {
    mano: number[] = [];
    saldo: number;
    resultado: string;
    private ganancias: number = 0;
    private perdidas: number = 0;

    constructor(nombre: string, tipoDeJuego: string, premio: number, saldo: number) {
        super(nombre, tipoDeJuego, premio);
        this.saldo = saldo;
        this.resultado = '';
    }

    repartirCartas(numeroDeCartas: number = 2): void {
        this.mano = [];
        for (let i = 0; i < numeroDeCartas; i++) {
            this.mano.push(this.generarCartaAleatoria());
        }
    }

    plantarse(): void {
        this.calcularSumaDeCartas(); // Calcula la suma al plantarse
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

        if (suma > 21) {
            this.perdidas += this.saldo; // Registrando la pérdida
            this.resultado = 'Perdiste, te pasaste de 21.';
        } else {
            this.ganancias += this.saldo; // Registrando la ganancia
            this.resultado = `La suma de tus cartas es ${suma}.`;
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
        return 10; // Ejemplo: Monto mínimo de apuesta es 10
    }
}

export { BlackJack };

>>>>>>> 333e960759c257432e718fc405c3444b53b12ed4
