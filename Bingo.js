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
    function Bingo() {
        var _this = _super.call(this, "Bingo", "Juego de Casino", 100) || this;
        _this.carton = [];
        _this.bolasLlamadas = [];
        _this.bolasMarcadas = [];
        _this.apuestaActual = 0;
        _this.ganancias = 0;
        _this.perdidas = 0;
        _this.premio = 10000; // Premio fijo 
        _this.carton = _this.generarCarton();
        _this.bolasLlamadas = _this.generarBolas();
        return _this;
    }
    // Genera el cartón de bingo (15 números entre 1 y 90)
    Bingo.prototype.generarCarton = function () {
        var carton = [];
        while (carton.length < 15) {
            var numero = Math.floor(Math.random() * 90) + 1;
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
            return _this.bolasMarcadas.includes(num) ? "".concat(num, " (Marcado)") : "".concat(num);
        });
        console.table("Cartón de Bingo:");
        console.table(cartonMarcado.join(' '));
    };
    // Función principal del juego
    Bingo.prototype.jugar = function () {
        console.log("¡Comienza el juego de Bingo!");
        var bingo = false;
        this.mostrarCarton();
        for (var _i = 0, _a = this.bolasLlamadas; _i < _a.length; _i++) {
            var bola = _a[_i];
            console.log("Bola llamada: ".concat(bola));
            // Si la bola está en el cartón, la marcamos
            if (this.carton.includes(bola)) {
                this.bolasMarcadas.push(bola);
                console.log("\u00A1Marcado! N\u00FAmero: ".concat(bola));
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
            // Aquí ganaste el premio
            this.ganancias = this.premio;
            console.log("\u00A1Has ganado ".concat(this.ganancias, "!"));
        }
        else {
            console.log("El juego ha terminado, pero no hay Bingo.");
            this.ganancias = 0; // No se gana nada si no hay Bingo
        }
    };
    // Métodos de la interfaz Apuesta
    Bingo.prototype.realizarApuesta = function (monto) {
        if (monto < this.apuestaMinima()) {
            console.log("La apuesta m\u00EDnima es ".concat(this.apuestaMinima(), " y no has alcanzado ese monto."));
            return;
        }
        this.apuestaActual = monto;
        console.log("Apuesta de ".concat(monto, " realizada en el juego ").concat(this.nombre, "."));
    };
    Bingo.prototype.dineroGanado = function () {
        // Se ha calculado el premio al ganar el Bingo
        return this.ganancias;
    };
    Bingo.prototype.dineroPerdido = function () {
        // Se calcula la pérdida 
        this.perdidas = this.apuestaActual - this.ganancias; // La diferencia entre lo apostado y lo ganado
        return this.perdidas;
    };
    Bingo.prototype.apuestaMinima = function () {
        return 2500; // Ejemplo: Monto mínimo de apuesta es 2500
    };
    return Bingo;
}(Juego_1.Juego));
exports.Bingo = Bingo;
