export  abstract class Juego {
    // Atributos 
    protected nombre: string;
    protected tipoDeJuego: string;
    protected premio: number;
    protected estado: string; // Estado del juego
    protected billetera: number;
    protected billeteraActualizada: number;

    constructor(nombre: string, tipoDeJuego: string, premio: number) {
        this.nombre = nombre;
        this.tipoDeJuego = tipoDeJuego;
        this.premio = premio;
        this.estado = "sin iniciar";
    }

    public cargarSaldo(cantidad: number): void {
        this.billetera += cantidad;
        this.billeteraActualizada = this.billetera;
        console.log(`Saldo cargado: $${cantidad}. Saldo actual en billetera: $${this.billetera}`);
    }

    public restarSaldo(cantidad: number): void {
        if (cantidad > this.billetera) {
            console.log('Saldo insuficiente en billetera.');
        } else {
            this.billetera -= cantidad;
            this.billeteraActualizada = this.billetera;
            console.log(`Saldo restado: $${cantidad}. Saldo actual en billetera: $${this.billetera}`);
        }
    }

    publicmostrarSaldo(): void {
        console.log(`Saldo actual en billetera: $${this.billetera}`);
    }
    //Metodo abstracto
    abstract realizarApuesta(monto:number):void;

    //Metodos
    iniciarJuego(): void {
        if (this.estado === "sin iniciar" || this.estado === "finalizado") {
            this.estado = "iniciado";
            console.log(`El juego "${this.nombre}" ha comenzado. ¡ Que tengas buena suerte!`);
        } else {
            console.log(`El juego "${this.nombre}" ya está iniciado.`);
        }

    }
    finalizarJuego(): void {
        if (this.estado === "iniciado") {
            this.estado = "finalizado";
            console.log(`El juego "${this.nombre}" ha terminado. ¡Gracias, Nos Vemos Pronto!`);
        } else {
            console.log(`No se puede finalizar el juego "${this.nombre}" porque no se inicio.`);
        }
    }
    instruccionJuego(): void {
        console.log(
            `Instrucciones del juego "${this.nombre}": Este es un juego de tipo "${this.tipoDeJuego}". Sigue las reglas si deseas ganar el premio de ${this.premio} puntos.`
        );
    }

    getNombre(): string {
        return this.nombre
    }
    getTipoDeJuego(): string {
        return this.tipoDeJuego
    }
    getPremio(): number {
        return this.premio
    }
    getEstado():string{
        return this.estado
    }
}
