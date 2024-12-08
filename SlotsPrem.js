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
    function SlotsPrem() {
        var _this = _super.call(this) || this;
        _this.rodillos = ["🍒", "🍑", "🍐", "🍏", "🍎", "🍋", "🍇"]; // Símbolos adicionales
        _this.multiplicador = 5; // Multiplicador base
        _this.saldoGanado = 0;
        _this.saldoPerdido = 0;
        _this.apuestaActual = 0;
        _this.bonus = 2000; // Bono fijo por Jackpot
        _this.multiplicadoresExtras = {
            "tresSimbolosIguales": 10, // Tres símbolos iguales
            "dosSimbolosIguales": 3, // Dos símbolos iguales
            "paresIguales": 2 // Pareja de símbolos
        };
        return _this;
    }
    // Métodos para obtener el multiplicador y el bonus
    SlotsPrem.prototype.getMultiplicador = function () {
        return this.multiplicador;
    };
    SlotsPrem.prototype.getBonus = function () {
        return this.bonus;
    };
    // Método para generar el resultado (sobrescribe el del padre)
    SlotsPrem.prototype.generarResultado = function (cantidadDeRodillos) {
        var _this = this;
        if (cantidadDeRodillos === void 0) { cantidadDeRodillos = 7; }
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
        // Generamos el resultado con 7 rodillos
        var resultado = this.generarResultado(7);
        console.log("Resultado:", resultado.join(""));
        // Lógica de juego de SlotsPrem (con más combinaciones y mejores premios)
        if (resultado.every(function (simbolo) { return simbolo === resultado[0]; })) {
            // Jackpot Premium: todos los símbolos iguales
            console.log("¡Jackpot Premium! Los 7 símbolos son iguales.");
            this.saldoGanado += this.apuestaActual * this.multiplicador + this.bonus;
        }
        else if (resultado.slice(0, 3).every(function (simbolo) { return simbolo === resultado[0]; })) {
            // Tres símbolos iguales
            console.log("¡Ganaste! Tres símbolos iguales.");
            this.saldoGanado += this.apuestaActual * this.multiplicadoresExtras.tresSimbolosIguales;
        }
        else if (new Set(resultado).size === 3) {
            // Tres pares iguales
            console.log("¡Ganaste! Tres pares iguales.");
            this.saldoGanado += this.apuestaActual * 5;
        }
        else if (resultado[0] === resultado[1]) {
            // Caso de dos símbolos iguales
            console.log("¡Ganaste! Dos símbolos iguales.");
            this.saldoGanado += this.apuestaActual * this.multiplicadoresExtras.dosSimbolosIguales;
        }
        else if (resultado[0] === resultado[1] && resultado[1] === resultado[2]) {
            // Ganar por tres símbolos iguales en las primeras posiciones
            console.log("¡Ganaste! Tres símbolos iguales en las primeras posiciones.");
            this.saldoGanado += this.apuestaActual * this.multiplicadoresExtras.tresSimbolosIguales;
        }
        else {
            console.log("Perdiste.");
            this.saldoPerdido += this.apuestaActual; // Pierdes la apuesta
        }
        // Actualizar saldo y mostrar resultados finales
        this.saldo += this.saldoGanado;
        this.saldo -= this.saldoPerdido;
        // Reiniciar apuestas y ganancias
        this.apuestaActual = 0;
        this.saldoGanado = 0;
        this.saldoPerdido = 0;
    };
    // Método para mostrar las instrucciones del juego
    SlotsPrem.prototype.instruccionJuego = function () {
        console.log("Instrucciones del juego \"".concat(this.nombre, "\": Este es un juego de tipo \"").concat(this.tipoDeJuego, "\". Sigue las reglas si deseas ganar el premio de ").concat(this.premio, " puntos."));
    };
    return SlotsPrem;
}(SlotsSTD_1.SlotsSTD));
exports.SlotsPrem = SlotsPrem;
