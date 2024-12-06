"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotsSTD = void 0;
var Juego_1 = require("./Juego");
var SlotsSTD = /** @class */ (function (_super) {
    __extends(SlotsSTD, _super);
    function SlotsSTD(nombre, tipoDeJuego, premio) {
        var _this = _super.call(this, nombre, tipoDeJuego, premio) || this; // Llamamos al constructor de la clase padre
        _this.rodillos = ["A", "B", "C", "D", "E"]; // Posibles símbolos
        _this.apuestaActual = 0; // Al principio no hay apuesta
        _this.saldoGanado = 0; // No se ha ganado nada todavía
        _this.saldoPerdido = 0; // No se ha perdido nada todavía
        _this.apuestaMinimaPermitida = 20; //apuesta mínima de 20
        _this.apuestaMaximaPermitida = 500; // apuesta máxima de 500
        return _this;
    }
    // Método para realizar una apuesta
    SlotsSTD.prototype.realizarApuesta = function (monto) {
        if (monto < this.apuestaMinimaPermitida) {
            console.log("La apuesta es menor que la mínima permitida.");
            return;
        }
        if (monto > this.apuestaMaximaPermitida) {
            console.log("La apuesta supera el máximo permitido.");
            return;
        }
        this.apuestaActual = monto; // Guardamos el monto apostado
        console.log("Apuesta realizada: ".concat(monto));
    };
    // Método para obtener el dinero ganado
    SlotsSTD.prototype.dineroGanado = function () {
        return this.saldoGanado += this.apuestaActual; // Devolvemos el saldo ganado
    };
    // Método para obtener el dinero perdido
    SlotsSTD.prototype.dineroPerdido = function () {
        return this.saldoPerdido; // Devolvemos el saldo perdido
    };
    // Método para obtener la apuesta mínima
    SlotsSTD.prototype.apuestaMinima = function () {
        return this.apuestaMinimaPermitida;
    };
    // Método para obtener la apuesta máxima
    SlotsSTD.prototype.apuestaMaxima = function () {
        return this.apuestaMaximaPermitida;
    };
    // Método para generar el resultado (modularización)
    SlotsSTD.prototype.generarResultado = function (cantidadDeRodillos) {
        var _this = this;
        if (cantidadDeRodillos === void 0) { cantidadDeRodillos = 4; }
        return Array.from({ length: cantidadDeRodillos }, function () {
            return _this.rodillos[Math.floor(Math.random() * _this.rodillos.length)];
        });
    };
    // Método para jugar (usando generarResultado)
    SlotsSTD.prototype.jugar = function () {
        if (this.apuestaActual === 0) {
            console.log("Debes realizar una apuesta antes de jugar.");
            return;
        }
        // Generamos el resultado con 6 rodillos
        var resultado = this.generarResultado(6);
        console.log("Resultado:", resultado);
        // Si los 6 símbolos son iguales
        if (resultado.every(function (simbolo) { return simbolo === resultado[0]; })) {
            console.log("¡Jackpot! Los 6 símbolos son iguales.");
            this.saldoGanado += this.apuestaActual * 10; // Gran premio con multiplicador x10
        }
        else if (new Set(resultado).size === 3) {
            console.log("¡Ganaste! Tres pares iguales.");
            this.saldoGanado += this.apuestaActual * 3; // Premio por 3 pares iguales
        }
        else {
            console.log("Perdiste.");
            this.saldoPerdido += this.apuestaActual; // Pierdes lo que apostaste
        }
    };
    SlotsSTD.prototype.instruccionJuego = function () {
        console.log("Instrucciones del juego \"".concat(this.nombre, "\": Este es un juego de tipo \"").concat(this.tipoDeJuego, "\". Sigue las reglas si deseas ganar el premio de ").concat(this.premio, " puntos."));
    };
    return SlotsSTD;
}(Juego_1.Juego));
exports.SlotsSTD = SlotsSTD;
