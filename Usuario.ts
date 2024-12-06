export class Usuario {
    private nombreUsuario: string;
    private dni: number;
    private edad: number;
    private saldo: number;

    constructor(nombreUsuario: string, dni: number, edad: number, saldo: number) {
        this.nombreUsuario = nombreUsuario;
        this.dni = dni;
        this.edad = edad;
        this.saldo = saldo;
    }
    

    // Métodos de Usuario
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

    public agregarSaldo(cantidad: number): void {
        this.saldo += cantidad;
    }

    public restarSaldo(cantidad: number): void {
        if (cantidad > this.saldo) {
            console.log('Saldo insuficiente.');
        } else {
            this.saldo -= cantidad;
        }
    }

    public validarEdad(): void {
        if (this.edad >= 18) {
            console.log(`BIENVENIDO, ¡Suerte! ${this.nombreUsuario}`);
        } else {
            console.log("¡No tienes edad suficiente para jugar!");
        }
    }

    public mostrarInfoUsuario(): void {
        console.log(`Informacion de usuario: 
        Nombre: ${this.nombreUsuario}
        DNI:    ${this.dni}
        Edad:   ${this.edad}
        Saldo:  ${this.saldo}
            `);
    }
}
