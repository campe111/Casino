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
    function SlotsPrem(billetera) {
        var _this = _super.call(this, billetera) || this;
        _this.rodillos = ["🍒", "🍑", "🍐", "🍏", "🍎", "🍋", "🍇"]; // Símbolos adicionales
        _this.multiplicador = 2; // Multiplicador base
        _this.multiplicadorMasSimbolos = 8; // Multiplicador para más de 4 símbolos iguales
        _this.multiplicadorBonus = 10; // Multiplicador Bonus
        _this.bonus = 2000; // Bono fijo por Jackpot
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
        if (cantidadDeRodillos === void 0) { cantidadDeRodillos = 7; }
        return Array.from({ length: cantidadDeRodillos }, function () {
            return _this.rodillos[Math.floor(Math.random() * _this.rodillos.length)];
        });
    };
    SlotsPrem.prototype.jugar = function () {
        if (this.apuestaActual === 0) {
            console.log("Debes realizar una apuesta antes de jugar.");
            return;
        }
        var resultado = this.generarResultado(7);
        console.log("Resultado:", resultado.join(""));
        var simboloMasFrecuente = resultado.reduce(function (maxSimbolo, simbolo) {
            return resultado.filter(function (s) { return s === simbolo; }).length > resultado.filter(function (s) { return s === maxSimbolo; }).length ? simbolo : maxSimbolo;
        }, resultado[0]);
        var cantidadMaxima = resultado.filter(function (s) { return s === simboloMasFrecuente; }).length;
        if (cantidadMaxima === 7) {
            this.billetera.agregarSaldo(this.apuestaActual * this.multiplicadorBonus + this.bonus);
            console.log("¡Jackpot! Todos los símbolos son iguales. ¡Felicitaciones!");
        }
        else if (cantidadMaxima === 6) {
            console.log("¡Seis iguales! Has ganado un premio especial.");
            this.billetera.agregarSaldo(this.apuestaActual * this.multiplicadorMasSimbolos);
        }
        else if (cantidadMaxima === 5) {
            console.log("¡Cinco iguales! Has ganado un premio increíble.");
            this.billetera.agregarSaldo(this.apuestaActual * this.multiplicadorMasSimbolos);
        }
        else if (cantidadMaxima === 4) {
            console.log("¡Cuatro iguales! Has ganado un premio especial.");
            this.billetera.agregarSaldo(this.apuestaActual * this.multiplicadorMasSimbolos);
        }
        else if (cantidadMaxima === 3) {
            console.log("¡Tres iguales! Has ganado un premio.");
            this.billetera.agregarSaldo(this.apuestaActual * this.multiplicador);
        }
        else if (cantidadMaxima === 2) {
            console.log("¡Hay Dos iguales! Has ganado un premio.");
            this.billetera.agregarSaldo(this.apuestaActual * this.multiplicador);
        }
        else {
            console.log("Perdiste.");
        }
        this.apuestaActual = 0;
    };
    SlotsPrem.prototype.instruccionJuego = function () {
        console.log("Instrucciones del juego \"".concat(this.nombre, "\": Este es un juego de tipo \"").concat(this.tipoDeJuego, "\". Sigue las reglas si deseas ganar el premio de ").concat(this.premio, " puntos."));
    };
    return SlotsPrem;
}(SlotsSTD_1.SlotsSTD));
exports.SlotsPrem = SlotsPrem;
