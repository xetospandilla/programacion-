/*
Clase 45 - Ejercicios: Módulos
Vídeo: https://youtu.be/1glVfFxj8a4?t=21738

NOTA: Para que este código funcione, deben existir las subcarpetas 'utils' y 'components',
y los archivos auxiliares dentro de ellas (mathFunctions.js, constants.js, etc.).
*/

// ===============================
// EJERCICIOS DE EXPORTACIÓN E IMPORTACIÓN
// ===============================

// 1. Exporta una función desde utils/mathFunctions.js
//    (Ya existe: export function sum(a, b) { return a + b })

// 2. Exporta una constante desde utils/constants.js
//    (Ya existe: export const PI = 3.14159)

// 3. Exporta una clase desde components/Printer.js
//    (Ya existe: export class Printer { ... })

// 4. Importa y usa la función sum desde utils/mathFunctions.js
console.log("--- EJERCICIO 4 - Importar función ---");
import { sum } from './utils/mathFunctions.js';
console.log(`Suma de 5 y 10: ${sum(5, 10)}`);

// 5. Importa y usa la constante PI desde utils/constants.js
console.log("\n--- EJERCICIO 5 - Importar constante ---");
import { PI } from './utils/constants.js';
console.log(`Valor de Pi: ${PI}`);

// 6. Importa y usa la clase Printer desde components/Printer.js
console.log("\n--- EJERCICIO 6 - Importar clase ---");
import { Printer } from './components/Printer.js';
const miImpresora = new Printer("EjercicioMódulos");
miImpresora.print("Importación de clases funcionando");

// 7. Crea un módulo con exportación combinada en utils/mixedExports.js
//    (Ya existe: export function greet, export const VERSION, export default class Animal)

// 8. Importa y usa las exportaciones combinadas
console.log("\n--- EJERCICIO 8 - Importar combinado ---");
import { greet, VERSION } from './utils/mixedExports.js';
import AnimalClass from './utils/mixedExports.js';
console.log(`Mensaje: ${greet("Carlos")}`);
console.log(`Versión: ${VERSION}`);
const animal = new AnimalClass("Miau");
animal.speak();

// 9. Importa desde el índice de la carpeta utils
console.log("\n--- EJERCICIO 9 - Importar desde carpeta ---");
import CombinedUtils from './utils/index.js';
console.log(`Suma: ${CombinedUtils.sum(2, 3)}`);
console.log(`Pi: ${CombinedUtils.PI}`);

// 10. Importación final consolidada
console.log("\n--- EJERCICIO 10 - Importación final ---");
import CombinedFinal from './utils/index.js';
const resultadoSuma = CombinedFinal.sum(5, 5);
console.log(`Resultado final: ${resultadoSuma}`);