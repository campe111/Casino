import * as readlineSync from 'readline-sync'; 
import inquirer from 'inquirer';
import * as fs from 'fs';
import { SlotsSTD } from './SlotsSTD'; 
import { SlotsPrem } from './SlotsPrem'; 
import { BlackJack } from './BlackJack'; 
import { Bingo } from './Bingo';
import { Casino } from './Casino';
import { Usuario } from './Usuario';
import { Billetera } from './Billetera';

// Instancia del casino
const casino = new Casino();
// -----------------------------------------------------------------------------------------------------------
// Función para mostrar el título del casino
const mostrarTituloCasino = () => {
    console.clear(); // Limpia la consola para un diseño limpio
    console.log(`
======================================== 
    ██╗  ██╗██╗███╗   ██╗ ██████╗        
    ██║ ██╔╝██║████╗  ██║██╔════╝        
    █████╔╝ ██║██╔██╗ ██║██║  ███╗       
    ██╔═██╗ ██║██║╚██╗██║██║   ██║       
    ██║  ██╗██║██║ ╚████║╚██████╔╝       
    ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝  
=========================================
        KING OF COING CASINO
=========================================
    `);
};

    
const menuOpciones = async () => {
    mostrarTituloCasino();

    const { opcion } = await inquirer.prompt([
        {
            type: 'list',
            name: 'opcion',
            message: 'Bienvenido al Casino KING OF COING. \n Elija una opción:',
            choices: [
                { name: 'Registrar Nuevo Usuario', value: 'registrar' },
                { name: 'Acceder a un Usuario', value: 'acceder' },
                { name: 'Mostrar Información del Usuario', value: 'mostrar' },
                { name: 'Gestionar Billetera', value: 'billetera' },
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
        case 'billetera':
            await menuBilletera();  // Submenú para gestionar la billetera
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

    if (opcion !== 'salir') {
        await menuOpciones();
    }
};

menuOpciones();

const menuBilletera = async () => {
    const { opcion } = await inquirer.prompt([
        {
            type: 'list',
            name: 'opcion',
            message: 'Seleccione una opción para la Billetera:',
            choices: [
                { name: 'Agregar Saldo', value: 'agregar' },
                { name: 'Ver Saldo', value: 'ver' },
                { name: 'Volver al Menú Principal', value: 'volver' }
            ]
        }
    ]);

    switch (opcion) {
        case 'agregar':
            const monto = readlineSync.questionInt('Ingrese la cantidad a agregar: ');
            billetera.agregarSaldo(monto);
            break;
        case 'ver':
            console.log(`Saldo actual: $${billetera.obtenerSaldo()}`);
            break;
        case 'volver':
            console.log('Volviendo al menú principal...');
            return;
        default:
            console.log('Opción no válida.');
            break;
    }

    if (opcion !== 'volver') {
        await menuBilletera();
    }
};

// -----------------------------------------------------------------------------------------------------------


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
// -----------------------------------------------------------------------------------------------------------
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
// -----------------------------------------------------------------------------------------------------------
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
// -----------------------------------------------------------------------------------------------------------
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
                if (isNaN(edad)) {
                    return 'Debe ingresar un número válido para la edad.';
                }
                if (edad < 18) {
                    return 'La edad debe ser un número válido y mayor o igual a 18 años.';
                }
                return true;
            },
            filter: (input: string) => parseInt(input, 10), // Convertimos a número
        },
        {
            type: 'input', 
            name: 'saldo',
            message: 'Ingrese el saldo de su cuenta:',
            validate: (input: string) => {
                const saldo = parseFloat(input);
                if (isNaN(saldo)) {
                    return 'Debe ingresar un número válido para el saldo.';
                }
                if (saldo <= 0) {
                    return 'El saldo debe ser un número mayor que 0.';
                }
                return true;
            },
            filter: (input: string) => parseFloat(input), // Convertimos a número
        }
    ]);

    casino.registrarUsuario(usuarioData.nombreUsuario, usuarioData.dni, usuarioData.edad, usuarioData.saldo);
};

