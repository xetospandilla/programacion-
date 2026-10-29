/*
 ============================================================================
 LECCIÓN 38 - JSON, fechas y Math
 ============================================================================

 OBJETIVOS DE APRENDIZAJE
 - Explicar qué es JSON y para qué se usa al intercambiar o guardar datos.
 - Distinguir un objeto de JavaScript de un texto JSON.
 - Convertir entre ambos con JSON.stringify() y JSON.parse().
 - Tratar errores de análisis de JSON con try/catch.
 - Crear fechas con Date, consultar sus partes y formatearlas
   (incluida la diferencia entre hora normal y UTC).
 - Usar las funciones habituales de Math en aplicaciones realistas.

 PRERREQUISITOS
 - Lección 02 (tipos primitivos), 07 (strings), 16 (funciones).
 - Lecciones 10-21 (arrays, objetos, desestructuración y propagación).
 - Lección 24 (manejo de errores con try/catch).
 - Lección 34 (números y Math básico: esta lección amplía su uso).

 ============================================================================
 1. JSON
 ============================================================================

 ¿QUÉ ES JSON?
 JSON (JavaScript Object Notation, "notación de objetos de JavaScript") es
 un FORMATO DE TEXTO para representar datos. Se parece mucho a un objeto
 de JavaScript, pero es un TEXTO: una cadena de caracteres que cualquier
 programa (escrito en cualquier lenguaje) puede leer.
 Se usa para intercambiar datos entre programas (por ejemplo, entre una
 página web y un servidor) o para guardarlos en un archivo.

 DIFERENCIA CLAVE:
 - Un OBJETO de JavaScript es un valor del programa, con el que se opera
   directamente (alumno.nombre).
 - Un TEXTO JSON es una cadena: no se puede acceder con el punto hasta
   convertirlo en objeto.
 */

console.log("--- 1. Qué es JSON ---")

// El objeto (valor real de JavaScript):
let alumno = {
    nombre: "Ana",
    edad: 30,
    curso: "JavaScript",
    notas: [9, 8, 10]
}

// Con typeof se ve la diferencia:
console.log(typeof alumno) // "object" -> es un objeto vivo

// Un texto JSON es una CADENA (string) que se parece a un objeto:
let textoJSON = '{"nombre": "Ana", "edad": 30, "curso": "JavaScript", "notas": [9, 8, 10]}'
console.log(typeof textoJSON) // "string" -> es texto, no objeto

// En el texto JSON las propiedades van ENTRE COMILLAS DOBLES y los valores
// admitidos son: números, textos, booleanos, null, arrays y otros objetos.

/*
 CONVERTIR OBJETO -> TEXTO JSON: JSON.stringify()
 JSON.stringify(objeto) devuelve un texto (string) con la representación
 en JSON del valor que recibe.
 */

console.log("--- 2. De objeto a texto: JSON.stringify() ---")

let textoDeAlumno = JSON.stringify(alumno)
console.log(textoDeAlumno)
// Salida (una línea): {"nombre":"Ana","edad":30,"curso":"JavaScript","notas":[9,8,10]}
// Nota: las comillas dobles del texto JSON son parte del formato; verás
// barra escapada \" solo si imprimes con console.log y entre comillas
// simples arriba. El texto en sí es exactamente el mostrado.

console.log(typeof textoDeAlumno) // "string"

// JSON.stringify() también funciona con arrays y valores simples:
console.log(JSON.stringify([1, "dos", true, null])) // [1,"dos",true,null]
console.log(JSON.stringify(42)) // 42
console.log(JSON.stringify("hola")) // "hola" (texto entre comillas dobles)

/*
 CONVERTIR TEXTO JSON -> OBJETO: JSON.parse()
 JSON.parse(texto) hace la operación inversa: recibe una cadena JSON y
 devuelve el valor correspondiente (objeto, array, número...).
 */

console.log("--- 3. De texto a objeto: JSON.parse() ---")

let alumnoRecuperado = JSON.parse(textoDeAlumno)
console.log(alumnoRecuperado.nombre) // Ana
console.log(alumnoRecuperado.notas[2]) // 10
console.log(typeof alumnoRecuperado) // "object"

// Ya se puede usar con el punto: es un objeto de nuevo.

/*
 ERRORES DE ANÁLISIS: JSON.parse() FALLA SI EL TEXTO NO ES JSON VÁLIDO
 Si el texto no cumple las reglas de JSON (comillas simples, coma final,
 texto sin comillas...), JSON.parse() LANZA UN ERROR. Se detecta con
 try/catch (lección 24).
 */

