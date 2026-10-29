/*
 ============================================================================
 LECCIÓN 45 - Buenas prácticas: escribir código que se entienda
 ============================================================================

 OBJETIVOS DE APRENDIZAJE
 - Explicar por qué el código se lee más veces de las que se escribe.
 - Elegir nombres claros para variables y funciones.
 - Decidir entre const y let (y por qué const es el valor por defecto).
 - Dividir el código en funciones pequeñas con una sola responsabilidad.
 - Evitar la duplicación extrayendo lo que se repite.
 - Validar entradas y tratar los errores sin tragarlos.
 - Escribir comentarios que expliquen el PORQUÉ, no lo que ya se ve.
 - Usar técnicas de depuración sencillas (mensajes de error, console.log).

 PRERREQUISITOS
 - Todo el curso hasta aquí es útil; esta lección repasa ejemplos de las
   lecciones 33, 34, 35, 40 y 41 con la mirada puesta en la LECTURA.

 ============================================================================
 1. NOMBRES CLAROS: QUE EL CÓDIGO SE LEA SOLO
 ============================================================================
 El código se escribe una vez y se lee muchas. Un buen nombre describe
 el CONTENIDO de la variable o la MISIÓN de la función.

 ANTES (qué es esto?):
   let x = a * 1.21
 DESPUÉS (se explica solo):
   let precioConIva = precioBase * 1.21

 ANTES (función críptica):
   function f(n) { return n.length }
 DESPUÉS (nombre con intención):
   function contarTareas(lista) { return lista.length }

 Reglas sencillas:
 - Variables: en minúscula con palabras unidas (camelCase): precioUnitario.
 - Funciones: verbo + objeto: calcularTotal, mostrarError, anadirTarea.
 - Constantes de valor fijo conocido: MAYÚSCULAS: IVA = 0.21.
 - Nombres cortos NO son mejores: cantidadDeItems dice más que n.
 */

console.log("--- 1. Nombres claros ---")

let precioBase = 100
let precioConIva = precioBase * 1.21
console.log("Precio con IVA:", precioConIva) // 121

function contarTareas(lista) {
    return lista.length
}
console.log("Tareas en la lista:", contarTareas(["a", "b", "c"])) // 3

/*
 2. const Y let: POR QUÉ CONST ES EL VALOR POR DEFECTO
 - const: la variable no se REASIGNA (no puede cambiar de "caja").
 - let: permite reasignarla cuando de verdad hace falta.
 Si usas const por defecto, el código comunica "aquí no cambia nada" y
 es más fácil razonar sobre él. Cuando necesites incrementar o
 sobreescribir, cambia a let con consciencia.
 ANTES (¿hará falta reasignarla?):
   let resultado = 0
   resultado = 2 + 3
 DESPUÉS (constante, se lee a la primera):
   const resultado = 2 + 3
 Solo necesitas let cuando la variable CAMBIA DE VALOR a lo largo del
 flujo: contadores, acumuladores, valores que mutan en un bucle.
 */

console.log("--- 2. const frente a let ---")

const sumaFija = 2 + 3 // si no se reasigna, const
console.log("Suma:", sumaFija)

let acumulador = 0 // esta SÍ se reasigna varias veces: let es correcto
for (let i = 1; i <= 3; i++) {
    acumulador += i
}
console.log("Acumulador:", acumulador) // 6

/*
 3. FUNCIONES PEQUEÑAS CON UNA SOLA MISIÓN
 Una función debe hacer UNA cosa y dejarla clara en su nombre. Si una
 función mezcla validar + calcular + mostrar, se hace difícil de probar
 y de leer. Dividir en piezas pequeñas las hace reutilizables.

 ANTES (tres misiones mezcladas):
   function procesar(texto) {
     let limpio = texto.trim().toLowerCase()
     if (limpio === "") {
       console.log("Entrada vacía")
       return null
     }
     let mayusculas = limpio.toUpperCase()
     console.log(mayusculas)
     return mayusculas
   }

 DESPUÉS (cada pieza hace una sola cosa):
 */

console.log("--- 3. Funciones con una sola misión ---")

function limpiarTexto(texto) {
    return texto.trim().toLowerCase()
}

function esVacio(texto) {
    return texto === ""
}

function mostrarEnMayusculas(texto) {
    let enMayusculas = texto.toUpperCase()
    console.log("En mayúsculas:", enMayusculas)
    return enMayusculas
}

