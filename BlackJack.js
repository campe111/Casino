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
exports.BlackJack = void 0;
var Juego_1 = require("./Juego");
var BlackJack = /** @class */ (function (_super) {
    __extends(BlackJack, _super);
    function BlackJack(nombre, tipoDeJuego, premio, saldo) {
        var _this = _super.call(this, nombre, tipoDeJuego, premio) || this;
        _this.mano = [];
        _this.ganancias = 0;
        _this.perdidas = 0;
        _this.saldo = saldo;
        _this.resultado = '';
        return _this;
    }
    BlackJack.prototype.repartirCartas = function (numeroDeCartas) {
        if (numeroDeCartas === void 0) { numeroDeCartas = 2; }
        this.mano = [];
        for (var i = 0; i < numeroDeCartas; i++) {
            this.mano.push(this.generarCartaAleatoria());
        }
    };
    BlackJack.prototype.plantarse = function () {
        this.calcularSumaDeCartas(); // Calcula la suma al plantarse
    };
    BlackJack.prototype.calcularSumaDeCartas = function () {
        var suma = 0;
        var tieneAs = false;
        for (var _i = 0, _a = this.mano; _i < _a.length; _i++) {
            var valor = _a[_i];
            if (valor > 10) {
                suma += 10; // Cartas J, Q, K valen 10
            }
            else if (valor === 1) {
                tieneAs = true;
                suma += 11; // As inicialmente vale 11
            }
            else {
                suma += valor;
            }
        }
        // Ajuste si el jugador se pasa de 21 y tiene un As
        if (tieneAs && suma > 21) {
            suma -= 10; // El As pasa a valer 1 en lugar de 11
        }
        if (suma > 21) {
            this.perdidas += this.saldo; // Registrando la pérdida
            this.resultado = 'Perdiste, te pasaste de 21.';
        }
        else {
            this.ganancias += this.saldo; // Registrando la ganancia
            this.resultado = "La suma de tus cartas es ".concat(suma, ".");
        }
        console.log(this.resultado); // Mostrar el resultado
    };
    // Método para generar una carta aleatoria
    BlackJack.prototype.generarCartaAleatoria = function () {
        var valores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // 1: As, 11: J, 12: Q, 13: K
        return valores[Math.floor(Math.random() * valores.length)];
    };
    // Métodos de la interfaz
    BlackJack.prototype.realizarApuesta = function (monto) {
        if (monto < this.apuestaMinima()) {
            console.log("Saldo insuficiente para realizar la apuesta.");
        }
        else if (monto <= this.saldo) {
            this.saldo -= monto;
            console.log("Apuesta realizada con \u00E9xito. Monto apostado: $".concat(monto));
        }
        else {
            console.log("Saldo insuficiente.");
        }
    };
    BlackJack.prototype.dineroGanado = function () {
        return this.ganancias;
    };
    BlackJack.prototype.dineroPerdido = function () {
        return this.perdidas;
    };
    BlackJack.prototype.apuestaMinima = function () {
        return 10; // Ejemplo: Monto mínimo de apuesta es 10
    };
    return BlackJack;
}(Juego_1.Juego));
exports.BlackJack = BlackJack;