console.log("--- 4. Errores de análisis y try/catch ---")

let textoRoto = "{nombre: 'Ana'}" // sin comillas dobles: NO es JSON válido

try {
    let dato = JSON.parse(textoRoto)
    console.log("Dato:", dato)
} catch (error) {
    console.log("Error al analizar:", error.message)
    // Salida típica: Unexpected token 'n', ... is not valid JSON
}

// Con un texto correcto, la misma estructura funciona:
let textoBueno = '{"nombre": "Ana"}'
let datoBueno = JSON.parse(textoBueno) // no hay error: está fuera del try/catch pero es válido
console.log(datoBueno.nombre) // Ana

/*
 LIMITACIONES RELEVANTES DE JSON
 JSON es texto y solo representa DATOS. Por eso:
 - Las FUNCIONES no se conservan: JSON.stringify() las omite.
 - undefined se omite.
 - NaN e Infinity se escriben como null.
 - Los objetos con métodos (clases) se guardan como objeto simple.
 Saberlo evita sorpresas al "guardar y recuperar".
 */

console.log("--- 5. Limitaciones de JSON ---")

let conFuncion = {
    valor: 5,
    duplicar: function () { return this.valor * 2 },
    extra: undefined,
    raro: NaN
}
console.log(JSON.stringify(conFuncion))
// Salida esperada: {"valor":5,"raro":null}
// La función se omite (JSON no guarda código), undefined se omite y NaN
// pasa a null. El "raro" es la evidencia: no es error, es el diseño.

// Para guardar datos con lógica, se guarda el dato y la lógica se
// vuelve a definir al recuperar (por ejemplo, una función aparte).

// Ejercicio mental: ¿cómo se guardaría la función duplicar?
// Respuesta: no se guarda; se recupera en el otro extremo con su
// propia definición o con una función externa.

/*
 ERRORES FRECUENTES DE JSON
 1. Confundir el objeto con su texto: usar alumnoTexto.nombre da
    undefined, porque un string no tiene propiedades. Primero JSON.parse().
 2. Escribir un texto con comillas simples y esperar que parse() lo
    acepte: JSON exige comillas dobles.
 3. Olvidar que las funciones/undefined desaparecen con stringify() y
    creer que el código "se perdió".
 4. No proteger JSON.parse() con try/catch cuando el texto proviene de
    fuera (un formulario, un archivo, un servidor).
 */

// ============================================================================
// 2. Date (fechas)
// ============================================================================

/*
 ¿QUÉ ES Date?
 Date es una utilidad de JavaScript para trabajar con fechas y horas.
 Un OBJETO Date representa un momento concreto en el tiempo.

 ¿CÓMO SE CREA UNA FECHA?
 - new Date() -> fecha/hora ACTUALES (dependen del momento de ejecución).
 - new Date("2024-05-15T12:00:00Z") -> una fecha concreta en formato texto
   ISO (el estándar internacional). La Z final indica hora UTC.
 - En este curso usamos fechas FIJAS escritas en formato ISO para que la
   salida sea igual en cualquier equipo.

 IMPORTANTE: las fechas y horas ACTUALES cambian en cada ejecución. Este
 archivo usa fechas fijas para los ejemplos; el apartado de "ahora mismo"
 solo se muestra como curiosidad y NO tiene salida determinada.
 */

console.log("--- 6. Crear fechas ---")

let fechaFija = new Date("2024-05-15T12:00:00Z")
console.log(fechaFija.toISOString()) // 2024-05-15T12:00:00.000Z (fija)

let fechaActual = new Date()
console.log("Hora actual (NO es una salida fija):", fechaActual.toISOString())
// Esta línea imprime el instante en que se ejecuta: cambia cada vez.

/*
 CONSULTAR PARTES DE UNA FECHA
 - getFullYear()  -> año (4 dígitos)
 - getMonth()     -> mes como NÚMERO DE 0 A 11 (0 = enero, 11 = diciembre)
 - getDate()      -> día del mes (1 a 31)
 - getHours()     -> hora (0 a 23)
 - getMinutes()   -> minutos

 OJO CON getMonth(): enero es 0, no 1. Es una de las confusiones más
 comunes con Date.
 */

console.log("--- 7. Consultar partes y el problema de getMonth() ---")

console.log("Año:", fechaFija.getUTCFullYear()) // 2024
console.log("Mes (0-11):", fechaFija.getUTCMonth()) // 4  -> mayo (no 5)
console.log("Día del mes:", fechaFija.getUTCDate()) // 15
console.log("Hora:", fechaFija.getUTCHours()) // 12

