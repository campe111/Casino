import { Billetera } from './Billetera';

export abstract class Juego {
    protected nombre: string;
    protected tipoDeJuego: string;
    protected premio: number;
    protected estado: string;
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

    public mostrarSaldo(): number {
        return this.billetera.obtenerSaldo();
    }

    abstract realizarApuesta(monto: number): void;

    iniciarJuego(): void {
        if (this.estado === "sin iniciar" || this.estado === "finalizado") {
            this.estado = "iniciado";
        }
    }

    finalizarJuego(): void {
        if (this.estado === "iniciado") {
            this.estado = "finalizado";
        }
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


