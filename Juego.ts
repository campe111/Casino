import { Apuesta } from "./Interfaz";

class Juego implements Apuesta {
    // Atributos
    protected nombre: string;
    protected tipoDeJuego: string;
    protected premio: string;
    private apuesta: number;
    private Ganado: number;
    private Perdido: number;
    private Minima: number;
    private Maxima: number;

    constructor(
        nombre: string,
        tipoDeJuego: string,
        premio: string,
        realizarApuesta: number,
        dineroGanado: number,
        dineroPerdido: number,
        apuestaMinima: number,
        apuestaMaxima: number
    ) {
        this.nombre = nombre;
        this.tipoDeJuego = tipoDeJuego;
        this.premio = premio;
        this.apuesta = realizarApuesta;
        this.Ganado = dineroGanado;
        this.Perdido = dineroPerdido;
        this.Minima = apuestaMinima;
        this.Maxima = apuestaMaxima;
    
    }
    realizarApuesta(monto: number): void {
        if (monto >= this.apuesta) {
            this.Ganado = this.Ganado + 1;
            console.log("Ganaste");
        } else {
            this.Perdido = this.Perdido + 1;
            console.log("Perdiste");
        }
    }
        apuestaMinima(): number {
        return this.Minima;
    }

        apuestaMaxima(): number {
        return this.Maxima;
    }

        dineroGanado(): number {
        return this.Ganado;
    }

        dineroPerdido(): number {
        return this.Perdido;
    }


    
    iniciarJuego(): void { }
    finalizarJuego(): void { }
    instruccionJuego(): void { }

    getNombre(): string {
        return this.nombre;
    }
    getTipoDeJuego(): string {
        return this.tipoDeJuego;
    }
    getPremio(): string {
        return this.premio;
    }

    setNombre(nombre: string): void {
        this.nombre = nombre;
    }
    setTipoDeJuego(tipoDeJuego: string): void {
        this.tipoDeJuego = tipoDeJuego;
    }
    setPremio(premio: string): void {
        this.premio = premio;
    }
}
export { Juego };