// El índice de mes se explica solo:
let meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
console.log("El mes 4 corresponde a:", meses[fechaFija.getUTCMonth()]) // mayo

/*
 HORA LOCAL FRENTE A UTC
 Nuestro planeta tiene husos horarios. Una fecha absoluta es la misma para
 todo el mundo, pero su representación local cambia: en cada zona
 "la misma hora" se escribe de forma distinta.
 - Los métodos SIN "UTC" (getHours, getMonth...) devuelven el valor en la
   zona horaria del equipo donde se ejecuta.
 - Los métodos CON "UTC" (getUTCHours...) devuelven el valor en hora
   universal coordinada (UTC), la misma para todos.
 En ejemplos con salida fija se usan los métodos UTC; los métodos locales
 dependen del equipo de quien ejecuta.
 */

console.log("--- 8. Local frente a UTC ---")

let cita = new Date("2024-05-15T12:00:00Z") // 12:00 UTC
console.log("Hora en tu zona (local):", cita.getHours()) // depende del equipo
console.log("Hora UTC:", cita.getUTCHours()) // 12, siempre igual

/*
 FORMATO LEGIBLE: toISOString() Y CONSTRUCCIÓN PERSONALIZADA
 toISOString() devuelve un texto estándar con fecha y hora UTC:
   "2024-05-15T12:00:00.000Z"
 Para una lectura de persona, se suele construir el texto con las partes:
 */

console.log("--- 9. Formato legible ---")

console.log(fechaFija.toISOString()) // 2024-05-15T12:00:00.000Z (estándar)

let textoLegible =
    fechaFija.getUTCFullYear() + "-" +
    (fechaFija.getUTCMonth() + 1) + "-" + // +1 porque enero es 0
    fechaFija.getUTCDate()
console.log("Día en formato corto:", textoLegible) // 2024-5-15

/*
 ERRORES FRECUENTES DE FECHAS
 1. Leer getMonth() como 1 en enero: solo dice 0. Suma 1 para mostrarlo.
 2. Usar métodos locales si necesitas salida fija: dependen del equipo.
 3. Creer que una fecha es "un texto": es un OBJETO Date; para mostrarlo
    se usa toISOString(), o se construye texto desde sus partes.
 4. Esperar que new Date() dé una salida fija: da el instante actual.
 */

// ============================================================================
// 3. Math ampliado
// ============================================================================

/*
 REPASO (lección 34) Y NUEVOS USOS
 Lección 34: Math.round/floor/ceil redondean; Math.abs quita el signo;
 Math.min/max eligen extremos; Math.random() da un decimal entre 0 (incluido)
 y 1 (excluido).
 Aquí se muestran USOS prácticos que combinan esas herramientas con
 problemas reales, sin repetir la teoría completa.
 */

console.log("--- 10. Math aplicado: redondeos, límites y cálculos ---")

// Redondear un precio a 2 decimales (evitar 0.30000000000000004):
let total = 0.1 + 0.2
console.log("Total crudo:", total) // 0.30000000000000004
let totalRedondeado = Math.round(total * 100) / 100
console.log("Total redondeado:", totalRedondeado) // 0.3

// Límite superior al calcular páginas de un listado (por ejemplo,
// 13 elementos de 5 por página -> 3 páginas, no 2):
let elementos = 13
let porPagina = 5
let paginas = Math.ceil(elementos / porPagina)
console.log("Páginas necesarias:", paginas) // 3

// Entre min/max se acota un valor (clamp básico):
function acotar(valor, minimo, maximo) {
    return Math.min(Math.max(valor, minimo), maximo)
}
console.log(acotar(150, 0, 100)) // 100 -> 150 se reduce al máximo
console.log(acotar(-5, 0, 100)) // 0   -> -5 sube al mínimo
console.log(acotar(42, 0, 100)) // 42  -> ya estaba dentro

// Entero aleatorio inclusivo (repaso de la lección 34, ya explicado allí):
function enteroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
// No hay salida fija: valor entre min y max (ambos incluidos).
console.log("Dado (entre 1 y 6):", enteroAleatorio(1, 6))

/*
 ERRORES FRECUENTES DE MATH
 1. Confundir redondeo "al más cercano" (round) con "hacia abajo" (floor):
    para cortar decimales de precio se usa round(x*100)/100, no floor.
 2. Aplicar ceil a un cálculo exacto: si elementos/porPagina ya es entero,
    ceil no sube (Math.ceil(2.0) === 2). Solo sube cuando hay decimales.
 3. Escribir la salida de Math.random() como si fuera fija: describe el
    rango (0 <= valor < 1) o usa una fecha fija, nunca el número exacto.
 */

