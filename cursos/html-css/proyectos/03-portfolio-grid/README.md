# Proyecto 03 — Portfolio con Grid

Portfolio de ejemplo («Lucía Fernández»): cabecera, presentación,
cuadrícula de proyectos, sección de contacto con formulario y pie de
página. Usa CSS Grid para la cuadrícula y Flexbox para la cabecera y el
interior de cada tarjeta.

## Objetivo

Practicar Grid y Flexbox juntos en un proyecto realista (lecciones 18-21):
Grid organiza la cuadrícula de proyectos, y Flexbox resuelve la cabecera y
el contenido de cada tarjeta. La cuadrícula se adapta sola al ancho de la
pantalla con `repeat(auto-fill, minmax(220px, 1fr))`.

## Conceptos que se practican

- CSS Grid: `grid-template-columns`, `repeat`, `auto-fill` y `minmax`
  (lección 20).
- Flexbox: cabecera, tarjetas y etiquetas (lecciones 18-19).
- HTML semántico con `article` y una sección de contacto con formulario
  accesible (`label` asociado por `for`/`id`).
- Reutilización de recursos locales del curso: las miniaturas usan
  `images/imagen-ejemplo.svg`, la ilustración de muestra del curso
  (`../../images/imagen-ejemplo.svg`).

## Cómo ejecutar el proyecto

1. Abre `proyectos/03-portfolio-grid` y haz doble clic en `index.html`.
2. Estrecha y ensancha la ventana: la cuadrícula pasa de una columna en
   móvil a varias en escritorio sin ninguna media query.
3. El formulario del contacto es de práctica: al pulsar «Enviar mensaje»,
   la página se limita a recargar la propia sección; no envía datos.

## Cómo está organizado

| Archivo | Contenido |
|---|---|
| `index.html` | Cabecera, presentación, seis tarjetas de proyectos, contacto y pie. |
| `styles.css` | Estilos separados: tema, cuadrícula Grid, tarjetas Flexbox y formulario. |
| `README.md` | Esta guía. |

Las rutas a la imagen del curso son relativas y se verifican en la
comprobación final: el proyecto se abre con doble clic desde su carpeta.

## Tres mejoras progresivas para intentar

1. **Añade dos proyectos más**: duplica una tarjeta y cambia título,
   descripción y etiquetas. La cuadrícula los colocará automáticamente.
2. **Dale un enlace real a cada tarjeta**: crea una página interior de
   proyecto (por ejemplo `proyectos/tienda-verde.html`) y sustituye el
   enlace «Ver proyecto →» para que apunte a la página interior.
3. **Cambia la imagen por proyecto**: en lugar de repetir
   `imagen-ejemplo.svg`, crea una miniatura propia por proyecto dentro de
   `proyectos/03-portfolio-grid/assets/` y actualiza cada `src` con su
   `alt` correspondiente.

## Lista de comprobación manual

- [ ] Se abre con doble clic en `index.html`.
- [ ] En móvil la cuadrícula muestra una columna; en escritorio, varias
      columnas del mismo tamaño.
- [ ] Las seis tarjetas se ven alineadas y con las etiquetas dentro.
- [ ] Las miniaturas se cargan (son la imagen local del curso) y cada una
      tiene texto alternativo.
- [ ] El formulario: los tres campos tienen etiqueta, el foco es visible
      con el teclado y el envío solo recarga la sección.
- [ ] El menú salta a Presentación, Proyectos y Contacto.
- [ ] El pie enlaza de vuelta al índice del curso.