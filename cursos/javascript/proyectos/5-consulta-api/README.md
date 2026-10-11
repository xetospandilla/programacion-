# Proyecto 5 — Consulta de datos de una API

## 1. Qué vas a construir y qué aprenderás

Un programa que consulta una lista de usuarios y la muestra por consola.
Aprenderás a:

- usar **`fetch`**, **`async/await`** y **promesas** (lecciones 40-42);
- separar **los tres tipos de error**: de RED (sin conexión), HTTP (el servidor
  responde con error) y de FORMATO (la respuesta no tiene la forma esperada);
- diseñar un **modo de demostración local**: el programa funciona sin Internet
  con datos simulados, y el acceso real a una API es opcional y claramente
  etiquetado.

## 2. Conocimientos previos

- Lección 40 (promesas), 41 (`async/await`, `try/catch`) y 42 (`fetch`).
- Lección 38 (`JSON` y `response.json()`).
- Lección 18 (objetos) y 37 (arrays) para dar forma a los datos.
- Lección 45 (no tragarse los errores: siempre se registran).

## 3. Cómo funciona antes de ver el código

El programa tiene dos "fuentes" de datos con el MISMO contrato (una lista de
objetos `{ id, nombre, ciudad }`):

- **Modo local** (`node main.js`): una función `obtenerDatosLocales()` devuelve
  una promesa que, tras una pequeña demora, se cumple con tres usuarios de
  ejemplo. No hay red: solo `setTimeout` y una promesa, como en la lección 40.
- **Modo real** (`node main.js real`): `obtenerDatosReales()` consulta
  `https://jsonplaceholder.typicode.com/users` con `fetch`. Es opcional; si no
  hay Internet, funciona igualmente el modo local.

La función `obtenerDatosReales()` separa los errores en tres capas:

1. **RED**: el `fetch` lanza una excepción (sin conexión, DNS...). Se captura
   con `try/catch` y se relanza con la etiqueta "Red:".
2. **HTTP**: el servidor respondió, pero con código de error (404, 500...).
   `fetch` NO rechaza en ese caso (lección 42): hay que comprobar
   `response.ok` manualmente.
3. **FORMATO**: la respuesta es correcta a nivel de red y HTTP, pero no es la
   lista esperada (un objeto en vez de un array, campos con otros nombres). Se
   comprueba con `Array.isArray` y se traducen los campos.

El archivo `errores.js` reproduce los tres errores con simulaciones locales,
para ver la salida de cada tipo sin depender de la red.

## 4. Pasos para construirlo

1. Crea `5-consulta-api/main.js` y detecta el modo con `process.argv[2]`.
2. Escribe `obtenerDatosLocales()` que devuelva `new Promise` con `setTimeout`
   y una lista de usuarios de ejemplo.
3. Escribe `obtenerDatosReales()`:
   - `try { respuesta = await fetch(url) } catch` → error etiquetado "Red:";
   - `if (!respuesta.ok)` → error etiquetado "HTTP:";
   - `Array.isArray(datos)` → error etiquetado "Formato:".
4. En `principal()`, elige la fuente según el modo, la muestra y captura
   cualquier error con `try/catch` (poniendo `process.exitCode = 1` si falla).
5. Crea `errores.js` con las tres simulaciones y ejecútalo para ver las
   etiquetas.

## 5. Código completo

**`main.js`:**

```js
const MODO = process.argv[2] === "real" ? "real" : "local"

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
```

**`errores.js`** (demostración de los tres tipos de error, sin Internet):

```js
async function principal() {
    // 1) ERROR DE RED: fetch rechazaría su promesa (sin conexión, etc.).
    try {
        await Promise.reject(new Error("getaddrinfo ENOTFOUND jsonplaceholder.typicode.com"))
    } catch (error) {
        console.log("Red:", error.message)
    }

    // 2) ERROR HTTP: el servidor responde, pero con código de error.
    const respuestaSimulada = { ok: false, status: 503, statusText: "Service Unavailable" }
    if (!respuestaSimulada.ok) {
        console.log("HTTP: el servidor respondió " + respuestaSimulada.status + " " + respuestaSimulada.statusText)
    }

    // 3) ERROR DE FORMATO: llega una respuesta "correcta", pero no es una lista.
    const datosMalFormados = { mensaje: "esto no es una lista" }
    if (!Array.isArray(datosMalFormados)) {
        console.log("Formato: la respuesta no es una lista de resultados.")
    }

    console.log("Con esto has visto cómo se ETIQUETA cada tipo de error.")
}

principal()
```

## 6. Cómo ejecutarlo y probarlo

Desde `cursos/javascript/proyectos/5-consulta-api`:

