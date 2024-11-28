import { Usuario } from "./Usuario";
import { Juego } from "./Juego";
import { Casino }from "./Casino";
import { SlotsSTD } from "./SlotsSTD";

//const casino = new Casino();
//const juego = new Juego("slots", "Std", 100);

//casino.mostrarJuegosDisponibles();

//const usuario2 = new Usuario("mari", 25, 5000, 28);
//console.log(`El usuario ${usuario2.getNombreUsuario()} eligio jugar a ${juego.getNombre()}`);

///usuario2.validarEdad(28);


const tragamonedas = new SlotsSTD("Máquina de Slots", "Casino", 0);

tragamonedas.realizarApuesta(20); // Realizar una apuesta de 50
tragamonedas.jugar(); // Jugar

console.log("Dinero ganado:", tragamonedas.dineroGanado());
console.log("Dinero perdido:", tragamonedas.dineroPerdido());



 //const usuario = new Usuario("Juan", 25, 1000, 18);
//const juego = new Juego("slots", "Std", "un millon de dolares", 100, 0, 0, 0, 0);

 //usuario.validarEdad(18);
// usuario.agregarSaldo(1000);
 //console.log(`El jugador ${usuario.getNombreUsuario()} tiene ${juego.getPremio()} como premio`);
 //console.log(`Jugando al juego ${juego.getNombre()}`);

