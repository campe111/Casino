import { Juego } from "./Juego";
<<<<<<< HEAD
import { Casino }from "./Casino";
import { SlotsPrem } from "./SlotsPrem";

const casino = new Casino();
const slotcito = new SlotsPrem("slots", "Std",100,4,6 );
slotcito.iniciarJuego();


casino.mostrarJuegosDisponibles();


=======
import {BlackJack} from "./BlackJack";
import { Apuesta } from "./Interfaz";
import {Casino} from "./Casino";

// Ejemplo de uso
>>>>>>> 333e960759c257432e718fc405c3444b53b12ed4


const blackjack = new BlackJack("Mi Casino", "BlackJack", 500000, 10000);
blackjack.repartirCartas(3); // Ahora reparte 4 cartas en lugar de 2
console.log(blackjack.mano); // Muestra las cartas repartidas

blackjack.plantarse(); // El jugador decide plantarse

blackjack.realizarApuesta(2000); // Realiza una apuesta
console.log(`Dinero ganado: $${blackjack.dineroGanado()}`);
console.log(`Dinero perdido: $${blackjack.dineroPerdido()}`);

