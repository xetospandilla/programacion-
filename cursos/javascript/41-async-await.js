/*
 ============================================================================
 LECCIÓN 41 - async/await
 ============================================================================

 OBJETIVOS DE APRENDIZAJE
 - Explicar qué significa declarar una función `async`.
 - Indicar QUÉ devuelve siempre una función async (una promesa).
 - Usar `await` para esperar una promesa sin bloquear el programa.
 - Proteger operaciones asíncronas con try/catch.
 - Distinguir SIEMPRE entre capturar un error y silenciarlo.
 - Diferenciar ejecución secuencial de operaciones concurrentes.
 - Usar Promise.all() tras entender las promesas.

 PRERREQUISITOS
 - Lección 16 (funciones), 24 (try/catch), 40 (promesas).

 ============================================================================
 1. QUÉ ES async/await
 ============================================================================

 async/await es una FORMA DE ESCRIBIR código asíncrono (que espera
 resultados futuros) con aspecto casi igual al código síncrono (que corre
 de arriba a abajo).
 Se apoya en las promesas de la lección 40: no es un mecanismo nuevo, es
 otra forma de LEER y escribir el mismo flujo.

 2. DECLARAR UNA FUNCIÓN async
 Anteponer la palabra `async` a una función la convierte en ASÍNCRONA.
 REGLA DE ORO: una función async devuelve SIEMPRE una promesa.
 - Si devuelves un VALOR, se envuelve en una promesa cumplida.
 - Si lanzas un ERROR, se convierte en una promesa rechazada.
 */

console.log("--- 1. async y lo que devuelve ---")

async function devuelveValor() {
    return "dato listo" // se envuelve en una promesa cumplida
}

async function devuelveError() {
    throw new Error("fallo controlado") // se convierte en promesa rechazada
}

// La función devolvió una PROMESA, no el valor directamente:
const resultado = devuelveValor()
console.log(resultado instanceof Promise) // true

// Para leerlo con promesas: .then()
devuelveValor().then((v) => console.log("Con .then():", v)) // Con .then(): dato listo
devuelveError().catch((e) => console.log("Error:", e.message)) // Error: fallo controlado

/*
 3. await: ESPERAR SIN BLOQUEAR

 `await` solo puede usarse DENTRO de una función async.
 - await promesa: DETIENE esa función hasta que la promesa se resuelva
   (cumplida => devuelve su valor; rechazada => lanza el motivo como
   error dentro de la función).
 - Durante esa espera, el RESTO DEL PROGRAMA sigue disponible: no se
   congela la terminal; la función concreta queda "en pausa" hasta que
   la promesa termina, pero otras cosas pueden seguir pasando.
 */

console.log("--- 2. await: esperar una promesa ---")

function esperar(ms, valor) {
    return new Promise((resolve) => setTimeout(() => resolve(valor), ms))
}

async function ejemploEspera() {
    console.log("Pido el dato A...") // síncrono
    let datoA = await esperar(30, "dato A") // espera 30 ms, sin bloquear
    console.log("Recibido:", datoA)

    console.log("Pido el dato B...")
    let datoB = await esperar(30, "dato B")
    console.log("Recibido:", datoB)

    return datoA + " y " + datoB
}

ejemploEspera().then((texto) => console.log("Todo junto:", texto))
// Orden observable: Pido A / Recibido: dato A / Pido B / Recibido: dato B / Todo junto...

/*
 4. try/catch CON OPERACIONES ASÍNCRONAS
 Como await convierte el rechazo en una excepción, se captura con try/catch
 (lección 24): el bloque try espera, y si la promesa se rechaza, el
 control salta al catch.
 */

console.log("--- 3. try/catch asíncrono ---")

function falla(ms) {
    return new Promise((_, reject) => setTimeout(() => reject("no disponible"), ms))
}

async function ejemploConError() {
    try {
        let dato = await falla(40)
        console.log("No se imprime:", dato)
    } catch (motivo) {
        console.log("Capturado:", motivo) // Capturado: no disponible
    } finally {
        console.log("Siempre se ejecuta el finally")
    }
}

ejemploConError()

