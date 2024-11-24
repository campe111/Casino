"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Juego = void 0;
var Juego = /** @class */ (function () {
    function Juego(nombre, tipoDeJuego, premio, realizarApuesta, dineroGanado, dineroPerdido, apuestaMinima, apuestaMaxima) {
        this.nombre = nombre;
        this.tipoDeJuego = tipoDeJuego;
        this.premio = premio;
        this.apuesta = realizarApuesta;
        this.Ganado = dineroGanado;
        this.Perdido = dineroPerdido;
        this.Minima = apuestaMinima;
        this.Maxima = apuestaMaxima;
    }
    Juego.prototype.realizarApuesta = function (monto) {
        if (monto >= this.apuesta) {
            this.Ganado = this.Ganado + 1;
            console.log("Ganaste");
        }
        else {
            this.Perdido = this.Perdido + 1;
            console.log("Perdiste");
        }
    };
    Juego.prototype.apuestaMinima = function () {
        return this.Minima;
    };
    Juego.prototype.apuestaMaxima = function () {
        return this.Maxima;
    };
    Juego.prototype.dineroGanado = function () {
        return this.Ganado;
    };
    Juego.prototype.dineroPerdido = function () {
        return this.Perdido;
    };
    Juego.prototype.iniciarJuego = function () { };
    Juego.prototype.finalizarJuego = function () { };
    Juego.prototype.instruccionJuego = function () { };
    Juego.prototype.getNombre = function () {
        return this.nombre;
    };
    Juego.prototype.getTipoDeJuego = function () {
        return this.tipoDeJuego;
    };
    Juego.prototype.getPremio = function () {
        return this.premio;
    };
    Juego.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Juego.prototype.setTipoDeJuego = function (tipoDeJuego) {
        this.tipoDeJuego = tipoDeJuego;
    };
    Juego.prototype.setPremio = function (premio) {
        this.premio = premio;
    };
    return Juego;
}());
exports.Juego = Juego;
