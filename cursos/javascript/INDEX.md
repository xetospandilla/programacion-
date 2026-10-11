# Índice del curso de JavaScript

Curso personal de JavaScript. El orden de estudio NO coincide con el orden
alfabético de los archivos: sigue la secuencia de esta página.

## Cómo empezar desde cero

1. Instala Node.js desde su página oficial (https://nodejs.org).
2. Comprueba la instalación abriendo una terminal y escribiendo `node --version`.
3. Entra en esta carpeta desde la terminal (`cd` hasta `cursos/javascript`).
4. Ejecuta cada lección con `node nombre-del-archivo.js`.

Todas las instrucciones de ejecución y los primeros pasos están explicados
en la [lección 32](32-entorno.js), pensada para quien nunca usó una terminal.

## Cómo ejecutar los archivos

```bash
node 00-helloworld.js
node 32-entorno.js
```

- Los archivos `.js` de este curso se ejecutan con **Node.js** en la terminal.
- El archivo `30-import-external-modules.cjs` se ejecuta igualmente con `node`,
  pero usa el sistema de módulos CommonJS (`require`), frente a los módulos
  ES (`import`/`export`) del resto.
- Gracias al `package.json` de esta carpeta, todos los archivos `.js` se
  tratan como módulos ES modernos.
- El JavaScript del **navegador** (el que modifica páginas web) es otro
  entorno distinto: no se ejecuta con `node` sino dentro de una página
  HTML. Se cubre en las lecciones 43 y 44 (bloque H).

## Orden de estudio (secuencia recomendada)

### Bloque A — Entorno y primeras instrucciones

| Orden | Archivo | Tema |
|---|---|---|
| 1 | [32-entorno.js](32-entorno.js) | **NUEVA** — Entorno, terminal y ejecución |
| 2 | [00-helloworld.js](00-helloworld.js) | Hola mundo y comentarios |
| 3 | [01-variables.js](01-variables.js) | Variables: var, let, const |
| 4 | [02-datatypes.js](02-datatypes.js) | Tipos primitivos |
| 5 | [03-beginner-exercises.js](03-beginner-exercises.js) | Ejercicios: primeros pasos (comentarios, variables y tipos) |
| 6 | [04-operators.js](04-operators.js) | Operadores y truthy/falsy |
| 7 | [05-operators-exercises.js](05-operators-exercises.js) | Ejercicios de operadores (aritmética, asignación, comparación) |
| 8 | [33-conversion-tipos.js](33-conversion-tipos.js) | **NUEVA** — Conversión de tipos, NaN, == vs === |

### Bloque B — Strings, números, condicionales y bucles

| Orden | Archivo | Tema |
|---|---|---|
| 9 | [06-strings.js](06-strings.js) | Strings y plantillas |
| 10 | [07-strings-exercises.js](07-strings-exercises.js) | Ejercicios de strings |
| 11 | [34-numeros.js](34-numeros.js) | **NUEVA** — Números y Math |
| 12 | [08-conditionals.js](08-conditionals.js) | Condicionales |
| 13 | [09-conditionals-exercises.js](09-conditionals-exercises.js) | Ejercicios de condicionales |
| 14 | [35-bucles.js](35-bucles.js) | **NUEVA** — Bucles ampliados y cortocircuito |
| 15 | [14-loops.js](14-loops.js) | Bucles: for, while, do...while, for...of |
| 16 | [15-loops-exercises.js](15-loops-exercises.js) | Ejercicios de bucles |

### Bloque C — Funciones, ámbito y closures

| Orden | Archivo | Tema |
|---|---|---|
| 17 | [16-functions.js](16-functions.js) | Funciones |
| 18 | [17-functions-exercises.js](17-functions-exercises.js) | Ejercicios de funciones |
| 19 | [36-ambito-closures.js](36-ambito-closures.js) | **NUEVA** — Ámbito y closures |

### Bloque D — Arrays, objetos y métodos de arrays

| Orden | Archivo | Tema |
|---|---|---|
| 20 | [10-array.js](10-array.js) | Arrays |
| 21 | [18-objects.js](18-objects.js) | Objetos |
| 22 | [19-objects-exercises.js](19-objects-exercises.js) | Ejercicios de objetos |
| 23 | [37-metodos-arrays.js](37-metodos-arrays.js) | **NUEVA** — map, filter, reduce, find, some, every, sort |
| 24 | [20-destructuring-spreading.js](20-destructuring-spreading.js) | Desestructuración y propagación |
| 25 | [21-destructuring-spreading-exercises.js](21-destructuring-spreading-exercises.js) | Ejercicios de desestructuración |
| 26 | [11-set.js](11-set.js) | Set |
| 27 | [12-map.js](12-map.js) | Map |
| 28 | [13-structures-exercises.js](13-structures-exercises.js) | Ejercicios de estructuras |

### Bloque E — Errores, depuración y consola

| Orden | Archivo | Tema |
|---|---|---|
| 29 | [24-error-handling.js](24-error-handling.js) | Manejo de errores |
| 30 | [25-error-handling-exercises.js](25-error-handling-exercises.js) | Ejercicios de errores |
| 31 | [26-console-methods.js](26-console-methods.js) | Métodos de consola |
| 32 | [27-console-methods-exercises.js](27-console-methods-exercises.js) | Ejercicios de consola |

### Bloque F — Clases y módulos

| Orden | Archivo | Tema |
|---|---|---|
| 33 | [22-classes.js](22-classes.js) | Clases |
| 34 | [23-classes-exercises.js](23-classes-exercises.js) | Ejercicios de clases |
| 35 | [28-export-modules.js](28-export-modules.js) | Módulos: exportar |
| 36 | [29-import-modules.js](29-import-modules.js) | Módulos: importar |
| 37 | [31-modules-exercises.js](31-modules-exercises.js) | Ejercicios de módulos |
| 38 | [30-import-external-modules.cjs](30-import-external-modules.cjs) | CommonJS vs ES modules |

### Bloque G — JSON, fechas y asincronía

| Orden | Archivo | Tema |
|---|---|---|
| 39 | [38-json-fechas-math.js](38-json-fechas-math.js) | **NUEVA** — JSON, fechas y Math aplicado |
| 40 | [39-callbacks-temporizadores.js](39-callbacks-temporizadores.js) | **NUEVA** — Callbacks y temporizadores |
| 41 | [40-promesas.js](40-promesas.js) | **NUEVA** — Promesas |
| 42 | [41-async-await.js](41-async-await.js) | **NUEVA** — async/await y Promise.all |
| 43 | [42-fetch-api.js](42-fetch-api.js) | **NUEVA** — fetch y consumo de APIs |

Prerrequisitos dentro del curso: la 38 repasa strings, objetos y `try/catch`;
la 39 necesita funciones y `map` (lecciones 16 y 37); la 40 se apoya en
gráficos de la 39; la 41 exige promesas (40) y `try/catch` (24); la 42
combina promesas, `async/await`, JSON, objetos y arrays (40, 41, 38, 18, 37).
Su ejemplo principal funciona sin conexión; el ejemplo real con Internet está
marcado como opcional y no se ejecuta en las comprobaciones del curso.

### Bloque H — DOM, eventos y buenas prácticas

| Orden | Archivo | Tema |
|---|---|---|
| 44 | [43-dom.html](43-dom.html) + [43-dom.js](43-dom.js) | **NUEVA** — El DOM: seleccionar, modificar y crear elementos |
| 45 | [44-eventos.html](44-eventos.html) + [44-eventos.js](44-eventos.js) | **NUEVA** — Eventos, formularios y lista de tareas |
| 46 | [45-buenas-practicas.js](45-buenas-practicas.js) | **NUEVA** — Buenas prácticas |

El bloque H se estudia con un NAVEGADOR, no con `node`:

- La 43 abre `43-dom.html` y contrasta la teoría (comentarios de
  `43-dom.js`) con la práctica (botones de la página).
- La 44 abre `44-eventos.html`: incluye la lista de tareas funcional.
- La 45, en cambio, sí se ejecuta con `node 45-buenas-practicas.js`.

Enlaces entre lecciones: la 43 prepara los cimientos (`querySelector`,
`textContent`, `classList`, crear/eliminar nodos); la 44 los usa (eventos,
`submit`, `preventDefault`, `event.target`, creación segura con
`textContent`) y la 45 repasa ejemplos de las lecciones 33 a 42 con la
mirada puesta en la lectura, la validación y la depuración.

## Proyectos prácticos (orden de dificultad)

Los proyectos conectan las lecciones con programas completos. Cada uno vive en
`proyectos/<nombre>/` con su propio README didáctico: código completo,
instrucciones de ejecución, ejemplos de entradas y salidas, errores frecuentes
y tres retos con solución razonada. Están ordenados de menor a mayor
complejidad.

| Orden | Proyecto | Qué practica | Lecciones que prepara |
|---|---|---|---|
| 1 | [1-calculadora-consola](proyectos/1-calculadora-consola/README.md) | Funciones, validación y errores | 16, 33, 34 |
| 2 | [2-adivina-numero](proyectos/2-adivina-numero/README.md) | Aleatoriedad, condicionales, bucles y contador | 08, 34, 35 |
| 3 | [3-agenda-contactos](proyectos/3-agenda-contactos/README.md) | Arrays, objetos, métodos de arrays y búsqueda | 10, 18, 37 |
| 4 | [4-biblioteca-libros](proyectos/4-biblioteca-libros/README.md) | Clases, módulos ES y organización en archivos | 22, 28, 29, 31 |
| 5 | [5-consulta-api](proyectos/5-consulta-api/README.md) | `fetch`, `async/await` y errores Red/HTTP/Formato | 40, 41, 42 |
| — | Práctica en navegador: [43-dom.html](43-dom.html) y [44-eventos.html](44-eventos.html) (lecciones 43-44, no modificadas en esta tanda) | DOM y eventos | 43, 44 |

Cómo ejecutar cada proyecto desde su directorio (`cd` dentro de
`cursos/javascript/proyectos/N-nombre`):

```bash
# Proyecto 1: calculadora
node main.js

# Proyecto 2: adivina el número (demo = número fijo para probar)
node main.js demo

# Proyecto 3: agenda de contactos
node main.js

# Proyecto 4: biblioteca (usa módulos: main.js importa ./libros.js)
node main.js

# Proyecto 5: consulta de API — modo LOCAL sin Internet (el modo real es opcional)
node main.js
node main.js real   # opcional: necesita conexión
```

Ningún proyecto necesita instalar dependencias: usan solo módulos nativos de
Node y el `"type": "module"` del `package.json` de esta carpeta. El proyecto 5
se valida en modo local; el modo real está explicado y etiquetado como opcional.

### Archivos auxiliares

- [utils/mathFunctions.js](utils/mathFunctions.js), [utils/constants.js](utils/constants.js),
  [utils/mixedExports.js](utils/mixedExports.js), [utils/index.js](utils/index.js)
  y [components/Printer.js](components/Printer.js): módulos de apoyo usados
  por los ejercicios de la lección 31.

### Bloques pendientes (se añadirán en próximas tandas)

- Organización de proyectos (estructura de carpetas, separación de
  responsabilidades y flujo de trabajo en proyectos pequeños).
- Repaso integrador de HTML y CSS (material del bloque `html-css`)
  aplicado a una página completa con JavaScript.
- Ampliación de la colección de proyectos (opcionales más grandes, por
  ejemplo un juego completo o una aplicación de notas con almacenamiento).

## Recursos complementarios

Las lecciones muestran referencias a vídeos de las clases originales en las
que se inspiran. Son material complementario opcional; este curso tiene su
propia explicación y no necesita los vídeos para avanzar. Si un enlace deja
de funcionar, no bloquea el estudio.

## Notas de esta tanda

### Tanda 4

- Carpeta nueva `proyectos/` con cinco proyectos guiados ordenados por
  dificultad; cada uno con su README didáctico y los archivos ejecutables.
- Los proyectos 1-4 son de consola (`readline`) y el 5 combina un modo local
  sin Internet (el que se valida) con un modo real opcional mediante `fetch`.
- Validado en esta tanda: `node --check` en los 7 archivos `.js` de los
  proyectos; ejecución de los cinco con entradas normales y casos inválidos
  (división por cero, texto en vez de número, fuera de rango, teléfono no
  numérico, doble préstamo...); el modo LOCAL del proyecto 5 y la
  demostración `errores.js` de los tres tipos de error.
- El modo REAL del proyecto 5 NO se ejecutó en las comprobaciones (requiere
  conexión); su código está explicado y el README lo marca como opcional.
- La práctica de DOM/eventos (43-44) no se ha modificado.

### Tanda 3

- Lecciones nuevas del bloque H: 43 (DOM), 44 (eventos + lista de tareas)
  y 45 (buenas prácticas).
- Las lecciones 43 y 44 son páginas HTML que se abren en un NAVEGADOR; sus
  archivos `.js` se cargan con `defer` y NO se ejecutan con `node`. La
  teoría vive en los comentarios de `43-dom.js` y `44-eventos.js`.
- La 45 sí se ejecuta con `node` y su salida está comprobada.
- Pruebas de esta tanda: `node --check` en los tres `.js`, ejecución de
  `45-buenas-practicas.js` y comprobaciones estáticas (enlaces,
  `lang="es"`, `defer` y coherencia entre los `id` del HTML y las
  selecciones del JS). La lista de tareas NO se probó en un navegador
  en esta tanda.

### Tanda 2

- Las lecciones 38 a 42 son nuevas (bloque G) y están marcadas como **NUEVA**
  en la tabla. Cubren JSON, fechas, Math, callbacks, temporizadores, promesas,
  `async/await`, `Promise.all`, `fetch` y APIs.
- Ejecución comprobada con Node: las cinco lecciones terminan solas (los
  temporizadores e intervalos se cancelan o finalizan) y sin errores.
- La lección 42 funciona sin conexión: su ejemplo principal simula la red con
  promesas, y el ejemplo real (`fetch` a JSONPlaceholder) está etiquetado como
  opcional, se ejecuta solo si se descomenta y NO se usa en las comprobaciones.
- Ningún archivo de la tanda 1 ni anterior se modificó en esta tanda; solo se
  añadieron las lecciones nuevas y este índice.

### Tanda 1

- Las lecciones 32 a 37 son nuevas y están marcadas como **NUEVA** en la tabla.
- Los archivos 14, 16 y 22 se corrigieron puntualmente (variables sin
  declaración) sin alterar su contenido didáctico.
- El `package.json` de esta carpeta habilita los módulos ES sin añadir
  dependencias externas.
