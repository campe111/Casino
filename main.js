"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Usuario_1 = require("./Usuario");
var Juego_1 = require("./Juego");
var Casino_1 = require("./Casino");
var casino = new Casino_1.Casino();
var juego = new Juego_1.Juego("slots", "Std", "un millon de dolares", 100, 0, 0, 0, 0);
casino.mostrarJuegosDisponibles();
var usuario2 = new Usuario_1.Usuario("campe", 25, 5000, 28);
console.log("El usuario ".concat(usuario2.getNombreUsuario(), " eligio jugar a ").concat(juego.getNombre()));
usuario2.validarEdad(28);
usuario2.agregarSaldo(5000);
console.log("El jugador ".concat(usuario2.getNombreUsuario()));
console.log("Jugando al juego ".concat(juego.getNombre()));
// const usuario = new Usuario("Juan", 25, 1000, 18);
// const juego = new Juego("slots", "Std", "un millon de dolares", 100, 0, 0, 0, 0);
// usuario.validarEdad(18);
// usuario.agregarSaldo(1000);
// console.log(`El jugador ${usuario.getNombreUsuario()} tiene ${juego.getPremio()} como premio`);
// console.log(`Jugando al juego ${juego.getNombre()}`);
