import * as readline from "readline";
import { BlackJack } from "./BlackJack";
import { Bingo } from "./Bingo";
import { SlotsSTD } from "./SlotsSTD";
import { SlotsPrem } from "./SlotsPrem";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function mostrarMenu(): void {
    console.log("--- Casino King Of Coins ---");
    console.log("1. Jugar al blackjack");
    console.log("2. Jugar al bingo");
    console.log("3. Jugar al Slots Standard");
    console.log("4. Jugar al Slots Premium");
    console.log("5. Salir");

    const blackJack = new BlackJack("Blackjack", "BlackJack", 1000, 100);
    const bingo = new Bingo();
    const slotsSTD = new SlotsSTD("Tragamonedas", "STD", 1000);
    const slotsPremium = new SlotsPrem("Tragamonedas Premium", "Premium", 10000, 10);
    rl.question("Seleccione una opcion: ", (opcion) => {
        switch (opcion) {
            case "1":
                blackJack.iniciarJuego();
                blackJack.repartirCartas(2);
                blackJack.plantarse();
                blackJack.calcularSumaDeCartas();
            case "2":
                bingo.jugar();
                bingo.realizarApuesta(1000);
                bingo.iniciarJuego();
                bingo.dineroGanado();
                bingo.finalizarJuego();
            case "3":
                slotsSTD.instruccionJuego();
                slotsSTD.realizarApuesta(80);     //Paso el monto que deseo apostar
                slotsSTD.iniciarJuego();
                slotsSTD.jugar();
                slotsSTD.dineroGanado();
                slotsSTD.finalizarJuego();
                break;
            case "4":
                slotsPremium.jugar();
                slotsPremium.realizarApuesta(1000);
                slotsPremium.iniciarJuego();
                slotsPremium.finalizarJuego();
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
