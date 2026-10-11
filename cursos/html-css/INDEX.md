# Índice del curso de HTML y CSS

Curso personal de HTML y CSS. Están completos el bloque de HTML desde cero
(10 lecciones), el bloque completo de CSS (15 lecciones: fundamentos 11-15
y avanzado 16-25) y los proyectos integradores (`proyectos/`, cuatro:
tres de HTML y CSS y uno con JavaScript). La auditoría final se realizó en
la tanda 9 (véase [../INVENTARIO.md](../INVENTARIO.md)).

## Cómo empezar desde cero

1. abre la carpeta `cursos/html-css` en tu explorador de archivos.
2. Haz doble clic en [index.html](index.html) (esta página de inicio) para
   abrirla en el navegador.
3. Haz clic en cada lección de la lista. También puedes abrir directamente
   cualquier archivo `.html` de la carpeta `html/` con doble clic.

## HTML y CSS no se ejecutan: se abren en el navegador

A diferencia de JavaScript (que se ejecuta con Node.js en la terminal),
los archivos HTML y CSS son documentos que el **navegador** interpreta y
pinta. Para verlos solo hace falta abrirlos en Chrome, Firefox, Edge, etc.
No necesitas un servidor ni herramientas adicionales.

## Orden de estudio (secuencia recomendada)

El número de la primera columna es el orden de estudio. El nombre del
archivo puede diferir: la lección 9 vive en `html/06-forms.html` (su
numeración histórica) y la 10 en `html/multimedia.html`.

| Orden | Archivo | Tema |
|---|---|---|
| 0 | [html/intro-html.html](html/intro-html.html) | Introducción: qué es HTML, estructura mínima, atributos, anidamiento |
| 1 | [html/01-index.html](html/01-index.html) | Encabezados y párrafos |
| 2 | [html/02-listas.html](html/02-listas.html) | Listas ordenadas y no ordenadas |
| 3 | [html/03-enlaces/enlaces01.html](html/03-enlaces/enlaces01.html) | Enlaces (parte 1) |
| 4 | [html/04-imagenes.html](html/04-imagenes.html) | Imágenes, alt y title |
| 5 | [html/05-rutas.html](html/05-rutas.html) | Rutas relativas y absolutas |
| 7 | [html/tablas.html](html/tablas.html) | Tablas semánticas y cuándo no usarlas |
| 8 | [html/semantica.html](html/semantica.html) | Semántica estructural: header, nav, main, section, article, aside, footer |
| 9 | [html/06-forms.html](html/06-forms.html) | Formularios ampliados: label, input, select, validación nativa, sin backend |
| 10 | [html/multimedia.html](html/multimedia.html) | Audio, vídeo, fuentes alternativas y subtítulos (recursos locales) |
| 11 | [css/01-introduccion-css.html](css/01-introduccion-css.html) | Introducción: qué es CSS, reglas, tres formas de aplicarlo |
| 12 | [css/02-selectores.html](css/02-selectores.html) | Selectores: etiqueta, clase, ID, descendentes, combinadores, atributos |
| 13 | [css/03-cascada-especificidad.html](css/03-cascada-especificidad.html) | Cascada, herencia, especificidad y `!important` |
| 14 | [css/04-colores-unidades-tipografia.html](css/04-colores-unidades-tipografia.html) | Colores, unidades (px, %, em, rem, vw, vh) y tipografía |
| 15 | [css/05-modelo-caja.html](css/05-modelo-caja.html) | Modelo de caja, box-sizing y desbordamiento |
| 16 | [css/06-display-flujo.html](css/06-display-flujo.html) | Display y flujo: block, inline, inline-block, none, visibility y overflow |
| 17 | [css/07-posicionamiento.html](css/07-posicionamiento.html) | Posicionamiento: static, relative, absolute, fixed, sticky y z-index |
| 18 | [css/08-flexbox.html](css/08-flexbox.html) | Flexbox: contenedor e ítems, ejes, dirección, justificación y alineación |
| 19 | [css/09-flexbox-practica.html](css/09-flexbox-practica.html) | Práctica de flexbox: nav, tarjetas y filas con espacios (con su hoja en `css/ejemplos/`) |
| 20 | [css/10-grid.html](css/10-grid.html) | Grid: pistas `fr`, repeat, minmax, gap y colocación por líneas |
| 21 | [css/11-grid-practica.html](css/11-grid-practica.html) | Práctica de grid: plantilla por áreas (`grid-template-areas`) y adaptación móvil (con su hoja en `css/ejemplos/`) |
| 22 | [css/12-diseno-responsive.html](css/12-diseno-responsive.html) | Diseño responsive: mobile-first, media queries y anchos fluidos |
| 23 | [css/13-pseudoclases-elementos.html](css/13-pseudoclases-elementos.html) | Pseudo-clases y pseudo-elementos: hover, focus-visible, checked, disabled, before/after |
| 24 | [css/14-variables-css.html](css/14-variables-css.html) | Variables CSS: `--nombre`, var(), herencia, valor por defecto y temas |
| 25 | [css/15-accesibilidad-depuracion.html](css/15-accesibilidad-depuracion.html) | Accesibilidad y depuración: contraste, foco visible, reduced-motion y DevTools |
| — | [css/integrarCSS/index.html](css/integrarCSS/index.html) | Demostración de cómo se integra CSS + [variables.css](css/integrarCSS/variables.css) |

