import { Billetera } from './Billetera';

export class Usuario {
    private nombreUsuario: string;
    private dni: number;
    private edad: number;
    private saldo: number;
    private billetera: Billetera;

    constructor(nombreUsuario: string, dni: number, edad: number, saldo: number) {
        this.nombreUsuario = nombreUsuario;
        this.dni = dni;
        this.setEdad(edad);
        this.saldo = saldo;
        this.billetera = new Billetera(saldo);
    }

    public getNombreUsuario(): string {
        return this.nombreUsuario;
    }

    public getDni(): number {
        return this.dni;
    }

    public getEdad(): number {
        return this.edad;
    }

    public getSaldo(): number {
        return this.saldo;
    }

    public setEdad(edad: number): void {
        if (isNaN(edad)) {
            throw new Error('La edad debe ser un número.');
        }
        if (edad < 18) {
            throw new Error('La edad debe ser mayor o igual a 18 años.');
        }
        this.edad = edad;
    }

    public setSaldo(saldo: number): void {
        this.saldo = saldo;
        // Sincronizar la billetera con el nuevo saldo
        this.billetera = new Billetera(saldo);
    }

    public agregarSaldo(cantidad: number): void {
        this.saldo += cantidad;
        this.billetera.agregarSaldo(cantidad);
    }

    public restarSaldo(cantidad: number): void {
        if (cantidad > this.saldo) {
            throw new Error('Saldo insuficiente.');
        } else {
            this.saldo -= cantidad;
            this.billetera.restarSaldo(cantidad);
        }
    }

    public getBilletera(): Billetera {
        // Sincronizar el saldo de la billetera con el saldo actual del usuario
        const saldoBilletera = this.billetera.obtenerSaldo();
        if (saldoBilletera !== this.saldo) {
            // Si hay diferencia, ajustar la billetera
            const diferencia = this.saldo - saldoBilletera;
            if (diferencia > 0) {
                this.billetera.agregarSaldo(diferencia);
            } else {
                // Solo restar si hay suficiente saldo en la billetera
                const montoAbsoluto = Math.abs(diferencia);
                if (montoAbsoluto <= saldoBilletera) {
                    this.billetera.restarSaldo(montoAbsoluto);
                } else {
                    // Resetear la billetera al saldo del usuario
                    this.billetera = new Billetera(this.saldo);
                }
            }
        }
        return this.billetera;
    }

    public validarEdad(): boolean {
        return this.edad >= 18;
    }

    public getInfoUsuario(): { nombreUsuario: string; dni: number; edad: number; saldo: number } {
        return {
            nombreUsuario: this.nombreUsuario,
            dni: this.dni,
            edad: this.edad,
            saldo: this.saldo
        };
    }
}