// -----------------------------------------------------------------------------------------------------------
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
            DNI:  ${usuario.getDni()},
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
            validate: (input: string) => {
                // Validación de la edad
                if (campo === 'Edad') {
                    const edad = parseInt(input, 10);
                    if (isNaN(edad)) {
                        return 'Debe ingresar un número válido para la edad.';
                    }
                    if (edad < 18) {
                        return 'La edad debe ser un número mayor o igual a 18 años.';
                    }
                    return true;
                }

                // Validación de saldo
                if (campo === 'Saldo') {
                    const saldo = parseFloat(input);
                    if (isNaN(saldo)) {
                        return 'Debe ingresar un número válido para el saldo.';
                    }
                    if (saldo <= 0) {
                        return 'El saldo debe ser un número mayor que 0.';
                    }
                    return true;
                }

                return true;
            },
            filter: (input: string) => {
                // Convertir el valor de edad o saldo según corresponda
                if (campo === 'Edad') {
                    return parseInt(input, 10);  // Convertir a número entero
                } else if (campo === 'Saldo') {
                    return parseFloat(input);  // Convertir a número decimal
                }
                return input;
            }
        }
    ]);

    // Validación adicional al modificar la edad, asegurándonos de que el valor ingresado es mayor a 18
    if (campo === 'Edad') {
        if (nuevoValor < 18) {
            console.log('La edad debe ser un número mayor o igual a 18 años. Modificación no permitida.');
        } else {
            usuario.setEdad(nuevoValor);  // Modificamos la edad solo si es válida
            console.log(`Edad modificada a ${nuevoValor}`);
        }
    } else if (campo === 'Saldo') {
        usuario.setSaldo(nuevoValor);  // Modificamos el saldo
        console.log(`Saldo modificado a ${nuevoValor}`);
    }

    // Volver al submenu
    await submenuUsuario(usuario);
};
// -----------------------------------------------------------------------------------------------------------
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
// -----------------------------------------------------------------------------------------------------------
// Función para iniciar un juego

