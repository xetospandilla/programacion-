/*
 ============================================================================
 LECCIÓN 37 - Métodos de arrays
 ============================================================================

 OBJETIVOS DE APRENDIZAJE
 - Explicar qué es un método de array y qué es una función de retorno
   (callback) en este contexto.
 - Aplicar map, filter, reduce, find, some, every y sort.
 - Indicar para cada método qué recibe, qué devuelve y si modifica el
   array original.
 - Usar sort() con números entendiendo su comportamiento por defecto.
 - Elegir el método adecuado según el problema (tabla de decisión).

 PRERREQUISITOS
 - Lección 10 (arrays: creación y métodos básicos).
 - Lección 16 (funciones y arrow functions).
 - Lección 18 (objetos y referencia). Recomendado: lección 20 (spread).

 NOTA SOBRE LOS CALLBACKS
 Un método de array recibe una FUNCIÓN DE RETORNO (en inglés, callback):
 una función que se pasa como argumento y que el método llama por cada
 elemento. En este curso no se necesita asincronía para entenderlos: el
 callback se invoca en cuanto el método recorre el array, una vez por
 elemento. Las flechas (=>) que usas aquí son callbacks.
 */

console.log("--- 0. Datos de ejemplo para todas las secciones ---")

let numeros = [3, 1, 4, 1, 5, 9, 2, 6]
let precios = [12, 5, 8, 21, 7]
let nombres = ["Ana", "Luis", "Sara", "Luis"]

/*
 1. TRANSFORMAR con map()
 - Recibe: un callback que se ejecuta para cada elemento.
 - Devuelve: un NUEVO array con el resultado de cada llamada.
 - NO modifica el array original: crea una copia transformada.
 */

console.log("--- 1. map: transformar cada elemento ---")

let dobles = numeros.map(function (n) {
    return n * 2
})
console.log(dobles) // [6, 2, 8, 2, 10, 18, 4, 12]
console.log(numeros) // [3, 1, 4, 1, 5, 9, 2, 6] (original intacto)

// La versión con arrow function es la habitual:
let enTexto = numeros.map((n) => String(n))
console.log(enTexto) // ["3", "1", "4", "1", "5", "9", "2", "6"]

// El callback recibe también la posición (índice) si la necesita:
let conPosicion = numeros.map((n, indice) => n + indice)
console.log(conPosicion) // [3, 2, 6, 4, 9, 14, 8, 13]

/*
 2. FILTRAR con filter()
 - Recibe: un callback que devuelve true o false por cada elemento.
 - Devuelve: un NUEVO array solo con los elementos donde el callback
   devolvió true.
 - NO modifica el original.
 */

console.log("--- 2. filter: quedarse con los que cumplen ---")

let mayoresDeTres = numeros.filter((n) => n > 3)
console.log(mayoresDeTres) // [4, 5, 9, 6]

let nombresLargos = nombres.filter((nombre) => nombre.length > 3)
console.log(nombresLargos) // ["Luis", "Sara", "Luis"]

/*
 3. BUSCAR con find()
 - Recibe: un callback de comprobación.
 - Devuelve: el PRIMER elemento que cumple la condición, o undefined si
   ninguno la cumple.
 - NO modifica el original.
 Diferencia con filter(): find devuelve UN solo elemento; filter
 devuelve TODOS los que cumplan (un array).
 */

console.log("--- 3. find: el primer elemento que cumple ---")

let primerMayorDeCinco = numeros.find((n) => n > 5)
console.log(primerMayorDeCinco) // 9 (el primero mayor que 5)

let noExiste = numeros.find((n) => n > 100)
console.log(noExiste) // undefined

/*
 4. COMPROBAR CONDICIONES con some() y every()
 - some(): true si AL MENOS UNO cumple la condición.
 - every(): true si TODOS la cumplen.
 - Devuelven SIEMPRE un booleano. No modifican el original.
 */

console.log("--- 4. some y every ---")

console.log(numeros.some((n) => n > 8)) // true  -> hay al menos un 9
console.log(numeros.some((n) => n > 50)) // false -> ninguno pasa de 50

