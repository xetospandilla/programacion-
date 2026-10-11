# Proyecto 2 — Adivina el número

## 1. Qué vas a construir y qué aprenderás

Un juego de consola: el programa elige un número secreto entre 1 y 20 y tú
tienes 6 intentos para acertarlo, con pistas de "demasiado bajo" o "demasiado
alto". Aprenderás a:

- generar **números aleatorios** con `Math.random` (lección 34);
- escribir **condicionales** (`if/else`) y **bucles** con límite de intentos;
- llevar un **contador** de intentos y mensajes claros por cada resultado;
- probar el programa **varias veces** de forma reproducible (modo demo).

## 2. Conocimientos previos

- Lección 32 (ejecutar con `node`).
- Lección 06 (strings y plantillas: `Intento ${n} de ${max}`).
- Lección 08 (condicionales) y lección 35 (bucles).
- Lección 34 (números y `Math.floor` / `Math.random`).

## 3. Cómo funciona antes de ver el código

1. El programa genera el secreto con una función `generarNumeroSecreto()`:
   - modo normal: un entero aleatorio entre `MINIMO` y `MAXIMO`;
   - modo demo (`node main.js demo`): devuelve siempre 7, para poder probar la
     lógica sin depender del azar.
2. En un bucle, pregunta un número, lo valida (**no es número** o **fuera del
   rango** no gastan intento), y lo compara con el secreto.
3. Cada comparación produce una salida clara: acierto, bajo o alto.
4. Si se llega al límite sin acertar, muestra cuál era el secreto.

El modo demo es una decisión deliberada: el azar es difícil de probar, así que
el juego ofrece una vía determinista (el secreto fijo) para comprobar todos los
caminos: acierto, pistas e intentos agotados.

## 4. Pasos para construirlo

1. Crea la carpeta `2-adivina-numero` y dentro `main.js`.
2. Define las constantes `MINIMO`, `MAXIMO` e `INTENTOS_MAXIMOS`, y detecta el
   modo demo leyendo `process.argv[2]`.
3. Escribe `generarNumeroSecreto()` con la fórmula de entero aleatorio
   `Math.floor(Math.random() * (max - min + 1)) + min`.
4. Escribe el bucle `for await` que valida (sin gastar intento), compara y
   emite mensajes; actualiza el prompt con el número de intento.
5. Al final, distingue entre acierto y agotamiento de intentos.

## 5. Código completo

```js
import readline from "node:readline/promises"
import { stdin as entrada, stdout as salida } from "node:process"

const rl = readline.createInterface({ input: entrada, output: salida })

const MINIMO = 1
const MAXIMO = 20
const INTENTOS_MAXIMOS = 6

const modoDemo = process.argv[2] === "demo"

function generarNumeroSecreto() {
    if (modoDemo) {
        return 7
    }
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
            continue
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
```

## 6. Cómo ejecutarlo y probarlo

Desde `cursos/javascript/proyectos/2-adivina-numero`:

```bash
node main.js          # partida normal: el secreto cambia cada vez
node main.js demo     # secreto fijo (7): reproducible para probar
```

Para **probar varias veces** la partida normal, ejecuta otra vez `node main.js`:
cada ejecución es una partida nueva e independiente. Para **probar los tres
caminos con datos controlados**, usa el modo demo con una secuencia de intentos:

```bash
printf "5\n8\n6\n7\n" | node main.js demo        # pistas, acierto en el 4º
printf "2\n2\n2\n2\n2\n2\n" | node main.js demo  # agotar los 6 intentos
```

## 7. Entradas y salidas esperadas

Partida demo con entrada `5`, `8`, `6`, `7`:

```text
(modo demo: el número secreto es 7)
Adivina el número entre 1 y 20.
Tienes 6 intentos.
Intento 1 de 6 > Demasiado bajo. Intenta con un número mayor.
Intento 2 de 6 > Demasiado alto. Intenta con un número menor.
Intento 3 de 6 > Demasiado bajo. Intenta con un número mayor.
Intento 4 de 6 > ¡Acertaste! Lo lograste en 4 intento(s).
¡Hasta la próxima!
```

