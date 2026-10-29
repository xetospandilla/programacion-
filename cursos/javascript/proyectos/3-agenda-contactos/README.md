# Proyecto 3 — Agenda de contactos

## 1. Qué vas a construir y qué aprenderás

Una agenda de contactos de consola que permite **añadir**, **listar**,
**buscar** y **eliminar** contactos. Aprenderás a:

- trabajar con **arrays de objetos** (cada contacto es `{ nombre, telefono }`);
- usar **métodos de arrays**: `push` (añadir), `filter` (buscar), `splice`
  (eliminar) y `map` + `join` (listar);
- **validar datos** antes de guardarlos (nombre no vacío, teléfono solo dígitos);
- organizar el programa en **funciones puras** (lección 45): la lógica no
  imprime; la interfaz decide qué mostrar.

## 2. Conocimientos previos

- Lección 10 (arrays) y lección 18 (objetos).
- Lección 37 (métodos de arrays: `map`, `filter`...).
- Lección 06 (plantillas de strings).
- Proyectos 1 y 2 (entrada por consola con `for await`).
- Lección 45 (funciones pequeñas y validación).

## 3. Cómo funciona antes de ver el código

1. La agenda es un array global `contactos`. Cada elemento es un objeto con
   `nombre` y `telefono`.
2. Hay una función por operación: `anadirContacto`, `listarContactos`,
   `buscarContactos` y `eliminarContacto`. Todas reciben datos y devuelven un
   resultado; **no imprimen** (salvo `listarContactos`, que devuelve el texto
   formateado).
3. La interfaz muestra un menú (`1` añadir, `2` listar, `3` buscar, `4`
   eliminar, `0` salir). Como algunas opciones necesitan más de un dato, el
   programa recuerda en la variable `esperando` qué pregunta toca a
   continuación: al elegir "añadir", pasa a esperar el nombre y luego el
   teléfono, y al terminar vuelve al menú.
4. Toda función de escritura devuelve `{ ok, mensaje }`; si la validación
   falla, llega `{ ok: false, mensaje }` y la interfaz muestra "Error: ...".

La separación lógica/interfaz hace que puedas probar las funciones sin tocar el
menú, y es la base de los retos.

## 4. Pasos para construirlo

1. Crea `3-agenda-contactos/main.js` e importa `readline/promises`.
2. Declara `const contactos = []` y escribe las tres validaciones básicas:
   nombre no vacío; teléfono solo dígitos (patrón `/^\d+$/`).
3. Escribe `anadirContacto`, `listarContactos`, `buscarContactos` y
   `eliminarContacto` (consulta la lección 37 para `filter` y `splice`).
4. Escribe el menú con `for await` y la variable `esperando` para las
   sub-preguntas.
5. Comprueba que cada rama del menú devuelve el control a "Opción > ".

## 5. Código completo

```js
import readline from "node:readline/promises"
import { stdin as entrada, stdout as salida } from "node:process"

const rl = readline.createInterface({ input: entrada, output: salida })

const contactos = []

function anadirContacto(nombre, telefono) {
    const nombreLimpio = nombre.trim()
    const telefonoLimpio = telefono.trim()

    if (nombreLimpio === "") {
        return { ok: false, mensaje: "El nombre no puede estar vacío." }
    }
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
    return contactos
        .map((contacto, indice) => `${indice + 1}. ${contacto.nombre} — ${contacto.telefono}`)
        .join("\n")
}

function buscarContactos(texto) {
    const busqueda = texto.trim().toLowerCase()
    return contactos.filter((contacto) =>
        contacto.nombre.toLowerCase().includes(busqueda)
    )
}

function eliminarContacto(posicion) {
    const indice = posicion - 1
    if (indice < 0 || indice >= contactos.length) {
        return { ok: false, mensaje: "Posición no válida." }
    }
    const [eliminado] = contactos.splice(indice, 1)
    return { ok: true, mensaje: `Eliminado: ${eliminado.nombre}` }
}

async function principal() {
    console.log("AGENDA DE CONTACTOS")
    console.log("Menú: 1 añadir, 2 listar, 3 buscar, 4 eliminar, 0 salir.")

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
```

