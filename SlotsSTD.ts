import { Apuesta } from "./Interfaz";
import { Juego } from "./Juego";

export abstract class SlotsSTD extends Juego implements Apuesta {
    //modificar segun logica de wanda
    protected rodillos:string [];
    protected combinaciones:string [][]
    protected apuestaActual: number;
    protected saldoGanado: number;

    constructor(nombre: string, tipoDeJuego: string, premio: number) {
        super(nombre, tipoDeJuego, premio);
        this.rodillos = [];
        this.combinaciones = [];
        this.apuestaActual = 0;
        this.saldoGanado = 0;
        
    }

        
    //Metodo abstracto de Juego
    realizarApuesta(monto:number):void{

    }


    // Métodos de la Interfaz Apuesta
    dineroGanado(): number{
        
    }
    dineroPerdido():number{

    }
    apuestaMinima():number{

    }
    apuestaMaxima():number{

    }
}