Sugerencia: la lección 03 tiene tres páginas enlazadas entre sí
([enlaces01.html](html/03-enlaces/enlaces01.html),
[enlaces02.html](html/03-enlaces/enlaces02.html),
[enlaces03.html](html/03-enlaces/enlaces03.html)); recórrelas en ese orden.

## Integración con el curso de JavaScript

La práctica de DOM y eventos del otro curso ([43 - DOM](../javascript/43-dom.html)
y [44 - Eventos](../javascript/44-eventos.html)) es la continuación natural:
usa la estructura y los formularios vistos aquí y les añade comportamiento
con JavaScript. Se abren también en el navegador.

## Proyectos integradores

Todos se abren con doble clic en su `index.html`, sin servidor ni
dependencias. Contenido y diseño son ficticios. Cada proyecto incluye su
`README.md` con explicación, mejoras propuestas y comprobación manual.

| Proyecto | Archivo | Qué practica | Requisitos previos |
|---|---|---|---|
| 01 - Página personal | [proyectos/01-pagina-personal/index.html](proyectos/01-pagina-personal/index.html) | Estructura semántica, navegación por anclas, imagen local, variables y responsive | HTML 0-10; CSS 11, 22 y 24 |
| 02 - Landing responsive | [proyectos/02-landing-responsive/index.html](proyectos/02-landing-responsive/index.html) | Landing con llamada a la acción, tarjetas Flexbox, grid y diseño mobile-first | CSS 18-22 |
| 03 - Portfolio con Grid | [proyectos/03-portfolio-grid/index.html](proyectos/03-portfolio-grid/index.html) | Cuadrícula de proyectos con Grid (`auto-fill` + `minmax`), tarjetas Flexbox y formulario accesible | CSS 18-21; formularios (lección 9) |
| 04 - App de tareas | [proyectos/04-app-tareas/index.html](proyectos/04-app-tareas/index.html) | HTML + CSS + JavaScript: DOM, eventos, `textContent` y accesibilidad | CSS completo; JS 43-44 (DOM y eventos) |

El 04 guarda relación directa con las lecciones [43 - DOM](../javascript/43-dom.html)
y [44 - Eventos](../javascript/44-eventos.html) del curso de JavaScript:
es su versión completa en miniatura.

## Recursos del curso (locales)

- [images/imagen-ejemplo.svg](images/imagen-ejemplo.svg): ilustración
  genérica local (creada para el curso) que usa la lección de imágenes y
  como póster en la lección de multimedia.
- [media/tono-ejemplo.wav](media/tono-ejemplo.wav): tono de ejemplo
  (1,5 s) generado para el curso: permite practicar audio sin internet.
- [media/subtitulos-ejemplo.vtt](media/subtitulos-ejemplo.vtt): subtítulo
  de ejemplo en formato WebVTT para la lección de multimedia.
