export interface Apuesta{
    realizarApuesta(monto:number):void;
    dineroGanado():number;
    dineroPerdido():number;
    apuestaMinima():number;
    apuestaMaxima():number;

}