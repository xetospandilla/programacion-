# Inventario del material formativo

Actualizado el 12 de octubre de 2026 (tandas 14 y 16) con inspección directa
de los archivos en `cursos/`.

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
- **`html/` (12)**: 10 lecciones numeradas `00-09` (la `03` tiene 3 páginas:
  `enlaces01`, `enlaces02` y `enlaces03`).
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

## Errores encontrados y corregidos

### Tanda nocturna (actual)

1. Renombrado y renumerado el bloque `html/` a la secuencia `00-09`
   (6 renombrados con `git mv`): `intro-html`→`00-introduccion-html`,
   `01-index`→`01-encabezados-parrafos`, `tablas`→`06-tablas`,
   `semantica`→`07-semantica`, `06-forms`→`08-formularios`,
   `multimedia`→`09-multimedia`. Actualizadas todas las referencias en
   lecciones HTML, hojas CSS, `index.html` e `INDEX.md`.
2. Contraste: `.boton-claro` (landing) usaba un color con contraste
   insuficiente; corregido a `var(--color-primario)`. El `#777` de
   `.lista li.completada .texto` (app de tareas, 4,48:1) corregido a
   `#6b6b6b` (5,33:1). El estado vacío `.vacio` ya cumplía (6,94:1).
3. Navegación: `html/05-rutas.html` usaba `<button><a>` inválido; y
   `enlaces02`/`enlaces03` no tenían enlace de regreso; corregidos.
4. `javascript/43-dom.js`: errata «ussar» corregida.
5. `javascript/INDEX.md`: reordenado el bloque de bucles (`35-bucles` tras
   `14-loops`/`15-loops-exercises`), retiradas las marcas «NUEVA», añadidas
   remisiones en las lecciones 17, 19 y 43, y enlazado el bloque H con el
   curso de HTML/CSS.
6. `css/05-modelo-caja.html`: la promesa «en próximas entregas: más
   selectores, flexbox y grid» sustituida por enlaces a las lecciones
   existentes (02, 08/09 y 10).
7. `html/04-imagenes.html` y `html/05-rutas.html`: añadidos tres ejercicios
   cortos a cada una.

### Tanda 16 (HTML/CSS y documentación)

1. Corregidos los cuatro controles HTML inválidos `<button><a>` (en
   `html/01-encabezados-parrafos.html`, `html/02-listas.html`,
   `html/03-enlaces/enlaces01.html` y `html/04-imagenes.html`), sustituidos
   por `<p><a>` conservando destino y texto.
2. Añadido `rel="noopener"` a los tres `target="_blank"` de las páginas de
   enlaces (se mantuvo `target` por ser parte del ejemplo didáctico).
3. Completada la navegación de `css/05-modelo-caja.html` con el enlace
   «Siguiente: Display y flujo» a `06-display-flujo.html`.
4. Unificada la navegación del itinerario HTML (12 páginas): enlace al índice
   y enlaces «Anterior»/«Siguiente» encadenados según el orden 00-09 (con las
   tres partes de enlaces intercaladas).
5. `html-css/index.html`: reescrita la sección «Cómo navegar» para describir
   la navegación real (antes prometía «Página de Inicio» en todas).
6. Ortografía: `Imagenes`→`Imágenes` y `Pagina`→`Página` en
   `html/04-imagenes.html` y `html/05-rutas.html`.
7. `html-css/INDEX.md`: documentado el salto de orden 09→11 (el bloque de CSS
   empieza en el 11; no existe la lección 10).

### Tanda anterior

1. `cursos/javascript/package.json`: la descripción decía "Lecciones 00-37";
   corregida a "Lecciones 00-45, ejercicios, proyectos, utils y components".
2. `cursos/javascript/INDEX.md`: omitía `03-beginner-exercises.js` y
   `05-operators-exercises.js`; añadidos y renumerado el bloque de orden de
   estudio (44 → 46 filas).

(Correcciones de tandas anteriores: limpiadas reglas CSS muertas `.fx.gap` y
`.gr.mm` en la tanda 7; `yo.png` retirado del curso en la tanda 5.)

## Incidencias abiertas (no bloqueantes)

- Ninguna incidencia funcional conocida. Las comprobaciones de cierre (tanda
  17) pasan: `node --check` sin errores de sintaxis, `04-app-tareas` 30/30,
  proyectos 1-5 con `exit=0` y `audit.js` sin rutas rotas nuevas.
- El modo real (con Internet) del proyecto 5 de JavaScript no se ejecuta en
  las comprobaciones; queda verificado solo su modo local.
- Sin navegador: el comportamiento visual e interactivo de HTML/CSS, DOM,
  eventos y de la app de tareas no se ha probado.

## Plantillas intencionales (no son errores)

- `css/01-introduccion-css.html` referencia `mis-estilos.css`: hoja de
  ejemplo que el alumno debe crear.
- `html/09-multimedia.html`: `../media/cancion.mp3`/`.ogg` y
  `../media/presentacion.mp4`/`.webm` son fuentes alternativas de
  demostración explicadas en la lección (el póster y `subtitulos-ejemplo.vtt`
  existen); `mi-pelicula.*` es el ejercicio propuesto al final.
- `html/06-tablas.html`: `logo.svg` aparece dentro de un ejemplo de código
  (comparativa MAL/BIEN).

## Limitaciones

- Sin navegador disponible: no se probó la apariencia visual ni el
  comportamiento interactivo de HTML/CSS, DOM, eventos ni de la app de
  tareas; tampoco la petición real a la API del proyecto 5 (solo su modo
  local). No hay validación visual real de responsive, contraste, foco ni
  teclado.
- La entrada interactiva de los proyectos se simuló canalizando texto por
  `stdin`; la experiencia de usuario con terminal real no se evaluó.
- Los recursos multimedia de plantilla (`../media/cancion.*`, `presentacion.*`
  y `mi-pelicula.*`) y los enlaces de ejemplo documentados (`mis-estilos.css`,
  `logo.svg`) siguen sin existir a propósito: no son rutas rotas nuevas.

## Estado de git

Sin commits ni operaciones remotas en toda la tarea: el material está en la
rama `programacion-cleanup` (HEAD `572c873`) acumulado como modificaciones y
archivos sin commitear. Rutas protegidas (`universidad/`, `experimentos/` y
`universidad/semestre-02-gti/examenes/global.js`) intactas.