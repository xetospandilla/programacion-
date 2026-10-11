/*
 ============================================================================
 PROYECTO 1 - Calculadora de consola
 ============================================================================
 Qué practica: funciones con parámetros y valores de retorno, validación
 de entradas y tratamiento de operaciones inválidas.

 Ejecución: node main.js   (desde este directorio o con la ruta completa)
 ============================================================================
 */

import readline from "node:readline/promises"
import { stdin as entrada, stdout as salida } from "node:process"

const rl = readline.createInterface({ input: entrada, output: salida })

/*
 Calcula la operación "a operador b" y devuelve SIEMPRE un objeto con la
 misma forma: { ok: true, resultado } en caso válido, o { ok: false,
 mensaje } en caso inválido. Así la interfaz no tiene que saber qué
 operaciones existen: solo pregunta si fue válida o no.
 */
function calcular(expresion) {
    // Formato esperado: "2 + 3" (número, espacio, operador, espacio, número)
    const partes = expresion.split(" ")
    if (partes.length !== 3) {
        return {
            ok: false,
            mensaje: 'Formato esperado: "número operador número" (ejemplo: 2 + 3)'
        }
    }

    const [textoA, operador, textoB] = partes
    const a = Number(textoA)
    const b = Number(textoB)

    if (Number.isNaN(a) || Number.isNaN(b)) {
        return { ok: false, mensaje: "Los operandos deben ser números." }
    }

    if (operador === "+") return { ok: true, resultado: a + b }
    if (operador === "-") return { ok: true, resultado: a - b }
    if (operador === "*") return { ok: true, resultado: a * b }
    if (operador === "/") {
        // Dividir entre cero no es un error de red ni de formato: es una
        // operación matemática imposible, y la tratamos como tal.
        if (b === 0) {
            return { ok: false, mensaje: "No se puede dividir entre cero." }
        }
        return { ok: true, resultado: a / b }
    }

    return { ok: false, mensaje: 'Operador no válido. Usa +, -, * o /.' }
}

async function principal() {
    console.log("CALCULADORA DE CONSOLA")
    console.log('Escribe una operación como "2 + 3" o "salir" para terminar.')

    // El bucle "for await" lee las líneas de la entrada UNA A UNA, tanto
    // escritas a mano en la terminal como pasadas con redirección o pipe.
    // El prompt se repinta después de procesar cada línea.
    rl.setPrompt("Operación > ")
    rl.prompt()

    for await (const linea of rl) {
        const expresion = linea.trim()
        if (expresion.toLowerCase() === "salir") {
            break
        }

        const resultado = calcular(expresion)
        if (resultado.ok) {
            console.log("Resultado:", resultado.resultado)
        } else {
            console.log("Error:", resultado.mensaje)
        }

        rl.prompt()
    }

    console.log("¡Hasta luego!")
    rl.close()
}

principal()