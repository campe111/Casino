class Usuario {
    public nombre: string;
    public edad: number;
    private juegosJugados: string[];
  
    constructor(nombre: string, edad: number) {
      this.nombre = nombre;
      this.edad = edad;
      this.juegosJugados = [];
    }
  
    // Metodo para jugar
    public jugar(juego: string): void {
      this.juegosJugados.push(juego);
      console.log(`${this.nombre} ha jugado a ${juego}.`);
    }
  
    // Juegos Jugados
    public mostrarJuegosJugados(): void {
      console.log(`${this.nombre} ha jugado los siguientes juegos:`);
      this.juegosJugados.forEach((juego, index) => {
        console.log(`${index + 1}. ${juego}`);
      });
    }
  }
  
  export class Casino {
    private juegosDisponibles: string[];
    private usuarios: Usuario[];
  
    constructor() {
      this.juegosDisponibles = ['Bingo', 'Tragamonedas', 'Blackjack'];
      this.usuarios = [];
    }
  
    // Registrar un usuario
    public registrarUsuario(nombre: string, edad: number): void {
      const usuarioExistente = this.usuarios.find(u => u.nombre === nombre);
      if (usuarioExistente) {
        console.log(`El usuario ${nombre} ya está registrado.`);
        return;
      }
  
      const nuevoUsuario = new Usuario(nombre, edad);
      this.usuarios.push(nuevoUsuario);
      console.log(`Usuario ${nombre} registrado con éxito.`);
    }
  
    // Acceder a un usuario
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
  
    // Agregar un nuevo juego al casino
    public agregarJuego(juego: string): void {
      if (this.juegosDisponibles.includes(juego)) {
        console.log(`El juego ${juego} ya está disponible en el casino.`);
        return;
      }
      this.juegosDisponibles.push(juego);
      console.log(`Juego ${juego} agregado al casino.`);
    }
  
    // Mostrar los juegos disponibles
    public mostrarJuegosDisponibles(): void {
      console.log('Juegos disponibles en el casino:');
      this.juegosDisponibles.forEach((juego, index) => {
        console.log(`${index + 1}. ${juego}`);
      });
    }
  
    // Elegir un juego
    public elegirJuego(usuario: Usuario, juegoSeleccionado: string): void {
      if (this.juegosDisponibles.includes(juegoSeleccionado)) {
        console.log(`${usuario.nombre} ha elegido jugar a ${juegoSeleccionado}.`);
        usuario.jugar(juegoSeleccionado);
      } else {
        console.log(`El juego ${juegoSeleccionado} no está disponible.`);
      }
    }
  }