# Proyecto 4 — Biblioteca de libros

## 1. Qué vas a construir y qué aprenderás

Una biblioteca de consola para **añadir libros**, **listarlos**, **buscar por
título** y **registrar préstamos y devoluciones**. Aprenderás a:

- modelar con **objetos y clases** (`Libro`, `Biblioteca`, métodos de instancia);
- organizar el código en **módulos ES**: la lógica en `libros.js` y la interfaz
  en `main.js`, unidas con `import` / `export`;
- entender **por qué** dividir en archivos mejora la lectura y la reutilización;
- ver cómo el `package.json` del curso habilita los módulos sin instalar nada.

## 2. Conocimientos previos

- Lección 22 (clases) y lección 18 (objetos).
- Lecciones 28 y 29 (módulos ES: `export` e `import`).
- Lección 37 (métodos de arrays) para el listado y la búsqueda.
- Proyecto 3 (menú de consola con `for await` y validación).
- Lección 45 (funciones pequeñas con una sola misión).

## 3. Cómo funciona antes de ver el código

El programa se divide en DOS archivos a propósito:

- **`libros.js`** contiene las piezas reutilizables: la clase `Libro` (título,
  autor y estado `prestado`) y la clase `Biblioteca` (el array de libros y
  todos los métodos: `anadir`, `listar`, `buscar`, `prestar`, `devolver`).
  Este archivo **no imprime ni pregunta**: solo define y exporta. Así puedes
  usarlo en otro programa o probar sus métodos por separado.
- **`main.js`** es la interfaz: importa `Biblioteca`, muestra el menú, pregunta
  y decide qué imprimir.

El flujo de una operación es siempre el mismo: la interfaz pide los datos, el
método de la biblioteca valida y devuelve `{ ok, mensaje }`, y la interfaz
muestra el mensaje (o "Error: ..." si `ok` es false).

Sobre los módulos: `cursos/javascript/package.json` contiene `"type": "module"`.
Ese ajuste se aplica a toda la carpeta y sus subcarpetas, por eso
`main.js` puede usar `import` sin crear otro `package.json` ni instalar nada.

## 4. Pasos para construirlo

1. Crea `4-biblioteca-libros/libros.js` y `4-biblioteca-libros/main.js`.
2. En `libros.js`, define y **exporta** la clase `Libro` con `constructor`,
   `prestar()` y `devolver()`.
3. Define y exporta la clase `Biblioteca` con el array `libros` y los métodos:
   `anadir` (con validación), `listar`, `buscar`, `prestar` y `devolver`
   (siempre con la forma `{ ok, mensaje }`).
4. En `main.js`, importa `Biblioteca` con `import { Biblioteca } from "./libros.js"`.
5. Escribe el menú con `for await` y la variable `esperando` (igual que el
   proyecto 3), con las opciones 1-5 y la 0 para salir.

## 5. Código completo

**`libros.js`:**

```js
export class Libro {
    constructor(titulo, autor) {
        this.titulo = titulo
        this.autor = autor
        this.prestado = false // true cuando está en manos de alguien
    }
}

export class Biblioteca {
    constructor() {
        this.libros = []
    }

    anadir(titulo, autor) {
        const tituloLimpio = titulo.trim()
        const autorLimpio = autor.trim()

        if (tituloLimpio === "") {
            return { ok: false, mensaje: "El título no puede estar vacío." }
        }
        if (autorLimpio === "") {
            return { ok: false, mensaje: "El autor no puede estar vacío." }
        }

        this.libros.push(new Libro(tituloLimpio, autorLimpio))
        return { ok: true, mensaje: `Libro añadido: ${tituloLimpio}` }
    }

    listar() {
        if (this.libros.length === 0) {
            return "La biblioteca está vacía."
        }
        return this.libros
            .map(
                (libro, indice) =>
                    `${indice + 1}. ${libro.titulo} (${libro.autor})` +
                    (libro.prestado ? " — PRESTADO" : "")
            )
            .join("\n")
    }

    buscar(texto) {
        const busqueda = texto.trim().toLowerCase()
        return this.libros.filter((libro) =>
            libro.titulo.toLowerCase().includes(busqueda)
        )
    }

    prestar(posicion) {
        const indice = posicion - 1
        if (indice < 0 || indice >= this.libros.length) {
            return { ok: false, mensaje: "Posición no válida." }
        }
        const libro = this.libros[indice]
        if (libro.prestado) {
            return { ok: false, mensaje: `"${libro.titulo}" ya está prestado.` }
        }
        libro.prestado = true
        return { ok: true, mensaje: `Préstamo registrado: ${libro.titulo}` }
    }

    devolver(posicion) {
        const indice = posicion - 1
        if (indice < 0 || indice >= this.libros.length) {
            return { ok: false, mensaje: "Posición no válida." }
        }
        const libro = this.libros[indice]
        if (!libro.prestado) {
            return { ok: false, mensaje: `"${libro.titulo}" no estaba prestado.` }
        }
        libro.prestado = false
        return { ok: true, mensaje: `Devolución registrada: ${libro.titulo}` }
    }
}
```

