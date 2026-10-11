# Inventario del material formativo

Generado el 11 de octubre de 2026 (tanda 9, auditoría final) con inspección
directa de los archivos en `cursos/`.

## Conteo real por curso

Los totales se obtuvieron recorriendo cada carpeta con `Get-ChildItem -Recurse
-File` (archivos, sin contar carpetas).

| Curso | Total | Desglose por extensión |
|---|---|---|
| `cursos/javascript/` | 67 | `.js` 57 · `.cjs` 1 · `.html` 2 · `.md` 6 · `.json` 1 |
| `cursos/html-css/` | 55 | `.html` 33 · `.css` 11 · `.md` 5 · `.svg` 3 · `.js` 1 · `.vtt` 1 · `.wav` 1 |
| **Total cursos** | **122** | — |

Sin `node_modules` ni dependencias declaradas (`package.json` sin
`dependencies` ni `devDependencies`).

## Criterio de clasificación

- **Lección / ejercicio**: archivo de estudio con número en el nombre
  (`00-`…`45-`). Se considera "ejercicio" el que lleva `-exercises` en el
  nombre; el resto es teoría con ejercicios y soluciones al final.
- **Índice**: `INDEX.md` de cada curso y la portada `index.html` de html-css.
- **Recurso**: archivo auxiliar que las lecciones referencian (CSS externo,
  SVG, audio, subtítulos, imágenes).
- **Proyecto**: carpeta de proyecto integrador con su propio `index.html`/
  `main.js`.

## Estructura detallada

### `cursos/javascript/` (67 archivos)

- **Estudio numerado (48)**: 46 lecciones/ejercicios `00-45` (la 30 es
  `30-import-external-modules.cjs`; la 43 y la 44 tienen par `.html` y `.js`)
  y 2 `.html` de demostración DOM. Los ejercicios clásicos
  (`03-beginner-exercises`, `05-operators-exercises`, `07`, `09`, `13`, `15`,
  `17`, `19`, `21`, `23`, `25`, `27`, `31`) se integran en el orden del índice
  junto a su lección.
- **`utils/` (4)**: `constants.js`, `index.js`, `mathFunctions.js`,
  `mixedExports.js`.
- **`components/` (1)**: `Printer.js`.
- **`proyectos/` (13)**: `1-calculadora` … `5-consulta-api`, cada uno con su
  `main.js` y `README.md`, más `libros.js` y `errores.js` compartidos.
- **Raíz (2)**: `INDEX.md` y `package.json` (`"type": "module"`).

### `cursos/html-css/` (55 archivos)

- **Portada (1)**: `index.html`.
- **`html/` (12)**: lecciones numeradas `01-06` (la `03` tiene 3 páginas) e
  `intro-html`, `tablas`, `semantica`, `multimedia`; 10 lecciones en total.
- **`css/` (17)**: 15 lecciones numeradas `01-15` + demo `integrarCSS/`
  (página y hoja propia). Las lecciones llevan estilos embebidos salvo las de
  práctica (19 y 21), que enlazan su hoja en `css/ejemplos/`.
- **`css/ejemplos/` (6 hojas)**: `01`, `02`, `04`, `05`, `09`, `11`.
- **`proyectos/` (13)**: `01-pagina-personal`, `02-landing-responsive`,
  `03-portfolio-grid`, `04-app-tareas` (con `app.js`): 4 páginas, 4 hojas,
  4 `README.md` y 1 script.
- **Recursos (5)**: `images/imagen-ejemplo.svg`, `assets/avatar.svg`,
  `assets/producto.svg`, `html/media/tono-ejemplo.wav`,
  `html/media/subtitulos-ejemplo.vtt`.

## Validaciones realizadas

### JavaScript (Node.js v24.12.0)

- `node --check` en los 58 archivos `.js`/`.cjs` de `cursos/javascript/` y en
  `proyectos/04-app-tareas/app.js`: sin errores de sintaxis.
- Ejecución segura (entrada por pipe, modos `demo`/local donde existen):
  proyectos 1-5 y lecciones 32-42 y 45: todas terminan con `exit=0` y salida
  correcta (casos válidos e inválidos probados en calculadora, agenda y
  biblioteca).
- `43-dom.js` y `44-eventos.js`: todos los `getElementById`/`querySelector`
  usados existen en su `.html` (los ids de los bloques de ejercicio son
  propuestas para el alumno, no referencias).
- Enlaces de `INDEX.md` y de los `README.md` de proyectos: sin rutas rotas.

### HTML y CSS

- Enlaces y recursos locales de los 33 `.html`: sin faltas reales (ver
  "Plantillas intencionales").
- Formularios: todo `<input>`/`<textarea>`/`<select>` con `id` tiene su
  `<label for>`.
- Selectores de las 11 hojas CSS externas vs su HTML enlazado: todas
  vinculadas correctamente; solo faltan clases creadas dinámicamente por
  `app.js` en el proyecto 04 (esperado).
- Enlaces de `INDEX.md` y portada: sin rutas rotas.
- `git diff --check`: sin espacios en blanco sobrantes.

## Errores encontrados y corregidos en esta tanda

1. `cursos/javascript/package.json`: la descripción decía "Lecciones 00-37";
   corregida a "Lecciones 00-45, ejercicios, proyectos, utils y components".
2. `cursos/javascript/INDEX.md`: omitía `03-beginner-exercises.js` y
   `05-operators-exercises.js`; añadidos y renumerado el bloque de orden de
   estudio (44 → 46 filas).

(Correcciones de tandas anteriores: limpiadas reglas CSS muertas `.fx.gap` y
`.gr.mm` en la tanda 7; `yo.png` retirado del curso en la tanda 5.)

## Plantillas intencionales (no son errores)

- `css/01-introduccion-css.html` referencia `mis-estilos.css`: hoja de
  ejemplo que el alumno debe crear.
- `html/multimedia.html`: `../media/cancion.mp3`/`.ogg` y
  `../media/presentacion.mp4`/`.webm` son fuentes alternativas de
  demostración explicadas en la lección (el póster y `subtitulos-ejemplo.vtt`
  existen); `mi-pelicula.*` es el ejercicio propuesto al final.
- `html/tablas.html`: `logo.svg` aparece dentro de un ejemplo de código
  (comparativa MAL/BIEN).

## Limitaciones

- Sin navegador disponible: no se probó la apariencia visual ni el
  comportamiento interactivo de HTML/CSS, DOM, eventos ni de la app de
  tareas; tampoco la petición real a la API del proyecto 5 (solo su modo
  local).
- La entrada interactiva de los proyectos se simuló canalizando texto por
  `stdin`; la experiencia de usuario con terminal real no se evaluó.

## Estado de git

Sin commits ni operaciones remotas en toda la tarea: el material está en la
rama `programacion-cleanup` (HEAD `f301eac`) acumulado como modificaciones y
archivos nuevos sin commitear. Rutas protegidas (`universidad/`,
`experimentos/` y `universidad/semestre-02-gti/examenes/global.js`) intactas.