"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
var inquirer_1 = require("inquirer");
var fs = require("fs");
var SlotsSTD_1 = require("./SlotsSTD");
var SlotsPrem_1 = require("./SlotsPrem");
var BlackJack_1 = require("./BlackJack");
var Bingo_1 = require("./Bingo");
var Casino_1 = require("./Casino");
var Billetera_1 = require("./Billetera");
// Instancia del casino
var casino = new Casino_1.Casino();
// -----------------------------------------------------------------------------------------------------------
// Función para mostrar el título del casino
var mostrarTituloCasino = function () {
    console.clear(); // Limpia la consola para un diseño limpio
    console.log("\n======================================== \n    \u2588\u2588\u2557  \u2588\u2588\u2557\u2588\u2588\u2557\u2588\u2588\u2588\u2557   \u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557        \n    \u2588\u2588\u2551 \u2588\u2588\u2554\u255D\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D        \n    \u2588\u2588\u2588\u2588\u2588\u2554\u255D \u2588\u2588\u2551\u2588\u2588\u2554\u2588\u2588\u2557 \u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2588\u2557       \n    \u2588\u2588\u2554\u2550\u2588\u2588\u2557 \u2588\u2588\u2551\u2588\u2588\u2551\u255A\u2588\u2588\u2557\u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551       \n    \u2588\u2588\u2551  \u2588\u2588\u2557\u2588\u2588\u2551\u2588\u2588\u2551 \u255A\u2588\u2588\u2588\u2588\u2551\u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D       \n    \u255A\u2550\u255D  \u255A\u2550\u255D\u255A\u2550\u255D\u255A\u2550\u255D  \u255A\u2550\u2550\u2550\u255D \u255A\u2550\u2550\u2550\u2550\u2550\u255D  \n=========================================\n        KING OF COING CASINO\n=========================================\n    ");
};
var menuOpciones = function () { return __awaiter(void 0, void 0, void 0, function () {
    var opcion, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                mostrarTituloCasino();
                return [4 /*yield*/, inquirer_1.default.prompt([
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
                    ])];
            case 1:
                opcion = (_b.sent()).opcion;
                _a = opcion;
                switch (_a) {
                    case 'registrar': return [3 /*break*/, 2];
                    case 'acceder': return [3 /*break*/, 4];
                    case 'mostrar': return [3 /*break*/, 6];
                    case 'billetera': return [3 /*break*/, 8];
                    case 'juegos': return [3 /*break*/, 10];
                    case 'instrucciones': return [3 /*break*/, 12];
                    case 'salir': return [3 /*break*/, 14];
                }
                return [3 /*break*/, 15];
            case 2: return [4 /*yield*/, registrarUsuario()];
            case 3:
                _b.sent();
                return [3 /*break*/, 16];
            case 4: return [4 /*yield*/, accederUsuario()];
            case 5:
                _b.sent();
                return [3 /*break*/, 16];
            case 6: return [4 /*yield*/, mostrarInfoUsuario()];
            case 7:
                _b.sent();
                return [3 /*break*/, 16];
            case 8: return [4 /*yield*/, menuBilletera()];
            case 9:
                _b.sent(); // Submenú para gestionar la billetera
                return [3 /*break*/, 16];
            case 10: return [4 /*yield*/, menuJuegos()];
            case 11:
                _b.sent(); // Llamar al submenú de juegos
                return [3 /*break*/, 16];
            case 12: return [4 /*yield*/, imprimirInstrucciones()];
            case 13:
                _b.sent();
                return [3 /*break*/, 16];
            case 14:
                console.log('Saliendo...');
                return [3 /*break*/, 16];
            case 15:
                console.log('Opción no válida.');
                return [3 /*break*/, 16];
            case 16:
                if (!(opcion !== 'salir')) return [3 /*break*/, 18];
                return [4 /*yield*/, menuOpciones()];
            case 17:
                _b.sent();
                _b.label = 18;
            case 18: return [2 /*return*/];
        }
    });
}); };
menuOpciones();
var menuBilletera = function () { return __awaiter(void 0, void 0, void 0, function () {
    var opcion, monto;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer_1.default.prompt([
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
                ])];
            case 1:
                opcion = (_a.sent()).opcion;
                switch (opcion) {
                    case 'agregar':
                        monto = readlineSync.questionInt('Ingrese la cantidad a agregar: ');
                        billetera.agregarSaldo(monto);
                        break;
                    case 'ver':
                        console.log("Saldo actual: $".concat(billetera.obtenerSaldo()));
                        break;
                    case 'volver':
                        console.log('Volviendo al menú principal...');
                        return [2 /*return*/];
                    default:
                        console.log('Opción no válida.');
                        break;
                }
                if (!(opcion !== 'volver')) return [3 /*break*/, 3];
                return [4 /*yield*/, menuBilletera()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
// -----------------------------------------------------------------------------------------------------------
// Función para leer e imprimir el contenido de un archivo de texto con las instrucciones
var imprimirInstrucciones = function () { return __awaiter(void 0, void 0, void 0, function () {
    var archivoRuta, data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                archivoRuta = './message.txt';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                data = fs.readFileSync(archivoRuta, 'utf8');
                console.log('\n=== Instrucciones ===\n');
                console.log(data); // Imprime el contenido del archivo
                console.log('\nPresiona enter para volver al menú principal...');
                // Esperamos una tecla para regresar al menú principal
                return [4 /*yield*/, inquirer_1.default.prompt([{
                            type: 'input',
                            name: 'continuar',
                            message: 'Presione enter para continuar...',
                            validate: function (input) { return input === '' ? true : 'Solo presione enter para continuar.'; }
                        }])];
            case 2:
                // Esperamos una tecla para regresar al menú principal
                _a.sent();
                menuOpciones(); // Regresamos al menú principal después de las instrucciones
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error('Error al leer el archivo de instrucciones:', err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// -----------------------------------------------------------------------------------------------------------
// Pregunta para validar el nombre de usuario
var validateNombreUsuario = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var usuarioExistente;
    return __generator(this, function (_a) {
        if (input.trim() === '') {
            return [2 /*return*/, 'El nombre no puede estar vacío.'];
        }
        usuarioExistente = casino.getUsuarios().find(function (u) { return u.getNombreUsuario() === input; });
        if (usuarioExistente) {
            return [2 /*return*/, 'El nombre de usuario ya está registrado.'];
        }
        return [2 /*return*/, true];
    });
}); };
// -----------------------------------------------------------------------------------------------------------
// Pregunta para validar el DNI
var validateDNI = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var dni, usuarioExistente;
    return __generator(this, function (_a) {
        dni = parseInt(input, 10);
        if (isNaN(dni)) {
            return [2 /*return*/, 'Debe ingresar un número válido para el DNI.'];
        }
        usuarioExistente = casino.getUsuarios().find(function (u) { return u.getDni() === dni; });
        if (usuarioExistente) {
            return [2 /*return*/, 'El DNI ya está registrado.'];
        }
        return [2 /*return*/, true];
    });
}); };
// -----------------------------------------------------------------------------------------------------------
var registrarUsuario = function () { return __awaiter(void 0, void 0, void 0, function () {
    var usuarioData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                    {
                        type: 'input',
                        name: 'nombreUsuario',
                        message: 'Ingrese su nombre de usuario:',
                        validate: validateNombreUsuario, // Validación personalizada
                    },
                    {
                        type: 'input',
                        name: 'dni',
                        message: 'Ingrese su DNI:',
                        validate: validateDNI, // Validación personalizada
                    },
                    {
                        type: 'input',
                        name: 'edad',
                        message: 'Ingrese su edad:',
                        validate: function (input) {
                            var edad = parseInt(input, 10);
                            if (isNaN(edad)) {
                                return 'Debe ingresar un número válido para la edad.';
                            }
                            if (edad < 18) {
                                return 'La edad debe ser un número válido y mayor o igual a 18 años.';
                            }
                            return true;
                        },
                        filter: function (input) { return parseInt(input, 10); }, // Convertimos a número
                    },
                    {
                        type: 'input',
                        name: 'saldo',
                        message: 'Ingrese el saldo de su cuenta:',
                        validate: function (input) {
                            var saldo = parseFloat(input);
                            if (isNaN(saldo)) {
                                return 'Debe ingresar un número válido para el saldo.';
                            }
                            if (saldo <= 0) {
                                return 'El saldo debe ser un número mayor que 0.';
                            }
                            return true;
                        },
                        filter: function (input) { return parseFloat(input); }, // Convertimos a número
                    }
                ])];
            case 1:
                usuarioData = _a.sent();
                casino.registrarUsuario(usuarioData.nombreUsuario, usuarioData.dni, usuarioData.edad, usuarioData.saldo);
                return [2 /*return*/];
        }
    });
}); };
// -----------------------------------------------------------------------------------------------------------
// Función para acceder a un usuario
var accederUsuario = function () { return __awaiter(void 0, void 0, void 0, function () {
    var nombreUsuario, usuario;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                    {
                        type: 'input',
                        name: 'nombreUsuario',
                        message: 'Ingrese su nombre para Acceder: ',
                    }
                ])];
            case 1:
                nombreUsuario = (_a.sent()).nombreUsuario;
                usuario = casino.getUsuarios().find(function (u) { return u.getNombreUsuario() === nombreUsuario; });
                if (!usuario) return [3 /*break*/, 3];
                console.log("Acceso exitoso para ".concat(nombreUsuario, "."));
                // Llamamos a la función del submenú después de acceder
                return [4 /*yield*/, submenuUsuario(usuario)];
            case 2:
                // Llamamos a la función del submenú después de acceder
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                console.log('Usuario no encontrado.');
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
// Submenú para un usuario
var submenuUsuario = function (usuario) { return __awaiter(void 0, void 0, void 0, function () {
    var opcionSubmenu, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, inquirer_1.default.prompt([
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
                ])];
            case 1:
                opcionSubmenu = (_b.sent()).opcionSubmenu;
                _a = opcionSubmenu;
                switch (_a) {
                    case 'modificarDatos': return [3 /*break*/, 2];
                    case 'infoUsuario': return [3 /*break*/, 4];
                    case 'volver': return [3 /*break*/, 5];
                }
                return [3 /*break*/, 6];
            case 2: return [4 /*yield*/, modificarDatosUsuario(usuario)];
            case 3:
                _b.sent();
                return [3 /*break*/, 7];
            case 4:
                console.log("Nombre de usuario: ".concat(usuario.getNombreUsuario(), "\n            DNI:  ").concat(usuario.getDni(), ",\n            Edad: ").concat(usuario.getEdad(), ",\n            Saldo: ").concat(usuario.getSaldo()));
                return [3 /*break*/, 7];
            case 5:
                console.log('Volviendo al menú principal...');
                return [3 /*break*/, 7];
            case 6:
                console.log('Opción no válida.');
                return [3 /*break*/, 7];
            case 7:
                if (!(opcionSubmenu !== 'volver')) return [3 /*break*/, 9];
                return [4 /*yield*/, submenuUsuario(usuario)];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); };