**`main.js`:**

```js
import readline from "node:readline/promises"
import { stdin as entrada, stdout as salida } from "node:process"
import { Biblioteca } from "./libros.js"

const rl = readline.createInterface({ input: entrada, output: salida })

const biblioteca = new Biblioteca()

async function principal() {
    console.log("BIBLIOTECA DE LIBROS")
    console.log("Menú: 1 añadir, 2 listar, 3 buscar, 4 prestar, 5 devolver, 0 salir.")

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
```

## 6. Cómo ejecutarlo y probarlo

Desde `cursos/javascript/proyectos/4-biblioteca-libros`:

```bash
node main.js
```

Nada que instalar: los `import` funcionan gracias al `"type": "module"` del
`package.json` de `cursos/javascript` (heredado a las subcarpetas).

Secuencia completa de prueba (añadir dos, listar, buscar, prestar, doble
préstamo, devolver):

```bash
printf "1\n1984\nGeorge Orwell\n1\nDune\nFrank Herbert\n2\n3\n1984\n4\n2\n2\n4\n2\n5\n2\n2\n0\n" | node main.js
```

## 7. Entradas y salidas esperadas

```text
Opción > Título > Autor > Libro añadido: 1984
Opción > Título > Autor > Libro añadido: Dune
Opción > 1. 1984 (George Orwell)
2. Dune (Frank Herbert)
Opción > Buscar por título > 1. 1984 (George Orwell)
Opción > Posición del libro a prestar > Préstamo registrado: Dune
Opción > 1. 1984 (George Orwell)
2. Dune (Frank Herbert) — PRESTADO
Opción > Posición del libro a prestar > Error: "Dune" ya está prestado.
Opción > Posición del libro a devolver > Devolución registrada: Dune
Opción > ¡Hasta luego!
```

## 8. Errores frecuentes y cómo diagnosticarlos

- **"Cannot use import statement outside a module"**: el archivo `.js` se está
  leyendo fuera del alcance del `package.json` (por ejemplo, copiado a otra
  carpeta sin `"type": "module"`). Guárdalo dentro de `cursos/javascript`.
- **"Cannot find module './libros.js'"**: el `import` debe usar la ruta
  relativa `./libros.js` (con `./`) y el nombre escrito igual que el archivo.
- **Modifican `libros.js` y el menú no cambia**: `main.js` importa la clase; si
  cambias métodos o nombres, revisa que el export coincida. Cambiar `export
  class` a `export default` exige también cambiar el import.
- **Presta un libro ya prestado**: el método comprueba `libro.prestado` antes;
  si "se te olvida" esa comprobación, el marcado de "PRESTADO" falla.
- **Posiciones descuadradas**: al listar se muestra `1, 2, 3...` pero los
  arrays empiezan en 0: por eso todos los métodos restan 1.

## 9. Retos

1. **Fácil — sin duplicados**: `anadir` debe rechazar un título que ya exista en
   la biblioteca, sin distinguir mayúsculas. Pista: `some()` más `toLowerCase()`.
2. **Medio — contadores**: que `listar()` termine con una línea como
   "Disponibles: 1 · Prestados: 1". Pista: `filter` por estado o un acumulador
   con `reduce` (lección 37).
3. **Difícil — historial de préstamos**: guarda cada préstamo/devolución en un
   array `{ titulo, accion, fecha }` (con `new Date()`), añade la opción `6`
   del menú para verlo y muestra la fecha con `toLocaleDateString()`.

## 10. Soluciones de los retos

**Reto 1.** Al principio del método `anadir`, antes de `push`:

```js
const tituloMinusculas = tituloLimpio.toLowerCase()
if (this.libros.some((libro) => libro.titulo.toLowerCase() === tituloMinusculas)) {
    return { ok: false, mensaje: `"${tituloLimpio}" ya está en la biblioteca.` }
}
```

**Reto 2.** En `listar()`:

```js
const disponibles = this.libros.filter((libro) => !libro.prestado).length
const prestados = this.libros.length - disponibles
return lineas + `\nDisponibles: ${disponibles} · Prestados: ${prestados}`
```

En las prestadas por el método `prestar()` el `libro.prestado` se pone a `true`.

**Reto 3.** En el constructor:

```js
this.historial = []
```

En `prestar()` y `devolver()`, tras tener éxito:

```js
this.historial.push({
    titulo: libro.titulo,
    accion: "préstamo",
    fecha: new Date()
})
```

Y un método que lo muestre:

```js
mostrarHistorial() {
    if (this.historial.length === 0) return "Sin movimientos."
    return this.historial
        .map((m) => `${m.fecha.toLocaleDateString()} — ${m.accion}: ${m.titulo}`)
        .join("\n")
}
```

La opción 6 del menú imprime `biblioteca.mostrarHistorial()`.