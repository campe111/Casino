"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Juego = void 0;
var Juego = /** @class */ (function () {
    function Juego(nombre, tipoDeJuego, premio, billetera) {
        this.nombre = nombre;
        this.tipoDeJuego = tipoDeJuego;
        this.premio = premio;
        this.estado = "sin iniciar";
        this.billetera = billetera;
    }
    Juego.prototype.cargarSaldo = function (cantidad) {
        this.billetera.agregarSaldo(cantidad);
    };
    Juego.prototype.restarSaldo = function (cantidad) {
        this.billetera.restarSaldo(cantidad);
    };
    Juego.prototype.mostrarSaldo = function () {
        console.log("Saldo actual en billetera: $".concat(this.billetera.obtenerSaldo()));
    };
    // Métodos
    Juego.prototype.iniciarJuego = function () {
        if (this.estado === "sin iniciar" || this.estado === "finalizado") {
            this.estado = "iniciado";
            console.log("El juego \"".concat(this.nombre, "\" ha comenzado. \u00A1Que tengas buena suerte!"));
        }
        else {
            console.log("El juego \"".concat(this.nombre, "\" ya est\u00E1 iniciado."));
        }
    };
    Juego.prototype.finalizarJuego = function () {
        if (this.estado === "iniciado") {
            this.estado = "finalizado";
            console.log("El juego \"".concat(this.nombre, "\" ha terminado. \u00A1Gracias, nos vemos pronto!"));
        }
        else {
            console.log("No se puede finalizar el juego \"".concat(this.nombre, "\" porque no se inici\u00F3."));
        }
    };
    Juego.prototype.instruccionJuego = function () {
        console.log("Instrucciones del juego \"".concat(this.nombre, "\": Este es un juego de tipo \"").concat(this.tipoDeJuego, "\". Sigue las reglas si deseas ganar el premio de ").concat(this.premio, " puntos."));
    };
    Juego.prototype.getNombre = function () {
        return this.nombre;
    };
    Juego.prototype.getTipoDeJuego = function () {
        return this.tipoDeJuego;
    };
    Juego.prototype.getPremio = function () {
        return this.premio;
    };
    Juego.prototype.getEstado = function () {
        return this.estado;
    };
    return Juego;
}());
exports.Juego = Juego;
// export  abstract class Juego {
//     // Atributos 
//     protected nombre: string;
//     protected tipoDeJuego: string;
//     protected premio: number;
//     protected estado: string; // Estado del juego
//     protected billetera: number;
//     protected billeteraActualizada: number;
//     constructor(nombre: string, tipoDeJuego: string, premio: number) {
//         this.nombre = nombre;
//         this.tipoDeJuego = tipoDeJuego;
//         this.premio = premio;
//         this.estado = "sin iniciar";
//         this.billetera= 0;
//         this.billeteraActualizada= 0;
//     }
//     public cargarSaldo(cantidad: number): void {
//         this.billetera += cantidad;
//         this.billeteraActualizada = this.billetera;
//         console.log(`Saldo cargado: $${cantidad}. Saldo actual en billetera: $${this.billetera}`);
//     }
//     public restarSaldo(cantidad: number): void {
//         if (cantidad > this.billetera) {
//             console.log('Saldo insuficiente en billetera.');
//         } else {
//             this.billetera -= cantidad;
//             this.billeteraActualizada = this.billetera;
//             console.log(`Saldo restado: $${cantidad}. Saldo actual en billetera: $${this.billetera}`);
//         }
//     }
//     public mostrarSaldo(): void {
//         console.log(`Saldo actual en billetera: $${this.billetera}`);
//     }
//     //Metodo abstracto
//     abstract realizarApuesta(monto:number):void;
//     //Metodos
//     iniciarJuego(): void {
//         if (this.estado === "sin iniciar" || this.estado === "finalizado") {
//             this.estado = "iniciado";
//             console.log(`El juego "${this.nombre}" ha comenzado. ¡ Que tengas buena suerte!`);
//         } else {
//             console.log(`El juego "${this.nombre}" ya está iniciado.`);
//         }
//     }
//     finalizarJuego(): void {
//         if (this.estado === "iniciado") {
//             this.estado = "finalizado";
//             console.log(`El juego "${this.nombre}" ha terminado. ¡Gracias, Nos Vemos Pronto!`);
//         } else {
//             console.log(`No se puede finalizar el juego "${this.nombre}" porque no se inicio.`);
//         }
//     }
//     instruccionJuego(): void {
//         console.log(
//             `Instrucciones del juego "${this.nombre}": Este es un juego de tipo "${this.tipoDeJuego}". Sigue las reglas si deseas ganar el premio de ${this.premio} puntos.`
//         );
//     }
//     getNombre(): string {
//         return this.nombre
//     }
//     getTipoDeJuego(): string {
//         return this.tipoDeJuego
//     }
//     getPremio(): number {
//         return this.premio
//     }
//     getEstado():string{
//         return this.estado
//     }
// }