Entradas inválidas (no gastan intento) seguidas de acierto: `abc`, `50`, `7`:

```text
Intento 1 de 6 > Eso no es un número. Introduce un número entero.
Intento 1 de 6 > El número debe estar entre 1 y 20.
Intento 1 de 6 > ¡Acertaste! Lo lograste en 1 intento(s).
```

## 8. Errores frecuentes y cómo diagnosticarlos

- **Siempre "demasiado bajo/alto" y nunca acierta**: tu comparación usa `<=` o
  `>=` mal colocados, o el secreto se regenera dentro del bucle. El secreto debe
  generarse UNA vez, antes del bucle.
- **Los intentos se agotan enseguida**: estás haciendo `intentos++` para entradas
  inválidas. El incremento va después de validar.
- **El número siempre es el mismo**: es el modo normal; prueba muchas
  veces o usa el modo demo. Si SIEMPRE es igual incluso en modo normal, revisa
  que la fórmula use `MAXIMO - MINIMO + 1` (sin el `+1` nunca sale el máximo).
- **"NaN" al comparar**: no conviertes con `Number()` o el texto leído contiene
  espacios; usa `linea.trim()` antes y comprueba `Number.isNaN`.

## 9. Retos

1. **Fácil — otro rango**: cambia `MINIMO` y `MAXIMO` a 1 y 100, y ajusta los
   mensajes. Comprueba que el `+1` de la fórmula sigue siendo correcto.
2. **Medio — pistas de proximidad**: en vez de solo "alto/bajo", di "¡Frío!",
   "¡Tibio!" o "¡Caliente!" según la distancia entre el intento y el secreto.
   Pista: usa `Math.abs(numero - secreto)` para la distancia.
3. **Difícil — récord de partidas**: al terminar la partida, pregunta si quiere
   jugar otra vez y guarda el mínimo de intentos conseguido. Muestra "Récord: N
   intentos" al empezar cada partida. Pista: envuelve la lógica actual en una
   función `jugarPartida()` y llama a un bucle externo.

## 10. Soluciones de los retos

**Reto 1.** Solo cambia las constantes:

```js
const MINIMO = 1
const MAXIMO = 100
```

El resto del código no se toca: la fórmula y los mensajes ya usan las
constantes, así que el mensaje dice automáticamente "entre 1 y 100".

**Reto 2.** Sustituye los dos `console.log` de pistas por una función de
proximidad:

```js
function pistaDeProximidad(numero, secreto) {
    const distancia = Math.abs(numero - secreto)
    if (distancia <= 2) return "¡Caliente!"
    if (distancia <= 5) return "¡Tibio!"
    return "¡Frío!"
}
```

En el bucle, después de `intentos++` y las comprobaciones de acierto:

```js
console.log(pistaDeProximidad(numero, secreto))
```

`Math.abs` convierte la diferencia en positiva, por eso sirve tanto para "bajo"
como para "alto": solo informa de la distancia.

**Reto 3.** Guarda el récord como variable fuera de las partidas:

```js
let record = Infinity
```

Envuelve el cuerpo en `jugarPartida()` que devuelve los intentos usados o
`null` si no acertó, y un bucle externo:

```js
async function jugarPartida() { /* ... el código actual ... */
    return acertado ? intentos : null
}
async function principal() {
    while (true) {
        if (Number.isFinite(record)) {
            console.log(`Récord actual: ${record} intento(s)`)
        }
        const usados = await jugarPartida()
        if (usados !== null && usados < record) {
            record = usados
            console.log("¡Nuevo récord!")
        }
        // ... preguntar "¿Jugar otra vez? (s/n)" y salir si no es "s"
    }
}
```