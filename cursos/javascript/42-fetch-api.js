/*
 ============================================================================
 LECCIÓN 42 - fetch y consumo de APIs
 ============================================================================

 OBJETIVOS DE APRENDIZAJE
 - Definir API, fetch, promesa, async/await y HTTP, y relacionarlos.
 - Realizar una petición con fetch().
 - Explicar qué es response.ok y por qué fetch() no rechaza por un 404.
 - Leer el cuerpo con response.json().
 - Gestionar errores de red, estados HTTP no satisfactorios y datos
   inesperados, sin "tragarnos" los errores.

 PRERREQUISITOS
 - Lección 18 (objetos), 37 (arrays), 38 (JSON), 40 (promesas),
   41 (async/await). Útil: lección 24 (try/catch).

 ============================================================================
 1. LOS CINCO CONCEPTOS, POR SEPARADO
 ============================================================================

 API (Application Programming Interface): una "interfaz" que permite a un
 programa pedir o intercambiar datos con otro sistema. Cuando hablamos de
 "consumir una API" nos referimos a hacer una petición a un servicio y
 recibir su respuesta (normalmente en JSON).

 fetch(): una FUNCIÓN de JavaScript (API del lenguaje) disponible en
 entornos modernos: navegadores y versiones actuales de Node. Recibe una
 dirección (URL) y devuelve una promesa que representa la respuesta.

 PROMESA: concepto del lenguaje (lección 40). Representa un resultado
 futuro: aquí, la respuesta (o el error) de la red o del servidor.

 async/await: sintaxis (lección 41) para escribir código asíncrono de
 forma plana. Aquí lo usamos para esperar la respuesta del servidor.

 HTTP (HyperText Transfer Protocol): protocolo de comunicación entre
 programas a través de la red. Define PETICIONES (GET, POST...) y
 RESPUESTAS con un CÓDIGO DE ESTADO: 200 (correcto), 404 (no encontrado),
 500 (error del servidor)... Una respuesta HTTP "fallida" significa que
 LLEGÓ una respuesta con un código de error. Un ERROR DE RED es otra cosa:
 la petición ni siquiera llegó (sin conexión, dirección equivocada, etc.).

 ============================================================================
 2. CÓMO SE ESCRIBE UNA PETICIÓN CON fetch()
 ============================================================================
 fetch(url) devuelve una promesa. Con await (o .then) obtenemos un objeto
 "response" con:
 - response.ok: true si el código está entre 200-299 (correcto).
 - response.status: el código numérico (200, 404, 500...).
 - response.json(): una FUNCIÓN que devuelve OTRA promesa con el cuerpo
   ya convertido de texto JSON a objeto.
 IMPORTANTE: fetch() solo rechaza su promesa por ERROR DE RED. Si el
 servidor responde 404 o 500, la promesa se CUMPLE con un response.ok
 false. Por eso siempre hay que comprobar response.ok manualmente.
 */

console.log("--- 2. Simulación: el flujo de una petición (sin red) ---")
console.log("ESTE PRIMER EJEMPLO ES UNA SIMULACIÓN. No llama a ningún")
console.log("servidor: reproduce el mismo flujo con datos preparados.")

// función que imita la parte de fetch() que obtiene la "respuesta":
function peticionSimulada(url, datos) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // un error de red se simula con datos === null
            if (datos === null) {
                reject(new Error("Error de red simulado: no hay conexión"))
                return
            }
            // simulamos un objeto "response" con ok, status y json():
            resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(datos)
            })
        }, 30)
    })
}

async function flujoCompleto() {
    let url = "https://servidor-de-ejemplo.local/usuarios/1"
    let respuesta = await peticionSimulada(url, {
        id: 1,
        nombre: "Ana",
        curso: "JavaScript"
    })

    if (respuesta.ok) {
        let datos = await respuesta.json()
        console.log("Petición a:", url)
        console.log("Status:", respuesta.status)
        console.log("Nombre recibido:", datos.nombre) // Ana
    } else {
        console.log("HTTP no satisfactorio:", respuesta.status)
    }
}
flujoCompleto()

/*
 3. POR QUÉ response.ok Y POR QUÉ fetch() NO RECHAZA EN UN 404
 - La promesa de fetch() se CUMPLE en cuanto el servidor responde algo;
   el código de estado solo dice CÓMO respondió, no si la petición fue
   "de red correcta".
 - Un 404 llega por la red sin problemas: la red funcionó. Por eso la
   promesa se cumple (con ok false).
 - Esta simulación (abajo) reproduce exactamente ese caso para poder
   probarlo sin conexión.
 */

console.log("--- 3. Simulación: respuesta HTTP fallida (404) ---")

