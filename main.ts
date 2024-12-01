import { Usuario } from "./Usuario";
import { Juego } from "./Juego";
import { Casino }from "./Casino";

const casino = new Casino();


casino.mostrarJuegosDisponibles();

const usuario2 = new Usuario("campe", 25, 5000, 28);


usuario2.validarEdad(28);






// const usuario = new Usuario("Juan", 25, 1000, 18);
// const juego = new Juego("slots", "Std", "un millon de dolares", 100, 0, 0, 0, 0);

// usuario.validarEdad(18);
// usuario.agregarSaldo(1000);
// console.log(`El jugador ${usuario.getNombreUsuario()} tiene ${juego.getPremio()} como premio`);
// console.log(`Jugando al juego ${juego.getNombre()}`);

