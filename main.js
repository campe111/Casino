"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlackJack_1 = require("./BlackJack");
// Ejemplo de uso
var blackjack = new BlackJack_1.BlackJack("Mi Casino", "BlackJack", 500000, 10000);
blackjack.repartirCartas(3); // Ahora reparte 4 cartas en lugar de 2
console.log(blackjack.mano); // Muestra las cartas repartidas
blackjack.plantarse(); // El jugador decide plantarse
blackjack.realizarApuesta(2000); // Realiza una apuesta
console.log("Dinero ganado: $".concat(blackjack.dineroGanado()));
console.log("Dinero perdido: $".concat(blackjack.dineroPerdido()));
