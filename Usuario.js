"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
var Usuario = /** @class */ (function () {
    function Usuario(nombreUsuario, dni, edad, saldo) {
        this.nombreUsuario = nombreUsuario;
        this.dni = dni;
        this.edad = edad;
        this.saldo = saldo;
    }
    // Métodos de Usuario
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
    Usuario.prototype.setEdad = function (edad) {
        this.edad = edad;
    };
    Usuario.prototype.setSaldo = function (saldo) {
        this.saldo = saldo;
    };
    Usuario.prototype.agregarSaldo = function (cantidad) {
        this.saldo += cantidad;
    };
    Usuario.prototype.restarSaldo = function (cantidad) {
        if (cantidad > this.saldo) {
            console.log('Saldo insuficiente.');
        }
        else {
            this.saldo -= cantidad;
        }
    };
    Usuario.prototype.validarEdad = function () {
        if (this.edad >= 18) {
            console.log("BIENVENIDO, \u00A1Suerte! ".concat(this.nombreUsuario));
        }
        else {
            console.log("¡No tienes edad suficiente para jugar!");
        }
    };
    Usuario.prototype.mostrarInfoUsuario = function () {
        console.log("Informacion de usuario: \n        Nombre: ".concat(this.nombreUsuario, "\n        DNI:    ").concat(this.dni, "\n        Edad:   ").concat(this.edad, "\n        Saldo:  ").concat(this.saldo, "\n            "));
    };
    return Usuario;
}());
exports.Usuario = Usuario;
