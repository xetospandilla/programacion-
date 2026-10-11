/*
 ============================================================================
 LECCIÓN 39 - Callbacks y temporizadores
 ============================================================================

 OBJETIVOS DE APRENDIZAJE
 - Explicar qué es una función callback y por qué se entrega a otra función.
 - Distinguir entre pasar una función y ejecutarla al pasarla.
 - Reconocer callbacks síncronos en los métodos de arrays ya vistos.
 - Usar setTimeout(), setInterval() y sus cancelaciones clearTimeout()
   y clearInterval().
 - Explicar que un temporizador no garantiza el instante exacto de
   ejecución y que el código síncrono se ordena antes que los callbacks.
 - Describir, sin profundizar, el papel del bucle de eventos.
 - Reconocer cuándo la anidación de callbacks dificulta la lectura.

 PRERREQUISITOS
 - Lección 16 (funciones: parámetros, retorno, arrow).
 - Lección 37 (métodos de arrays: ahí ya usaste callbacks sin llamarlos así).

 ============================================================================
 1. ¿QUÉ ES UN CALLBACK?
 ============================================================================

 Un CALLBACK (función de retorno) es una FUNCIÓN que se LE ENTREGA a otra
 función para que esta la llame cuando la necesite.
 La función receptora decide CUÁNDO invocar al callback (una vez, varias
 veces, tras un tiempo...). Tú no la llamas directamente: la cedes.

 Ya has usado callbacks muchas veces sin ese nombre:
   numeros.map((n) => n * 2)
 La arrow (n) => n * 2 es un callback: map() la invoca por cada elemento.
 */

console.log("--- 1. Callback con map (repaso) ---")

let nums = [1, 2, 3]
let dobles = nums.map(function (n) {
    return n * 2
})
console.log(dobles) // [2, 4, 6]
// La función "function (n) { return n * 2 }" es el callback: map() la
// llamó 3 veces, una por elemento.

/*
 2. PASAR UNA FUNCIÓN FRENTE A EJECUTARLA
 La diferencia clave:
 - PASAR la función: se escribe SIN paréntesis -> entregas la función.
   Ejemplo: setTimeout(mostrarMensaje, 1000)  (entrega mostrarMensaje)
 - EJECUTARLA al pasarla: se escribe CON paréntesis -> la función se
   llama AHORA y entregas lo que devuelve.
   Ejemplo: setTimeout(mostrarMensaje(), 1000) (ejecuta YA, y entrega undefined)
 Esto confunde a mucha gente: recuerda "sin paréntesis se entrega, con
 paréntesis se ejecuta".
 */

console.log("--- 2. Pasar frente a ejecutar ---")

function saludar() {
    console.log("¡Hola! Soy el callback.")
}

// PASAR (sin paréntesis): entrega la función para que otro la llame.
function usarCallback(callback) {
    console.log("usarCallback está trabajando...")
    callback() // aquí SÍ se ejecuta, dentro de la receptora
}
usarCallback(saludar)

// EJECUTAR al pasar (con paréntesis) -> se ejecuta en el momento de pasar:
// usarCallback(saludar()) // llamaría a saludar() primero y entregaría undefined

/*
 3. CALLBACKS SÍNCRONOS
 Los callbacks de map, filter, reduce, forEach, sort... son SÍNCRONOS:
 se ejecutan en cuanto la función los necesita, dentro del mismo flujo,
 sin esperas. Son el caso más simple y los conoces bien.
 Salida en orden estricto, sin sorpresas.
 */

console.log("--- 3. Callbacks síncronos ---")

let nombres = ["Ana", "Luis", "Sara"]
nombres.forEach((nombre) => console.log("Nombre:", nombre))
// Salida en orden: Nombre: Ana / Nombre: Luis / Nombre: Sara

/*
 4. setTimeout(): EJECUTAR MÁS TARDE
 setTimeout(callback, esperaMs) programa el callback para que se ejecute
 DESPUÉS de al menos "esperaMs" milisegundos.
 - El primer argumento es un callback (función sin paréntesis).
 - El segundo es el tiempo de espera en milisegundos (1000 ms = 1 s).
 - Devuelve un identificador con el que puedes cancelarlo con
   clearTimeout(ids).

 IMPORTANTE: "después de al menos" no significa "exactamente a los X ms".
 El callback se pone en una cola y se ejecutará cuando el programa esté
 libre; si hay trabajo síncrono antes, la salida tarda más que X ms.
 */
