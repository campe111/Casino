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
exports.Bingo = void 0;
var Juego_1 = require("./Juego");
var Bingo = /** @class */ (function (_super) {
    __extends(Bingo, _super);
    function Bingo(billetera) {
        var _this = _super.call(this, "Bingo", "Juego de Casino", 50, billetera) || this;
        _this.carton = [];
        _this.resultado = '';
        _this.bolasLlamadas = [];
        _this.bolasMarcadas = [];
        _this.apuestaActual = 0;
        _this.ganancias = 0;
        _this.perdidas = 0;
        _this.juegoEnCurso = false;
        _this.carton = _this.generarCarton();
        _this.bolasLlamadas = _this.generarBolas();
        _this.saldo = 0; // Iniciar saldo en 0 o puedes definirlo a una cantidad predeterminada si lo deseas
        _this.billetera = billetera;
        return _this;
    }
    Bingo.prototype.bingoFinal = function () {
        if (this.juegoEnCurso) {
            this.actualizarSaldo(); // Actualiza el saldo al finalizar el juego
            this.mostrarSaldo(); // Muestra el saldo después de cada juego
        }
    };
    // Genera el cartón de bingo (15 números entre 1 y 90)
    Bingo.prototype.generarCarton = function () {
        var carton = [];
        while (carton.length < 15) {
            var numero = Math.floor(Math.random() * 90) + 1; // Genera un número aleatorio entre 1 y 90
            if (!carton.includes(numero)) {
                carton.push(numero);
            }
        }
        carton.sort(function (a, b) { return a - b; });
        return carton;
    };
    // Genera las bolas sorteadas (90 bolas posibles)
    Bingo.prototype.generarBolas = function () {
        var bolas = [];
        while (bolas.length < 90) {
            var bola = Math.floor(Math.random() * 90) + 1;
            if (!bolas.includes(bola)) {
                bolas.push(bola);
            }
        }
        return bolas;
    };
    // Función para mostrar el cartón con los números marcados
    Bingo.prototype.mostrarCarton = function () {
        var _this = this;
        var cartonMarcado = this.carton.map(function (num) {
            return _this.bolasMarcadas.includes(num) ? "".concat(num, "\u274E") : "".concat(num);
        });
        console.table("Cartón de Bingo:");
        console.table(cartonMarcado.join(' '));
    };
    // Función principal  del juego
    Bingo.prototype.jugar = function () {
        if (this.apuestaActual <= 0) {
            console.log("Carga saldo y realiza una apuesta antes de jugar.");
            return; // Si no hay apuesta, no se puede jugar
        }
        console.log("¡Comienza el juego de Bingo!");
        var bingo = false;
        this.mostrarCarton();
        for (var _i = 0, _a = this.bolasLlamadas; _i < _a.length; _i++) {
            var bola = _a[_i];
            console.log("Bola llamada: ".concat(bola));
            // Si la bola está en el cartón, la marcamos
            if (this.carton.includes(bola)) {
                this.bolasMarcadas.push(bola);
                console.log("\u00A1Marcado! ".concat(bola, " \u2705"));
            }
            // Mostrar el estado del cartón
            this.mostrarCarton();
            // Verificar si se ha alcanzado el Bingo
            if (this.bolasMarcadas.length === this.carton.length) {
                bingo = true;
                break;
            }
        }
        if (bingo) {
            console.log("¡Bingo! Has marcado todos los números.");
            this.resultado = 'Ganaste'; // Resultado de ganar
            this.ganancias = this.premio; // Asignar el premio ganado
            console.log("\u00A1Has ganado $".concat(this.ganancias, "!"));
        }
        else {
            console.log("El juego ha terminado, pero no hay Bingo.");
            this.resultado = 'Perdiste'; // Resultado de perder
            this.ganancias = 0; // No se gana nada si no hay Bingo
        }
        // Llamar a actualizar el saldo después de la jugada
        this.actualizarSaldo();
    };
    // Métodos de la interfaz Apuesta
    Bingo.prototype.realizarApuesta = function (monto) {
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
    // Método para actualizar el saldo después de cada jugada
    Bingo.prototype.actualizarSaldo = function () {
        if (this.resultado === 'Ganaste') {
            // Ganancias netas: Apuesta + Premio
            var gananciasTotales = this.apuestaActual + this.ganancias;
            this.saldo += gananciasTotales; // Sumar la apuesta + las ganancias al saldo
            console.log("\u00A1Ganaste! Has obtenido $".concat(this.ganancias, " de ganancia neta."));
        }
        else if (this.resultado === 'Perdiste') {
            // Si el jugador perdió, solo se debe restar la apuesta
            this.saldo -= this.apuestaActual;
            console.log("Perdiste. Has perdido $".concat(this.apuestaActual, "."));
        }
        console.log("Saldo actualizado: $".concat(this.billetera.obtenerSaldo() + this.saldo));
        this.juegoEnCurso = false; // Finalizar el juego
        this.apuestaActual = 0; // Reiniciar la apuesta actual
    };
    // Método para mostrar el saldo actual
    Bingo.prototype.mostrarSaldo = function () {
        console.log("El saldo actual es: $".concat(this.saldo));
    };
    Bingo.prototype.dineroGanado = function () {
        return this.ganancias;
    };
    Bingo.prototype.dineroPerdido = function () {
        return this.perdidas;
    };
    Bingo.prototype.apuestaMinima = function () {
        return 100; // Ejemplo: Monto mínimo de apuesta es 100
    };
    // Método para cargar saldo
    Bingo.prototype.cargarSaldo = function (monto) {
        this.saldo += monto;
        console.log("Saldo cargado: $".concat(monto, ". Saldo actual en billetera: $").concat(this.saldo));
    };
    return Bingo;
}(Juego_1.Juego));
exports.Bingo = Bingo;
