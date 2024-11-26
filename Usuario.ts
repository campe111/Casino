export class Usuario {
    private nombreUsuario: string;
    private dni: number;
    private edad: number;
    private saldo: number;
    static validarEdad: any;

    constructor(nombreUsuario: string, dni: number, saldo: number, edad: number) {
        this.nombreUsuario = nombreUsuario;
        this.dni = dni;
        this.edad = edad;
        this.saldo = saldo;
    }

    getNombreUsuario(): string {
        return this.nombreUsuario;
    }

    getDni(): number {
        return this.dni;
    }

    getEdad(): number {
        return this.edad;
    }

    getSaldo(): number {
        return this.saldo;
    }

    agregarSaldo(cantidad: number): void {
        this.saldo += cantidad;
    }

    restarSaldo(cantidad: number): void {
        this.saldo -= cantidad;
    }

    mostrarSaldo(): void {
        console.log(`El saldo de ${this.nombreUsuario} es ${this.saldo}`);
    }

    validarEdad(edad: number): void {
        if (edad >= 18) {
            console.log(`BIENVENIDO, ¡Suerte !${this.nombreUsuario}`);
            
        } else {
            console.log("¡No tienes edad suficiente para jugar!");
        }
    }
}