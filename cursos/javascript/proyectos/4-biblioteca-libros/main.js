/*
 ============================================================================
 PROYECTO 4 - Biblioteca de libros (interfaz)
 ============================================================================
 Qué practica: objetos, clases, métodos, módulos ES y organización de
 archivos. Este archivo (main.js) es la INTERFAZ: pregunta, muestra y
 decide. La lógica vive en libros.js.

 Ejecución: node main.js   (desde este directorio o con la ruta completa)

 IMPORTANTE SOBRE LOS MÓDULOS: el package.json de la carpeta
 cursos/javascript contiene "type": "module"; ese ajuste se hereda a
 todas las subcarpetas, así que estos archivos .js funcionan como módulos
 ES (import/export) sin instalar nada ni crear otro package.json.

 Menú: 1 añadir, 2 listar, 3 buscar, 4 prestar, 5 devolver, 0 salir.
 ============================================================================
 */

import readline from "node:readline/promises"
import { stdin as entrada, stdout as salida } from "node:process"
import { Biblioteca } from "./libros.js"

const rl = readline.createInterface({ input: entrada, output: salida })

const biblioteca = new Biblioteca()

async function principal() {
    console.log("BIBLIOTECA DE LIBROS")
    console.log("Menú: 1 añadir, 2 listar, 3 buscar, 4 prestar, 5 devolver, 0 salir.")

    // Como en el proyecto 3, el programa recuerda qué dato espera.
    let esperando = "menu" // menu | titulo | autor | busqueda | prestar | devolver
    let libroNuevo = { titulo: "", autor: "" }

    rl.setPrompt("Opción > ")
    rl.prompt()

    for await (const linea of rl) {
        if (esperando === "menu") {
            const opcion = linea.trim()

            if (opcion === "0") {
                break
            } else if (opcion === "1") {
                esperando = "titulo"
                rl.setPrompt("Título > ")
            } else if (opcion === "2") {
                console.log(biblioteca.listar())
            } else if (opcion === "3") {
                esperando = "busqueda"
                rl.setPrompt("Buscar por título > ")
            } else if (opcion === "4") {
                esperando = "prestar"
                rl.setPrompt("Posición del libro a prestar > ")
            } else if (opcion === "5") {
                esperando = "devolver"
                rl.setPrompt("Posición del libro a devolver > ")
            } else {
                console.log("Opción no válida. Usa 1, 2, 3, 4, 5 o 0.")
            }

        } else if (esperando === "titulo") {
            libroNuevo.titulo = linea.trim()
            esperando = "autor"
            rl.setPrompt("Autor > ")

        } else if (esperando === "autor") {
            libroNuevo.autor = linea.trim()
            const resultado = biblioteca.anadir(libroNuevo.titulo, libroNuevo.autor)
            console.log(resultado.ok ? resultado.mensaje : "Error: " + resultado.mensaje)
            esperando = "menu"
            rl.setPrompt("Opción > ")

        } else if (esperando === "busqueda") {
            const resultados = biblioteca.buscar(linea)
            if (resultados.length === 0) {
                console.log("Sin resultados.")
            } else {
                resultados.forEach((libro, i) =>
                    console.log(`${i + 1}. ${libro.titulo} (${libro.autor}${libro.prestado ? " — PRESTADO" : ""})`)
                )
            }
            esperando = "menu"
            rl.setPrompt("Opción > ")

        } else if (esperando === "prestar") {
            const resultado = biblioteca.prestar(Number(linea.trim()))
            console.log(resultado.ok ? resultado.mensaje : "Error: " + resultado.mensaje)
            esperando = "menu"
            rl.setPrompt("Opción > ")

        } else if (esperando === "devolver") {
            const resultado = biblioteca.devolver(Number(linea.trim()))
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