console.log(numeros.every((n) => n > 0)) // true  -> todos positivos
console.log(numeros.every((n) => n > 5)) // false -> hay varios más pequeños

/*
 5. ACUMULAR con reduce()
 - Recibe: un callback con dos parámetros (acumulador, elemento) y,
   opcionalmente, un VALOR INICIAL del acumulador.
 - Devuelve: un ÚNICO valor al final del recorrido.
 - No modifica el original. Es el más flexible y el más fácil de
   complicar: úsalo cuando realmente necesites "acumular".
 */

console.log("--- 5. reduce: reducir todo a un valor ---")

let suma = numeros.reduce(function (acumulador, elemento) {
    return acumulador + elemento
}, 0) // el 0 es el valor inicial del acumulador

console.log(suma) // 31 (3+1+4+1+5+9+2+6)

// Con arrow:
let sumaFlecha = numeros.reduce((acumulador, elemento) => acumulador + elemento, 0)
console.log(sumaFlecha) // 31

// La función de reducción puede devolver cualquier cosa: un texto, un
// objeto, un array... El acumulador es solo "lo que llevas hasta ahora".

/*
 6. ORDENAR con sort() — OJO CON LOS NÚMEROS
 sort() ordena UN ARRAY IN SITU: ES DECIR, MODIFICA el array original.
 - Sin comparador: convierte a texto y ordena por orden de caracteres.
   Por eso [3, 1, 4] ordenado "por defecto" NO da [1, 3, 4] si hay
   números de varias cifras: "10" va antes que "2".
 - Con comparador: la función devuelve un número; negativo -> a va antes;
   cero -> igual; positivo -> b va antes.
 */

console.log("--- 6. sort y la comparación numérica ---")

let desordenado = [10, 2, 33, 4]
console.log(desordenado.sort()) // [10, 2, 33, 4] -> ¡orden de TEXTO, no numérico!

let paraOrdenar = [10, 2, 33, 4]
let ordenado = paraOrdenar.sort((a, b) => a - b) // ascendente
console.log(ordenado) // [2, 4, 10, 33]
console.log(paraOrdenar) // [2, 4, 10, 33] -> ojo: el original también cambió

// Descendente: (a, b) => b - a
let paraDescender = [10, 2, 33, 4]
console.log(paraDescender.sort((a, b) => b - a)) // [33, 10, 4, 2]

// Para no dañar el original, se copia antes con el operador spread:
let original = [3, 1, 4]
let copia = [...original]
copia.sort((a, b) => a - b)
console.log(original) // [3, 1, 4] -> intacto
console.log(copia) // [1, 3, 4] -> copia ordenada

/*
 7. TABLA DE DECISIÓN (qué método elegir)
 | Necesito...                               | Método   |
 |-------------------------------------------|----------|
 | Un array nuevo con cada elemento cambiado | map      |
 | Un array con solo algunos elementos       | filter   |
 | El PRIMER elemento que cumpla una condición | find   |
 | Saber si al menos uno cumple              | some     |
 | Saber si todos cumplen                    | every    |
 | Reducir todo a un único valor             | reduce   |
 | Reordenar el array (modifica el original) | sort     |
 La regla general: transformar -> map; filtrar -> filter; buscar ->
 find; comprobar -> some/every; acumular -> reduce; ordenar -> sort.

 CRITERIOS PARA ELEGIR (los cuatro verbos del título):
 - TRANSFORMAR = cambiar cada elemento (map).
 - FILTRAR = quedarse con un subconjunto (filter).
 - BUSCAR = localizar un elemento concreto (find).
 - COMPROBAR = responder sí/no sobre condiciones (some, every).
 - ACUMULAR = resumir todos los datos en un valor (reduce).
 */

