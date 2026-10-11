/*
 ============================================================================
 PROYECTO 3 - Agenda de contactos
 ============================================================================
 Qué practica: arrays y objetos, funciones, métodos de arrays (push,
 filter, splice, map) y búsqueda. Añadir, listar, buscar y eliminar
 contactos con validación básica. Aplicación de consola, sin base de datos.

 Ejecución: node main.js   (desde este directorio o con la ruta completa)

 Menú: 1 añadir, 2 listar, 3 buscar, 4 eliminar, 0 salir.
 ============================================================================
 */

import readline from "node:readline/promises"
import { stdin as entrada, stdout as salida } from "node:process"

const rl = readline.createInterface({ input: entrada, output: salida })

// El almacén: un array de objetos { nombre, telefono }.
const contactos = []

// Secciones de la agenda como funciones PURAS: reciben datos y devuelven
// un resultado; la interfaz (principal) solo decide qué mostrar.

function anadirContacto(nombre, telefono) {
    const nombreLimpio = nombre.trim()
    const telefonoLimpio = telefono.trim()

    if (nombreLimpio === "") {
        return { ok: false, mensaje: "El nombre no puede estar vacío." }
    }
    // Validación básica: el teléfono solo puede tener dígitos.
    if (!/^\d+$/.test(telefonoLimpio)) {
        return { ok: false, mensaje: "El teléfono solo puede contener dígitos." }
    }

    contactos.push({ nombre: nombreLimpio, telefono: telefonoLimpio })
    return { ok: true, mensaje: `Contacto añadido: ${nombreLimpio}` }
}

function listarContactos() {
    if (contactos.length === 0) {
        return "La agenda está vacía."
    }
    // map devuelve una línea por contacto; join la une con saltos de línea.
    return contactos
        .map((contacto, indice) => `${indice + 1}. ${contacto.nombre} — ${contacto.telefono}`)
        .join("\n")
}

function buscarContactos(texto) {
    const busqueda = texto.trim().toLowerCase()
    // filter + includes: coincide si el nombre contiene el texto buscado,
    // sin importar mayúsculas o minúsculas.
    return contactos.filter((contacto) =>
        contacto.nombre.toLowerCase().includes(busqueda)
    )
}

function eliminarContacto(posicion) {
    const indice = posicion - 1 // el usuario ve posiciones desde 1
    if (indice < 0 || indice >= contactos.length) {
        return { ok: false, mensaje: "Posición no válida." }
    }
    // splice(indice, 1) elimina un elemento y lo devuelve en un array.
    const [eliminado] = contactos.splice(indice, 1)
    return { ok: true, mensaje: `Eliminado: ${eliminado.nombre}` }
}

async function principal() {
    console.log("AGENDA DE CONTACTOS")
    console.log("Menú: 1 añadir, 2 listar, 3 buscar, 4 eliminar, 0 salir.")

    /*
     La conversación puede esperar DIFERENTES datos según la opción:
     el programa recuerda en "esperando" qué dato toca a continuación.
     */
    let esperando = "menu" // menu | nombre | telefono | busqueda | eliminar
    let contactoNuevo = { nombre: "", telefono: "" }

    rl.setPrompt("Opción > ")
    rl.prompt()

    for await (const linea of rl) {
        if (esperando === "menu") {
            const opcion = linea.trim()

            if (opcion === "0") {
                break
            } else if (opcion === "1") {
                esperando = "nombre"
                rl.setPrompt("Nombre > ")
            } else if (opcion === "2") {
                console.log(listarContactos())
            } else if (opcion === "3") {
                esperando = "busqueda"
                rl.setPrompt("Buscar (parte del nombre) > ")
            } else if (opcion === "4") {
                esperando = "eliminar"
                rl.setPrompt("Posición del contacto a eliminar > ")
            } else {
                console.log("Opción no válida. Usa 1, 2, 3, 4 o 0.")
            }

        } else if (esperando === "nombre") {
            contactoNuevo.nombre = linea.trim()
            esperando = "telefono"
            rl.setPrompt("Teléfono > ")

        } else if (esperando === "telefono") {
            contactoNuevo.telefono = linea.trim()
            const resultado = anadirContacto(contactoNuevo.nombre, contactoNuevo.telefono)
            console.log(resultado.ok ? resultado.mensaje : "Error: " + resultado.mensaje)
            esperando = "menu"
            rl.setPrompt("Opción > ")

        } else if (esperando === "busqueda") {
            const resultados = buscarContactos(linea)
            if (resultados.length === 0) {
                console.log("Sin resultados.")
            } else {
                resultados.forEach((contacto, i) =>
                    console.log(`${i + 1}. ${contacto.nombre} — ${contacto.telefono}`)
                )
            }
            esperando = "menu"
            rl.setPrompt("Opción > ")

        } else if (esperando === "eliminar") {
            const resultado = eliminarContacto(Number(linea.trim()))
            console.log(resultado.ok ? resultado.mensaje : "Error: " + resultado.mensaje)
            esperando = "menu"
            rl.setPrompt("Opción > ")
        }

        rl.prompt()
    }

    console.log("¡Hasta luego!")
    rl.close()
}

principal()