/*
 ERRORES FRECUENTES TRANSVERSALES DE ESTA LECCIÓN
 - Omitir try/catch al parsear JSON desde fuera (archivo, formulario, red).
 - Usar getMonth() sin sumar 1 al mostrarlo.
 - Esperar salida fija en fechas actuales o aleatorias.
 */

/*
 EJERCICIOS GRADUADOS
 (Enunciados; las soluciones razonadas están más abajo.)

 EJERCICIO 1 (reproducir)
 Crea un objeto "equipo" con nombre, ciudad y un array de 3 jugadores
 (objetos con nombre y dorsal). Conviértelo a texto JSON con stringify(),
 y después recupera el objeto original con parse() e imprime el dorsal
 del tercer jugador.

 EJERCICIO 2 (comprender)
 Sin ejecutar, responde:
   a) ¿Qué devuelve new Date("2024-12-25T00:00:00Z").getUTCMonth()?
   b) ¿Por qué JSON.stringify({ f: function () {} }) devuelve "{}"?
   c) Si elementos = 20 y porPagina = 4, ¿cuántas páginas da Math.ceil?
      ¿Y por qué no sirve aquí Math.floor?

 EJERCICIO 3 (aplicar)
 Escribe una función leerJSON(texto) que devuelva { ok: true, dato }
 si puede analizar el texto, y { ok: false, error: mensaje } si no.
 Pruébala con '{"a":1}' y con "{a:1}".
*/

/*
 SOLUCIONES

 EJERCICIO 1
   let equipo = {
     nombre: "Los Linces",
     ciudad: "Madrid",
     jugadores: [
       { nombre: "Luis", dorsal: 9 },
       { nombre: "Sara", dorsal: 7 },
       { nombre: "Iker", dorsal: 11 }
     ]
   }
   let texto = JSON.stringify(equipo)
   let copia = JSON.parse(texto)
   console.log(copia.jugadores[2].dorsal) // 11 (los arrays empiezan en 0)

 EJERCICIO 2
   a) 11 -> diciembre es el mes con índice 11 (los meses van de 0 a 11).
   b) Porque JSON representa DATOS, no código: las funciones se omiten.
      Solo queda el objeto vacío {}.
   c) Math.ceil(20/4) = Math.ceil(5) = 5 páginas. No sirve floor porque
      si un listado tiene resto (p.ej. 21 elementos -> 5.25), floor daría
      5 y la última página se perdería; ceil garantiza una página extra.

 EJERCICIO 3
   function leerJSON(texto) {
     try {
       let dato = JSON.parse(texto)
       return { ok: true, dato: dato }
     } catch (error) {
       return { ok: false, error: error.message }
     }
   }
   let r1 = leerJSON('{"a":1}')
   console.log(r1.ok, r1.dato) // true { a: 1 }
   let r2 = leerJSON("{a:1}")
   console.log(r2.ok, r2.error) // false, mensaje del error
   En el texto inválido, parse() lanza y el catch lo atrapa: el programa
   sigue sin romperse.
*/

/*
 RESUMEN Y AUTOEVALUACIÓN
 Resumen: JSON es texto para guardar/intercambiar datos; stringify() lo
 genera y parse() lo lee, lanzando un error con JSON inválido (se protege
 con try/catch). JSON no conserva funciones ni undefined (y NaN queda
 null). Date representa momentos: getMonth() va de 0 a 11, los métodos
 UTC son los de salida fija, y toISOString() da el formato estándar. Math
 añade redondeos, acotaciones y aleatoriedad con criterio (ceil para
 páginas, round para centavos, min/max para clamps).

 Autoevaluación: tras esta lección deberías poder...
 [ ] Convertir un objeto a texto JSON y volver a objeto
 [ ] Proteger JSON.parse() con try/catch cuando el texto venga de fuera
 [ ] Crear una fecha fija y consultar año, mes (0-11), día y hora
 [ ] Explicar para qué sirve getUTCHours() frente a getHours()
 [ ] Aplicar Math.round/floor/ceil/min/max en un problema real

 RETO OPCIONAL
 (Concepto aún no obligatorio: promesas y async/await, lecciones 40-41.)
 Convierte la función leerJSON del ejercicio 3 en versión "asíncrona"
 mental: ¿qué devolvería para que quien la llamase pudiera esperar el
 resultado en lugar de recibirlo al instante? No hace falta que lo
 escribas; solo piensa en quién "se entera" del resultado.
 */