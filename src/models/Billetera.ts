class Billetera {
    private saldo: number;

    constructor(saldoInicial: number = 0) {
        this.saldo = saldoInicial;
    }

    agregarSaldo(monto: number): void {
        this.saldo += monto;
    }

    restarSaldo(monto: number): boolean {
        if (monto > this.saldo) {
            return false;
        } else {
            this.saldo -= monto;
            return true;
        }
    }

    obtenerSaldo(): number {
        return this.saldo;
    }
}

export { Billetera };