const billetera = new Billetera();  // Instancia de la billetera
const iniciarJuego = async (juego: string) => {
    console.log(`Iniciando el juego: ${juego}`);

    switch (juego) {
        case 'Slots STD':
            const slotsSTD = new SlotsSTD(billetera);
            let jugarSlotsSTD = true;
            while (jugarSlotsSTD) {
                console.log("\nLa apuesta mínima es de 20 pesos y la máxima es de 500 pesos\n");
                const apuestaSlotsSTD = readlineSync.questionInt('¿Cuánto deseas apostar en Slots STD? ');
                slotsSTD.realizarApuesta(apuestaSlotsSTD);
                console.log("\n-------------------------------"); // Guion para separar las secciones
                slotsSTD.jugar();
                console.log("\n-------------------------------"); // Guion para separar las secciones
                slotsSTD.actualizarSaldo();
                console.log("\n-------------------------------"); // Guion para separar las secciones
    
                if (slotsSTD.billetera.obtenerSaldo() <= 0) {
                    console.log("\nSaldo insuficiente para seguir jugando. Necesitas cargar más saldo.\n");
                    jugarSlotsSTD = false;
                } else {
                    jugarSlotsSTD = readlineSync.keyInYNStrict("\n¿Quieres volver a jugar y realizar otra apuesta? ");
                }
                console.log("\n"); // Salto de línea al final de cada ciclo
            }
            break;
    
        case 'Slots Premium':
            const slotsPrem = new SlotsPrem(billetera);
            let jugarSlotsPremium = true;
            while (jugarSlotsPremium) {
                console.log("\nLa apuesta minima es de 20 pesos y la maxima es de 500 pesos\n");
                const apuestaSlotsPremium = readlineSync.questionInt("¿Cuánto deseas apostar en Slots Premium? ");
                slotsPrem.realizarApuesta(apuestaSlotsPremium);
                console.log("\n-------------------------------"); // Guion para separar las secciones
                slotsPrem.jugar();
                console.log("\n-------------------------------"); // Guion para separar las secciones
                slotsPrem.actualizarSaldo();
                console.log("\n-------------------------------"); // Guion para separar las secciones
    
                if (slotsPrem.billetera.obtenerSaldo() <= 0) {
                    console.log("\nSaldo insuficiente para seguir jugando. Necesitas cargar más saldo.\n");
                    jugarSlotsPremium = false;
                } else {
                    jugarSlotsPremium = readlineSync.keyInYNStrict('\n¿Quieres volver a jugar y realizar otra apuesta? ');
                }
                console.log("\n"); // Salto de línea al final de cada ciclo
            }
            break;
    
        case 'Blackjack':
            const blackJack = new BlackJack(billetera);
            let jugarBlackJack = true;
            while (jugarBlackJack) {
                console.log("\n-------------------------------"); // Guion para separar las secciones
                const apuestaBlackJack = readlineSync.questionInt("\n¿Cuánto deseas apostar en Blackjack? ");
                blackJack.realizarApuesta(apuestaBlackJack);
                console.log("\n-------------------------------"); // Guion para separar las secciones
                blackJack.repartirCartas(2);
                console.log("\n-------------------------------"); // Guion para separar las secciones
                blackJack.plantarse();
                console.log("\n-------------------------------"); // Guion para separar las secciones
    
                if (blackJack.billetera.obtenerSaldo() <= 0) {
                    console.log("\nSaldo insuficiente para seguir jugando. Necesitas cargar más saldo.\n");
                    jugarBlackJack = false;
                } else {
                    jugarBlackJack = readlineSync.keyInYNStrict('\n¿Quieres volver a jugar y realizar otra apuesta? ');
                }
                console.log("\n"); // Salto de línea al final de cada ciclo
            }
            break;
    
        case 'Bingo':
            const bingo = new Bingo(billetera);
            let jugarBingo = true;
            while (jugarBingo) {
                console.log("\n-------------------------------"); // Guion para separar las secciones
                const apuestaBingo = readlineSync.questionInt('\n¿Cuánto deseas apostar en Bingo? ');
                bingo.realizarApuesta(apuestaBingo);
                console.log("\n-------------------------------"); // Guion para separar las secciones
                bingo.jugar();
                console.log("\n-------------------------------"); // Guion para separar las secciones
                bingo.bingoFinal();
                console.log("\n-------------------------------"); // Guion para separar las secciones
    
                if (bingo.billetera.obtenerSaldo() <= 0) {
                    console.log("\nSaldo insuficiente para seguir jugando. Necesitas cargar más saldo.\n");
                    jugarBingo = false;
                } else {
                    jugarBingo = readlineSync.keyInYNStrict('\n¿Quieres volver a jugar y realizar otra apuesta? ');
                }
                console.log("\n"); // Salto de línea al final de cada ciclo
            }
            break;
    
        default:
            console.log("\n-------------------------------"); // Guion para separar las secciones
            console.log('\nOpción no válida.\n');
            console.log("\n-------------------------------"); // Guion para separar las secciones
            break;
    }
}
// Submenú de Juegos
const menuJuegos = async () => {
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
            iniciarJuego('Slots STD');
            break;
            case 'slotsPremium':
                iniciarJuego('Slots Premium');
            break;
            case 'blackjack':
            iniciarJuego('Blackjack');
            break;
        case 'bingo':
            iniciarJuego('Bingo');
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
            // const iniciarJuego = (juego: string) => {
            //     console.log(`Iniciando el juego: ${juego}`);
            
            //     switch (juego) {
            //         case 'Slots STD':
            //             const slotsSTD = new SlotsSTD();
            //             const saldoSlotsSTD = readlineSync.questionInt('¿Cuánto saldo deseas cargar en Slots STD? ');
            //             slotsSTD.cargarSaldo(saldoSlotsSTD);
            //             console.log("La apuesta minima es de 20 pesos  y la maxima es de 500 pesos")
            //             const apuestaSlotsSTD = readlineSync.questionInt('¿Cuánto deseas apostar en Slots STD? ')
            //             slotsSTD.realizarApuesta(apuestaSlotsSTD);
            //             slotsSTD.jugar();
            //             slotsSTD.actualizarSaldo();
                    
            //             break;
            //         case 'Slots Premium':
            //             const slotsPrem = new SlotsPrem();  // Instancia del juego Slots Premium
            //             const saldoSlotsPremium = readlineSync.questionInt('¿Cuánto saldo deseas cargar en Slots Premium? ');
            //             slotsPrem.cargarSaldo(saldoSlotsPremium);
            //             console.log("La apuesta minima es de 20 pesos  y la maxima es de 500 pesos");
            //             const apuestaSlotsPremium = readlineSync.questionInt('¿Cuánto deseas apostar en Slots Premium? ');
            //             slotsPrem.realizarApuesta(apuestaSlotsPremium);
            //             slotsPrem.jugar();
            //             slotsPrem.actualizarSaldo();
            //             break;
            //         case 'Blackjack': 
            //             // Crear una instancia del juego BlackJack
            //             const blackJack = new BlackJack();  // Instancia del juego BlackJack
            //             const saldoBlackJack = readlineSync.questionInt('¿Cuánto saldo deseas cargar en Blackjack? ');
            //             blackJack.cargarSaldo(saldoBlackJack);
            //             const apuestaBlackJack = readlineSync.questionInt('¿Cuánto deseas apostar en Blackjack? ');
            //             blackJack.realizarApuesta(apuestaBlackJack);
            //             blackJack.repartirCartas(3);
            //             blackJack.plantarse();
            //             break;
            //         case 'Bingo':
            //             const bingo = new Bingo();  // Instancia del juego Bingo
            //             const saldoBingo = readlineSync.questionInt('¿Cuánto saldo deseas cargar en Bingo? ');
            //             bingo.cargarSaldo(saldoBingo);
            //             const apuestaBingo = readlineSync.questionInt('¿Cuánto deseas apostar en Bingo? ');
            //             bingo.realizarApuesta(apuestaBingo);
            //             bingo.jugar();
            //              // Llama al método jugar() del juego Bingo
            //             bingo.bingoFinal();
            //             break;
            //         default:
            //             console.log('Opción no válida.');
            //             break;
            //     }
            // };