/*
 ERRORES FRECUENTES
 1. Usar map para filtrar: map devuelve SIEMPRE el mismo número de
    elementos; filter reduce la lista. Si solo quieres seleccionar, usa
    filter, no map.
 2. Esperar que filter devuelva "el primero":: devuelve un array con
    todos. Para el primero: find.
 3. Ordenar números sin comparador: sort() por defecto ordena textos
    (10 antes que 2). Usa (a, b) => a - b.
 4. Olvidar el valor inicial en reduce: si se omite, usa el primer
    elemento como acumulador inicial. Es más claro pasarlo siempre.
 5. Olvidar que sort() modifica el original: cópialo con spread antes.
*/

/*
 EJERCICIOS GRADUADOS

 EJERCICIO 1 (reproducir)
 Dado const edades = [4, 18, 7, 34, 21], escribe:
   a) un map que devuelva cada edad como texto (String).
   b) un filter que devuelva solo las edades de mayores de edad (>= 18).
   c) un every que indique si todas son positivas.
   d) un reduce que sume todas las edades.

 EJERCICIO 2 (comprender)
 Sin ejecutar, indica qué devuelve:
   [5, 8, 13].find((n) => n % 2 === 0)       // primer par
   [2, 4, 6].some((n) => n > 5)              // ¿alguien mayor que 5?
   [1, 2, 3].sort()                          // ¿qué orden da?
   ["a", "b", "c"].map((letra) => letra.toUpperCase())

 EJERCICIO 3 (aplicar)
 Dado el array de objetos
   const productos = [{ nombre: "libro", precio: 15 }, { nombre: "lapiz", precio: 2 }]
   a) calcula el precio total con reduce.
   b) obtén un array solo con los nombres con map.
   c) comprueba si algún producto cuesta más de 10 con some.
*/

/*
 SOLUCIONES

 EJERCICIO 1
   let edades = [4, 18, 7, 34, 21]
   let enTexto = edades.map((e) => String(e))          // ["4", "18", "7", ...]
   let mayores = edades.filter((e) => e >= 18)          // [18, 34, 21]
   let todasPositivas = edades.every((e) => e > 0)      // true
   let total = edades.reduce((acc, e) => acc + e, 0)    // 84

 EJERCICIO 2
   [5, 8, 13].find((n) => n % 2 === 0)  -> 8 (primer par; 5 y 13 no lo son)
   [2, 4, 6].some((n) => n > 5)         -> true (6 es mayor que 5)
   [1, 2, 3].sort()                     -> [1, 2, 3] (coincide aquí por casualidad:
                                            son de una cifra; "10" habría dado
                                            [1, 10, 2]...)
   ["a", "b", "c"].map(...)             -> ["A", "B", "C"]

 EJERCICIO 3
   let productos = [{ nombre: "libro", precio: 15 }, { nombre: "lapiz", precio: 2 }]
   let precioTotal = productos.reduce((acc, p) => acc + p.precio, 0) // 17
   let nombresSolo = productos.map((p) => p.nombre)                  // ["libro", "lapiz"]
   let caro = productos.some((p) => p.precio > 10)                   // true
*/

/*
 RESUMEN Y AUTOEVALUACIÓN
 Resumen: los métodos de arrays reciben un callback y lo ejecutan por
 cada elemento. map transforma y crea un array nuevo; filter selecciona
 un subconjunto; find localiza el primer elemento que cumple; some y
 every comprueban condiciones devolviendo booleano; reduce acumula todo
 en un valor; sort ordena PERO modifica el original y necesita un
 comparador para números. Elegir el método según el verbo del problema:
 transformar, filtrar, buscar, comprobar o acumular.

 Autoevaluación: tras esta lección deberías poder...
 [ ] Explicar qué recibe y qué devuelve map, filter, find, some, every,
     reduce y sort
 [ ] Decir si un método modifica o no el array original
 [ ] Elegir el método correcto según el problema (tabla de decisión)
 [ ] Ordenar números con sort() y un comparador
 [ ] Evitar los errores de map/filter y del sort() con cifras de varias
     posiciones

 RETO OPCIONAL
 (Conceptos aún no obligatorios: encadenar métodos y ternario.)
 Encadena filter() y map() para obtener el doble de los números mayores
 que 4 de [1, 5, 3, 8]. Espera el resultado [10, 16]. La cadena consiste
 en aplicar un método al resultado del anterior.
 */