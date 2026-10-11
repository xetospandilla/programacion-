/*
 ============================================================================
 PROYECTO 5 - Consulta de datos de una API
 ============================================================================
 Qué practica: fetch, async/await, promesas y tratamiento de errores.
 Separa claramente los errores de RED, HTTP y de FORMATO de datos.

 Ejecución:
   node main.js         -> modo LOCAL: sin Internet, datos simulados
   node main.js real    -> modo REAL: consulta jsonplaceholder (opcional)

 El modo local es el que se valida y el que permite estudiar la lección
 sin conexión. El modo real es opcional: necesita Internet y la API puede
 cambiar o no estar disponible.
 ============================================================================
 */

// Elige modo según el argumento: cualquiera que no sea "real" usa local.
const MODO = process.argv[2] === "real" ? "real" : "local"

/*
 Modo local: devuelve una promesa que se cumple con una lista de "usuarios"
 tras una pequeña demora simulada. El CONTRATO (una lista de objetos) es
 el mismo que tendría la respuesta real, para que el resto del código no
 sepa de dónde vienen los datos.
 */
function obtenerDatosLocales() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, nombre: "Ana", ciudad: "Madrid" },
                { id: 2, nombre: "Luis", ciudad: "Bogotá" },
                { id: 3, nombre: "Sara", ciudad: "Buenos Aires" }
            ])
        }, 50)
    })
}

/*
 Modo real: consulta una API pública. Los TRES tipos de error están
 separados con claridad:
 1) RED: el fetch lanza (sin conexión, DNS, timeout) -> se captura aquí y
    se lanza un error con la etiqueta "Red:".
 2) HTTP: el servidor responde, pero con un código de error (404, 500...).
    fetch NO rechaza en ese caso: hay que comprobar response.ok.
 3) FORMATO: la respuesta llega bien, pero no es la lista esperada (por
    ejemplo, un objeto en vez de un array, o campos con otros nombres).
 */
async function obtenerDatosReales() {
    const url = "https://jsonplaceholder.typicode.com/users"

    let respuesta
    try {
        respuesta = await fetch(url)
    } catch (error) {
        throw new Error("Red: no se pudo contactar con el servidor. (" + error.message + ")")
    }

    if (!respuesta.ok) {
        throw new Error(
            "HTTP: el servidor respondió " + respuesta.status + " " + respuesta.statusText
        )
    }

    const datos = await respuesta.json()
    if (!Array.isArray(datos)) {
        throw new Error("Formato: la respuesta no es una lista de resultados.")
    }

    // Traducimos los datos reales a la misma forma que el modo local.
    return datos.map((usuario) => ({
        id: usuario.id,
        nombre: usuario.name,
        ciudad: usuario.address && usuario.address.city ? usuario.address.city : "desconocida"
    }))
}

async function principal() {
    console.log("CONSULTA DE DATOS DE UNA API")
    if (MODO === "real") {
        console.log("Modo REAL: se usa Internet (jsonplaceholder.typicode.com).")
    } else {
        console.log("Modo LOCAL: sin Internet, con datos simulados.")
    }

    try {
        const usuarios = MODO === "real" ? await obtenerDatosReales() : await obtenerDatosLocales()
        console.log("Usuarios recibidos:", usuarios.length)
        usuarios.forEach((usuario) => {
            console.log(" - " + usuario.nombre + " (" + usuario.ciudad + ")")
        })
    } catch (error) {
        console.log("La consulta falló:", error.message)
        process.exitCode = 1
    }
}

principal()