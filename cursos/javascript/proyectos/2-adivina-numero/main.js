/*
 ============================================================================
 PROYECTO 2 - Adivina el número
 ============================================================================
 Qué practica: números aleatorios, condicionales, bucles, contador de
 intentos y mensajes claros para cada resultado.

 Ejecución:
   node main.js       -> partida normal con número secreto aleatorio
   node main.js demo  -> número secreto FIJO (7) para probar sin suerte

 Para probar varias veces: ejecuta "node main.js" cada vez; el número
 cambia en cada partida. Con "demo" es reproducible y fácil de validar.
 ============================================================================
 */

import readline from "node:readline/promises"
import { stdin as entrada, stdout as salida } from "node:process"

const rl = readline.createInterface({ input: entrada, output: salida })

// Configuración del juego: rango y número máximo de intentos.
const MINIMO = 1
const MAXIMO = 20
const INTENTOS_MAXIMOS = 6

// Modo demo: se fija el secreto para poder probar sin depender del azar.
const modoDemo = process.argv[2] === "demo"

function generarNumeroSecreto() {
    if (modoDemo) {
        return 7
    }
    // Math.floor(Math.random() * (max - min + 1)) + min da un entero
    // entre min y max, ambos incluidos (lección 34 de números y Math).
    return Math.floor(Math.random() * (MAXIMO - MINIMO + 1)) + MINIMO
}

async function principal() {
    const secreto = generarNumeroSecreto()
    if (modoDemo) {
        console.log("(modo demo: el número secreto es", secreto + ")")
    }

    console.log(`Adivina el número entre ${MINIMO} y ${MAXIMO}.`)
    console.log(`Tienes ${INTENTOS_MAXIMOS} intentos.`)

    let intentos = 0
    let acertado = false

    rl.setPrompt(`Intento 1 de ${INTENTOS_MAXIMOS} > `)
    rl.prompt()

    for await (const linea of rl) {
        const texto = linea.trim()
        const numero = Number(texto)

        if (texto === "" || Number.isNaN(numero)) {
            console.log("Eso no es un número. Introduce un número entero.")
            rl.prompt()
            continue // no gastamos un intento por una entrada inválida
        }
        if (numero < MINIMO || numero > MAXIMO) {
            console.log(`El número debe estar entre ${MINIMO} y ${MAXIMO}.`)
            rl.prompt()
            continue
        }

        intentos++

        if (numero === secreto) {
            acertado = true
            console.log(`¡Acertaste! Lo lograste en ${intentos} intento(s).`)
            break
        }
        if (numero < secreto) {
            console.log("Demasiado bajo. Intenta con un número mayor.")
        } else {
            console.log("Demasiado alto. Intenta con un número menor.")
        }

        if (intentos < INTENTOS_MAXIMOS) {
            rl.setPrompt(`Intento ${intentos + 1} de ${INTENTOS_MAXIMOS} > `)
        }
        rl.prompt()
    }

    if (!acertado) {
        console.log(`Se acabaron los intentos. El número era ${secreto}.`)
    }

    console.log("¡Hasta la próxima!")
    rl.close()
}

principal()