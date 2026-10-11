# Proyecto 02 — Landing responsive «Pluma»

Página de presentación de un producto ficticio («Pluma», una aplicación de
apuntes): cabecera, llamada a la acción, tarjetas de características,
sección informativa y pie de página. Diseño mobile-first: se adapta a móvil
y escritorio sin JavaScript.

## Objetivo

Practicar una landing page realista y, sobre todo, el diseño responsive que
aprendiste en la lección 22: estilos base para el móvil y mejoras con
`@media (min-width)` para pantallas más anchas.

## Conceptos que se practican

- Estructura semántica: `header`, `nav`, `main`, `section`, `article`,
  `footer`.
- Llamada a la acción (CTAs) con dos estilos de botón.
- Flexbox para tarjetas y cabecera (lecciones 18-19).
- Grid para la sección informativa en escritorio (lección 20).
- Diseño mobile-first y media queries (lección 22).
- Imágenes locales con `alt` y `max-width: 100%` para que no desborden.

## Cómo ejecutar el proyecto

1. Abre `proyectos/02-landing-responsive` y haz doble clic en
   `index.html`.
2. Estrecha y ensancha la ventana del navegador: verás la página pasar de
   una columna (móvil) a dos (escritorio).
3. Sin servidor, instalación ni recursos externos.

## Cómo está organizado

| Archivo | Contenido |
|---|---|
| `index.html` | Página completa: cabecera, hero con CTA, tarjetas, información y pie. |
| `styles.css` | Estilos separados; base móvil al principio y mejoras responsive al final. |
| `assets/producto.svg` | Ilustración local del producto (cuaderno de apuntes de muestra). |
| `README.md` | Esta guía. |

El botón «Emprender gratis» lleva a la sección de características: es una
ancla, no hay ningún formulario de pago de verdad.

## Tres mejoras progresivas para intentar

1. **Añade una cuarta tarjeta** de características; con el `flex` actual
   se acomoda sola, pero prueba también a cambiar el ancho en que el
   `flex-direction` pasa de columna a fila (el `640px` de la media query).
2. **Nueva sección «Precios»** con tres planes básicos (una tarjeta por
   plan) y su enlace en la navegación.
3. **Cambia el tema y la imagen**: redefine las variables de `:root` y
   sustituye `assets/producto.svg` por tu propia ilustración (puedes
   dibujar otra versión en SVG o usar una foto local).

## Lista de comprobación manual

- [ ] Se abre con doble clic en `index.html`.
- [ ] En el ancho de un móvil (unos 400 px) todo se ve en una columna y no
      hay desbordamiento horizontal.
- [ ] Al ampliar la ventana, el hero y la sección informativa pasan a dos
      columnas.
- [ ] Las tres tarjetas se reparten el ancho en escritorio.
- [ ] Los enlaces del menú saltan a sus secciones.
- [ ] Los botones tienen contraste y muestran un foco claro con el teclado.
- [ ] Las dos imágenes tienen textos alternativos y nunca se salen de su
      zona.
- [ ] El pie enlaza de vuelta al índice del curso.