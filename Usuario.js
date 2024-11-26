"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
var Usuario = /** @class */ (function () {
    function Usuario(nombreUsuario, dni, saldo, edad) {
        this.nombreUsuario = nombreUsuario;
        this.dni = dni;
        this.edad = edad;
        this.saldo = saldo;
    }
    Usuario.prototype.getNombreUsuario = function () {
        return this.nombreUsuario;
    };
    Usuario.prototype.getDni = function () {
        return this.dni;
    };
    Usuario.prototype.getEdad = function () {
        return this.edad;
    };
    Usuario.prototype.getSaldo = function () {
        return this.saldo;
    };
    Usuario.prototype.agregarSaldo = function (cantidad) {
        this.saldo += cantidad;
    };
    Usuario.prototype.restarSaldo = function (cantidad) {
        this.saldo -= cantidad;
    };
    Usuario.prototype.mostrarSaldo = function () {
        console.log("El saldo de ".concat(this.nombreUsuario, " es ").concat(this.saldo));
    };
    Usuario.prototype.validarEdad = function (edad) {
        if (edad >= 18) {
            console.log("BIENVENIDO, \u00A1Suerte !".concat(this.nombreUsuario));
        }
        else {
            console.log("¡No tienes edad suficiente para jugar!");
        }
    };
    return Usuario;
}());
exports.Usuario = Usuario;
