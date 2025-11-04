import { Usuario } from "./Usuario";

class Casino {
    private juegosDisponibles: string[];
    private usuarios: Usuario[] = [];

    constructor() {
        this.juegosDisponibles = ['Bingo', 'Tragamonedas', 'Blackjack'];
        this.usuarios = [];
    }

    public registrarUsuario(nombreUsuario: string, dni: number, edad: number, saldo: number): boolean {
        for (let usuario of this.usuarios) {
            if (usuario.getDni() === dni) {
                return false;
            }
        }
        const nuevoUsuario = new Usuario(nombreUsuario, dni, edad, saldo);
        this.usuarios.push(nuevoUsuario);
        return true;
    }

    public accederUsuario(nombreUsuario: string): Usuario | null {
        for (const usuario of this.usuarios) {
            if (usuario.getNombreUsuario() === nombreUsuario) {
                return usuario;
            }
        }
        return null;
    }

    public buscarUsuarioDni(dni: number): boolean {
        for (const usuario of this.usuarios) {
            if (usuario.getDni() === dni) {
                return true;
            }
        }
        return false;
    }

    public getUsuarios(): Usuario[] {
        return this.usuarios;
    }

    public mostrarInfoUsuario(nombreUsuario: string): Usuario | null {
        return this.accederUsuario(nombreUsuario);
    }

    public agregarJuego(juego: string): void {
        if (!this.juegosDisponibles.includes(juego)) {
            this.juegosDisponibles.push(juego);
        }
    }

    public mostrarJuegosDisponibles(): string[] {
        return this.juegosDisponibles;
    }
}

export { Casino };


