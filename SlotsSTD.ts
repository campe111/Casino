import { Juego } from "./Juego";  // Suponemos que Juego es una clase base que ya tienes

export class SlotsSTD extends Juego {
    protected rodillos: string[]; // Símbolos del juego
    protected apuestaActual: number =0; // Cantidad apostada en este momento
    protected saldoGanado: number; // Total de dinero ganado
    protected saldoPerdido: number; // Total de dinero perdido
    
    constructor(nombre: string, tipoDeJuego: string, premio: number) {
        super(nombre, tipoDeJuego, premio); // Llamamos al constructor de la clase padre
        this.rodillos = ["A", "B", "C", "D", "E"]; // Posibles símbolos
        this.saldoGanado = 0; // No se ha ganado nada todavía
        this.saldoPerdido = 0; // No se ha perdido nada todavía
        
    }
    
    // Método para generar el resultado (modularización)
    generarResultado(cantidadDeRodillos: number = 4): string[] {
        return Array.from({ length: cantidadDeRodillos }, () =>
            this.rodillos[Math.floor(Math.random() * this.rodillos.length)]
        );
    }

    // Método para jugar (usando generarResultado)
    jugar(): void {
        // Generamos el resultado con 6 rodillos
        const resultado = this.generarResultado(6);
        console.log("Resultado:", resultado);

        // Si los 6 símbolos son iguales
        if (resultado.every((simbolo) => simbolo === resultado[0])) {
            console.log("¡Jackpot! Los 6 símbolos son iguales.");
            this.saldoGanado += 1000; // Gran premio fijo (por ejemplo, 1000 puntos)
        } else if (new Set(resultado).size === 3) {
            console.log("¡Ganaste! Tres pares iguales.");
            this.saldoGanado += 500; // Premio por 3 pares iguales
        } else {
            console.log("Perdiste.");
            this.saldoPerdido += 100; // Pierdes una cantidad fija (por ejemplo, 100 puntos)
        }

        // Mostramos el saldo ganado o perdido
        console.log(`Ganancias actuales: $${this.saldoGanado}`);
        console.log(`Pérdidas actuales: $${this.saldoPerdido}`);
    }

    // Instrucción del juego
    instruccionJuego(): void {
        console.log(
            `Instrucciones del juego "${this.nombre}": Este es un juego de tipo "${this.tipoDeJuego}". Sigue las reglas si deseas ganar el premio de ${this.premio} puntos.`
        );
    }


    // Método para iniciar el juego (interacción con el usuario)
    iniciarJuego(): void {
        console.log(`Bienvenido a "${this.nombre}"`);

        // Simulamos que el jugador quiere jugar
        this.jugar(); // Ejecutamos el juego

        // Preguntamos si el jugador quiere jugar otra vez
        const prompt = require("prompt-sync")(); // Usamos un módulo para simular la entrada del usuario
        const respuesta = prompt("¿Quieres jugar otra vez? (s/n): ");

        if (respuesta.toLowerCase() === 's') {
            this.iniciarJuego(); // Si quiere jugar de nuevo, lo iniciamos otra vez
        } else {
            console.log('Gracias por jugar!');
        }
    }
}









