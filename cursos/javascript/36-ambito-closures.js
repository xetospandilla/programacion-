/*
 ============================================================================
 LECCIÓN 36 - Ámbito y closures
 ============================================================================

 OBJETIVOS DE APRENDIZAJE
 - Distinguir ámbito global, de función y de bloque.
 - Explicar las diferencias prácticas entre var, let y const.
 - Describir el comportamiento del hoisting con ejemplos seguros.
 - Explicar qué es una clausura (closure) y cómo conserva acceso al
   ámbito donde nació.
 - Construir un contador encapsulado con una función y una closure.

 PRERREQUISITOS
 - Lección 01 (variables: var, let, const).
 - Lección 16 (funciones: declaradas, anónimas y flecha).

 1. ¿QUÉ ES EL ÁMBITO?
 El ÁMBITO (scope) es la zona del código donde una variable existe y se
 puede usar. Si una variable no está en el ámbito actual, el programa
 no la reconoce (o busca en ámbitos superiores).
 */

console.log("--- 1. Ámbito global, de función y de bloque ---")

// ÁMBITO GLOBAL: fuera de cualquier función o bloque. Se ve en todo el archivo.
let global = "soy global"

function funcionEjemplo() {
    // ÁMBITO DE FUNCIÓN: dentro de una función.
    let local = "soy local"
    console.log("Dentro de la función:", global, "-", local) // ambas visibles
}

funcionEjemplo()

// console.log(local) -> ERROR (ReferenceError): local no existe fuera

// ÁMBITO DE BLOQUE: dentro de { } (if, for, while...).
{
    let enBloque = "solo dentro del bloque"
    console.log(enBloque) // visible dentro
}
// console.log(enBloque) -> ERROR: no existe fuera del bloque

/*
 2. var FRENTE A let Y const
 - let y const tienen ámbito de BLOQUE: mueren al salir de { }.
 - var tiene ámbito de FUNCIÓN (o global): "escapa" del bloque y solo
   desaparece al terminar la función. Por eso se recomienda let/const.
 - const añade la regla de que la variable NO se puede reasignar.
 */

console.log("--- 2. var, let y const ---")

if (true) {
    let conLet = "local al bloque"
    var conVar = "visible fuera del bloque"
}
console.log(conVar) // "visible fuera del bloque" -> var escapó del if
// console.log(conLet) -> ERROR: let murió al salir del if

const pi = 3.14
// pi = 3 // ERROR: no se puede reasignar una constante
console.log("pi sigue siendo", pi)

// Nota: const exige asignar el valor al declararla; let permite declarar
// primero y asignar después.

/*
 3. HOISTING (IZADO)
 En JavaScript, las declaraciones de funciones y de variables se
 procesan ANTES de ejecutar el resto del código de su ámbito. Eso se
 llama hoisting o izado.
 - Las FUNCIONES declaradas se pueden llamar antes de su línea (salen
   izadas completas).
 - Las variables var salen izadas PERO sin valor: vale undefined hasta su
   línea de asignación.
 - let y const salen izadas pero en una "zona muerta": usarlas antes de
   su declaración da ERROR, lo que evita fallos silenciosos.
 */

console.log("--- 3. Hoisting con ejemplos seguros ---")

// Las funciones declaradas se pueden llamar antes de su definición:
saludar() // funciona: la declaración de la función está izada
function saludar() {
    console.log("¡Hola desde una función declarada!")
}

// Las variables var existen antes de su línea, pero sin valor:
console.log("Antes de asignar, edad vale:", edad) // undefined (no hay error)
var edad = 30
console.log("Después de asignar, edad vale:", edad) // 30

// let y const NO se pueden usar antes de su declaración:
// console.log(nombre) // ERROR: ReferenceError (zona muerta temporal)
let nombre = "Ana"
console.log(nombre) // Ana

/*
 4. ¿QUÉ ES UN CLOSURE (CLAUSURA)?
 Una función Hija que se crea DENTRO de otra función conserva acceso a
 las variables de la función madre, INCLUSO después de que la madre haya
 terminado. Esa "función con su equipaje de variables recordadas" es un
 CLOSURE o clausura.
 La clave: la función interna no copia los valores; los REFERENCIA desde
 el ámbito donde nació. Mientras el closure exista, esas variables siguen
 vivas.
 */

console.log("--- 4. Closure: la función recuerda su origen ---")

function crearSaludo(saludoBase) {
    // La función interna recuerda saludoBase del ámbito de crearSaludo.
    return function (nombrePersona) {
        return saludoBase + ", " + nombrePersona
    }
}

let saludoFormal = crearSaludo("Estimado")
let saludoInformal = crearSaludo("Hola")

console.log(saludoFormal("Carlos")) // Estimado, Carlos
console.log(saludoInformal("Luis")) // Hola, Luis

// crearSaludo ya terminó, pero cada closure conserva SU PROPIO saludoBase.
// Además, los dos closures no comparten el mismo valor: cada llamada a
// crearSaludo crea un ámbito nuevo.