## 6. Cómo ejecutarlo y probarlo

Desde `cursos/javascript/proyectos/3-agenda-contactos`:

```bash
node main.js
```

Secuencia completa de prueba (añadir, listar, teléfono inválido, buscar,
eliminar, salir):

```bash
printf "1\nAna\n600111222\n2\n1\nLuis\nabc\n2\n3\nan\n4\n1\n2\n0\n" | node main.js
```

## 7. Entradas y salidas esperadas

```text
Opción > Nombre > Teléfono > Contacto añadido: Ana
Opción > 1. Ana — 600111222
Opción > Nombre > Teléfono > Error: El teléfono solo puede contener dígitos.
Opción > Buscar (parte del nombre) > 1. Ana — 600111222
Opción > Posición del contacto a eliminar > Eliminado: Ana
Opción > La agenda está vacía.
Opción > ¡Hasta luego!
```

## 8. Errores frecuentes y cómo diagnosticarlos

- **Añade contactos con espacios**: olvidas `trim()`. El nombre `" Ana "` se
  guarda con espacios; recorta siempre antes de validar y guardar.
- **El teléfono acepta letras**: falta la validación `/^\d+$/`. El patrón dice:
  desde el inicio (`^`) hasta el final (`$`), uno o más dígitos (`\d+`).
- **Buscar distingue mayúsculas**: pasas `"Ana"` y no encuentra `"ana"`. La
  búsqueda convierte ambos lados con `toLowerCase()`.
- **Eliminar borra el contacto equivocado**: el usuario ve posiciones desde 1,
  pero los arrays empiezan en 0; por eso `eliminarContacto` resta 1.
- **El "0" del menú no sale**: comprueba que el `break` esté dentro de la rama
  `opcion === "0"` y que al final se llame a `rl.close()`.

## 9. Retos

1. **Fácil — teléfono único**: rechaza añadir un contacto cuyo teléfono ya
   exista en la agenda. Pista: usa `some()` (lección 37).
2. **Medio — editar contacto**: añade la opción `5` que pida posición, muestre
   el contacto actual y permita cambiar nombre y teléfono con validación.
3. **Difícil — listado ordenado**: que `listarContactos()` devuelva los
   contactos ordenados alfabéticamente por nombre. Pista: `sort()` con
   `localeCompare`, y ten en cuenta que `sort` modifica el array original
   (copia con `[...contactos]` primero).

## 10. Soluciones de los retos

**Reto 1.** Dentro de `anadirContacto`, antes de `push`:

```js
if (contactos.some((c) => c.telefono === telefonoLimpio)) {
    return { ok: false, mensaje: "Ya existe un contacto con ese teléfono." }
}
```

`some` recorre el array y devuelve `true` si al menos un elemento cumple la
condición, sin modificar nada.

**Reto 2.** Añade la rama `5` del menú que lleve a `esperando = "editar"`, y la
rama de edición:

```js
const indice = Number(linea.trim()) - 1
if (indice < 0 || indice >= contactos.length) {
    console.log("Error: Posición no válida.")
} else {
    console.log("Actual:", JSON.stringify(contactos[indice]))
    // vuelve a usar las preguntas de nombre y teléfono (esperando = "nombre")
    // guardando en contactoNuevo el índice a editar
}
```

La clave es que la edición reutiliza la MÁQUINA de estados del menú: al pedir
nombre y teléfono, en lugar de `push`, se reasigna el objeto en `contactos[indice]`.

**Reto 3.**

```js
function listarContactos() {
    if (contactos.length === 0) return "La agenda está vacía."
    const copia = [...contactos] // sort() modifica el array; copiamos primero
    copia.sort((a, b) => a.nombre.localeCompare(b.nombre))
    return copia
        .map((c, i) => `${i + 1}. ${c.nombre} — ${c.telefono}`)
        .join("\n")
}
```

`localeCompare` compara textos según el idioma (las tildes ordenan bien);
`[...contactos]` evita que el array original quede reordenado de forma
permanente.