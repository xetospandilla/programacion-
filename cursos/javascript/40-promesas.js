/*
 ============================================================================
 LECCIÓN 40 - Promesas
 ============================================================================

 OBJETIVOS DE APRENDIZAJE
 - Explicar qué problema resuelven las promesas.
 - Nombrar los tres estados de una promesa y qué significan.
 - Crear una promesa con new Promise() y usar resolve y reject.
 - Encadenar con .then(), tratar errores con .catch() y ejecutar limpieza
   con .finally().
 - Explicar cómo se propagan los errores por la cadena.
 - Distinguir devolver un valor desde .then() de devolver una promesa.
 - Comparar callbacks y promesas sin descalificar a los primeros.

 PRERREQUISITOS
 - Lección 16 (funciones y arrow).
 - Lección 39 (callbacks y temporizadores).

 ============================================================================
 1. ¿QUÉ PROBLEMA RESUELVEN LAS PROMESAS?
 ============================================================================

 Con callbacks (lección 39) puedes pedir una acción para "más tarde",
 pero cuando hay varios pasos dependientes, se anidan y el código se
 vuelve difícil de leer.

 Las PROMESAS (Promises) son un mecanismo del lenguaje que representa un
 RESULTADO FUTURO: una operación que puede tardar y que terminará bien
 (cumplida) o mal (rechazada). Con ellas se escriben cadenas de pasos
 más legibles y se centraliza el tratamiento de errores.

 Definición de trabajo: una promesa es un OBJETO que "sabrá" más adelante
 si una operación tuvo éxito o falló, y permite reaccionar a ese
 resultado sin bloquear el programa.

 ============================================================================
 2. ESTADOS DE UNA PROMESA
 ============================================================================

 Toda promesa está siempre en uno de estos tres estados:
 1. PENDIENTE (pending): la operación aún no ha terminado.
 2. CUMPLIDA (fulfilled): terminó con éxito y tiene un valor.
 3. RECHAZADA (rejected): falló y tiene un motivo (razón del error).
 Una vez cumplida o rechazada, la promesa queda en ese estado: el cambio
 ocurre una sola vez.
 */

console.log("--- 1. Estados de una promesa ---")

let promesaPendiente = new Promise(() => { }) // nunca se resuelve
console.log("Estado actual:", promesaPendiente) // <pending>

// (La promesa pendiente de arriba no hace nada y no bloquea el proceso;
//  simplemente queda sin resolver y no tiene callbacks que la esperen.)

/*
 3. CREAR UNA PROMESA: new Promise() CON resolve Y reject
 new Promise(functor) recibe una función con DOS parámetros:
   resolve -> debes llamarla con el VALOR cuando la operación termina bien
   reject  -> debes llamarla con el MOTIVO cuando falla
 Solo con llamar a resolve o reject la promesa pasa de pendiente a un
 estado final.
 Nótese que el nombre "reject" se escribe igual que "return"; no es un
 return del programa, es una llamada que resuelve el estado.
 */

console.log("--- 2. Crear una promesa ---")

let promesa = new Promise((resolve, reject) => {
    let operacionCorrecta = true
    if (operacionCorrecta) {
        resolve("¡Éxito! El dato está listo.") // estado -> cumplida con valor
    } else {
        reject("Algo salió mal") // estado -> rechazada con motivo
    }
})

// Ver el estado de una promesa recién cumplida:
console.log(promesa) // <fulfilled> con el valor (los entornos lo muestran distinto)

/*
 4. REACCIONAR: .then(), .catch(), .finally()
 - .then(callback): se ejecuta cuando la promesa se CUMPLE. Recibe el valor.
 - .catch(callback): se ejecuta cuando la promesa se RECHAZA. Recibe el motivo.
 - .finally(callback): se ejecuta SIEMPRE, al final, tanto si cumplió como
   si falló. Sirve para limpieza ("pase lo que pase, luego..."), no recibe
   el valor ni el motivo.
 Cada uno de estos métodos devuelve OTRA promesa, por eso se pueden
 encadenar: promesa.then(...).catch(...).finally(...)
 */