function respuestaSimulada(status, datos) {
    return Promise.resolve({
        ok: status >= 200 && status < 300,
        status: status,
        json: () => Promise.resolve(datos)
    })
}

async function caso404() {
    let respuesta = await respuestaSimulada(404, { mensaje: "No encontrado" })
    console.log("ok:", respuesta.ok) // false
    console.log("status:", respuesta.status) // 404
    console.log("La promesa de fetch no se habría rechazado aquí.")
}
caso404()

/*
 4. GESTIÓN DE ERRORES: DE RED, HTTP Y DATOS INESPERADOS
 Hay TRES frentes:
 a) ERROR DE RED: fetch() rechaza su promesa. Se captura con try/catch.
 b) HTTP NO SATISFACTORIO: llega respuesta, pero ok es false. Se detecta
    con un if (!respuesta.ok) y descartamos el cuerpo.
 c) DATOS INESPERADOS: el JSON se lee, pero la estructura no es la
    esperada (falta una propiedad, un array viene vacío...). Se detecta
    al validar lo que devolvió response.json().
 La regla: NO capturar el error para seguir como si nada. Cada catch
 debe registrar o reaccionar; cada if de !ok debe hacer return o lanzar.
 */

console.log("--- 4. Gestión de errores (simulación completa) ---")

// Simulamos un fetch completo controlable: url -> {status, datos}
// (mismo contrato que fetch en Node, pero sin red)
function fetchSimulado(status, datos) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (status === "red") {
                reject(new Error("Error de red"))
                return
            }
            resolve({
                ok: status >= 200 && status < 300,
                status: status,
                json: () => Promise.resolve(datos)
            })
        }, 20)
    })
}

async function obtenerUsuario(url) {
    try {
        let respuesta = await fetchSimulado(url.status, url.datos)

        if (!respuesta.ok) {
            // HTTP fallido: no intentamos leer como si fuera correcto
            throw new Error("HTTP " + respuesta.status + " para " + url.nombre)
        }

        let datos = await respuesta.json()

        // validación de datos inesperados (estructura mínima esperada):
        if (typeof datos.nombre !== "string") {
            throw new Error("Datos inesperados: falta la propiedad nombre")
        }

        return datos
    } catch (error) {
        // capturamos Y registramos: nunca "tragamos" el error
        console.log("Error en la petición:", error.message)
        return null
    }
}

// Tres escenarios controlados:
async function probarEscenarios() {
    let ok = await obtenerUsuario({ nombre: "usuario-ok", status: 200, datos: { id: 1, nombre: "Ana" } })
    console.log("Caso OK -> nombre:", ok ? ok.nombre : "nulo")

    let noEncontrado = await obtenerUsuario({ nombre: "usuario-404", status: 404, datos: { mensaje: "No existe" } })
    console.log("Caso 404 -> devolvió:", noEncontrado)

    let sinRed = await obtenerUsuario({ nombre: "usuario-red", status: "red", datos: null })
    console.log("Caso red -> devolvió:", sinRed)

    let datosRaros = await obtenerUsuario({ nombre: "usuario-raro", status: 200, datos: { id: 9 } })
    console.log("Caso datos raros -> devolvió:", datosRaros)
}
probarEscenarios()

/*
 5. CÓMO MOSTRAR LOS DATOS DE FORMA LEGIBLE
 Una vez validados, lo habitual es recorrerlos y mostrarlos formateados.
 */

console.log("--- 5. Mostrar datos legibles (local) ---")

let listaSimulada = {
    usuarios: [
        { id: 1, nombre: "Ana", rol: "profesora" },
        { id: 2, nombre: "Luis", rol: "alumno" },
        { id: 3, nombre: "Sara", rol: "alumna" }
    ]
}

async function mostrarLista() {
    let datos = await Promise.resolve(listaSimulada) // simulamos el JSON
    console.log("Total de usuarios:", datos.usuarios.length)
    datos.usuarios.forEach((u) => {
        console.log(" -", u.nombre, "(" + u.rol + ")")
    })
}
mostrarLista()

/*
 6. EJEMPLO OPCIONAL CON INTERNET (NO SE EJECUTA EN ESTA VALIDACIÓN)

 El siguiente bloque hace una petición REAL a una API pública
 (JSONPlaceholder, https://jsonplaceholder.typicode.com).

 - NECESITA conexión a Internet.
 - El servicio puede dejar de estar disponible o cambiar con el tiempo.
 - NO se ejecuta automáticamente en este curso: la comprobación local
   del material es SIN red.

 Para ejecutarlo, descomenta el bloque de abajo y lanza:
   node 42-fetch-api.js

 async function peticionReal() {
   try {
     let respuesta = await fetch("https://jsonplaceholder.typicode.com/users/1")
     if (!respuesta.ok) {
       throw new Error("HTTP " + respuesta.status)
     }
     let usuario = await respuesta.json()
     console.log("Usuario real:", usuario.name, "-", usuario.email)
   } catch (error) {
     console.log("No se pudo completar la petición real:", error.message)
   }
 }
 // peticionReal()   <- descomenta esta línea para probarla con Internet
 */

