"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casino = void 0;
var Usuario_1 = require("./Usuario");
var Casino = /** @class */ (function () {
    function Casino() {
        this.usuarios = []; // Almacena usuarios de este casino
        this.juegosDisponibles = ['Bingo', 'Tragamonedas', 'Blackjack'];
        this.usuarios = [];
    }
    // Metodo para registrar un usuario en el casino
    Casino.prototype.registrarUsuario = function (nombreUsuario, dni, edad, saldo) {
        for (var _i = 0, _a = this.usuarios; _i < _a.length; _i++) {
            var usuarios = _a[_i];
            if (usuarios.getDni() === dni) { //verifica si el dni ya esta registrado ----- Wanda
                console.log("El usuario con ".concat(dni, " ya est\u00E1 registrado en este casino."));
                return;
            }
        }
        var nuevoUsuario = new Usuario_1.Usuario(nombreUsuario, dni, edad, saldo);
        this.usuarios.push(nuevoUsuario);
        console.log("Usuario ".concat(nombreUsuario, " registrado con \u00E9xito."));
    };
    // Metodo para acceder a un usuario en el casino
    Casino.prototype.accederUsuario = function (nombreUsuario) {
        for (var _i = 0, _a = this.usuarios; _i < _a.length; _i++) {
            var usuario = _a[_i];
            if (usuario.getNombreUsuario() === nombreUsuario) {
                console.log("Acceso exitoso para ".concat(nombreUsuario, "."));
                return;
            }
        }
        console.log('Usuario no encontrado.');
    };
    //Metodo para buscar usuario por DNI como si fuera un ID --- Wanda
    Casino.prototype.buscarUsuarioDni = function (dni) {
        for (var _i = 0, _a = this.usuarios; _i < _a.length; _i++) {
            var usuario = _a[_i];
            if (usuario.getDni() === dni) {
                return true;
            }
        }
        return false;
    };
    // Método para obtener todos los usuarios registrados ----Wanda
    Casino.prototype.getUsuarios = function () {
        return this.usuarios;
    };
    // Me traigo el metodo publico de la clase Usuario para mostrar la informacion del usuario
    Casino.prototype.mostrarInfoUsuario = function (nombreUsuario) {
        for (var _i = 0, _a = this.usuarios; _i < _a.length; _i++) {
            var usuario = _a[_i];
            if (usuario.getNombreUsuario() === nombreUsuario) {
                usuario.mostrarInfoUsuario();
                return;
            }
        }
        console.log('Usuario no encontrado.');
    };
    // Metodo para agregar un juego al casino
    Casino.prototype.agregarJuego = function (juego) {
        if (this.juegosDisponibles.includes(juego)) {
            console.log("El juego ".concat(juego, " ya est\u00E1 disponible en el casino."));
            return;
        }
        this.juegosDisponibles.push(juego);
        console.log("Juego ".concat(juego, " agregado al casino."));
    };
    // metodo mostrar los juegos disponibles en el casino
    Casino.prototype.mostrarJuegosDisponibles = function () {
        console.log('Juegos disponibles en el casino:');
        this.juegosDisponibles.forEach(function (juego, index) {
            console.log("".concat(index + 1, ". ").concat(juego));
        });
    };
    return Casino;
}());
exports.Casino = Casino;
