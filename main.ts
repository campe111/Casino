

import * as readline from "readline";
import { BlackJack } from "./BlackJack";
import { Bingo } from "./Bingo";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function mostrarMenu(): void {
    console.log("--- Casino King Of Coins ---");
    console.log("1. Jugar al blackjack");
    console.log("2. Jugar al bingo");
    console.log("3. Salir");
    const bingo = new Bingo();
    const blackJack = new BlackJack("Blackjack", "BlackJack", 1000, 100);
    rl.question("Seleccione una opcion: ", (opcion) => {
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
function volverAlMenuPrincipal(): void {
    rl.question("\n¿Desea volver al menú principal? (si/no): ", (respuesta) => {
        if (respuesta.toLowerCase() === "si") {
            mostrarMenu();
        } else {
            console.log("¡Gracias por jugar!");
            rl.close();
        }
    });
}
mostrarMenu();
volverAlMenuPrincipal();
