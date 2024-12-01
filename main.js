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
    console.log("1. Jugar al Blackjack");
    console.log("2. Jugar al Bingo");
    console.log("3. Jugar al Slot Machine");
    console.log("4. Jugar al Slot de la Casa");
    console.log("5. Salir");
    var blackJack = new BlackJack_1.BlackJack("Blackjack", "BlackJack", 100000, 10000);
    var bingo = new Bingo_1.Bingo();
    var apuesta = blackJack;
    console.log("\n");
    rl.question("Seleccione una opcion: ", function (opcion) {
        switch (opcion) {
            case "1":
                console.log("\n");
                blackJack.instruccionJuego();
                blackJack.iniciarJuego();
                blackJack.realizarApuesta(1500);
                apuesta.dineroGanado();
                blackJack.repartirCartas(3);
                blackJack.plantarse();
                blackJack.calcularSumaDeCartas();
                blackJack.finalizarJuego();
                rl.question("\n¿Desea jugar otra vez? (si/no): ", function (respuesta) {
                    if (respuesta.toLowerCase() === "si") {
                        blackJack.iniciarJuego();
                        blackJack.realizarApuesta(1500);
                        blackJack.repartirCartas(2);
                        blackJack.plantarse();
                        blackJack.calcularSumaDeCartas();
                        blackJack.finalizarJuego();
                    }
                    else {
                        console.log("¡Gracias por jugar!");
                    }
                });
                break;
            case "2":
                bingo.jugar();
                break;
            case "3":
                console.log("Slot Machine no disponible");
                break;
            case "4":
                console.log("Slot de la Casa no disponible");
                break;
            case "5":
                console.log("Saliendo del juego");
                rl.close();
                break;
            default:
                console.log("Opcion no valida");
                mostrarMenu();
                break;
        }
        console.log("\n");
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
