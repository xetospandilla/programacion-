/*
 ============================================================================
 LECCIÓN 32 - El entorno de JavaScript
 ============================================================================

 OBJETIVOS DE APRENDIZAJE
 - Explicar, con tus palabras, qué es JavaScript y en qué entornos se ejecuta.
 - Distinguir Node.js del navegador y saber qué programa usar en cada caso.
 - Explicar qué son un archivo fuente, la terminal y la ejecución de un programa.
 - Verificar si Node está instalado con `node --version`.
 - Ejecutar este archivo con `node 32-entorno.js` y relacionar la salida
   con las instrucciones del código.

 PRERREQUISITOS
 - Ninguno. Esta es la primera lección del curso. Los ejemplos usan solo
   comentarios y console.log().

 ANTES DE EMPEZAR: ¿DÓNDE SE EJECUTAN LOS COMANDOS?
 Este curso se trabaja desde una TERMINAL, también llamada consola o
 línea de comandos.
 - En Windows: escribe "Terminal" o "PowerShell" en el menú Inicio y abre la
   aplicación correspondiente.
 - En macOS y Linux: abre la aplicación llamada "Terminal".
 En esa ventana escribes comandos y pulsas Enter para ejecutarlos. Los
 comandos de este archivo NO son instrucciones de JavaScript: son órdenes
 que das al sistema operativo desde la terminal.
 */

// ---------------------------------------------------------------------------
// 1. ¿QUÉ ES JAVASCRIPT?
// ---------------------------------------------------------------------------
// JavaScript es un lenguaje de programación: un conjunto de instrucciones
// con una sintaxis (reglas de escritura) que una máquina puede interpretar.
// Con él se escribe la "lógica" de los programas: calcular, decidir, repetir,
// guardar información, etc.
//
// JavaScript nació para dar vida a las páginas web, pero hoy se usa también
// para programas de consola, aplicaciones de servidor, móviles y más.
// En este curso lo ejecutaremos con Node.js y, en lecciones avanzadas,
// también dentro del navegador.

// ---------------------------------------------------------------------------
// 2. ¿QUÉ SON NODE.JS Y EL NAVEGADOR?
// ---------------------------------------------------------------------------
// El navegador (Chrome, Firefox, Edge...) es el programa que usas para
// visitar páginas web. Interpreta HTML, CSS y JavaScript en tu equipo.
//
// Node.js es un programa que también interpreta JavaScript, pero SIN
// ventana ni interfaz: lo ejecuta directamente en la terminal. Se usa para
// scripts, servidores y herramientas de desarrollo.
//
// Diferencia práctica para este curso:
// - Los archivos .js que ves aquí se ejecutan con NODE desde la terminal.
// - El JavaScript que modifica una página web (p.ej. al pulsar un botón)
//   se ejecuta EN EL NAVEGADOR. Eso lo verás en lecciones posteriores (DOM).

// ---------------------------------------------------------------------------
// 3. ¿QUÉ SON UN ARCHIVO FUENTE, LA TERMINAL Y LA EJECUCIÓN?
// ---------------------------------------------------------------------------
// - ARCHIVO FUENTE: un archivo de texto que contiene código. Este archivo
//   (32-entorno.js) es un archivo fuente. La extensión .js indica que
//   contiene JavaScript.
// - TERMINAL: la ventana donde escribes comandos (ver el recuadro de arriba).
// - EJECUCIÓN: el acto de hacer que el programa lea y cumpla las
//   instrucciones del archivo fuente. En este curso, "ejecutar" un archivo
//   significa pedirle a Node que lo procese de principio a fin.

// ---------------------------------------------------------------------------
// 4. VERIFICAR QUE NODE ESTÁ INSTALADO
// ---------------------------------------------------------------------------
// Abre la terminal y escribe:
//
//     node --version
//
// La opción --version imprime la versión instalada, por ejemplo:
//
//     v22.x.x
//
// Si el comando no se encuentra, instala Node.js desde su página oficial
// y vuelve a probar. Este comprobador de versiones se puede usar también
// desde JavaScript gracias a process.version, que guarda la versión en uso:

console.log("Versión de Node usada ahora mismo:", process.version)

// PRIMERA SALIDA INTERPRETADA
// Cuando ejecutes node 32-entorno.js verás una línea parecida a:
//     Versión de Node usada ahora mismo: v22.x.x
// El "v22.x.x" será la versión instalada en tu equipo: puede variar y es
// normal. Lo importante es relacionar el texto del código (process.version)
// con el valor que aparece en la terminal.

// ---------------------------------------------------------------------------
// 5. CÓMO EJECUTAR ESTE ARCHIVO
// ---------------------------------------------------------------------------
// En la terminal, asegúrate de estar dentro de la carpeta del curso
// (cursos/javascript). Puedes comprobar la carpeta actual con:
//
//     pwd        (muestra el directorio actual)
//
// Para ejecutar este archivo, escribe:
//
//     node 32-entorno.js
//
// Node lee el archivo de arriba a abajo, ejecuta cada instrucción y
// muestra por la terminal lo que los console.log() le piden imprimir.

console.log("¡Hola! Este texto sale directamente desde el archivo 32-entorno.js")

