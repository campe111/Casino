export class Usuario {
    private nombreUsuario: string;
    private dni: number;
    private edad: number = 0;
    private saldo: number;

    constructor(nombreUsuario: string, dni: number, edad: number, saldo: number) {
        this.nombreUsuario = nombreUsuario;
        this.dni = dni;
        this.setEdad(edad);
        this.saldo = saldo;
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
    }

    public agregarSaldo(cantidad: number): void {
        this.saldo += cantidad;
    }

    public restarSaldo(cantidad: number): void {
        if (cantidad > this.saldo) {
            throw new Error('Saldo insuficiente.');
        } else {
            this.saldo -= cantidad;
        }
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