function procesar(texto) {
    let limpio = limpiarTexto(texto)
    if (esVacio(limpio)) {
        console.log("Entrada rechazada: vacía")
        return null
    }
    return mostrarEnMayusculas(limpio)
}

procesar("  hola  ") // limpiar -> validar -> mostrar: cada paso en su sitio
procesar("   ")      // la validación corta la cadena

/*
 4. EVITAR LA DUPLICACIÓN: EXTRAE LO QUE SE REPITE
 Si el mismo bloque aparece dos veces, la próxima corrección hay que
 hacerla en ambos sitios... y siempre se olvida un sitio. La regla es
 extraer lo repetido a una función y llamarla.

 ANTES (validación copiada dos veces):
   function anadirA(nombre, lista) {
     if (nombre.trim() === "") return
     lista.push(nombre)
   }
   function anadirB(apellido, lista) {
     if (apellido.trim() === "") return
     lista.push(apellido)
   }

 DESPUÉS (una sola validación, dos usos):
 */

console.log("--- 4. Sin duplicación ---")

function anadirSiValido(texto, lista) {
    if (texto.trim() === "") {
        console.log("Texto vacío ignorado")
        return
    }
    lista.push(texto.trim())
}

let nombres = []
let apellidos = []
anadirSiValido("Ana", nombres)
anadirSiValido("", apellidos) // no entra: queda vacía
anadirSiValido("López", apellidos)
console.log("Nombres:", nombres)      // [ 'Ana' ]
console.log("Apellidos:", apellidos)  // [ 'López' ]

/*
 5. VALIDAR ENTRADAS Y TRATAR ERRORES SIN TRAGARLOS
 Dato que entra desde fuera (teclado, archivo, red, otra función) debe
 VALIDARSE antes de usarse. Y cuando algo falla, hay que REGISTRARLO o
 reaccionar: un catch vacío silencia el problema y luego es imposible
 saber qué pasó (visto en la lección 41).

 ANTES (dividir sin validar la entrada):
   function mitad(n) { return n / 2 }
 DESPUÉS (validamos el tipo y registramos el caso raro):
 */

console.log("--- 5. Validar entradas y errores ---")

function mitad(n) {
    if (typeof n !== "number") {
        console.log("Error: mitad() esperaba un número, recibió:", n,
            "de tipo", typeof n)
        return null
    }
    // Ojo: typeof null === "object" y typeof undefined === "undefined",
    // así que ambos valores ya quedaron descartados por la comprobación
    // anterior (typeof n !== "number").
    return n / 2
}

console.log("mitad(8):", mitad(8))
console.log("mitad('8'):", mitad("8")) // no es número: lo registramos y salimos

/*
 6. COMENTARIOS: EXPLICAR EL PORQUÉ, NO LO QUE YA SE VE
 Un comentario que repite el código no aporta nada:
   // sumamos 1 al contador
   contador += 1
 Un comentario útil explica algo que NO se ve a simple vista: el PORQUÉ
 de una decisión, una advertencia, el contexto de un valor raro.
 ANTES:
   // multiplicamos por 1.21
   let total = base * 1.21
 DESPUÉS (explica la decisión de negocio, no la operación):
   // IVA español (21%) aplicado a productos de este catálogo
   let total = base * 1.21
 También son buenos comentarios los que marcan la intención en bloques
 largos: "--- Validación de entrada ---" antes de las líneas siguientes.
 */

console.log("--- 6. Comentarios (ver el código, no la consola) ---")

/*
 7. DEPURACIÓN SENCILLA
 Cuando algo no funciona:
 1. Lee el MENSAJE DE ERROR completo: dice archivo, línea y causa. No es
    un castigo: es la pista principal.
 2. Divide el problema: el error está en la entrada, en el cálculo o en
    la salida? Comprueba una parte por separado.
 3. console.log estratégico: muestra el valor REAL de las variables en
    los puntos clave ("antes de X, entrada es..."). No es "ruido", es
    evidencia. En el navegador, la consola también sirve y se borran
    los logs con los que ya no trabajamos.
 4. Tras corregir, vuelve a comprobar el caso que fallaba Y el que
    funcionaba (las correcciones rompen otras cosas, y hay que verlo).
 */

console.log("--- 7. Depuración (método, no magia) ---")