// ---------------------------------------------------------------------------
// 6. console.log() EN UN PROGRAMA vs CONSOLA DEL NAVEGADOR
// ---------------------------------------------------------------------------
// - console.log() ES UNA INSTRUCCIÓN DE JAVASCRIPT: pide al programa que
//   imprima un valor en la terminal. Es la forma más habitual de "ver" qué
//   hace tu código y de depurarlo (encontrar errores).
//
// - LA CONSOLA DEL NAVEGADOR es distinta: es una herramienta de desarrollo
//   (normalmente con la tecla F12 en el navegador) que MUESTRA mensajes del
//   programa que corre en la página. Ahí también se pueden escribir
//   instrucciones sueltas a mano y ejecutarlas al momento.
//
// En resumen: aquí escribes console.log() en el código y lees la salida
// en la terminal con Node. En el navegador escribirías directamente en su
// consola de desarrollador y leerías la respuesta ahí mismo.

// ---------------------------------------------------------------------------
// 7. CÓMO INTERPRETAR LA SALIDA DE UN EJEMPLO
// ---------------------------------------------------------------------------
// Cada ejemplo de este curso indica la SALIDA ESPERADA (lo que debería
// aparecer en la terminal). Compara siempre la salida real con la esperada:
// si coinciden, entendiste el ejemplo; si no, hay un error o un malentendido.

console.log("2 + 3 =", 2 + 3) // Salida esperada: 2 + 3 = 5

// ---------------------------------------------------------------------------
// ERRORES FRECUENTES
// ---------------------------------------------------------------------------
// 1. Ejecutar el archivo desde la carpeta equivocada:
//    "node: 32-entorno.js: No such file or directory" -> primero cambia de
//    carpeta en la terminal (comando `cd`) hasta llegar a cursos/javascript.
// 2. Escribir "node32-entorno.js" (sin espacio): el comando no se entiende.
//    Recuerda el espacio entre el programa (node) y el archivo.
// 3. Confundir la terminal con la consola del navegador: aquí vemos la
//    salida en la terminal; la consola del navegador es para ejecutar
//    JavaScript dentro de una página web.

// ---------------------------------------------------------------------------
// EJERCICIOS GRADUADOS
// ---------------------------------------------------------------------------
// EJERCICIO 1 (reproducir)
// Descomenta el console.log() de abajo, ejecuta el archivo y observa la
// salida. Cambia el texto entre comillas por tu nombre y vuelve a ejecutar.
//
// console.log("Estoy aprendiendo JavaScript")

// EJERCICIO 2 (comprender)
// Sin ejecutar, escribe aquí qué mostrará esta instrucción:
//   console.log("Resultado:", 10 - 4)
// (La respuesta razonada está en el apartado de SOLUCIONES.)

// EJERCICIO 3 (aplicar)
// Escribe una instrucción console.log() que imprima la frase
// "Este es mi primer programa" seguida del resultado de 7 * 6.
// Colócala donde indica el comentario de abajo.

// [Escribe aquí tu console.log()]

// ---------------------------------------------------------------------------
// SOLUCIONES
// ---------------------------------------------------------------------------
// (Apartado separado a propósito: intenta los ejercicios antes de mirar.)

// EJERCICIO 1: al quitar los dos guiones iniciales (//), la línea pasa a ser
// código ejecutable y la terminal mostrará el texto elegido. Es tu versión
// del "¡Hola, mundo!" del momento.

// EJERCICIO 2: mostrará:
//   Resultado: 6
// 10 - 4 se evalúa ANTES de pasar el valor a console.log(). JavaScript
// calcula la operación y entrega el resultado (6).

// EJERCICIO 3: una solución correcta:
//   console.log("Este es mi primer programa", 7 * 6)
// Salida esperada: Este es mi primer programa 42
// Puede escribirse también como una sola frase con comillas:
//   console.log("Este es mi primer programa " + 7 * 6)

// ---------------------------------------------------------------------------
// RESUMEN Y AUTOEVALUACIÓN
// ---------------------------------------------------------------------------
// JavaScript es un lenguaje; Node.js es un intérprete para la terminal y el
// navegador es otro intérprete para la web. El archivo fuente contiene las
// instrucciones, la terminal es donde se escriben los comandos y "ejecutar"
// es hacer que Node procese el archivo. console.log() imprime valores y
// process.version guarda la versión de Node en uso.
//
// Auto evaluación: tras esta lección deberías poder...
// [ ] Explicar qué es un archivo fuente y para qué sirve la extensión .js
// [ ] Indicar la diferencia entre Node.js y el navegador
// [ ] Ejecutar `node archivo.js` en la terminal desde la carpeta correcta
// [ ] Leer la salida de un console.log() y relacionarla con el código
// [ ] Usar `node --version` para comprobar que Node está instalado

// ---------------------------------------------------------------------------
// RETO OPCIONAL
// ---------------------------------------------------------------------------
// Escribe un segundo console.log() que muestre tres valores usando una sola
// instrucción (pista: console.log() acepta varios valores separados por
// comas). Marca este ejercicio como un reto: todavía no se ha explicado la
// teoría de valores y expresiones; puedes resolverlo por intuición.
//
// console.log("Mi nombre es", "tu nombre", "y tengo", 20, "años")