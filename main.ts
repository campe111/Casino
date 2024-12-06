import inquirer from 'inquirer';
import { Usuario } from './Usuario';  // Asegúrate de que tienes esta clase importada
import { Casino } from './Casino';
import * as fs from 'fs';
import { Bingo } from './Bingo';
import { BlackJack } from './BlackJack';
import { SlotsSTD } from './SlotsSTD';
import { SlotsPrem } from './SlotsPrem';

// Instancia del casino
const casino = new Casino();

// Función para leer e imprimir el contenido de un archivo de texto con las instrucciones
const imprimirInstrucciones = async () => {
    const archivoRuta = './message.txt';  // Aquí pones la ruta de tu archivo .txt

    try {
        const data = fs.readFileSync(archivoRuta, 'utf8');
        console.log('\n=== Instrucciones ===\n');
        console.log(data);  // Imprime el contenido del archivo
        console.log('\nPresiona enter para volver al menú principal...');

        // Esperamos una tecla para regresar al menú principal
        await inquirer.prompt([{
            type: 'input',
            name: 'continuar',
            message: 'Presione enter para continuar...',
            validate: (input: string) => input === '' ? true : 'Solo presione enter para continuar.'
        }]);

        menuOpciones();  // Regresamos al menú principal después de las instrucciones
    } catch (err) {
        console.error('Error al leer el archivo de instrucciones:', err);
    }
};

// Pregunta para validar el nombre de usuario
const validateNombreUsuario = async (input: string) => {
    if (input.trim() === '') {
        return 'El nombre no puede estar vacío.';
    }

    // Lógica adicional para comprobar si el nombre de usuario ya está registrado
    const usuarioExistente = casino.getUsuarios().find(u => u.getNombreUsuario() === input);
    if (usuarioExistente) {
        return 'El nombre de usuario ya está registrado.';
    }

    return true;
};

// Pregunta para validar el DNI
const validateDNI = async (input: string) => {
    const dni = parseInt(input, 10);
    if (isNaN(dni)) {
        return 'Debe ingresar un número válido para el DNI.';
    }

    // Lógica para verificar si el DNI ya está registrado
    const usuarioExistente = casino.getUsuarios().find(u => u.getDni() === dni);
    if (usuarioExistente) {
        return 'El DNI ya está registrado.';
    }

    return true;
};