- Hojas de demostración del bloque CSS (cada lección enlaza la suya desde
  `css/ejemplos/`): [01-introduccion-css.css](css/ejemplos/01-introduccion-css.css),
  [02-selectores.css](css/ejemplos/02-selectores.css),
  [04-tipografia.css](css/ejemplos/04-tipografia.css),
  [05-modelo-caja.css](css/ejemplos/05-modelo-caja.css),
  [09-flexbox-practica.css](css/ejemplos/09-flexbox-practica.css) y
  [11-grid-practica.css](css/ejemplos/11-grid-practica.css). Las lecciones
  03, 06, 07, 08, 10 y 12-15 usan estilos propios en su página porque
  demuestran conceptos (orden de aparición, posicionamiento, responsive,
  variables...) más que una hoja externa.
- La fotografía personal que antes se usaba como ejemplo fue retirada del
  curso para no emplear datos personales en los materiales.

## Estado

- Auditoría final realizada en la tanda 9: lecciones, enlaces, recursos y
  proyectos revisados; sin incidencias abiertas. Inventario y detalle en
  [../INVENTARIO.md](../INVENTARIO.md).

## Notas de las últimas entregas

- Se creó [index.html](index.html) como página de inicio del curso; las
  lecciones existentes ya enlazaban correctamente con «Página de Inicio»
  usando `../index.html`.
- Se corrigió la ruta al README del repositorio en
  [html/05-rutas.html](html/05-rutas.html) (antes salía fuera de la carpeta
  del repositorio).
- La demostración [css/integrarCSS/index.html](css/integrarCSS/index.html)
  y su hoja [css/integrarCSS/variables.css](css/integrarCSS/variables.css)
  dejaron de estar vacías: ahora muestran un ejemplo CSS real y visible.
- Tanda 5: creadas [html/intro-html.html](html/intro-html.html),
  [html/tablas.html](html/tablas.html),
  [html/semantica.html](html/semantica.html) y
  [html/multimedia.html](html/multimedia.html); ampliado
  [html/06-forms.html](html/06-forms.html) (label, textarea, select,
  fieldset/legend, validación nativa, accesibilidad y formulario
  demostrativo sin backend); corregidos detalles menores de las lecciones
  existentes (`lang="es"`, `meta charset`, `meta viewport` y una errata en
  `02-listas.html`); añadidos los recursos locales de multimedia
  (tono-ejemplo.wav y subtitulos-ejemplo.vtt).
- Tanda 6: creado el bloque de fundamentos de CSS en `css/`
  (lecciones 11 a 15) con sus hojas de demostración en `css/ejemplos/`;
  la lección 03 demuestra la cascada con estilos propios de la página a
  propósito; la demo existente [css/integrarCSS/](css/integrarCSS/index.html)
  se mantiene intacta y figura como material complementario; la portada y
  este índice distinguen las lecciones terminadas (HTML 0-10 y CSS 11-15)
  de los bloques pendientes.
- Tanda 7: creado el bloque avanzado de CSS en `css/` (lecciones 16 a 25:
  06-display-flujo, 07-posicionamiento, 08-flexbox, 09-flexbox-práctica,
  10-grid, 11-grid-práctica, 12-responsive, 13-pseudo-clases y elementos,
  14-variables y 15-accesibilidad y depuración). Las dos lecciones de
  práctica (19 y 21) enlazan sus hojas en `css/ejemplos/`
  (09-flexbox-practica.css y 11-grid-practica.css); el resto lleva estilos
en la propia página porque demuestran su concepto. Con esto el curso de
   HTML y CSS queda completo a falta de los proyectos integradores y la
   revisión final.
- Tanda 8: creados los cuatro proyectos integradores en `proyectos/`
   (01-página personal, 02-landing responsive, 03-portfolio con Grid y
   04-app de tareas con JavaScript). Cada uno con su `index.html`, hoja
   CSS (y `app.js` en el 04), recursos locales propios o reutilizados
   (`images/imagen-ejemplo.svg` para las miniaturas del 03) y su
`README.md` con mejoras y comprobación manual. Con esto los proyectos
    están terminados.
- Tanda 9: auditoría final del curso completo. Se revisaron enlaces y
   recursos locales, formularios, selectores de hojas externas, la
   coherencia de los índices y la estructura didáctica; se completó el
   inventario en [../INVENTARIO.md](../INVENTARIO.md).