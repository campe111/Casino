"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Billetera = void 0;
var Billetera = /** @class */ (function () {
    function Billetera(saldoInicial) {
        if (saldoInicial === void 0) { saldoInicial = 0; }
        this.saldo = saldoInicial;
    }
    Billetera.prototype.agregarSaldo = function (monto) {
        this.saldo += monto;
        console.log("Saldo agregado: $".concat(monto, ". Saldo actual: $").concat(this.saldo));
    };
    Billetera.prototype.restarSaldo = function (monto) {
        if (monto > this.saldo) {
            console.log('Saldo insuficiente.');
            return false;
        }
        else {
            this.saldo -= monto;
            console.log("Saldo restado: $".concat(monto, ". Saldo actual: $").concat(this.saldo));
            return true;
        }
    };
    Billetera.prototype.obtenerSaldo = function () {
        return this.saldo;
    };
    return Billetera;
}());
exports.Billetera = Billetera;