// Función para registrar un nuevo usuario
const registrarUsuario = async () => {
    const usuarioData = await inquirer.prompt([
        {
            type: 'input',
            name: 'nombreUsuario',
            message: 'Ingrese su nombre de usuario:',
            validate: validateNombreUsuario,  // Validación personalizada
        },
        {
            type: 'input',
            name: 'dni',
            message: 'Ingrese su DNI:',
            validate: validateDNI,  // Validación personalizada
        },
        {
            type: 'input',
            name: 'edad',
            message: 'Ingrese su edad:',
            validate: (input: string) => {
                const edad = parseInt(input, 10);
                if (isNaN(edad) || edad < 18) {
                    return 'La edad debe ser un número válido y mayor o igual a 18 años.';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'saldo',
            message: 'Ingrese el saldo de su cuenta:',
            validate: (input: string) => {
                const saldo = parseFloat(input);
                if (isNaN(saldo) || saldo <= 0) {
                    return 'El saldo debe ser un número mayor a 0.';
                }
                return true;
            }
        }
    ]);

    casino.registrarUsuario(usuarioData.nombreUsuario, usuarioData.dni, usuarioData.edad, usuarioData.saldo);
};

// Función para acceder a un usuario
const accederUsuario = async () => {
    const { nombreUsuario } = await inquirer.prompt([
        {
            type: 'input',
            name: 'nombreUsuario',
            message: 'Ingrese su nombre para Acceder: ',
        }

    ]);

    const usuario = casino.getUsuarios().find(u => u.getNombreUsuario() === nombreUsuario);
    if (usuario) {
        console.log(`Acceso exitoso para ${nombreUsuario}.`);
        // Llamamos a la función del submenú después de acceder
        await submenuUsuario(usuario);
    } else {
        console.log('Usuario no encontrado.');
    }
   //casino.accederUsuario(nombreUsuario);
};


// Submenú para un usuario
const submenuUsuario = async (usuario: Usuario) => {
    const { opcionSubmenu } = await inquirer.prompt([
        {
            type: 'list',
            name: 'opcionSubmenu',
            message: '¿Qué desea hacer?',
            choices: [
                { name: 'Acceder a usuario por nombre', value: 'accederPorNombre' },
                { name: 'Modificar datos Usuario', value: 'modificarDatos' },
                { name: 'Información de Usuario', value: 'infoUsuario' },
                { name: 'Volver al menú principal', value: 'volver' }
            ]
        }
    ]);

    switch (opcionSubmenu) {
        case 'modificarDatos':
            await modificarDatosUsuario(usuario);
            break;
        case 'infoUsuario':
            console.log(`Nombre de usuario: ${usuario.getNombreUsuario()} 
            DNI: ${usuario.getDni()},
            Edad: ${usuario.getEdad()},
            Saldo: ${usuario.getSaldo()}`);
            break;

        case 'volver':
            console.log('Volviendo al menú principal...');
            break;

        default:
            console.log('Opción no válida.');
            break;
    }

    // Volver al submenu si no se eligió "volver"
    if (opcionSubmenu !== 'volver') {
        await submenuUsuario(usuario);
    }
};


// Función para modificar los datos de un usuario
const modificarDatosUsuario = async (usuario: Usuario) => {
    const { campo, nuevoValor } = await inquirer.prompt([
        {
            type: 'list',
            name: 'campo',
            message: '¿Qué desea modificar?',
            choices: ['Edad', 'Saldo']
        },
        {
            type: 'input',
            name: 'nuevoValor',
            message: 'Ingrese el nuevo valor:',
        }
    ]);

    if (campo === 'Edad') {
        usuario.setEdad(parseInt(nuevoValor, 10));
        console.log(`Edad modificada a ${nuevoValor}`);
    } else if (campo === 'Saldo') {
        usuario.setSaldo(parseFloat(nuevoValor));
        console.log(`Saldo modificado a ${nuevoValor}`);
    }

    // Volver al submenu
    await submenuUsuario(usuario);
};


//Funcion para mostrar Info del Usuario
const mostrarInfoUsuario = async () => {
    const { nombreUsuario } = await inquirer.prompt([
        {
            type: 'input',
            name: 'nombreUsuario',
            message: 'Ingrese el nombre para ver informacion: ',
        }
    ]);
    casino.mostrarInfoUsuario(nombreUsuario);
};

// Función para iniciar un juego
const iniciarJuego = (juego: string) => {
    console.log(`Iniciando el juego: ${juego}`);

    switch (juego) {
        case 'Slots STD':
            const slots = new SlotsSTD('Slots STD', 'Juego de Casino', 100);  // Instancia del juego SlotsSTD
            slots.jugar();  // Llama al método jugar() del juego SlotsSTD
            break;
        case 'Slots Premium':
            const slotsPrem = new SlotsPrem('Slots Premium', 'Juego de Casino', 100, 5);  // Instancia del juego Slots Premium
            slotsPrem.jugar();  // Llama al método jugar() del juego Slots Premium
            break;
        case 'Blackjack':
            const blackjack = new BlackJack('Blackjack', 'Juego de Casino', 100, 5);  // Instancia del juego Blackjack
            blackjack.repartirCartas(2);  // Reparte las cartas al comenzar el juego
            blackjack.jugar();  // Llama al método jugar() del juego Blackjack
            break;
        case 'Bingo':
            const bingo = new Bingo();  // Instancia del juego Bingo
            bingo.jugar();  // Llama al método jugar() del juego Bingo
            break;
        default:
            console.log('Opción no válida.');
            break;
    }
};



// Submenú de Juegos
const menuJuegos = async () => {
    console.clear();

    const { opcion } = await inquirer.prompt([
        {
            type: 'list',
            name: 'opcion',
            message: 'Seleccione el juego que desea jugar:',
            choices: [
                { name: 'Jugar a Slots STD', value: 'slotsSTD' },
                { name: 'Jugar a Slots Premium', value: 'slotsPremium' },
                { name: 'Jugar a Blackjack', value: 'blackjack' },
                { name: 'Jugar a Bingo', value: 'bingo' },
                { name: 'Volver al Menú Principal', value: 'volver' }
            ]
        }
    ]);

    switch (opcion) {
        case 'slotsSTD':
            await iniciarJuego('Slots STD');
            break;
        case 'slotsPremium':
            await iniciarJuego('Slots Premium');
            break;
        case 'blackjack':
            await iniciarJuego('Blackjack');  // Inicia el juego de Blackjack
            break;
        case 'bingo':
            await iniciarJuego('Bingo');
            break;
        case 'volver':
            console.log('Volviendo al menú principal...');
            break;
        default:
            console.log('Opción no válida.');
            break;
    }

    
    // Volver al submenú si no se seleccionó "volver"
    if (opcion !== 'volver') {
        await menuJuegos();
    }
};

// Función para mostrar el título del casino
const mostrarTituloCasino = () => {
    console.clear(); // Limpia la consola para un diseño limpio
    console.log(`
=========================================
  ██╗  ██╗██╗███╗   ██╗ ██████╗        
  ██║ ██╔╝██║████╗  ██║██╔════╝        
  █████╔╝ ██║██╔██╗ ██║██║  ███╗       
  ██╔═██╗ ██║██║╚██╗██║██║   ██║       
  ██║  ██╗██║██║ ╚████║╚██████╔╝       
  ╚═╝  ╚═╝╚═╝    
=========================================
         KING ON COING CASINO
=========================================
    `);
};

    
// Menú principal
const menuOpciones = async () => {
    mostrarTituloCasino();

    const { opcion } = await inquirer.prompt([
        {
            type: 'list',
            name: 'opcion',
            message: 'Bienvenido al Casino KING ON KOING. \n Elija una opción:',
            choices: [
                { name: 'Registrar Nuevo Usuario', value: 'registrar' },
                { name: 'Acceder a un Usuario', value: 'acceder' },
                { name: 'Mostrar Información del Usuario', value: 'mostrar' },
                { name: 'Juegos', value: 'juegos' },
                { name: 'Instrucciones', value: 'instrucciones' },
                { name: 'Salir', value: 'salir' }
            ]
        }
        
    ]);

    switch (opcion) {
        case 'registrar':
            await registrarUsuario();
            break;
        case 'acceder':
            await accederUsuario();
            break;
        case 'mostrar':
            await mostrarInfoUsuario();
            break;
        case 'juegos':
            await menuJuegos();  // Llamar al submenú de juegos
            break;
        case 'instrucciones':
            await imprimirInstrucciones();
            break;
        case 'salir':
            console.log('Saliendo...');
            break;
        default:
            console.log('Opción no válida.');
            break;
    }

    // Volver a mostrar el menú de opciones si no se ha salido
    if (opcion !== 'salir') {
        await menuOpciones();
    }


};

menuOpciones();