/*
 5. CAPTURAR UN ERROR NO ES SILENCIARLO
 Diferencia CRÍTICA:
 - CAPTURAR: try/catch que registra el error o reacciona (lo escribimos,
   lo mostramos, lo propagamos). El error deja de ser invisible.
 - SILENCIAR: catch vacío que ignora el motivo. El programa sigue como si
   todo hubiera ido bien, y los fallos se esconden hasta que muerden.
 La regla: un catch que no usa `motivo` al menos para registrarlo es
 señal de alarma.
 */

console.log("--- 4. Capturar frente a silenciar ---")

async function conRegistro() {
    try {
        await falla(20)
    } catch (motivo) {
        console.log("Error real registrado:", motivo) // útil: vemos qué pasó
    }
}
conRegistro()

// MALA PRÁCTICA (no la copies): reaccionar como si nada hubiera pasado
async function conSilencio() {
    try {
        await falla(20)
    } catch (motivo) {
        // no se hace nada con motivo: el error se traga
    }
    console.log("Continuo como si todo fuera bien") // engañoso
}
conSilencio()

/*
 6. SECUENCIAL FRENTE A CONCURRENTE
 Secuencial: esperamos una promesa y luego la siguiente. Más lento, pero
 cada paso usa el resultado del anterior.
 Concurrente: LANZAMOS varias promesas a la vez y esperamos todas. Más
 rápido cuando los pasos NO dependen entre sí.
 */

console.log("--- 5. Secuencial frente a concurrente ---")

async function secuencial() {
    let inicio = Date.now()
    let a = await esperar(60, "A")
    let b = await esperar(60, "B")
    let c = await esperar(60, "C")
    console.log("Secuencial:", a, b, c, "-> ms aprox:", Date.now() - inicio) // ~180
}

async function concurrente() {
    let inicio = Date.now()
    // LANZAMOS las tres promesas antes de esperar ninguna:
    let promesaA = esperar(60, "A")
    let promesaB = esperar(60, "B")
    let promesaC = esperar(60, "C")
    let a = await promesaA
    let b = await promesaB
    let c = await promesaC
    console.log("Concurrente:", a, b, c, "-> ms aprox:", Date.now() - inicio) // ~60
}

secuencial().then(() => concurrente())

/*
 7. Promise.all(): ESPERAR VARIAS PROMESAS A LA VEZ
 Promise.all([p1, p2, ...]) devuelve una promesa que:
 - se CUMPLE con un ARRAY con los resultados, en el mismo orden de entrada;
 - se RECHAZA con el primer error que aparezca (y la operación se aborta).
 Úsalo cuando necesites todos los resultados y ninguno dependa del otro.
 */

console.log("--- 6. Promise.all ---")

async function conAll() {
    let inicio = Date.now()
    let resultados = await Promise.all([
        esperar(60, "A"),
        esperar(60, "B"),
        esperar(60, "C")
    ])
    console.log("Promise.all:", resultados, "-> ms aprox:", Date.now() - inicio) // ~60
    console.log("Primer resultado:", resultados[0]) // A
}
conAll()

/*
 8. CONVERSIÓN PASO A PASO: DE .then() A async/await
 Ejemplo equivalente, primero con promesas, después con async/await.

 CON PROMESAS:
   esperar(40, 2)
     .then((n) => n * 3)                       // 2 * 3 = 6 (valor -> cadena)
     .then((n) => esperar(40, n + 1))          // 6 + 1 = 7 (promesa -> espera)
     .then((n) => console.log("Resultado:", n)) // 7
     .catch((e) => console.log("Error:", e.message))

 CON async/await (equivalente, más plano):
   async function conversion() {
     try {
       let n = await esperar(40, 2)   // espera y guarda el valor
       n = n * 3                      // multiplica (síncrono)
       n = await esperar(40, n + 1)   // vuelve a esperar, guarda el valor
       console.log("Resultado:", n)   // 7
     } catch (e) {
       console.log("Error:", e.message)
     }
   }
 */

console.log("--- 7. Conversión mostrada en vivo ---")

async function conversionEnVivo() {
    try {
        let n = await esperar(40, 2)
        n = n * 3
        n = await esperar(40, n + 1)
        console.log("Resultado:", n) // Resultado: 7
    } catch (e) {
        console.log("Error:", e.message)
    }
}
conversionEnVivo()

