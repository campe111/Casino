"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
var Usuario = /** @class */ (function () {
    function Usuario(nombreUsuario, dni, edad, saldo) {
        this.nombreUsuario = nombreUsuario;
        this.dni = dni;
        this.setEdad(edad); // Usamos setEdad para validar la edad al crear el objeto
        this.saldo = saldo;
        this.edad = edad;
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
    // Modificación de la edad con validación
    Usuario.prototype.setEdad = function (edad) {
        if (isNaN(edad)) {
            throw new Error('La edad debe ser un número.');
        }
        if (edad < 18) {
            throw new Error('La edad debe ser mayor o igual a 18 años.');
        }
        this.edad = edad;
    };
    // Modificación del saldo
    Usuario.prototype.setSaldo = function (saldo) {
        this.saldo = saldo;
    };
    // Aumentar el saldo
    Usuario.prototype.agregarSaldo = function (cantidad) {
        this.saldo += cantidad;
    };
    // Disminuir el saldo
    Usuario.prototype.restarSaldo = function (cantidad) {
        if (cantidad > this.saldo) {
            console.log('Saldo insuficiente.');
        }
        else {
            this.saldo -= cantidad;
        }
    };
    // Validación de la edad
    Usuario.prototype.validarEdad = function () {
        if (this.edad >= 18) {
            console.log("BIENVENIDO, \u00A1Suerte! ".concat(this.nombreUsuario));
        }
        else {
            console.log("¡No tienes edad suficiente para jugar!");
        }
    };
    // Mostrar información del usuario
    Usuario.prototype.mostrarInfoUsuario = function () {
        console.log("Informaci\u00F3n de usuario:\n        Nombre: ".concat(this.nombreUsuario, "\n        DNI:    ").concat(this.dni, "\n        Edad:   ").concat(this.edad, "\n        Saldo:  ").concat(this.saldo, "\n        "));
    };
    return Usuario;
}());
exports.Usuario = Usuario;