console.log("--- 4. setTimeout ---")

console.log("Inicio del programa")

let idRetraso = setTimeout(() => {
    console.log("Esto salió después de ~150 ms")
}, 150)

console.log("Fin del bloque síncrono")

// Orden OBSERVABLE de la salida:
//   1. Inicio del programa
//   2. Fin del bloque síncrono
//   3. (tras ~150 ms) Esto salió después de ~150 ms
// El callback NO se ejecuta a mitad del síncrono: espera su turno.

// Cancelar un temporizador que ya no se necesita:
let idCancelado = setTimeout(() => {
    console.log("Nunca llegará a imprimirse")
}, 100)
clearTimeout(idCancelado) // se cancela antes de que venza

console.log("Se canceló un temporizador con clearTimeout")

/*
 5. setInterval(): REPETIR PERIÓDICAMENTE
 setInterval(callback, intervaloMs) ejecuta el callback CADA ~intervalo Ms,
 una y otra vez, hasta que se cancela con clearInterval(id).

 PARA EVITAR BUCLES INFINITOS: este curso SIEMPRE cancela sus intervalos.
 El ejemplo de abajo cuenta 3 veces y se detiene solo.
 */
console.log("--- 5. setInterval y clearInterval ---")

let contador = 0
let idIntervalo = setInterval(() => {
    contador++
    console.log("Tic número", contador)
    if (contador === 3) {
        clearInterval(idIntervalo) // nos detenemos nosotros mismos
        console.log("Intervalo detenido")
    }
}, 100)

// Salida esperada (en orden temporal, cada línea separada ~100 ms):
//   Tic número 1
//   Tic número 2
//   Tic número 3
//   Intervalo detenido
// Como el intervalo se cancela, el proceso de Node termina solo.
// OJO: en este mismo archivo hay OTROS temporizadores activos (apartados
// 4 y 7). El bucle de eventos intercala sus callbacks: el orden exacto de
// las líneas puede variar entre ejecuciones, pero "Tic número 1, 2, 3" y
// "Intervalo detenido" aparecen en ese orden entre sí, y todos terminan
// antes de que el proceso salga.

/*
 6. POR QUÉ NO ES EXACTO Y QUÉ ES EL BUCLE DE EVENTOS
 Node ejecuta JavaScript con UN SOLO hilo de trabajo: no hace dos cosas
 literalmente a la vez. Para gestionar "cosas que pasan más tarde"
 (temporizadores, teclado, red) usa un BUCLE DE EVENTOS:
   1. Se ejecuta todo el código síncrono normal.
   2. Cuando algo externo está listo (un temporizador vence, llega una
      respuesta), su callback se mete en una COLA.
   3. El bucle de eventos atiende la cola SOLO cuando el trabajo actual
      termina.
 POR ESO un setTimeout de 0 ms NO se ejecuta inmediatamente: entra en la
 cola y espera a que el programa síncrono acabe.
 */
console.log("--- 6. El bucle de eventos en acción ---")

console.log("A") // 1º: síncrono inmediato
setTimeout(() => console.log("B"), 0) // se programa, pero con 0 ms sigue en cola
console.log("C") // 2º: síncrono inmediato

// Orden real: A, C, B
// Aunque el timeout sea 0, "B" espera al final del trabajo síncrono.
// Si observas "A C B", has visto el bucle de eventos en acción.

/*
 7. ANIDAR CALLBACKS: CUÁNDO SE COMPLICA LA LECTURA
 Si varios callbacks dependen unos de otros, se anidan "hacia dentro".
 Es legible con 1-2 niveles, pero con más niveles aparece la llamada
 "pirámide" o "callback hell": el código crece hacia la derecha y cuesta
 seguir el orden. En la lección 40 verás promesas, una herramienta que
 aplana ese patrón.
 */
console.log("--- 7. Anidación breve (lectura difícil) ---")

