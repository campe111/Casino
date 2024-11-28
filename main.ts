import { Usuario } from "./Usuario";
import { Juego } from "./Juego";
import { Casino }from "./Casino";
import { SlotsPrem } from "./SlotsPrem";

const casino = new Casino();
const slotcito = new SlotsPrem("slots", "Std",100,4,6 );
slotcito.iniciarJuego();


casino.mostrarJuegosDisponibles();








// const usuario = new Usuario("Juan", 25, 1000, 18);
// const juego = new Juego("slots", "Std", "un millon de dolares", 100, 0, 0, 0, 0);

// usuario.validarEdad(18);
// usuario.agregarSaldo(1000);
// console.log(`El jugador ${usuario.getNombreUsuario()} tiene ${juego.getPremio()} como premio`);
// console.log(`Jugando al juego ${juego.getNombre()}`);

