# Proyecto 01 — Página personal

Una página personal de ejemplo: presentación con imagen local, navegación
por anclas, aficiones, enlaces de muestra y contacto ficticio.

## Objetivo

Practicar la estructura completa de una página: documento HTML semántico,
hoja CSS externa, variables de tema y diseño que se adapta al ancho de la
pantalla sin JavaScript.

## Conceptos que se practican

- HTML semántico: `header`, `nav`, `main`, `section`, `article`, `footer`.
- Enlaces internos por ancla (`#presentacion`, `#aficiones`, `#contacto`)
  y enlaces externos con `target="_blank"` y `rel="noopener"`.
- Imagen local con texto alternativo (`alt`).
- CSS externo enlazado con `link`, variables en `:root` y media queries
  mobile-first (`@media (min-width: 640px)`).

## Cómo ejecutar el proyecto

1. Abre la carpeta `proyectos/01-pagina-personal` en tu explorador de
   archivos.
2. Haz doble clic en `index.html`: se abrirá en tu navegador.
3. No necesita servidor, instalación ni conexión a internet (los dos
   enlaces externos de la sección de contacto son opcionales).

## Cómo está organizado

| Archivo | Contenido |
|---|---|
| `index.html` | Página completa con cabecera, navegación, presentación, aficiones, contacto y pie. |
| `styles.css` | Estilos del proyecto: tema con variables, base móvil y mejora para pantallas anchas. |
| `assets/avatar.svg` | Retrato ficticio local (ilustración vectorial de ejemplo). |
| `README.md` | Esta guía. |

El proyecto abre correctamente con doble clic porque todas las rutas son
relativas y los recursos son locales.

## Tres mejoras progresivas para intentar

1. **Añade una sección nueva** (por ejemplo «Mis estudios») con otra
   ancla en la navegación y una tarjeta con tu texto.
2. **Cambia el tema**: redefine `--color-primario`, `--color-acento` y
   `--color-fondo` en `:root` y observa cómo cambia toda la página a la vez
   (eso es lo que aprendiste en la lección de variables CSS).
3. **Haz la página tuya**: sustituye el avatar y los textos ficticios por
   contenido propio, y añade una foto tuya al mismo `assets/` con su `alt`.

## Lista de comprobación manual

- [ ] La página se abre con doble clic en `index.html`.
- [ ] La navegación salta a cada sección al pulsar sus enlaces.
- [ ] El avatar se ve y tiene texto alternativo accesible.
- [ ] Los enlaces externos abren una pestaña nueva; si fallan, la página
      sigue funcionando.
- [ ] Con el teclado (Tab), se ve siempre un anillo de foco claro.
- [ ] Al estrechar la ventana, la presentación se apila en una columna y
      no hay desbordamiento horizontal.
- [ ] En el pie hay un enlace de vuelta al índice del curso.