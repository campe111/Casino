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
    function SlotsSTD(billetera) {
        var _this = _super.call(this, "Slots STD", "Juego de Casino", 10, billetera) || this; // Ajusté el premio a 100 para simplificación
        _this.resultado = '';
        _this.juegoEnCurso = false;
        _this.rodillos = ["🍒", "🍑", "🍐", "🍏"]; // Posibles símbolos del juego
        _this.premioSlost = 10;
        _this.premioBasico = 2;
        _this.apuestaActual = 0; // Al principio no hay apuesta
        _this.saldoGanado = 0; // No se ha ganado nada todavía
        _this.saldoPerdido = 0; // No se ha perdido nada todavía
        _this.apuestaMinimaPermitida = 20; // Apuesta mínima de 500
        _this.apuestaMaximaPermitida = 500; // Apuesta máxima de 2000
        return _this;
    }
    // Método para cargar saldo
    SlotsSTD.prototype.cargarSaldo = function (monto) {
        if (monto <= 0) {
            console.log("El monto a cargar debe ser positivo.");
            return;
        }
        this.billetera.agregarSaldo(monto);
        console.log("Saldo cargado: $".concat(monto, ". Saldo total: $").concat(this.billetera.obtenerSaldo()));
    };
    // Método para realizar una apuesta
    SlotsSTD.prototype.realizarApuesta = function (monto) {
        if (monto < this.apuestaMinimaPermitida) {
            console.log("La apuesta es menor que la mínima permitida.");
        }
        else if (monto > this.apuestaMaximaPermitida) {
            console.log("La apuesta supera el máximo permitido.");
        }
        else if (monto > this.billetera.obtenerSaldo()) {
            console.log("Saldo insuficiente para realizar la apuesta.");
        }
        else {
            this.billetera.restarSaldo(monto);
            this.apuestaActual = monto;
            console.log("Apuesta realizada: ".concat(monto));
        }
    };
    // Método para obtener el dinero ganado
    SlotsSTD.prototype.dineroGanado = function () {
        return this.saldoGanado; // Devolvemos el saldo ganado
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
    // Método para generar el resultado
    SlotsSTD.prototype.generarResultado = function (cantidadDeRodillos) {
        var _this = this;
        if (cantidadDeRodillos === void 0) { cantidadDeRodillos = 4; }
        return Array.from({ length: cantidadDeRodillos }, function () { return _this.rodillos[Math.floor(Math.random() * _this.rodillos.length)]; });
    };
    // Método para jugar
    SlotsSTD.prototype.jugar = function () {
        if (this.apuestaActual === 0) {
            console.log("Debes realizar una apuesta antes de jugar.");
            return;
        }
        var resultado = this.generarResultado(4);
        console.log("Resultado:", resultado.join(""));
        var simboloMasFrecuente = resultado.reduce(function (maxSimbolo, simbolo) {
            return resultado.filter(function (s) { return s === simbolo; }).length > resultado.filter(function (s) { return s === maxSimbolo; }).length ? simbolo : maxSimbolo;
        }, resultado[0]);
        var cantidadMaxima = resultado.filter(function (s) { return s === simboloMasFrecuente; }).length;
        if (cantidadMaxima === 4) {
            console.log("¡Cuatro iguales! Has ganado un premio especial.");
            this.saldoGanado += this.apuestaActual * this.premioSlost;
        }
        else if (cantidadMaxima === 3) {
            console.log("¡Tres iguales! Has ganado un premio.");
            this.saldoGanado += this.apuestaActual * this.premioBasico;
        }
        else if (cantidadMaxima === 2) {
            console.log("¡Hay Dos iguales! Has ganado un premio.");
            this.saldoGanado += this.apuestaActual * this.premioBasico;
        }
        else {
            console.log("Perdiste.");
            this.saldoPerdido - this.apuestaActual; // Pierdes lo que apostaste
        }
        // Actualizar saldo y mostrar resultados finales
        this.billetera.agregarSaldo(this.saldoGanado);
        this.billetera.restarSaldo(this.saldoPerdido);
        console.log("Saldo actualizado: $".concat(this.billetera.obtenerSaldo()));
        // Reiniciar apuestas y ganancias
        this.apuestaActual = 0;
        this.saldoGanado = 0;
        this.saldoPerdido = 0;
    };
    // Método para mostrar el saldo actual
    SlotsSTD.prototype.actualizarSaldo = function () {
        if (this.resultado.includes('Ganaste')) {
            var ganancias = this.apuestaActual * this.premio;
            this.billetera.agregarSaldo(ganancias); // Sumar ganancias al saldo actual
            console.log("Saldo actualizado: $".concat(this.billetera.obtenerSaldo()));
        }
        else if (this.resultado.includes('Perdiste')) {
            console.log("Saldo actualizado: $".concat(this.billetera.obtenerSaldo()));
        }
        this.juegoEnCurso = false; // Finalizar el juego
        this.apuestaActual = 0; // Reiniciar la apuesta actual
    };
    // Método para mostrar las instrucciones del juego
    SlotsSTD.prototype.instruccionJuego = function () {
        console.log("Instrucciones del juego \"".concat(this.nombre, "\": Este es un juego de tipo \"").concat(this.tipoDeJuego, "\". Sigue las reglas para ganar el premio de ").concat(this.premio, " puntos."));
    };
    return SlotsSTD;
}(Juego_1.Juego));
exports.SlotsSTD = SlotsSTD;
