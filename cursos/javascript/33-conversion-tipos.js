/*
 ============================================================================
 LECCIÓN 33 - Conversión de tipos
 ============================================================================

 OBJETIVOS DE APRENDIZAJE
 - Convertir un valor a número, texto o booleano de forma explícita con
   Number(), String() y Boolean().
 - Explicar qué es la coerción (conversión implícita) y por qué puede
   confundir al leer código.
 - Reconocer NaN, usar Number.isNaN() y las funciones parseInt() y parseFloat().
 - Explicar la diferencia práctica entre == y ===, y preferir la comparación
   estricta.
 - Evaluar expresiones sencillas teniendo en cuenta la precedencia de operadores.

 PRERREQUISITOS
 - Lección 01 (variables con let/const).
 - Lección 02 (tipos primitivos: string, number, boolean, null, undefined).
 - Lección 04 (operadores aritméticos, de comparación y lógicos).

 1. CONVERSIÓN EXPLÍCITA: TÚ DICES QUÉ TIPO QUIERES
 En JavaScript cada valor tiene un TIPO (texto, número, booleano...).
 A veces te interesa transformar un valor a otro tipo, por ejemplo cuando
 un formulario te devuelve "42" (texto) y tú necesitas el número 42.
 La forma clara es llamar a las funciones Number(), String() y Boolean():
 */

console.log("--- 1. Conversión explícita ---")

let texto = "42"
let numero = Number(texto) // "42" (texto) se convierte en 42 (número)
console.log(texto, typeof texto) // 42 string   -> sigue siendo texto
console.log(numero, typeof numero) // 42 number -> ya es número

console.log(String(123)) // "123" -> número convertido a texto
console.log(String(3.14)) // "3.14" -> 3.14 convertido a texto

console.log(Boolean(1)) // true  -> 1 se convierte en true
console.log(Boolean(0)) // false -> 0 se convierte en false
console.log(Boolean("Hola")) // true -> un texto no vacío es true
console.log(Boolean("")) // false -> un texto vacío es false

// Los VALORES DEFINIDOS COMO FALSY (vistos en la lección 04) se convierten
// en false con Boolean(); los demás valores se convierten en true.
// Falsy comunes de recordar: 0, 0n, null, undefined, NaN y "".

/*
 2. CONVERSIÓN IMPLÍCITA: COERCIÓN
 Cuando usas un valor de un tipo donde JavaScript espera otro, el lenguaje
 puede convertirlo SOLO, sin que lo pidas. Eso se llama COERCIÓN.
 A veces es útil... y otras veces produce resultados sorprendentes.
 El truco está en que JavaScript aplica sus propias reglas de conversión.
 */

console.log("--- 2. Coerción (conversión implícita) ---")

console.log("5" + 2) // "52"  -> el + con textos UNE (concatenación)
console.log("5" - 2) // 3     -> el - no sirve para unir textos: resta números
console.log("5" * "2") // 10  -> * y / convierten automáticamente a número

// Ejemplo donde la coerción confunde: "resultado" que depende del operador.
console.log("10" + 5 + 5) // "1055" -> primero une "10" con 5, luego vuelve a unir
console.log(10 + 5 + "5") // "155"  -> primero suma 10+5, y al llegar al texto une

/*
 Ejercicio mental de comprensión:
 - "10" + 5 + 5  se evalúa de izquierda a derecha:
   1º "10" + 5  -> "105" (texto)
   2º "105" + 5 -> "1055" (texto)
 - 10 + 5 + "5" se evalúa de izquierda a derecha:
   1º 10 + 5  -> 15 (número)
   2º 15 + "5" -> "155" (texto)
 La lección: con + el resultado depende del ORDEN de los operandos.
 */

/*
 3. NaN: UN NÚMERO QUE NO ES UN NÚMERO
 NaN significa "Not a Number" (no es un número). Aparece cuando JavaScript
 intenta hacer una operación numérica con algo que no puede convertir.
 Curiosidad importante: NaN es un valor de tipo number, aunque represente
 un error numérico.
 */

console.log("--- 3. NaN, Number.isNaN(), parseInt() y parseFloat() ---")

console.log(Number("hola")) // NaN -> "hola" no se puede convertir a número
console.log(Number(undefined)) // NaN
console.log(0 / 0) // NaN -> dividir cero entre cero no está definido

// Para COMPROBAR si un valor es NaN no se usa NaN === valor (siempre false):
console.log(NaN === NaN) // false -> comportamiento especial de NaN
// La forma correcta es Number.isNaN():
console.log(Number.isNaN(Number("hola"))) // true
console.log(Number.isNaN(42)) // false

// parseInt() lee un número ENTERO desde el principio de un texto.
// parseFloat() lee un número DECIMAL desde el principio de un texto.
console.log(parseInt("42 años")) // 42  -> lee el número aunque luego haya texto
console.log(parseInt("3.99")) // 3    -> parseInt() trunca el decimal, no redondea
console.log(parseFloat("3.99")) // 3.99
console.log(Number("42 años")) // NaN -> Number() no tolera texto: lo rechaza entero

/*
 4. == VS ===: POR QUÉ SE PREFIERE LA COMPARACIÓN ESTRICTA
 - == (igualdad débil) compara VALORES y, si los tipos difieren, CONVIERTE
   uno de ellos antes de comparar. Es fuente de sorpresas.
 - === (igualdad estricta) compara VALOR Y TIPO sin convertir nada. Es más
   predecible y es la que se recomienda en este curso.
 */

