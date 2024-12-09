class Billetera {
    private saldo: number;

    constructor(saldoInicial: number = 0) {
        this.saldo = saldoInicial;
    }

    agregarSaldo(monto: number): void {
        this.saldo += monto;
        console.log(`Saldo agregado: $${monto}. Saldo actual: $${this.saldo}`);
    }

    restarSaldo(monto: number): boolean {
        if (monto > this.saldo) {
            console.log('Saldo insuficiente.');
            return false;
        } else {
            this.saldo -= monto;
            console.log(`Saldo restado: $${monto}. Saldo actual: $${this.saldo}`);
            return true;
        }
    }

    obtenerSaldo(): number {
        return this.saldo;
    }
}

export { Billetera };