/*
 ============================================================================
 LECCIÓN 35 - Bucles y operadores de cortocircuito
 ============================================================================

 OBJETIVOS DE APRENDIZAJE
 - Explicar qué es un bucle y cuándo conviene usarlo.
 - Escribir bucles for, while, do...while y for...of, y elegir el adecuado.
 - Usar break y continue con criterio.
 - Explicar que && y || evalúan en cortocircuito y DEVUELVEN operandos
   (no siempre un booleano).
 - Reconocer y evitar los bucles infinitos.

 PRERREQUISITOS
 - Lección 04 (operadores lógicos y de comparación).
 - Lecciones 14 y 15 (bucles ya explicados). Esta lección los AMPLÍA y
   aclara cuándo usar cada uno; no los sustituye.

 REPASO: for, while, do...while y for...of se explican por primera vez en
 la lección 14. Las secciones 1-4 de esta lección los repasan brevemente
 para centrarse en lo nuevo: break/continue (sección 5), cortocircuito con
 && y || (sección 6) y bucles infinitos (sección 7).

 1. ¿QUÉ ES UN BUCLE Y CUÁNDO LO USO?
 Un BUCLE es una estructura que repite un bloque de instrucciones mientras
 se cumpla una condición (o, en el caso de for...of, mientras queden
 elementos por recorrer).
 Se usa cuando el número de repeticiones es grande, variable o conocible
 solo tras evaluar datos. Si vas a copiar y pegar el mismo código varias
 veces, probablemente necesitas un bucle.
 */

console.log("--- 1. for: repetición con número conocido ---")

// Repite 5 veces: inicialización (let i = 0); condición (i < 5); incremento (i++)
for (let i = 0; i < 5; i++) {
    console.log("Vuelta número", i)
}
// Salida: Vuelta número 0, 1, 2, 3, 4  (una por línea)

// Recorrer un array por POSICIÓN (índice):
let nombres = ["Ana", "Luis", "Sara"]
for (let i = 0; i < nombres.length; i++) {
    console.log("Posición", i, "->", nombres[i])
}

/*
 2. while: repetición mientras se cumpla una condición
 Se usa cuando NO se sabe de antemano cuántas vueltas harán falta;
 la condición se comprueba ANTES de cada vuelta.
 */

console.log("--- 2. while ---")

let intentos = 0
let limite = 3
while (intentos < limite) {
    console.log("Intento", intentos + 1)
    intentos++
}
// Salida: Intento 1, Intento 2, Intento 3

// Muy importante: dentro del bucle debe cambiarse algo que afecte a la
// condición (aquí, intentos++). Si no, la condición se cumple siempre y
// el bucle no termina (ver "bucles infinitos" más abajo).

/*
 3. do...while: al menos una vuelta garantizada
 Similar a while, pero la condición se comprueba AL FINAL. Por eso el
 bloque se ejecuta SIEMPRE una vez, incluso si la condición es falsa
 desde el principio.
 */

console.log("--- 3. do...while ---")

let respuesta = 0
do {
    console.log("Se muestra al menos una vez. Respuesta:", respuesta)
    respuesta++
} while (respuesta < 1)

// Con while la condición se habría comprobado antes; con do...while el
// primer mensaje sale siempre.

/*
 4. for...of: recorrer los elementos de un colección
 for...of recorre los VALORES de un array, un Set, un Map, un texto...
 directamente, sin necesidad de posiciones.
 */

console.log("--- 4. for...of ---")

let frutas = ["manzana", "pera", "uva"]
for (let fruta of frutas) {
    console.log("Fruta:", fruta)
}
// Salida: Fruta: manzana / Fruta: pera / Fruta: uva

for (let letra of "Hola") {
    console.log("Letra:", letra)
}

/*
 5. break y continue: interrumpir o saltar vueltas
 - break: TERMINA el bucle por completo al llegar a él.
 - continue: SALTA lo que queda de la vuelta actual y pasa a la siguiente.
 */

console.log("--- 5. break y continue ---")

for (let i = 0; i < 10; i++) {
    if (i === 3) {
        continue // se salta la impresión de 3 y sigue en 4
    }
    if (i === 6) {
        break // termina el bucle al llegar a 6
    }
    console.log("Valor:", i)
}
// Salida esperada: 0, 1, 2, 4, 5  (3 se salta; en 6 se corta el bucle)

/*
 6. OPERADORES DE CORTOCIRCUITO: && y || DEVUELVEN OPERANDOS
 En la lección 04 vimos && y || como "y lógico" y "o lógico". Ahora
 vemos su comportamiento real: NO devuelven true/false siempre, sino
 que devuelven UNO DE LOS OPERANDOS.

 CORTOCIRCUITO significa que JavaScript deja de evaluar en cuanto el
 resultado ya está decidido:
 - En a && b: si a es falsy, el resultado es a (no hace falta mirar b).
 - En a || b: si a es truthy, el resultado es a (no hace falta mirar b).
 */

console.log("--- 6. Cortocircuito: && y || ---")

console.log(false && "no se evalúa") // false         -> el primero es falsy
console.log("primer valor" || "segundo") // "primer valor" -> el primero es truthy
console.log("" || "texto por defecto") // "texto por defecto" -> "" es falsy
console.log("A" && "B") // "B" -> ambos truthy: devuelve el ÚLTIMO
console.log(null || "valor alternativo") // "valor alternativo"