console.log("--- 4. == frente a === ---")

console.log(0 == false) // true  -> == convierte false a 0
console.log(0 === false) // false -> tipos distintos: number vs boolean
console.log("" == 0) // true  -> "" se convierte a 0
console.log("" === 0) // false
console.log(5 == "5") // true  -> "5" se convierte a número
console.log(5 === "5") // false -> number frente a string

// La regla práctica de este curso: usa === (y !==) siempre.
// La comparación débil == solo se menciona para que puedas RECONOCER
// su comportamiento y evitarla, no para fomentar su uso.

/*
 5. PRECEDENCIA DE OPERADORES
 La precedencia decide QUÉ operación se calcula antes, igual que en
 matemáticas. Lo esencial: existe, y si no estás seguro, usa paréntesis.
 (La lista completa de precedencias está en la documentación de MDN;
 este curso solo muestra el comportamiento básico.)
 */

console.log("--- 5. Precedencia de operadores ---")

console.log(2 + 3 * 4) // 14 -> la multiplicación se hace antes que la suma
console.log((2 + 3) * 4) // 20 -> los paréntesis cambian el orden
console.log(10 - 2 - 3) // 5  -> con la misma precedencia va de izquierda a derecha

// Con operadores lógicos la precedencia importa mucho:
// El operador de desigualdad (>) se evalúa antes que &&, y && antes que ||.
console.log(5 > 3 && 2 > 1 || 0 > 1) // true  -> (5 > 3 && 2 > 1) || (0 > 1)
console.log(0 > 1 || 5 > 3 && 2 > 1) // true  -> el orden visual no cambia el cálculo

/*
 ERRORES FRECUENTES
 1. Comparar con == por costumbre:
      if (numero == "5") {...}  // se convierte y entra, aunque los tipos difieran
    Preferible: if (numero === 5) {...}
 2. Esperar que Number("42 años") funcione como parseInt(): NaN
 3. Usar NaN === NaN para comprobar NaN: siempre false. Usa Number.isNaN().
 4. Confundir parseInt("3.99") con 3.99: parseInt() trunca y devuelve 3.
 5. Mezclar textos y números con + sin esperarlo: "5" + 2 es "52", no 7.
*/

/*
 EJERCICIOS GRADUADOS
 (Enunciados primero; las soluciones razonadas están más abajo.)

 EJERCICIO 1 (reproducir)
 Escribe una instrucción que convierta el texto "2024" en el número 2024
 y otra que convierta el número 2024 en el texto "2024".

 EJERCICIO 2 (comprender)
 Sin ejecutar, escribe el resultado de cada expresión y justifícalo:
   a) Number("3.14")
   b) Boolean("false")      // ojo: es un texto, no el booleano false
   c) "8" * 2
   d) 0 === false

 EJERCICIO 3 (aplicar)
 Escribe una función que reciba un valor y devuelva su tipo después de
 intentar convertirlo a número con Number(). Prueba a mano, en la terminal,
 qué devuelve con Number("25") y con Number("veinticinco").
*/

/*
 SOLUCIONES
 (Intenta los ejercicios antes de mirar este apartado.)

 EJERCICIO 1
   let anio = Number("2024")   // 2024 (number)
   let anioTexto = String(2024) // "2024" (string)

 EJERCICIO 2
   a) 3.14    -> Number() convierte el texto decimal al número equivalente.
   b) true    -> "false" es un TEXTO no vacío; todo texto no vacío da true.
   c) 16      -> el operador * no concatena textos; convierte "8" a 8 y multiplica.
   d) false   -> === exige el mismo tipo; 0 es number y false es boolean.

 EJERCICIO 3
   function tipoDeNumber(valor) {
     let convertido = Number(valor)
     if (Number.isNaN(convertido)) {
       return "No es un número válido: NaN (tipo: " + typeof convertido + ")"
     }
     return "Número: " + convertido + " (tipo: " + typeof convertido + ")"
   }
   - tipoDeNumber("25")        -> "Número: 25 (tipo: number)"
   - tipoDeNumber("veinticinco") -> "No es un número válido: NaN (tipo: number)"
   La comprobación Number.isNaN() es imprescindible: NaN no se puede comparar
   con NaN === NaN.
*/

/*
 RESUMEN Y AUTOEVALUACIÓN
 Resumen: Number(), String() y Boolean() convierten de forma explícita;
 la coerción convierte de forma automática y puede sorprender (sobre todo
 con el operador +); NaN representa un fallo numérico y se comprueba con
 Number.isNaN(); parseInt/parseFloat leen números desde el principio de un
 texto; === compara valor Y tipo y es la comparación recomendada; los
 paréntesis aclaran la precedencia.

 Autoevaluación: tras esta lección deberías poder...
 [ ] Convertir un valor con Number(), String() y Boolean()
 [ ] Anticipar cuándo aparece NaN y comprobarlo correctamente
 [ ] Explicar por qué "5" + 2 da "52" y 5 - "2" da 3
 [ ] Justificar la preferencia por === frente a ==
 [ ] Predecir el resultado de (2 + 3) * 4 frente a 2 + 3 * 4

 RETO OPCIONAL
 (Concepto aún no obligatorio: operadores de cortocircuito, lección 35.)
 Explica con tus palabras este resultado:
   console.log("" || "valor por defecto") // "valor por defecto"
 No hace falta que lo escribas en código: basta con que razones la salida.
*/