```bash
node main.js        # modo LOCAL: sin Internet (es la validación del curso)
node main.js real   # modo REAL: opcional, necesita conexión (jsonplaceholder)
node errores.js     # demostración local de los tres tipos de error
```

La validación del curso se hace en modo local: no necesitas Internet para
estudiar esta lección. El modo real es opcional; si la API cambia o no hay
conexión, el programa lo dirá con un mensaje etiquetado.

## 7. Salidas esperadas

**Modo local:**

```text
CONSULTA DE DATOS DE UNA API
Modo LOCAL: sin Internet, con datos simulados.
Usuarios recibidos: 3
 - Ana (Madrid)
 - Luis (Bogotá)
 - Sara (Buenos Aires)
```

**`node errores.js`:**

```text
Red: getaddrinfo ENOTFOUND jsonplaceholder.typicode.com
HTTP: el servidor respondió 503 Service Unavailable
Formato: la respuesta no es una lista de resultados.
Con esto has visto cómo se ETIQUETA cada tipo de error.
```

## 8. Errores frecuentes y cómo diagnosticarlos

- **"fetch is not defined"**: estás ejecutando una versión de Node anterior a la
  18, donde `fetch` no viene incluida. Actualiza Node o estudia el modo local.
- **Crash "TypeError: Cannot read properties of undefined" en modo real**: la
  API devolvió datos con otra forma (por ejemplo, faltaba `address`). Por eso se
  valida con `Array.isArray` y se protegen accesos como `usuario.address.city`.
- **Atribuir al fetch un 404 como error de red**: NO lo es. `fetch` solo
  rechaza por problemas de red; un 404 llega como respuesta con `ok: false`
  (lección 42). La comprobación `if (!respuesta.ok)` es imprescindible.
- **El catch "se traga" el error**: si el `catch` no imprime nada, el usuario
  verá un programa que "no hace nada". El proyecto siempre imprime algo.
- **Confundir los datos locales con los reales**: ambos usan el mismo contrato
  a propósito. Si el modo local muestra 3 usuarios y el real 10, es porque la
  API devuelve 10: el formato y la validación son los mismos.

## 9. Retos

1. **Fácil — filtrar por ciudad**: en modo local, pregunta al usuario una
   ciudad y muestra solo los usuarios de esa ciudad (usa un `filter` sobre el
   array ya recibido).
2. **Medio — limitar resultados**: en modo real, consulta
   `https://jsonplaceholder.typicode.com/users?_limit=2` (el parámetro
   `_limit` lo entiende esa API) y muestra cuántos llegan. Cambia el `_limit` y
   comprueba que los datos cambian.
3. **Difícil — generalizar**: convierte la consulta en una función
   `consultar(url)` que devuelva la lista validada (misma lógica de los tres
   errores) y úsala para consultar también `.../posts` (que devuelve una lista
   con campos distintos). Pista: la validación de formato debe comprobar SOLO
   que sea un array; la traducción de campos ya es cosa de quien la llame.

## 10. Soluciones de los retos

**Reto 1.** Dentro de `principal()`, en modo local, antes de mostrar:

```js
const ciudadBuscada = "Madrid"
const filtrados = usuarios.filter((u) => u.ciudad === ciudadBuscada)
console.log("Usuarios de " + ciudadBuscada + ":", filtrados.length)
filtrados.forEach((u) => console.log(" - " + u.nombre))
```

**Reto 2.** Cambia la URL en `obtenerDatosReales()`:

```js
const url = "https://jsonplaceholder.typicode.com/users?_limit=2"
```

El resto del código no cambia: `response.json()` devuelve el array limitado y
`usuarios.length` mostrará 2.

**Reto 3.** Extrae la parte común:

```js
async function consultar(url) {
    let respuesta
    try {
        respuesta = await fetch(url)
    } catch (error) {
        throw new Error("Red: no se pudo contactar con el servidor. (" + error.message + ")")
    }
    if (!respuesta.ok) {
        throw new Error("HTTP: el servidor respondió " + respuesta.status + " " + respuesta.statusText)
    }
    const datos = await respuesta.json()
    if (!Array.isArray(datos)) {
        throw new Error("Formato: la respuesta no es una lista de resultados.")
    }
    return datos
}
```

`obtenerDatosReales()` se convierte en `consultar(url)` que, al estar en su
propio archivo, se puede usar para `/users` y para `/posts`:

```js
const posts = await consultar("https://jsonplaceholder.typicode.com/posts")
console.log("Posts recibidos:", posts.length)
```

La validación de formato solo exige "es un array"; cada llamada decide qué
campos usar. Así la función es reutilizable y los tres errores siguen
etiquetados en un único lugar.