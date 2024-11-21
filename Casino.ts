

export class Casino {
    private juegosDisponibles: string[];
    private usuarios: Usuario[];
  
    constructor() {
      this.juegosDisponibles = ['Bingo', 'Tragamonedas', 'Blackjack'];
      this.usuarios = [];
    }
  
    //  registrar un usuario
    public registrarUsuario(nombre: string, edad: number): void {
      const nuevoUsuario = new Usuario(nombre, edad);
      this.usuarios.push(nuevoUsuario);
      console.log(`Usuario ${nombre} registrado con éxito.`);
    }
  
    //  acceder a un usuario
    public accederUsuario(nombre: string): Usuario | null {
      const usuario = this.usuarios.find(u => u.nombre === nombre);
      if (usuario) {
        console.log(`Acceso exitoso para ${nombre}.`);
        return usuario;
      } else {
        console.log('Usuario no encontrado.');
        return null;
      }
    }
  
    //  agregar un nuevo juego al casino
    public agregarJuego(juego: string): void {
      this.juegosDisponibles.push(juego);
      console.log(`Juego ${juego} agregado al casino.`);
    }
  
    //  mostrar los juegos disponibles
    public mostrarJuegosDisponibles(): void {
      console.log('Juegos disponibles en el casino:');
      this.juegosDisponibles.forEach((juego, index) => {
        console.log(`${index + 1}. ${juego}`);
      });
    }
  
    //  elegir un juego
    public elegirJuego(usuario: Usuario, juegoSeleccionado: string): void {
      if (this.juegosDisponibles.includes(juegoSeleccionado)) {
        console.log(`${usuario.nombre} ha elegido jugar a ${juegoSeleccionado}.`);
        usuario.jugar(juegoSeleccionado);
      } else {
        console.log(`El juego ${juegoSeleccionado} no está disponible.`);
      }
    }