/*
 5. EJEMPLO PRÁCTICO: CONTADOR ENCAPSULADO
 Un uso clásico del closure es crear un contador cuyo estado NO se pueda
 tocar desde fuera. La variable contador queda "encerrada" y solo la
 función devuelta puede modificarla. Eso se llama ENCAPSULACIÓN.
 */

console.log("--- 5. Contador encapsulado ---")

function crearContador() {
    let contador = 0 // variable privada: solo visible para el closure

    return function incrementar() {
        contador++
        console.log("Contador:", contador)
    }
}

let miContador = crearContador()
miContador() // Contador: 1
miContador() // Contador: 2
miContador() // Contador: 3

// La variable `contador` NO existe fuera: nadie puede leerla ni
// resetearla sin pasar por el closure.
// console.log(contador) -> ERROR: ReferenceError

// Cada llamada a crearContador() crea un contador independiente:
let otroContador = crearContador()
miContador() // Contador: 4 (el primero sigue su cuenta)
otroContador() // Contador: 1 (el segundo empieza de cero)

/*
 ERRORES FRECUENTES
 1. Creer que var queda limitada al bloque: quizá sí (let/const) como no.
 2. Llamar a una variable let antes de declararla: ReferenceError; con var
    solo obtienes undefined. Por eso let/const descubren errores antes.
 3. Confundir closure con copia: el closure no copia valores, los recuerda
    por referencia; si el valor cambia, el closure ve el cambio.
 4. Usar const para algo que debe reasignarse: ReferenceError.
 5. Declarar una función como si fuera dato (const) y llamarla antes de su
    declaración: da error, porque const no está disponible en la zona muerta.
*/

/*
 EJERCICIOS GRADUADOS

 EJERCICIO 1 (reproducir)
 Crea una función hacerMultiplicador(factor) que devuelva una función que
 multiplique un número por factor. Pruébala con factor 2 y factor 10.

 EJERCICIO 2 (comprender)
 ¿Qué imprime este código? Razona la respuesta sin ejecutarlo:
   let x = 10
   function prueba() {
     let x = 20
     function interna() {
       return x
     }
     return interna()
   }
   console.log(prueba())

 EJERCICIO 3 (aplicar)
 Usa un closure para crear una función crearSaludoPersonalizado(prefijo)
 que devuelva otra función que reciba un nombre y devuelva
 prefijo + nombre. Después crea dos saludos distintos y muestra un
 mensaje con cada uno.
*/

/*
 SOLUCIONES

 EJERCICIO 1
   function hacerMultiplicador(factor) {
     return function (numero) {
       return numero * factor
     }
   }
   let porDos = hacerMultiplicador(2)
   let porDiez = hacerMultiplicador(10)
   console.log(porDos(5)) // 10
   console.log(porDiez(5)) // 50

 EJERCICIO 2
   Imprime 20.
   El closure `interna` recuerda el ámbito donde nació: dentro de prueba(),
   donde let x vale 20. Aunque fuera exista otra x (10), la función interna
   usa la suya: el ámbito más cercano gana. Es la regla de la búsqueda por
   cadenas de ámbitos (la más cercana primero).

 EJERCICIO 3
   function crearSaludoPersonalizado(prefijo) {
     return function (nombre) {
       return prefijo + " " + nombre
     }
   }
   let saludoEjecutivo = crearSaludoPersonalizado("Buenos días, Sr.")
   let saludoAmistoso = crearSaludoPersonalizado("Hey")
   console.log(saludoEjecutivo("García")) // Buenos días, Sr. García
   console.log(saludoAmistoso("Lucía")) // Hey Lucía
*/

/*
 RESUMEN Y AUTOEVALUACIÓN
 Resumen: el ámbito define dónde vive una variable (global, función o
 bloque); let/const respetan el bloque y var no; el hoisting iza
 declaraciones (las funciones completas, las variables sin valor hasta su
 línea, y let/const con zona muerta que da error); un closure es una
 función que conserva el acceso a las variables del ámbito donde nació,
 incluso cuando el ámbito padre ya terminó, lo que permite encapsular
 estado como en el contador.

 Autoevaluación: tras esta lección deberías poder...
 [ ] Determinar el ámbito de una variable escrita con let/const/var
 [ ] Predecir cuándo una línea lanza ReferenceError por zona muerta
 [ ] Explicar por qué una función declarada se puede llamar antes de su línea
 [ ] Crear y usar un closure que recuerde un valor del ámbito padre
 [ ] Construir un contador cuyo estado no se pueda modificar desde fuera

 RETO OPCIONAL
 (Concepto aún no obligatorio: bucles con closures.)
 Escribe un bucle que cree 3 closures y muestra qué valor ve cada uno
 usando var y usando let. Es un adelanto de por qué let es la elección
 segura. (Pista: con let cada iteración guarda su propia i.)
 */