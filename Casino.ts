import { Usuario } from "./Usuario";

class Casino  {
    private juegosDisponibles: string[];
    private usuarios: Usuario[] = []; // Almacena usuarios de este casino

    constructor() {
        this.juegosDisponibles = ['Bingo', 'Tragamonedas', 'Blackjack'];
        this.usuarios = [];        
    }
// Metodo para registrar un usuario en el casino
    public registrarUsuario(nombreUsuario: string, dni: number, edad: number, saldo: number): void {
        for (let usuarios of this.usuarios) {
            if (usuarios.getDni() === dni) { //verifica si el dni ya esta registrado ----- Wanda
                console.log(`El usuario con ${dni} ya está registrado en este casino.`);
                return;
            }
        }
        const nuevoUsuario = new Usuario(nombreUsuario, dni, edad, saldo);
        this.usuarios.push(nuevoUsuario);
        console.log(`Usuario ${nombreUsuario} registrado con éxito.`);
    }
    
// Metodo para acceder a un usuario en el casino
    public accederUsuario(nombreUsuario: string): void {
        for (const usuario of this.usuarios) {
            if (usuario.getNombreUsuario() === nombreUsuario) {
                console.log(`Acceso exitoso para ${nombreUsuario}.`);
                return;
            }
        }
        console.log('Usuario no encontrado.');
    }
    //Metodo para buscar usuario por DNI como si fuera un ID --- Wanda
    buscarUsuarioDni(dni: number):boolean{
        for (const usuario of this.usuarios){
            if(usuario.getDni() === dni){
                return true
            }
        }
        return false
    }
     // Método para obtener todos los usuarios registrados ----Wanda
    getUsuarios(): Usuario[] {
        return this.usuarios;
    }

// Me traigo el metodo publico de la clase Usuario para mostrar la informacion del usuario
    mostrarInfoUsuario(nombreUsuario: string): void {
        for (const usuario of this.usuarios) {
            if (usuario.getNombreUsuario() === nombreUsuario) {
                usuario.mostrarInfoUsuario();
                return;
            }
        }
        console.log('Usuario no encontrado.');
    }
// Metodo para agregar un juego al casino
    public agregarJuego(juego: string): void {
        if (this.juegosDisponibles.includes(juego)) {
            console.log(`El juego ${juego} ya está disponible en el casino.`);
            return;
        }
        this.juegosDisponibles.push(juego);
        console.log(`Juego ${juego} agregado al casino.`);
    }
// metodo mostrar los juegos disponibles en el casino
    public mostrarJuegosDisponibles(): void {
        console.log('Juegos disponibles en el casino:');
        this.juegosDisponibles.forEach((juego, index) => {
            console.log(`${index + 1}. ${juego}`);
        });
    }

}
export { Casino };

