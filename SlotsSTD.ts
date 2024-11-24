import { Apuesta } from "./Interfaz";
import { Juego } from "./Juego";

export class SlotsSTD extends Juego implements Apuesta {
    
    protected rodillos: string[]; 
    protected combinaciones: string[][];  
    protected apuestaActual: number;
    protected saldoGanado: number;

    constructor(nombre: string, tipoDeJuego: string, premio: number) {
        super(nombre, tipoDeJuego, premio);
        this.rodillos = [];
        this.combinaciones = [];
        this.apuestaActual = 0;
        this.saldoGanado = 0;
    }





    // Métodos de la Interfaz Apuesta
    realizarApuesta(monto:number):void{

    }
    dineroGanado(): number{
        
    }
    dineroPerdido():number{

    }
    apuestaMinima():number{

    }
    apuestaMaxima():number{

    }
}