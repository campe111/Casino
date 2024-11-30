var BingoGame = /** @class */ (function () {
    function BingoGame() {
        this.carton = [];
        this.bolasLlamadas = [];
        this.bolasMarcadas = [];
        this.carton = this.generarCarton();
        this.bolasLlamadas = this.generarBolas();
    }
    // Genera el cartón de bingo (15 números entre 1 y 90)
    BingoGame.prototype.generarCarton = function () {
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
    BingoGame.prototype.generarBolas = function () {
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
    BingoGame.prototype.mostrarCarton = function () {
        var _this = this;
        var cartonMarcado = this.carton.map(function (num) {
            return _this.bolasMarcadas.includes(num) ? "".concat(num, " (Marcado)") : "".concat(num);
        });
        console.table("Cartón de Bingo:");
        console.table(cartonMarcado.join(' '));
    };
    // Función principal del juego
    BingoGame.prototype.jugar = function () {
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
        }
        else {
            console.log("El juego ha terminado, pero no hay Bingo.");
        }
    };
    return BingoGame;
}());
// Crear una instancia del juego y ejecutarlo
var juego = new BingoGame();
juego.jugar();
