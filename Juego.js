"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Juego = void 0;
var Juego = /** @class */ (function () {
    function Juego(nombre, tipoDeJuego, premio) {
        this.nombre = nombre;
        this.tipoDeJuego = tipoDeJuego;
        this.premio = premio;
        this.estado = "sin iniciar";
        this.billetera = 0;
        this.billeteraActualizada = 0;
    }
    Juego.prototype.cargarSaldo = function (cantidad) {
        this.billetera += cantidad;
        this.billeteraActualizada = this.billetera;
        console.log("Saldo cargado: $".concat(cantidad, ". Saldo actual en billetera: $").concat(this.billetera));
    };
    Juego.prototype.restarSaldo = function (cantidad) {
        if (cantidad > this.billetera) {
            console.log('Saldo insuficiente en billetera.');
        }
        else {
            this.billetera -= cantidad;
            this.billeteraActualizada = this.billetera;
            console.log("Saldo restado: $".concat(cantidad, ". Saldo actual en billetera: $").concat(this.billetera));
        }
    };
    Juego.prototype.mostrarSaldo = function () {
        console.log("Saldo actual en billetera: $".concat(this.billetera));
    };
    //Metodos
    Juego.prototype.iniciarJuego = function () {
        if (this.estado === "sin iniciar" || this.estado === "finalizado") {
            this.estado = "iniciado";
            console.log("El juego \"".concat(this.nombre, "\" ha comenzado. \u00A1 Que tengas buena suerte!"));
        }
        else {
            console.log("El juego \"".concat(this.nombre, "\" ya est\u00E1 iniciado."));
        }
    };
    Juego.prototype.finalizarJuego = function () {
        if (this.estado === "iniciado") {
            this.estado = "finalizado";
            console.log("El juego \"".concat(this.nombre, "\" ha terminado. \u00A1Gracias, Nos Vemos Pronto!"));
        }
        else {
            console.log("No se puede finalizar el juego \"".concat(this.nombre, "\" porque no se inicio."));
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