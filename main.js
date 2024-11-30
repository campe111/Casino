"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
var BlackJack_1 = require("./BlackJack");
// Ejemplo de uso
var blackjack = new BlackJack_1.BlackJack("Mi Casino", "BlackJack", 500000, 10000);
blackjack.repartirCartas(3); // Ahora reparte 4 cartas en lugar de 2
console.log(blackjack.mano); // Muestra las cartas repartidas
blackjack.plantarse(); // El jugador decide plantarse
blackjack.realizarApuesta(2000); // Realiza una apuesta
console.log("Dinero ganado: $".concat(blackjack.dineroGanado()));
console.log("Dinero perdido: $".concat(blackjack.dineroPerdido()));
=======
var readline = require("readline");
var BlackJack_1 = require("./BlackJack");
var Bingo_1 = require("./Bingo");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function mostrarMenu() {
    console.log("--- Casino King Of Coins ---");
    console.log("1. Jugar al blackjack");
    console.log("2. Jugar al bingo");
    console.log("3. Salir");
    var bingo = new Bingo_1.Bingo();
    var blackJack = new BlackJack_1.BlackJack("Blackjack", "BlackJack", 1000, 100);
    rl.question("Seleccione una opcion: ", function (opcion) {
        switch (opcion) {
            case "1":
                blackJack.iniciarJuego();
                blackJack.repartirCartas(2);
                blackJack.plantarse();
                blackJack.calcularSumaDeCartas();
                break;
        }
        volverAlMenuPrincipal();
    });
}
// Función para volver al menú principal
function volverAlMenuPrincipal() {
    rl.question("\n¿Desea volver al menú principal? (si/no): ", function (respuesta) {
        if (respuesta.toLowerCase() === "si") {
            mostrarMenu();
        }
        else {
            console.log("¡Gracias por jugar!");
            rl.close();
        }
    });
}
mostrarMenu();
volverAlMenuPrincipal();
>>>>>>> e812c281c16e2d1e1c9643fff5f5ad5d7d686966