/*
 ERRORES FRECUENTES
 1. No comprobar response.ok: un 404 se trata como éxito y luego
    response.json() puede fallar o dar datos vacíos.
 2. Creer que fetch() rechaza por un 404: solo rechaza por ERROR DE RED.
 3. Silenciar el catch sin registrarlo: el programa sigue "como si nada"
    y el fallo queda invisible (lección 41, apartado 5).
 4. Hacer doble .json(): response.json() se puede llamar solo una vez;
    la segunda llamada lanza.
 5. Asumir la estructura de los datos sin validarla: una API puede
    devolver algo distinto de lo esperado sin que la red falle.
 6. Olvidar await: sin await obtienes la promesa (o response sin leer),
    no el valor final. La salida se llena de "Promise { <pending> }".
 */

/*
 EJERCICIOS GRADUADOS

 EJERCICIO 1 (reproducir)
 Usa respuestaSimulada(200, { saludo: "hola" }) y escribe una función
 async que compruebe response.ok y muestre datos.saludo. Pruébala.

 EJERCICIO 2 (comprender)
 Sin ejecutar, responde:
  a) Si fetch() recibe un 503 (servicio no disponible), ¿su promesa se
     cumple o se rechaza? ¿Qué valor tiene response.ok?
  b) ¿Qué diferencia hay entre un error HTTP y un error de red?
  c) ¿Qué ocurriría si llamas dos veces a response.json()?

 EJERCICIO 3 (aplicar)
 Amplía obtenerUsuario para que, además de comprobar nombre, valide que
 datos.usuarios (si existe) sea un array y lo devuelva. Usa
 fetchSimulado(200, { usuarios: [1, 2, 3] }) para probarlo y muestra la
 longitud del array.
*/

/*
 SOLUCIONES

 EJERCICIO 1
   async function probar() {
     let respuesta = await respuestaSimulada(200, { saludo: "hola" })
     if (respuesta.ok) {
       let datos = await respuesta.json()
       console.log(datos.saludo) // hola
     }
   }
   probar()

 EJERCICIO 2
  a) La promesa se CUMPLE: el servidor respondió (aunque mal). response.ok
     es false (503 no está entre 200-299). Es el patrón del apartado 3.
  b) Error HTTP: llegó una respuesta con código de error (p.ej. 404, 500).
     Error de red: la petición no llegó (sin conexión, DNS, timeout).
  c) response.json() se puede llamar UNA vez; la segunda lectura lanza
     (el cuerpo ya se consumió).

 EJERCICIO 3
   async function conUsuarios(urlConf) {
     try {
       let respuesta = await fetchSimulado(urlConf.status, urlConf.datos)
       if (!respuesta.ok) throw new Error("HTTP " + respuesta.status)
       let datos = await respuesta.json()
       if (!Array.isArray(datos.usuarios)) {
         throw new Error("usuarios no es un array")
       }
       return datos.usuarios
     } catch (error) {
       console.log("Error:", error.message)
       return null
     }
   }
   async function pruebalo() {
     let lista = await conUsuarios({ status: 200, datos: { usuarios: [1, 2, 3] } })
     console.log("Longitud:", lista ? lista.length : 0) // Longitud: 3
   }
   pruebalo()
*/

/*
 RESUMEN Y AUTOEVALUACIÓN
 Resumen: una API es la puerta de intercambio de datos entre programas;
 fetch() hace peticiones y devuelve una promesa; async/await la lee con
 fluidez; HTTP define peticiones/estados, y response.ok distingue estados
 buenos de malos SIN que la promesa de fetch() se rechace (eso es solo
 para errores de red). Hay tres frentes de error (red, HTTP, datos) y
 ninguno se debe silenciar: registrar siempre.

 Autoevaluación: tras esta lección deberías poder...
 [ ] Explicar qué es una API y qué hace fetch()
 [ ] Comprobar response.ok antes de leer el cuerpo
 [ ] Leer el cuerpo con response.json()
 [ ] Distinguir error de red de error HTTP y gestionar cada uno
 [ ] Validar los datos recibidos y registrar los errores sin tragarlos

 RETO OPCIONAL
 (Concepto aún no obligatorio: tratamiento de varias promesas.)
 ¿Qué pasaría si lanzaras varias peticiones con Promise.all y una
 fallara? Piénsalo primero; compruébalo después con un fetchSimulado
 rechazado dentro de un array. (Pista: reléete el apartado 7 de la
 lección 41.)
 */