console.log("--- 3. then, catch y finally ---")

function operacion(exitosa) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { // pequeño retardo para simular trabajo real
            if (exitosa) {
                resolve({ id: 1, nombre: "Ana" })
            } else {
                reject("Fallo en la base de datos")
            }
        }, 30)
    })
}

operacion(true)
    .then((dato) => {
        console.log("Recibí:", dato)
    })
    .catch((motivo) => {
        console.log("Error:", motivo)
    })
    .finally(() => {
        console.log("Operación terminada (siempre se muestra)")
    })

// Y la versión fallida:
operacion(false)
    .then((dato) => {
        console.log("Esto no se imprime en el caso fallido")
    })
    .catch((motivo) => {
        console.log("Error capturado:", motivo)
    })

/*
 5. CÓMO SE PROPAGAN LOS ERRORES EN LA CADENA
 Si cualquier .then() de la cadena lanza un error (o devuelve una promesa
 rechazada), la ejecución salta DIRECTAMENTE al siguiente .catch() que
 encuentre, saltándose los .then() posteriores. O sea: el error viaja por
 la cadena hasta llegar a un .catch().
 */

console.log("--- 4. Propagación de errores ---")

Promise.resolve(5)
    .then((n) => {
        console.log("Primero:", n) // 5
        throw new Error("Error justo aquí") // lanza un error en el .then
    })
    .then(() => {
        console.log("No se ejecuta: saltamos este paso")
    })
    .catch((error) => {
        console.log("Caído en el catch:", error.message) // Error justo aquí
    })

/*
 6. DEVOLVER UN VALOR O DEVOLVER UNA PROMESA DESDE .then()
 - Devolver un VALOR desde .then(): la cadena lo envuelve automáticamente
   en una promesa cumplida y lo entrega al siguiente .then().
 - Devolver una PROMESA desde .then(): la cadena ESPERA a que esa promesa
   se resuelva y entrega SU valor al siguiente paso.
 Así se encadenan operaciones asíncronas de forma natural.
 */

console.log("--- 5. Devolver valor frente a devolver promesa ---")

Promise.resolve(2)
    .then((n) => {
        // Devolvemos un VALOR: se envuelve en promesa cumplida
        return n * 3
    })
    .then((n) => {
        // Devolvemos una PROMESA: la cadena espera su resolución
        return new Promise((resolve) => {
            setTimeout(() => resolve(n + 1), 20)
        })
    })
    .then((n) => {
        console.log("Resultado final:", n) // 7  (2*3 = 6, luego +1)
    })

/*
 7. CALLBACKS FRENTE A PROMESAS
 - Callbacks: el flujo se escribe anidando funciones; el error se trata
   en cada paso (o se pierde).
 - Promesas: el flujo se escribe en cadena vertical; el error se centraliza
   en un solo .catch().
 No son "buenos contra malos": los callbacks siguen siendo la base de
 muchos APIs, y las promesas son una evolución para leerlos mejor.
 La lección 41 (async/await) hará todavía más legible este mismo flujo.
 */

/*
 ERRORES FRECUENTES
 1. Olvidar llamar a resolve()/reject(): la promesa queda PENDIENTE
    para siempre y la cadena nunca continúa.
 2. Llamar a reject() después de resolve(): la primera llamada gana; la
    segunda se ignora.
 3. No devolver la promesa en un .then(): encadenar .then(error => {})
    sin return rompe la cadena y el siguiente paso recibe undefined.
 4. Poner .catch() solo al final pero lanzar errores en .finally():
    .finally no tiene catch propio; si lanza, el error sigue viajando.
 5. Confundir "throw" con "return": en un .then(), throw salta al catch;
    return entrega valor al siguiente .then().
 */

