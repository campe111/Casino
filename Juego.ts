import { Billetera } from './Billetera';  // Asegúrate de ajustar la ruta según tu estructura de archivos

export abstract class Juego {
    // Atributos 
    protected nombre: string;
    protected tipoDeJuego: string;
    protected premio: number;
    protected estado: string; // Estado del juego
    public billetera: Billetera;

    constructor(nombre: string, tipoDeJuego: string, premio: number, billetera: Billetera) {
        this.nombre = nombre;
        this.tipoDeJuego = tipoDeJuego;
        this.premio = premio;
        this.estado = "sin iniciar";
        this.billetera = billetera;
    }

    public cargarSaldo(cantidad: number): void {
        this.billetera.agregarSaldo(cantidad);
    }

    public restarSaldo(cantidad: number): void {
        this.billetera.restarSaldo(cantidad);
    }

    public mostrarSaldo(): void {
        console.log(`Saldo actual en billetera: $${this.billetera.obtenerSaldo()}`);
    }

    // Método abstracto
    abstract realizarApuesta(monto: number): void;

    // Métodos
    iniciarJuego(): void {
        if (this.estado === "sin iniciar" || this.estado === "finalizado") {
            this.estado = "iniciado";
            console.log(`El juego "${this.nombre}" ha comenzado. ¡Que tengas buena suerte!`);
        } else {
            console.log(`El juego "${this.nombre}" ya está iniciado.`);
        }
    }

    finalizarJuego(): void {
        if (this.estado === "iniciado") {
            this.estado = "finalizado";
            console.log(`El juego "${this.nombre}" ha terminado. ¡Gracias, nos vemos pronto!`);
        } else {
            console.log(`No se puede finalizar el juego "${this.nombre}" porque no se inició.`);
        }
    }

    instruccionJuego(): void {
        console.log(
            `Instrucciones del juego "${this.nombre}": Este es un juego de tipo "${this.tipoDeJuego}". Sigue las reglas si deseas ganar el premio de ${this.premio} puntos.`
        );
    }

    getNombre(): string {
        return this.nombre;
    }

    getTipoDeJuego(): string {
        return this.tipoDeJuego;
    }

    getPremio(): number {
        return this.premio;
    }

    getEstado(): string {
        return this.estado;
    }
}
