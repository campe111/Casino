import { Apuesta } from "./Interfaz";
import { SlotsSTD } from "./SlotsSTD";

export class SlotsPrem extends SlotsSTD implements Apuesta{
    private multiplicador: number;
    private bonus:number;    
    
    constructor(nombre: string, tipoDeJuego: string, premio: number,multiplicador:number, bonus:number){   
    super(nombre,tipoDeJuego,premio);
    this.multiplicador= multiplicador;
    this.bonus= bonus;

    }

getMultiplicador():number{
    return this.multiplicador
}

getBonus():number{
    return this.bonus
}

realizarApuesta(monto:number):void{

}



// Métodos de la Interfaz Apuesta
dineroGanado(): number{
    return 10;
}
dineroPerdido():number{
    return 10;
}
apuestaMinima():number{
    return 500;
}
apuestaMaxima():number{
    return 3000;
}
}