setTimeout(() => {
    console.log("Paso 1 completado")
    setTimeout(() => {
        console.log("Paso 2 completado")
        setTimeout(() => {
            console.log("Paso 3 completado")
        }, 60)
    }, 60)
}, 60)

// Obsérvalo: el código se desplaza hacia la derecha una vez por nivel.
// No es un error; es un estilo que se vuelve difícil de mantener.

/*
 ERRORES FRECUENTES
 1. Pasar la función CON paréntesis: setTimeout(fn(), 100) la ejecuta al
    instante y entrega su resultado (a menudo undefined). Sin paréntesis.
 2. Creer que el tiempo es exacto: "mínimo X ms", no "X ms exactos".
 3. Crear setInterval sin clearInterval: el proceso no termina nunca.
    En este curso cada intervalo se cancela; en tu código revisa
    siempre la condición de parada.
 4. Esperar que un callback de 0 ms se ejecute primero: el síncrono manda.
 */

/*
 EJERCICIOS GRADUADOS
 (Enunciados; las soluciones razonadas están más abajo.)

 EJERCICIO 1 (reproducir)
 Escribe un setTimeout que imprima "Pasaron 200 ms" tras 200 ms.
 Después añade un console.log("Listo") justo después del setTimeout y
 predice el orden real antes de ejecutar.

 EJERCICIO 2 (comprender)
 ¿Qué imprime este código y en qué orden?
   console.log("1")
   setTimeout(() => console.log("2"), 0)
   console.log("3")
 Justifica el orden con tus palabras (bucle de eventos).

 EJERCICIO 3 (aplicar)
 Escribe un "cuenta atrás" con setInterval que imprima 3, 2, 1 y
 después "¡Despegue!" y se detenga sola. Usa clearInterval.
*/

/*
 SOLUCIONES

 EJERCICIO 1
   setTimeout(() => console.log("Pasaron 200 ms"), 200)
   console.log("Listo")
   Orden real: "Listo" primero (síncrono inmediato) y "Pasaron 200 ms"
   después. El setTimeout solo PROGRAMA; el programa sigue hacia abajo.

 EJERCICIO 2
   Imprime 1, 3 y 2, en ese orden.
   "1" y "3" son síncronos y se ejecutan al instante. El callback del
   setTimeout, aunque sea 0 ms, entra en la cola del bucle de eventos y
   se ejecuta cuando el trabajo síncrono termina.

 EJERCICIO 3
   let numero = 3
   let id = setInterval(() => {
     console.log(numero)
     numero--
     if (numero === 0) {
       clearInterval(id)
       console.log("¡Despegue!")
     }
   }, 200)
   Salida por líneas: 3, 2, 1, ¡Despegue! (cada una ~200 ms). El
   clearInterval evita que el proceso siga ejecutándose para siempre.
*/

/*
 RESUMEN Y AUTOEVALUACIÓN
 Resumen: un callback es una función que se entrega a otra para que la
 invoque; sin paréntesis al pasarla (se entrega), con paréntesis se
 ejecuta ya. Los callbacks síncronos (map, filter, forEach) corren al
 momento; setTimeout y setInterval los POSPONEN, y clearTimeout y
 clearInterval los cancelan. El bucle de eventos atiende los callbacks
 cuando el código síncrono termina, por eso un setTimeout(0) no es
 inmediato. Anidar muchos callbacks vuelve el código difícil de leer.

 Autoevaluación: tras esta lección deberías poder...
 [ ] Explicar qué es un callback y citar un uso ya visto
 [ ] Distinguir pasar una función de ejecutarla (paréntesis o no)
 [ ] Usar setTimeout y setInterval y cancelarlos
 [ ] Explicar por qué un callback de 0 ms no es el primero en salir
 [ ] Reconocer cuándo la anidación de callbacks complica el código

 RETO OPCIONAL
 (Concepto aún no obligatorio: promesas, lección 40.)
 Reescribe la "pirámide" del apartado 7 con una sola función que reciba
 el "paso" y se auto-programe con setTimeout. Solo piensa en el diseño:
 no necesitas promesas todavía, pero verás que ya se lee mejor.
 */