// Diferencia visible: con .then() el flujo va "hacia dentro y hacia la
// derecha"; con await las líneas quedan PLANAS, de arriba a abajo, y el
// try/catch envuelve todo el bloque.

/*
 ERRORES FRECUENTES
 1. Usar await fuera de una función async: da error de sintaxis.
    (En módulos modernos existe el nivel superior "top-level await",
    pero este curso lo usa siempre dentro de funciones.)
 2. Olvidar que una función async devuelve una promesa: no haces
    resultado = await fn() sin guardar en el sitio correcto.
 3. Silenciar el catch: sin registro ni reacción, el error desaparece.
 4. Lanzar operaciones concurrentes diciendo "await esperar(...)" en
    cada línea: eso es SECUENCIAL (cada await espera). Para concurrencia
    se crean las promesas primero y luego se esperan, o se usa Promise.all.
 5. Mezclar secuencial con Promise.all cuando hay dependencias: si el
    segundo paso necesita el primero, la concurrencia rompe la lógica.
 */

/*
 EJERCICIOS GRADUADOS

 EJERCICIO 1 (reproducir)
 Escribe una función async llamado usarEspera() que espere 20 ms con
 esperar() y devuelva el texto "listo". Llámala con .then() y con
 console.log y comprueba que imprimes el valor correctamente.

 EJERCICIO 2 (comprender)
 ¿Qué devuelve una función async declarada como:
   async function f() { return 10 }
 sin llamarla con await? Elige y justifica:
   a) el número 10
   b) una promesa cumplida con 10
   c) un error

 EJERCICIO 3 (aplicar)
 Crea función obtenerTodos() que use Promise.all para esperar tres
 esperar(30, "x") y devuelva el array completo. Muestra la salida con
 un .then() que imprima el array.
*/

/*
 SOLUCIONES

 EJERCICIO 1
   async function usarEspera() {
     let valor = await esperar(20, "listo")
     return valor
   }
   usarEspera().then((v) => console.log("Valor:", v)) // Valor: listo
   Si hubieras hecho console.log(usarEspera()) habrías impreso la
   promesa, no el texto: hay que esperarla o usar .then().

 EJERCICIO 2
   b) una promesa cumplida con 10.
   Toda función async devuelve SIEMPRE una promesa; el return se
   "envuelve" en ella. Para obtener el 10 hay que esperar (await) o
   encadenar .then().

 EJERCICIO 3
   async function obtenerTodos() {
     let todos = await Promise.all([
       esperar(30, "x").then(() => "A"),
       esperar(30, "x").then(() => "B"),
       esperar(30, "x").then(() => "C")
     ])
     return todos
   }
   obtenerTodos().then((resultado) => console.log(resultado)) // ['A','B','C']
   (También valía esperar(30, "A") etc.; lo importante es que Promise.all
    devuelve el array en el orden de entrada.)
*/

/*
 RESUMEN Y AUTOEVALUACIÓN
 Resumen: async convierte una función para que devuelva una promesa;
 await espera una promesa dentro de async sin bloquear el resto; los
 rechazos se capturan con try/catch; capturar no es silenciar (el catch
 debe registrar o reaccionar); secuencial = await uno a uno; concurrente =
 lanzar varias y esperar (Promise.all). La conversión .then() -> async/await
 aplana el flujo sin cambiar el comportamiento.

 Autoevaluación: tras esta lección deberías poder...
 [ ] Explicar qué devuelve una función async
 [ ] Usar await dentro de una función async correctamente
 [ ] Proteger un await con try/catch y registrar el error
 [ ] Decidir entre ejecución secuencial o concurrente según las dependencias
 [ ] Usar Promise.all() para esperar varias promesas a la vez

 RETO OPCIONAL
 (Concepto aún no obligatorio: fetch y APIs, lección 42.)
 Promise.all también admite un array con promesas de distinto tipo:
 imagina que una de ellas falla. ¿Qué crees que hace Promise.all en ese
 caso? (Respuesta en la lección 42 si lo confirmas con código.)
 */