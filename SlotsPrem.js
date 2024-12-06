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
exports.SlotsPrem = void 0;
var SlotsSTD_1 = require("./SlotsSTD");
var SlotsPrem = /** @class */ (function (_super) {
    __extends(SlotsPrem, _super);
    function SlotsPrem(nombre, tipoDeJuego, premio, multiplicador) {
        var _this = _super.call(this, nombre, tipoDeJuego, premio) || this;
        _this.rodillos = ["A", "B", "C", "D", "E", "F", "G"];
        _this.multiplicador = multiplicador;
        _this.saldoGanado = 0;
        _this.saldoPerdido = 0;
        _this.apuestaActual = 0;
        _this.multiplicador = 5;
        _this.bonus = 2000;
        return _this;
    }
    SlotsPrem.prototype.getMultiplicador = function () {
        return this.multiplicador;
    };
    SlotsPrem.prototype.getBonus = function () {
        return this.bonus;
    };
    SlotsPrem.prototype.generarResultado = function (cantidadDeRodillos) {
        var _this = this;
        if (cantidadDeRodillos === void 0) { cantidadDeRodillos = 4; }
        return Array.from({ length: cantidadDeRodillos }, function () {
            return _this.rodillos[Math.floor(Math.random() * _this.rodillos.length)];
        });
    };
    // Método para jugar (usando generarResultado del padre)
    SlotsPrem.prototype.jugar = function () {
        if (this.apuestaActual === 0) {
            console.log("Debes realizar una apuesta antes de jugar.");
            return;
        }
        // Generamos el resultado con 6 rodillos
        var resultado = this.generarResultado(6);
        console.log("Resultado:", resultado);
        // Lógica específica de SlotsPrem
        if (resultado.every(function (simbolo) { return simbolo === resultado[0]; })) {
            console.log("¡Jackpot Premium! Los 6 símbolos son iguales.");
            this.saldoGanado += this.apuestaActual * this.multiplicador + this.bonus;
        }
        else if (new Set(resultado).size === 3) {
            console.log("¡Ganaste! Tres pares iguales.");
            this.saldoGanado += this.apuestaActual * 5;
        }
        else {
            console.log("Perdiste.");
            this.saldoPerdido += this.apuestaActual; // Pierdes la apuesta
        }
    };
    SlotsPrem.prototype.instruccionJuego = function () {
        console.log("Instrucciones del juego \"".concat(this.nombre, "\": Este es un juego de tipo \"").concat(this.tipoDeJuego, "\". Sigue las reglas si deseas ganar el premio de ").concat(this.premio, " puntos."));
    };
    return SlotsPrem;
}(SlotsSTD_1.SlotsSTD));
exports.SlotsPrem = SlotsPrem;
