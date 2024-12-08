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
    function SlotsSTD() {
        var _this = _super.call(this, 'Slots STD', 'Juego de Casino', 100) || this; // Ajusté el premio a 100 para simplificación
        _this.rodillos = ["🍒", "🍑", "🍐", "🍏"]; // Posibles símbolos del juego
        _this.apuestaActual = 0; // Al principio no hay apuesta
        _this.saldoGanado = 0; // No se ha ganado nada todavía
        _this.saldoPerdido = 0; // No se ha perdido nada todavía
        _this.saldo = 0; // El saldo inicial es 0
        _this.apuestaMinimaPermitida = 20; // Apuesta mínima de 20
        _this.apuestaMaximaPermitida = 500; // Apuesta máxima de 1000
        return _this;
    }
    // Método para cargar saldo
    SlotsSTD.prototype.cargarSaldo = function (monto) {
        if (monto <= 0) {
            console.log("El monto a cargar debe ser positivo.");
            return;
        }
        this.saldo += monto;
        console.log("Saldo cargado: $".concat(monto, ". Saldo total: $").concat(this.saldo));
    };
    // Método para realizar una apuesta
    SlotsSTD.prototype.realizarApuesta = function (monto) {
        if (monto < this.apuestaMinimaPermitida) {
            console.log("La apuesta m\u00EDnima es $".concat(this.apuestaMinimaPermitida, "."));
            return;
        }
        if (monto > this.apuestaMaximaPermitida) {
            console.log("La apuesta m\u00E1xima es $".concat(this.apuestaMaximaPermitida, "."));
            return;
        }
        if (monto > this.saldo) {
            console.log("No tienes suficiente saldo. Tu saldo es $".concat(this.saldo, " y quieres apostar $").concat(monto, "."));
            return;
        }
        this.apuestaActual = monto; // Guardamos el monto apostado
        this.saldo -= monto; // Restamos el monto apostado del saldo
        console.log("Apuesta de $".concat(monto, " realizada. Saldo restante: $").concat(this.saldo));
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
        // Generar resultado con cantidad dinámica de rodillos
        return Array.from({ length: cantidadDeRodillos }, function () {
            return _this.rodillos[Math.floor(Math.random() * _this.rodillos.length)];
        });
    };
    // Método para jugar
    SlotsSTD.prototype.jugar = function () {
        if (this.apuestaActual === 0) {
            console.log("Debes realizar una apuesta antes de jugar.");
            return;
        }
        // Generamos el resultado
        var resultado = this.generarResultado(4);
        console.log("Resultado:", resultado.join(""));
        // Lógica de resultados con más combinaciones ganadoras
        if (resultado.every(function (simbolo) { return simbolo === resultado[0]; })) {
            // Jackpot: todos los símbolos son iguales
            console.log("¡Jackpot! Los símbolos son iguales.");
            this.saldoGanado += this.apuestaActual * 15; // Gran premio con multiplicador x15
        }
        else if (resultado.slice(0, 3).every(function (simbolo) { return simbolo === resultado[0]; })) {
            // Tres símbolos iguales
            console.log("¡Tres iguales! Has ganado un premio.");
            this.saldoGanado += this.apuestaActual * 5; // Premio por tres iguales
        }
        else if (new Set(resultado).size === 2) {
            // Dos pares iguales
            console.log("¡Ganaste! Dos pares iguales.");
            this.saldoGanado += this.apuestaActual * 3; // Premio por dos pares iguales
        }
        else if (resultado[0] === resultado[1]) {
            // Caso de dos símbolos iguales
            console.log("¡Ganaste! Dos símbolos iguales.");
            this.saldoGanado += this.apuestaActual * 2; // Premio pequeño por dos iguales
        }
        else {
            console.log("Perdiste.");
            this.saldoPerdido += this.apuestaActual; // Pierdes lo que apostaste
        }
        // Actualizar saldo y mostrar resultados finales
        this.saldo + this.saldoGanado;
        this.saldo - this.saldoPerdido;
        // Reiniciar apuestas y ganancias
        this.apuestaActual = 0;
        this.saldoGanado = 0;
        this.saldoPerdido = 0;
    };
    // Método para mostrar el saldo actual
    SlotsSTD.prototype.actualizarSaldo = function () {
        console.log("Saldo actual del jugador: $".concat(this.saldo));
    };
    // Método para mostrar las instrucciones del juego
    SlotsSTD.prototype.instruccionJuego = function () {
        console.log("Instrucciones del juego \"".concat(this.nombre, "\": Este es un juego de tipo \"").concat(this.tipoDeJuego, "\". Sigue las reglas para ganar el premio de ").concat(this.premio, " puntos."));
    };
    return SlotsSTD;
}(Juego_1.Juego));
exports.SlotsSTD = SlotsSTD;
