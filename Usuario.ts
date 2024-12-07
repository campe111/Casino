export class Usuario {
    private nombreUsuario: string;
    private dni: number;
    private edad: number;
    private saldo: number;

    constructor(nombreUsuario: string, dni: number, edad: number, saldo: number) {
        this.nombreUsuario = nombreUsuario;
        this.dni = dni;
        this.setEdad(edad);  // Usamos setEdad para validar la edad al crear el objeto
        this.saldo = saldo;
        this.edad = edad;
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

    // Modificación de la edad con validación
    public setEdad(edad: number): void {
        if (isNaN(edad)) {
            throw new Error('La edad debe ser un número.');
        }
        if (edad < 18) {
            throw new Error('La edad debe ser mayor o igual a 18 años.');
        }
        this.edad = edad;
    }

    // Modificación del saldo
    public setSaldo(saldo: number): void {
        this.saldo = saldo;
    }

    // Aumentar el saldo
    public agregarSaldo(cantidad: number): void {
        this.saldo += cantidad;
    }

    // Disminuir el saldo
    public restarSaldo(cantidad: number): void {
        if (cantidad > this.saldo) {
            console.log('Saldo insuficiente.');
        } else {
            this.saldo -= cantidad;
        }
    }

    // Validación de la edad
    public validarEdad(): void {
        if (this.edad >= 18) {
            console.log(`BIENVENIDO, ¡Suerte! ${this.nombreUsuario}`);
        } else {
            console.log("¡No tienes edad suficiente para jugar!");
        }
    }

    // Mostrar información del usuario
    public mostrarInfoUsuario(): void {
        console.log(`Información de usuario:
        Nombre: ${this.nombreUsuario}
        DNI:    ${this.dni}
        Edad:   ${this.edad}
        Saldo:  ${this.saldo}
        `);
    }
}