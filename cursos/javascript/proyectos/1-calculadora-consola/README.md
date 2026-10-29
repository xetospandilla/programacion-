# Proyecto 1 — Calculadora de consola

## 1. Qué vas a construir y qué aprenderás

Una calculadora de consola que pide operaciones como `2 + 3` y muestra el
resultado. Aprenderás a:

- **funciones** con parámetros y valores de retorno (lección 16);
- **validar entradas**: comprobar que lo que escribe el usuario tiene la forma
  esperada antes de usarlo;
- **tratar operaciones inválidas**: divisor cero, operador desconocido, texto en
  vez de números — con mensajes claros en lugar de errores crípticos;
- leer **entrada del usuario** en la terminal con `readline`.

## 2. Conocimientos previos

- Lección 32 (ejecutar programas con `node`).
- Lección 16 (funciones y parámetros).
- Lección 33 (conversión de tipos: `Number`, `Number.isNaN`).
- Lecciones 34 y 45 (validar entradas y errores claros).

## 3. Cómo funciona antes de ver el código

1. El programa muestra un prompt `Operación > `.
2. El usuario escribe una expresión con el formato `número operador número`.
3. Una función `calcular()` separa la expresión en tres piezas (dos operandos y
   un operador) y valida cada una.
4. `calcular()` devuelve **siempre** un objeto con la misma forma:
   `{ ok: true, resultado }` si todo fue bien, o `{ ok: false, mensaje }` con la
   razón si algo falló.
5. La interfaz solo pregunta "¿fue válida?" y, según la respuesta, imprime el
   resultado o el mensaje de error. Así la lógica no se mezcla con la pantalla.

La decisión de devolver un objeto con `ok` es importante: la validación y el
cálculo viven en una función que **no imprime nada**, y eso permite probarla
por separado (se usa en los retos).

## 4. Pasos para construirlo

1. Crea la carpeta `1-calculadora-consola` y dentro un archivo `main.js`.
2. Importa `readline/promises` y crea la interfaz con los flujos de entrada y
   salida estándar (`stdin` y `stdout`).
3. Escribe la función `calcular(expresion)`:
   - divide por espacios en tres partes (`split(" ")`) y rechaza si no son tres;
   - convierte los operandos con `Number` y rechaza si `Number.isNaN`;
   - aplica `+`, `-`, `*` y `/`, con comprobación de división entre cero;
   - devuelve un mensaje claro para operadores desconocidos.
4. Escribe el bucle principal con `for await (const linea of rl)`: lee cada
   línea, la recorta, comprueba si es "salir" y delega en `calcular()`.
5. Cierra la interfaz con `rl.close()` al terminar.

## 5. Código completo

```js
import readline from "node:readline/promises"
import { stdin as entrada, stdout as salida } from "node:process"

const rl = readline.createInterface({ input: entrada, output: salida })

function calcular(expresion) {
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
```

## 6. Cómo ejecutarlo y probarlo

Desde la carpeta `cursos/javascript/proyectos/1-calculadora-consola`:

```bash
node main.js
```

También puedes pasarle una secuencia de operaciones sin escribir a mano
(útil para probar muchas casos de golpe):

```bash
printf "2 + 3\n8 / 0\n6 * 7\nsalir\n" | node main.js
```

## 7. Entradas y salidas esperadas

| Entrada | Salida |
|---|---|
| `2 + 3` | `Resultado: 5` |
| `8 / 0` | `Error: No se puede dividir entre cero.` |
| `6 * 7` | `Resultado: 42` |
| `abc` | `Error: Formato esperado: "número operador número" (ejemplo: 2 + 3)` |
| `10 / 2` | `Resultado: 5` |
| `salir` | `¡Hasta luego!` |

## 8. Errores frecuentes y cómo diagnosticarlos

- **Nada pasa al pulsar Enter**: el script no se ejecuta con doble clic; usa
  `node main.js` en la terminal.
- **"Resultado: NaN"**: algún operando no era número. Revisa que uses `Number()`
  y compruebes con `Number.isNaN`. `Number("2a")` da `NaN` sin avisar.
- **La división da "Infinity"**: falta la comprobación del divisor cero.
- **El proceso se queda esperando tras un pipe**: si alimentas la entrada con
  un archivo o pipe, asegúrate de terminar con una línea `salir` (o EOF).
- **El prompt se duplica**: es normal con entrada redirigida; en terminal
  interactiva no ocurre.

## 9. Retos

1. **Fácil — operador de potencia**: añade el operador `^` que calcule `a` a la
   potencia de `b` (usa `a ** b`). Actualiza también el mensaje de operador no
   válido.
2. **Medio — operaciones sin espacios**: acepta `2+3` además de `2 + 3`. Pista:
   si `split(" ")` no da tres partes, prueba a extraer los números con
   `match()` y un patrón como `(\d+)\s*([+\-*/])\s*(\d+)`.
3. **Difícil — historial**: guarda cada operación válida en un array y muestra
   el historial cuando el usuario escriba `historial`. Pista: después de cada
   operación válida, haz `push` de un objeto `{ expresion, resultado }` y
   recórrelo con `forEach` al pedirlo.

## 10. Soluciones de los retos

**Reto 1.** En `calcular()`, justo antes del retorno de operador no válido:

```js
if (operador === "^") return { ok: true, resultado: a ** b }
```

Y el mensaje de operador no válido pasa a: `'Operador no válido. Usa +, -, *, / o ^.'`

**Reto 2.** Normaliza la entrada antes de dividirla: sustituye "2+3" por "2 + 3".

```js
// al principio de calcular():
expresion = expresion.replace(/\s+/g, " ").trim() // un solo espacio entre piezas
```

`"2+3".replace(/\s+/g, " ").trim()` deja `"2+3"` (sin espacios que sustituir):
para esto sirve la pista de `match()`. Una versión completa:

```js
const partes = expresion.match(/(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)/)
if (partes === null) {
    return { ok: false, mensaje: 'Formato esperado: "número operador número"' }
}
const a = Number(partes[1])
const operador = partes[2]
const b = Number(partes[3])
```

`match` devuelve un array donde `partes[1]`, `[2]` y `[3]` son los grupos de la
expresión regular: primer número, operador y segundo número. El patrón permite
números negativos y decimales.

**Reto 3.** Añade un array fuera de la función:

```js
const historial = []
```

Tras mostrar un resultado válido:

```js
if (resultado.ok) {
    console.log("Resultado:", resultado.resultado)
    historial.push({ expresion, resultado: resultado.resultado })
}
```

Y dentro del bucle, antes de `calcular()`:

```js
if (expresion.toLowerCase() === "historial") {
    if (historial.length === 0) {
        console.log("El historial está vacío.")
    } else {
        historial.forEach((entrada) =>
            console.log(`${entrada.expresion} = ${entrada.resultado}`)
        )
    }
    rl.prompt()
    continue
}
```

El `continue` evita que "historial" se envíe a `calcular()` como si fuera una
operación.