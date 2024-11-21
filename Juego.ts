

export class Juego {
 // Atributos 
    protected nombre: string;
    protected tipoDeJuego: string;
    protected premio: number;

    constructor(nombre: string, tipoDeJuego: string, premio: number){
        this.nombre = nombre;
        this.tipoDeJuego = tipoDeJuego;
        this.premio = premio
    }

    iniciarJuego (): void{

    }
    finalizarJuego(): void{

    }
    instruccionJuego(): void{

    }

    getNombre(): string{
        return this.nombre
    }
    getTipoDeJuego(): string{
        return this.tipoDeJuego
    }
    getPremio(): number{
        return this.premio
    }

}