function calcularEdad(anioNacimiento, anioActual) {
    // "console.log de evidencia": muestra las entradas antes de operar
    console.log("Entradas recibidas:", anioNacimiento, anioActual)
    let diferencia = anioActual - anioNacimiento
    if (diferencia < 0) {
        console.log("Dato imposible: la edad no puede ser negativa")
        return null
    }
    return diferencia
}

console.log("Edad:", calcularEdad(1990, 2026))

/*
 ERRORES FRECUENTES
 1. Nombres sin significado (x, y, dato, cosa): el lector tiene que
    adivinar el contenido; en dos semanas serás tú, y adivinarás mal.
 2. let en todo: comunica que todo cambia; const hace evidente qué no.
 3. Funciones gigantes: mezclan validación + cálculo + impresión; son
    difíciles de probar y de reutilizar.
 4. Copiar y pegar bloques: cada copia es un punto futuro de error al
    corregir en un solo sitio.
 5. catch vacío (o comentado con "no pasa nada"): los errores silenciados
    son los más caros de encontrar.
 6. Comentarios redundantes: narran el "cómo" en vez del "porqué".
 7. Buscar el fallo a ojo sin leer el error ni imprimir valores: la
    depuración adivinatoria tarda más.
 */

/*
 EJERCICIOS GRADUADOS

 EJERCICIO 1 (reproducir)
 Refactoriza este fragmento para que use const, nombres claros y
 funciones con una sola misión. Ejecútalo para comprobar que la salida
 no cambia:
   let g = 5
   function area(r) { return 3.14159 * r * r }
   console.log(area(g))

 EJERCICIO 2 (comprender)
 Explica con tus palabras:
  a) ¿Por qué se usa const por defecto y cuándo es correcto usar let?
  b) ¿Qué hace exactamente reducir la duplicación con una función?
  c) ¿Por qué un catch vacío es una mala práctica?

 EJERCICIO 3 (aplicar)
 El siguiente bloque está duplicado y con nombres pobres. Escríbelo de
 nuevo con una única función reutilizable y nombres claros:
   let s1 = "HOLA"
   console.log(s1.toLowerCase())
   let s2 = "MUNDO"
   console.log(s2.toLowerCase())
*/

/*
 SOLUCIONES

 EJERCICIO 1
   const radio = 5
   const PI = 3.14159
   function calcularAreaCirculo(r) {
     return PI * r * r
   }
   console.log(calcularAreaCirculo(radio)) // 78.53975

 EJERCICIO 2
  a) const comunica que el valor no se reasigna, lo que facilita razonar
     sobre el código. let es correcto cuando la variable cambia de valor
     a propósito (contadores, acumuladores).
  b) Elimina la copia: la corrección se hace en un único lugar y todos
     los usos se benefician a la vez.
  c) Un catch vacío oculta el error: el programa sigue como si nada y el
     fallo reaparece "sin motivo" en otro punto, mucho más difícil de
     encontrar.

 EJERCICIO 3
   function mostrarEnMinusculas(texto) {
     console.log(texto.toLowerCase())
   }
   mostrarEnMinusculas("HOLA")  // hola
   mostrarEnMinusculas("MUNDO") // mundo
   La duplicación desaparece: las dos llamadas comparten la misma
   función, y si mañana queremos recortar espacios, solo hay que tocar
   un sitio.
*/

/*
 RESUMEN Y AUTOEVALUACIÓN
 Resumen: el código se lee más de lo que se escribe, así que se escribe
 para quien lo lea. Nombres claros (verbo+objeto en funciones, camelCase
 en variables), const por defecto y let solo cuando toca, funciones
 pequeñas de una sola misión, duplicación extraída a funciones,
 entradas validadas, errores registrados (nunca tragados), comentarios
 que explican el PORQUÉ y depuración metódica: leer el error, dividir el
 problema y usar console.log como evidencia.

 Autoevaluación: tras esta lección deberías poder...
 [ ] Elegir nombres que expliquen variables y funciones
 [ ] Decidir entre const y let con criterio
 [ ] Dividir código en funciones de una sola misión
 [ ] Eliminar duplicación extrayendo funciones
 [ ] Validar entradas y registrar errores sin tragarlos
 [ ] Escribir comentarios útiles (el porqué) y depurar con método

 RETO OPCIONAL
 Vuelve a la lección 42 y revisa la función obtenerUsuario: ¿cuántas
 "misiones" tiene? Propón una división en funciones más pequeñas
 (por ejemplo: comprobarRespuesta(respuesta) y validarDatos(datos)) y
 reescribe la función usando esas piezas.
 */