// Uso práctico 1: valor por defecto con ||
let nombre = ""
let nombreFinal = nombre || "Anónimo"
console.log("Bienvenido,", nombreFinal) // Bienvenido, Anónimo

// Uso práctico 2: ejecución condicionada con &&
let estaLogueado = true
estaLogueado && console.log("El usuario está logueado") // se muestra

let esAdmin = false
esAdmin && console.log("Esta línea NO se muestra") // no se muestra nada

/*
 EJERCICIO MENTAL para distinguir cortocircuito de evaluación completa:
 - Con || la evaluación completa evaluaría los dos lados SIEMPRE.
 - Con cortocircuito, si el primero decide el resultado, el segundo NO
   se evalúa. La diferencia importa cuando el segundo lado tiene efectos
   (por ejemplo, una llamada a función).
 */

// Diferencia observable: una función que cuenta cuántas veces se llama
let llamadas = 0
function contar() {
    llamadas++
    return true
}

true || contar() // con || el segundo lado NO se evalúa (cortocircuito)
false && contar() // con && el segundo lado tampoco (falsy decide)
console.log("La función contar() se llamó", llamadas, "vez/veces") // 0

/*
 7. RIESGO DE BUCLES INFINITOS
 Un bucle infinito es uno que nunca termina: la condición nunca se vuelve
 falsa. En la terminal, el programa se queda ejecutando sin parar.
 Los dos clásicos:
 while (true) { }            -> la condición siempre es verdadera
 let x = 0; while (x < 5) {} -> nada cambia x, la condición nunca cambia
 Si un script se queda "colgado", revisa que dentro del bucle algo
 modifique la condición. En este curso no ejecutamos bucles infinitos;
 verás el riesgo señalado ahí donde aparezca.
 */

/*
 ERRORES FRECUENTES
 1. Olvidar el incremento: el bucle no avanza y nunca termina.
 2. Confundir continuar con romper: continue salta una vuelta, break
    termina el bucle entero.
 3. Esperar que "A" && "B" dé true: devuelve "B". Solo cuando se usa en
    un if, el valor resultante se interpreta como booleano.
 4. Usar for...of cuando necesitas la posición: para la posición usa el
    for clásico con i (o arr.entries(), de la lección 10/16).
 5. Creer que || devuelve true/false: devuelve un OPERANDO; si el primero
    es truthy, devuelve ese; si no, el segundo.
*/

/*
 EJERCICIOS GRADUADOS

 EJERCICIO 1 (reproducir)
 Escribe un bucle for que imprima los números del 1 al 10. Después cambia
 el incremento para que imprima solo los pares (2, 4, 6, 8, 10).

 EJERCICIO 2 (comprender)
 Sin ejecutar, indica qué imprime cada expresión:
   a) "Hola" || "adiós"
   b) 0 && "nunca"
   c) "" || 7
   d) 1 && 2

 EJERCICIO 3 (aplicar)
 Escribe un bucle while que cuente cuántas veces hay que restar 3 a 20
 hasta que el número sea menor de 5, e imprima el número de pasos.
 (Resultado esperado: los valores 17, 14, 11, 8, 5 -> 5 pasos.)
*/

/*
 SOLUCIONES

 EJERCICIO 1
   for (let i = 1; i <= 10; i++) { console.log(i) }
   Para pares: for (let i = 2; i <= 10; i += 2) { console.log(i) }
   O también: if (i % 2 === 0) { console.log(i) } dentro del bucle 1..10.

 EJERCICIO 2
   a) "Hola"  -> el primer operando es truthy, decide el resultado.
   b) 0       -> el primer operando es falsy: && lo devuelve sin mirar a b.
   c) 7       -> "" es falsy, || pasa al segundo operando.
   d) 2       -> ambos truthy: && devuelve el último.

 EJERCICIO 3
   let numero = 20
   let pasos = 0
   while (numero >= 5) {
     numero -= 3
     pasos++
   }
   console.log("Pasos:", pasos) // 5
   Los valores de numero son 17, 14, 11, 8, 5; al llegar a 5 la condición
   (>= 5) se cumple una vez más y pasa a 2, que ya la rompe. Total 5 pasos.
*/

/*
 RESUMEN Y AUTOEVALUACIÓN
 Resumen: for sirve cuando se conoce el número de vueltas; while cuando
 depende de una condición previa; do...while garantiza al menos una vuelta;
 for...of recorre valores de colecciones; break corta el bucle y continue
 salta la vuelta actual; && y || evalúan en cortocircuito y devuelven
 operandos, no siempre booleanos; un bucle infinito ocurre cuando la
 condición nunca cambia.

 Autoevaluación: tras esta lección deberías poder...
 [ ] Elegir el bucle adecuado según el problema
 [ ] Predecir el resultado de expresiones con && y || (devolución de operandos)
 [ ] Explicar la diferencia entre break y continue
 [ ] Reconocer una condición que provocaría un bucle infinito
 [ ] Usar || para asignar un valor por defecto a una variable

 RETO OPCIONAL
 (Concepto aún no obligatorio: closures, lección 36.)
 ¿Por qué la variable `llamadas` del apartado 6 sigue contando correctamente
 aunque se modifica desde una función? Es un adelanto de ámbito y cierres.
 */