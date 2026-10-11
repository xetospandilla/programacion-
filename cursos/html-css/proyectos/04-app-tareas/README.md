# Proyecto 04 — App de tareas

Pequeña aplicación de tareas que integra HTML, CSS y JavaScript: añadir,
marcar/desmarcar y eliminar tareas, con mensaje cuando no hay ninguna y
contador de pendientes. Funciona sin servidor ni dependencias y NO guarda
nada: al recargar, empiezas de cero.

## Objetivo

Practicar la integración de los dos cursos: HTML y CSS (maquetación y
estilos) + JavaScript (DOM y eventos). Es la versión completa en miniatura
de lo que viste en las lecciones de DOM y eventos del curso de JavaScript.

## Cómo funciona cada archivo

| Archivo | Contenido |
|---|---|
| `index.html` | Estructura: formulario para añadir, contador (`aria-live`), mensaje de lista vacía, lista y pie. |
| `styles.css` | Estilos mobile-first, foco visible y el estado visual de tarea completada (tachado además del checkbox marcado). |
| `app.js` | Lógica: escucha el `submit`, valida el texto, crea cada fila con `createElement`, reacciona a los eventos `change` (marcar) y `click` (eliminar) y actualiza contador y mensajes. |
| `README.md` | Esta guía. |

Claves de `app.js` para revisar en clase:

- **Sin `innerHTML` con datos del usuario**: el texto de cada tarea se
  inserta con `textContent`; si un usuario escribiera HTML con etiquetas,
  se mostraría como texto normal (más seguro).
- **Eventos con `addEventListener`**: `submit` en el formulario, `change`
  en cada casilla y `click` en cada botón de eliminar.
- **Accesibilidad**: contador anunciado con `aria-live="polite"`, error
  con `role="alert"`, etiquetas asociadas y devolución del foco al campo
  después de añadir.

## Cómo ejecutar el proyecto

1. Abre `proyectos/04-app-tareas` y haz doble clic en `index.html`.
2. Escribe una tarea y pulsa «Añadir» (o Intro).
3. Marca la casilla para completarla y usa «Eliminar» para quitarla.
4. No necesita Node.js ni servidor: corre directo en el navegador.

## Tres ampliaciones para intentar

1. **Editar una tarea**: añade un botón «Editar» que convierta el texto en
   un campo de escritura y guarde el cambio al pulsar Intro.
2. **Filtrar vistas**: enlaces «Todas / Pendientes / Completadas» que
   muestren solo el subconjunto elegido (puedes usar una clase auxiliar y
   mostrar/ocultar filas).
3. **Guardar con `localStorage`**: conserva las tareas entre recargas
   guardando el estado al cambiar (señala en clase que esto ya es
   persistencia, más allá del objetivo básico de esta práctica).

## Lista de comprobación manual

- [ ] Se abre con doble clic en `index.html` y muestra «No hay tareas».
- [ ] «Añadir» sin escribir nada muestra el error y no crea la tarea.
- [ ] Una tarea normal se añade al pulsar Añadir y también con Intro.
- [ ] El contador de pendientes aumenta al añadir y baja al marcar.
- [ ] Marcar y desmarcar funciona también pulsando el texto de la fila.
- [ ] «Eliminar» quita solo esa tarea y actualiza contador y mensaje.
- [ ] Navegando con el teclado se ve el foco en campo, botones y casillas.
- [ ] Recargar la página deja la lista vacía (sin persistencia, a propósito).