/*
 EJERCICIOS GRADUADOS

 EJERCICIO 1 (reproducir)
 Crea una promesa que se cumpla con "Vale, promesa cumplida" tras 100 ms
 (usa setTimeout dentro y resolve) y muéstrala con .then(). Después crea
 una variante que se RECHAZE con "Promesa rechazada a propósito" y
 muéstrala con .catch().

 EJERCICIO 2 (comprender)
 ¿Qué imprime esta cadena y en qué ORDEN?
   Promise.resolve("a")
     .then((v) => { console.log(v); return "b" })
     .then((v) => { console.log(v); return Promise.resolve("c") })
     .then((v) => { console.log(v); throw new Error("fin") })
     .catch((e) => console.log("Error:", e.message))

 EJERCICIO 3 (aplicar)
 Escribe una función compararConRetraso(a, b) que devuelva una promesa
 que se cumpla con el texto "a es mayor", "b es mayor" o "son iguales"
 después de 50 ms. Pruébala con .then() en tres casos distintos.
*/

/*
 SOLUCIONES

 EJERCICIO 1
   let ok = new Promise((resolve) => {
     setTimeout(() => resolve("Vale, promesa cumplida"), 100)
   })
   ok.then((msg) => console.log(msg)) // Vale, promesa cumplida
   // La promesa no se queda pendiente: resolve() se llama dentro del timeout.

   let ko = new Promise((_, reject) => {
     setTimeout(() => reject("Promesa rechazada a propósito"), 100)
   })
   ko.catch((motivo) => console.log("Error:", motivo))
   // Error: Promesa rechazada a propósito

 EJERCICIO 2
   Imprime, en este orden: a, b, c, Error: fin
   - "a": primer then (valor inicial).
   - "b": devuelto como VALOR -> se envuelve y llega al siguiente.
   - "c": devuelto como PROMESA -> la cadena espera su resolución y
     entrega su valor.
   - throw en el tercer then -> salta al catch (los siguientes then no
     existen). El error se propaga hasta el .catch().

 EJERCICIO 3
   function compararConRetraso(a, b) {
     return new Promise((resolve) => {
       setTimeout(() => {
         if (a > b) resolve("a es mayor")
         else if (b > a) resolve("b es mayor")
         else resolve("son iguales")
       }, 50)
     })
   }
   compararConRetraso(3, 1).then((r) => console.log(r)) // a es mayor
   compararConRetraso(1, 5).then((r) => console.log(r)) // b es mayor
   compararConRetraso(4, 4).then((r) => console.log(r)) // son iguales
*/

/*
 RESUMEN Y AUTOEVALUACIÓN
 Resumen: las promesas representan un resultado futuro y evitan la
 pirámide de callbacks. Tienen tres estados (pendiente, cumplida,
 rechazada) y se crean con new Promise((resolve, reject) => ...). Se
 reacciona con .then (éxito), .catch (error) y .finally (siempre);
 los errores se propagan hasta el primer .catch; devolver un valor o una
 promesa desde .then sigue alimentando la cadena. Callbacks y promesas
 conviven: las promesas hacen más legible el mismo flujo.

 Autoevaluación: tras esta lección deberías poder...
 [ ] Explicar qué problema resuelven las promesas
 [ ] Crear una promesa y llamar a resolve/reject
 [ ] Encadenar .then().catch().finally() en orden
 [ ] Explicar qué ocurre si un .then() lanza un error
 [ ] Distinguir devolver un valor de devolver una promesa en .then()

 RETO OPCIONAL
 (Concepto aún no obligatorio: async/await, lección 41.)
 Reescribe la cadena del EJERCICIO 2 usando "promise.then().then()" pero
 imagina cómo sería si existiera una palabra clave que "esperara" cada
 resultado. Solo piensa en la lectura: con async/await verás en la
 siguiente lección que esos tres .then() se convierten en tres líneas
 casi planas.
 */