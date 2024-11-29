"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casino = exports.UsuarioCasino = void 0;
var UsuarioCasino = /** @class */ (function () {
    function UsuarioCasino(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
        this.juegosJugados = [];
    }
    // Metodo para jugar
    UsuarioCasino.prototype.jugar = function (juego) {
        this.juegosJugados.push(juego);
        console.log("".concat(this.nombre, " ha jugado a ").concat(juego, "."));
    };
    // Juegos Jugados
    UsuarioCasino.prototype.mostrarJuegosJugados = function () {
        console.log("".concat(this.nombre, " ha jugado los siguientes juegos:"));
        this.juegosJugados.forEach(function (juego, index) {
            console.log("".concat(index + 1, ". ").concat(juego));
        });
    };
    return UsuarioCasino;
}());
exports.UsuarioCasino = UsuarioCasino;
var Casino = /** @class */ (function () {
    function Casino() {
        this.juegosDisponibles = ['Bingo', 'Tragamonedas', 'Blackjack'];
        this.usuarios = [];
    }
    // Registrar un usuario
    Casino.prototype.registrarUsuario = function (nombre, edad) {
        var usuarioExistente = this.usuarios.find(function (u) { return u.nombre === nombre; });
        if (usuarioExistente) {
            console.log("El usuario ".concat(nombre, " ya est\u00E1 registrado."));
            return;
        }
        var nuevoUsuario = new UsuarioCasino(nombre, edad);
        this.usuarios.push(nuevoUsuario);
        console.log("Usuario ".concat(nombre, " registrado con \u00E9xito."));
    };
    // Acceder a un usuario
    Casino.prototype.accederUsuario = function (nombre) {
        var usuario = this.usuarios.find(function (u) { return u.nombre === nombre; });
        if (usuario) {
            console.log("Acceso exitoso para ".concat(nombre, "."));
            return usuario;
        }
        else {
            console.log('Usuario no encontrado.');
            return null;
        }
    };
    // Agregar un nuevo juego al casino
    Casino.prototype.agregarJuego = function (juego) {
        if (this.juegosDisponibles.includes(juego)) {
            console.log("El juego ".concat(juego, " ya est\u00E1 disponible en el casino."));
            return;
        }
        this.juegosDisponibles.push(juego);
        console.log("Juego ".concat(juego, " agregado al casino."));
    };
    // Mostrar los juegos disponibles
    Casino.prototype.mostrarJuegosDisponibles = function () {
        console.log('Juegos disponibles en el casino:');
        this.juegosDisponibles.forEach(function (juego, index) {
            console.log("".concat(index + 1, ". ").concat(juego));
        });
    };
    // Elegir un juego
    Casino.prototype.elegirJuego = function (usuario, juegoSeleccionado) {
        if (this.juegosDisponibles.includes(juegoSeleccionado)) {
            console.log("".concat(usuario.nombre, " ha elegido jugar a ").concat(juegoSeleccionado, "."));
            usuario.jugar(juegoSeleccionado);
        }
        else {
            console.log("El juego ".concat(juegoSeleccionado, " no est\u00E1 disponible."));
        }
    };
    return Casino;
}());
exports.Casino = Casino;