var modificarDatosUsuario = function (usuario) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, opcion, nuevoValor;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                    {
                        type: 'list',
                        name: 'opcion',
                        message: '¿Qué desea modificar?',
                        choices: ['Edad', 'Saldo']
                    },
                    {
                        type: 'input',
                        name: 'nuevoValor',
                        message: 'Ingrese el nuevo valor:',
                        validate: function (input) {
                            // Validación de la edad
                            if (opcion === 'Edad') {
                                var edad = parseInt(input, 10);
                                if (isNaN(edad)) {
                                    return 'Debe ingresar un número válido para la edad.';
                                }
                                if (edad < 18) {
                                    return 'La edad debe ser un número mayor o igual a 18 años.';
                                }
                                return true;
                            }
                            // Validación de saldo
                            if (opcion === 'Saldo') {
                                var saldo = parseFloat(input);
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
                        filter: function (input) {
                            // Convertir el valor de edad o saldo según corresponda
                            if (opcion === 'Edad') {
                                return parseInt(input, 10); // Convertir a número entero
                            }
                            else if (opcion === 'Saldo') {
                                return parseFloat(input); // Convertir a número decimal
                            }
                            return input;
                        }
                    }
                ])];
            case 1:
                _a = _b.sent(), opcion = _a.opcion, nuevoValor = _a.nuevoValor;
                // Validación adicional al modificar la edad, asegurándonos de que el valor ingresado es mayor a 18
                if (opcion === 'Edad') {
                    if ((isNaN)(nuevoValor)) {
                        console.log('Debe ingresar un número válido para la edad.');
                    }
                    else if (nuevoValor < 18) {
                        console.log('La edad debe ser un número mayor o igual a 18 años.');
                    }
                    else {
                        usuario.setEdad(nuevoValor); // Modificamos la edad solo si es válida
                        console.log("Edad modificada a ".concat(nuevoValor));
                    }
                }
                else if ((opcion === 'Saldo') && (isNaN)(nuevoValor)) {
                    console.log('Debe ingresar un número válido para el saldo.');
                }
                else if ((opcion === 'Saldo') && (nuevoValor <= 0)) {
                    console.log('El saldo debe ser un número mayor que 0.');
                    usuario.setSaldo(nuevoValor); // Modificamos el saldo
                    console.log("Saldo modificado a ".concat(nuevoValor));
                }
                // Volver al submenu
                return [4 /*yield*/, submenuUsuario(usuario)];
            case 2:
                // Volver al submenu
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
// -----------------------------------------------------------------------------------------------------------
//Funcion para mostrar Info del Usuario
var mostrarInfoUsuario = function () { return __awaiter(void 0, void 0, void 0, function () {
    var nombreUsuario;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                    {
                        type: 'input',
                        name: 'nombreUsuario',
                        message: 'Ingrese el nombre para ver informacion: ',
                    }
                ])];
            case 1:
                nombreUsuario = (_a.sent()).nombreUsuario;
                casino.mostrarInfoUsuario(nombreUsuario);
                return [2 /*return*/];
        }
    });
}); };
// -----------------------------------------------------------------------------------------------------------
// Función para iniciar un juego
var billetera = new Billetera_1.Billetera(); // Instancia de la billetera
var iniciarJuego = function (juego) { return __awaiter(void 0, void 0, void 0, function () {
    var slotsSTD, jugarSlotsSTD, apuestaSlotsSTD, slotsPrem, jugarSlotsPremium, apuestaSlotsPremium, blackJack, jugarBlackJack, apuestaBlackJack, bingo, jugarBingo, apuestaBingo;
    return __generator(this, function (_a) {
        console.log("Iniciando el juego: ".concat(juego));
        switch (juego) {
            case 'Slots STD':
                slotsSTD = new SlotsSTD_1.SlotsSTD(billetera);
                jugarSlotsSTD = true;
                while (jugarSlotsSTD) {
                    console.log("\nLa apuesta mínima es de 20 pesos y la máxima es de 500 pesos\n");
                    apuestaSlotsSTD = readlineSync.questionInt('¿Cuánto deseas apostar en Slots STD? ');
                    slotsSTD.realizarApuesta(apuestaSlotsSTD);
                    console.log("\n-------------------------------"); // Guion para separar las secciones
                    slotsSTD.jugar();
                    console.log("\n-------------------------------"); // Guion para separar las secciones
                    slotsSTD.actualizarSaldo();
                    console.log("\n-------------------------------"); // Guion para separar las secciones
                    if (slotsSTD.billetera.obtenerSaldo() <= 0) {
                        console.log("\nSaldo insuficiente para seguir jugando. Necesitas cargar más saldo.\n");
                        jugarSlotsSTD = false;
                    }
                    else {
                        jugarSlotsSTD = readlineSync.keyInYNStrict("\n¿Quieres volver a jugar y realizar otra apuesta? ");
                    }
                    console.log("\n"); // Salto de línea al final de cada ciclo
                }
                break;
            case 'Slots Premium':
                slotsPrem = new SlotsPrem_1.SlotsPrem(billetera);
                jugarSlotsPremium = true;
                while (jugarSlotsPremium) {
                    console.log("\nLa apuesta minima es de 20 pesos y la maxima es de 500 pesos\n");
                    apuestaSlotsPremium = readlineSync.questionInt("¿Cuánto deseas apostar en Slots Premium? ");
                    slotsPrem.realizarApuesta(apuestaSlotsPremium);
                    console.log("\n-------------------------------"); // Guion para separar las secciones
                    slotsPrem.jugar();
                    console.log("\n-------------------------------"); // Guion para separar las secciones
                    slotsPrem.actualizarSaldo();
                    console.log("\n-------------------------------"); // Guion para separar las secciones
                    if (slotsPrem.billetera.obtenerSaldo() <= 0) {
                        console.log("\nSaldo insuficiente para seguir jugando. Necesitas cargar más saldo.\n");
                        jugarSlotsPremium = false;
                    }
                    else {
                        jugarSlotsPremium = readlineSync.keyInYNStrict('\n¿Quieres volver a jugar y realizar otra apuesta? ');
                    }
                    console.log("\n"); // Salto de línea al final de cada ciclo
                }
                break;
            case 'Blackjack':
                blackJack = new BlackJack_1.BlackJack(billetera);
                jugarBlackJack = true;
                while (jugarBlackJack) {
                    console.log("\n-------------------------------"); // Guion para separar las secciones
                    apuestaBlackJack = readlineSync.questionInt("\n¿Cuánto deseas apostar en Blackjack? ");
                    blackJack.realizarApuesta(apuestaBlackJack);
                    console.log("\n-------------------------------"); // Guion para separar las secciones
                    blackJack.repartirCartas(2);
                    console.log("\n-------------------------------"); // Guion para separar las secciones
                    blackJack.plantarse();
                    console.log("\n-------------------------------"); // Guion para separar las secciones
                    if (blackJack.billetera.obtenerSaldo() <= 0) {
                        console.log("\nSaldo insuficiente para seguir jugando. Necesitas cargar más saldo.\n");
                        jugarBlackJack = false;
                    }
                    else {
                        jugarBlackJack = readlineSync.keyInYNStrict('\n¿Quieres volver a jugar y realizar otra apuesta? ');
                    }
                    console.log("\n"); // Salto de línea al final de cada ciclo
                }
                break;
            case 'Bingo':
                bingo = new Bingo_1.Bingo(billetera);
                jugarBingo = true;
                while (jugarBingo) {
                    console.log("\n-------------------------------"); // Guion para separar las secciones
                    apuestaBingo = readlineSync.questionInt('\n¿Cuánto deseas apostar en Bingo? ');
                    bingo.realizarApuesta(apuestaBingo);
                    console.log("\n-------------------------------"); // Guion para separar las secciones
                    bingo.jugar();
                    console.log("\n-------------------------------"); // Guion para separar las secciones
                    bingo.bingoFinal();
                    console.log("\n-------------------------------"); // Guion para separar las secciones
                    if (bingo.billetera.obtenerSaldo() <= 0) {
                        console.log("\nSaldo insuficiente para seguir jugando. Necesitas cargar más saldo.\n");
                        jugarBingo = false;
                    }
                    else {
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
        return [2 /*return*/];
    });
}); };
// Submenú de Juegos
var menuJuegos = function () { return __awaiter(void 0, void 0, void 0, function () {
    var opcion;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer_1.default.prompt([
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
                ])];
            case 1:
                opcion = (_a.sent()).opcion;
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
                if (!(opcion !== 'volver')) return [3 /*break*/, 3];
                return [4 /*yield*/, menuJuegos()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
