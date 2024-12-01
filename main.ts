import * as readline from "readline";
import { BlackJack } from "./BlackJack";
import { Bingo } from "./Bingo";
import { Apuesta } from "./Interfaz";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function mostrarMenu(): void {
    console.log("--- Casino King Of Coins ---");
    console.log("1. Jugar al Blackjack");
    console.log("2. Jugar al Bingo");
    console.log("3. Jugar al Slot Machine");
    console.log("4. Jugar al Slot de la Casa");
    console.log("5. Salir");
    const blackJack = new BlackJack("Blackjack", "BlackJack", 100000, 10000);
    const bingo = new Bingo();
    const apuesta = blackJack as Apuesta;
console.log("\n");
    rl.question("Seleccione una opcion: ", (opcion) => {
        switch (opcion) {
            case "1":
                console.log("\n");
                blackJack.instruccionJuego();
                blackJack.iniciarJuego();
                blackJack.realizarApuesta(1500);
                blackJack.repartirCartas(3);
                blackJack.plantarse();
                blackJack.calcularSumaDeCartas();
                blackJack.finalizarJuego();
                rl.question("\n¿Desea jugar otra vez? (si/no): ", (respuesta) => {
                    if (respuesta.toLowerCase() === "si") {
                        blackJack.iniciarJuego();
                        blackJack.realizarApuesta(1500);
                        blackJack.repartirCartas(2);
                        blackJack.plantarse();
                        blackJack.calcularSumaDeCartas();
                        blackJack.finalizarJuego();
                    } else {
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
