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
    function BlackJack(billetera) {
        var _this = _super.call(this, 'BlackJack', 'Cartas', 50, billetera) || this;
        _this.mano = [];
        _this.resultado = '';
        _this.ganancias = 0;
        _this.perdidas = 0;
        _this.apuestaActual = 0;
        _this.juegoEnCurso = false;
        _this.saldo = 0;
        return _this;
    }
    BlackJack.prototype.repartirCartas = function (numeroDeCartas) {
        if (numeroDeCartas === void 0) { numeroDeCartas = 2; }
        this.mano = [];
        for (var i = 0; i < numeroDeCartas; i++) {
            this.mano.push(this.generarCartaAleatoria());
        }
        this.juegoEnCurso = true;
    };
    BlackJack.prototype.plantarse = function () {
        if (this.juegoEnCurso) {
            this.calcularSumaDeCartas(); // Calcula la suma al plantarse
            this.actualizarSaldo(); // Actualiza el saldo al finalizar el juego
        }
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
        // Actualización de las ganancias y pérdidas en función de la apuesta
        if (suma > 21) {
            this.perdidas += this.apuestaActual; // Registrando la pérdida
            this.resultado = 'Perdiste, te pasaste de 21.';
        }
        else {
            this.ganancias += this.apuestaActual * this.premio; // Registrando la ganancia
            this.resultado = "La suma de tus cartas es ".concat(suma, ". Ganaste $").concat(this.apuestaActual * this.premio, ".");
        }
        console.log(this.resultado); // Mostrar el resultado
    };
    // Método para generar una carta aleatoria
    BlackJack.prototype.generarCartaAleatoria = function () {
        var valores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // 1: As, 11: J, 12: Q, 13: K
        return valores[Math.floor(Math.random() * valores.length)];
    };
    BlackJack.prototype.realizarApuesta = function (monto) {
        if (monto < this.apuestaMinima()) {
            console.log("El monto apostado es menor que la apuesta mínima.");
            return;
        }
        else if (monto > this.billetera.obtenerSaldo()) {
            console.log("Saldo insuficiente para realizar la apuesta.");
            return;
        }
        else {
            this.billetera.restarSaldo(monto);
            this.apuestaActual = monto; // Registrar la apuesta actual
            this.resultado = ''; // Reiniciar resultado al realizar una nueva apuesta
            console.log("Apuesta realizada con \u00E9xito. Monto apostado: $".concat(monto));
        }
    };
    BlackJack.prototype.actualizarSaldo = function () {
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
    BlackJack.prototype.dineroGanado = function () {
        return this.ganancias;
    };
    BlackJack.prototype.dineroPerdido = function () {
        return this.perdidas;
    };
    BlackJack.prototype.apuestaMinima = function () {
        return 100; // Ejemplo: Monto mínimo de apuesta es 100
    };
    return BlackJack;
}(Juego_1.Juego));
exports.BlackJack = BlackJack;
