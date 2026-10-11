/*
 ============================================================================
 LECCIÓN 43 - El DOM (Document Object Model)
 ============================================================================

 OBJETIVOS DE APRENDIZAJE
 - Explicar la diferencia entre HTML, DOM y JavaScript.
 - Explicar qué hace el atributo `defer` y por qué lo usamos.
 - Seleccionar un elemento con querySelector() y varios con querySelectorAll().
 - Cambiar el texto de un elemento con textContent.
 - Añadir y quitar clases con classList.
 - Leer y modificar atributos con getAttribute y setAttribute.
 - Crear elementos con createElement y eliminarlos con remove().

 PRERREQUISITOS
 - Lección 32 (entorno y ejecución), 16 (funciones) y tener la idea de
   HTML (etiquetas, atributos y texto) del bloque `html-css`.

 CÓMO SE EJECUTA ESTA LECCIÓN
 - NO se ejecuta con `node`: necesita un navegador.
 - Abre `43-dom.html` con doble clic (o desde la terminal: abre el
   archivo directamente en tu navegador).
 - Este archivo (`43-dom.js`) se carga desde la página con `defer`.

 ============================================================================
 1. HTML, DOM Y JAVASCRIPT: TRES COSAS DISTINTAS
 ============================================================================

 HTML: el TEXTO que escribes en el archivo `.html`. Describe el estado
 INICIAL de la página: párrafos, enlaces, listas...

 DOM (Document Object Model): la estructura EN MEMORIA que el navegador
 construye a partir de ese texto. Es un árbol de nodos (los elementos y
 su contenido). Puede cambiar mientras la página está abierta.

 JAVASCRIPT: el lenguaje que consulta y modifica ese árbol. La página que
 ves NO es el archivo HTML: es el DOM.

 El flujo: navegador lee el HTML -> construye el DOM -> ejecuta el
 JavaScript, que actúa sobre el DOM (no sobre el texto original).

 `defer` (el atributo del <script> en 43-dom.html): el navegador descarga
 el script en paralelo y lo ejecuta DESPUÉS de haber analizado todo el
 HTML. Así, cuando el código corre, el DOM completo ya existe y podemos
 seleccionar elementos sin miedo a que sean `null`.

 ============================================================================
 2. SELECCIONAR ELEMENTOS: querySelector Y querySelectorAll
 ============================================================================
 document.querySelector(selector) devuelve el PRIMER elemento que
 coincide con un selector CSS (de la lección de CSS: `#id`, `.clase`,
 `tag`, combinaciones...). Si no existe, devuelve null.

 document.querySelectorAll(selector) devuelve TODOS los que coinciden,
 en una lista parecida a un array (los recorremos con for...of o forEach).
 */

console.log("Lección 43 cargada. El DOM ya está listo gracias a defer.")
console.log("Ejemplo: títulos h2 de esta página ->",
    document.querySelectorAll("h2").length)

/*
 3. textContent: LEER Y CAMBIAR EL TEXTO
 textContent es una propiedad de los elementos: lee TODO el texto de un
 nodo y, si le asignas un valor, lo REEMPLAZA.
 Sirve para mostrar en pantalla datos calculados o textos nuevos.
 Regla de seguridad: para poner texto viene de usuarios (como en la
 práctica 44) usar SIEMPRE textContent y nunca innerHTML.
 */

let parrafoDemo = document.querySelector("#parrafo-demo")
let botonCambiarTexto = document.querySelector("#boton-cambiar-texto")

botonCambiarTexto.addEventListener("click", () => {
    parrafoDemo.textContent = "Este texto lo asignó JavaScript con textContent."
})

/*
 4. classList: AÑADIR Y QUITAR CLASES
 La propiedad classList permite gestionar la lista de clases de un
 elemento sin tocar el HTML:
   .add("clase")    -> añade la clase
   .remove("clase") -> la quita
   .toggle("clase") -> si está, la quita; si no está, la añade
   .contains(...)   -> devuelve true/false si existe
 Se combina con CSS: la clase cambia el estilo sin reescribir el HTML.
 */

let caja = document.querySelector("#caja-destacada")
let botonDestacar = document.querySelector("#boton-destacar")

botonDestacar.addEventListener("click", () => {
    caja.classList.toggle("destacada")
})

/*
 5. ATRIBUTOS: leerlos Y CAMBIARLOS
 Los atributos (href, id, class, data-*) también se manipulan:
   getAttribute("href") -> devuelve su valor como texto
   setAttribute("href", "...") -> lo cambia
   removeAttribute("href") -> lo elimina
 (Algunos atributos tienen propiedad directa, como enlace.href, pero
 con get/setAttribute se ve el mecanismo general.)
 */

let enlaceDemo = document.querySelector("#enlace-demo")
let botonVerAtributo = document.querySelector("#boton-ver-atributo")
let botonCambiarAtributo = document.querySelector("#boton-cambiar-atributo")

botonVerAtributo.addEventListener("click", () => {
    console.log("href actual:", enlaceDemo.getAttribute("href"))
})

botonCambiarAtributo.addEventListener("click", () => {
    enlaceDemo.setAttribute("href", "https://developer.mozilla.org")
    console.log("href cambiado a:", enlaceDemo.getAttribute("href"))
})

/*
 6. CREAR Y ELIMINAR ELEMENTOS
 Para añadir nodos desde JavaScript:
 1. Crear el elemento: document.createElement("li").
 2. Rellenarlo: nodo.textContent = "...".
 3. Insertarlo: padre.appendChild(nodo) lo pone al final; también existen
    padre.prepend(nodo) (al principio) e insertBefore.
 Para eliminar: nodo.remove() lo quita de su padre.
 */

let listaDinamica = document.querySelector("#lista-dinamica")
let contador = document.querySelector("#contador-lista")
let botonAnadir = document.querySelector("#boton-anadir")
let botonEliminar = document.querySelector("#boton-eliminar")
let botonMarcarTodos = document.querySelector("#boton-marcar-todos")

function actualizarContador() {
    let cantidad = document.querySelectorAll("#lista-dinamica li").length
    contador.textContent = "Hay " + cantidad + " elemento" +
        (cantidad === 1 ? "." : "s.")
}

botonAnadir.addEventListener("click", () => {
    let nuevo = document.createElement("li")
    nuevo.textContent = "Elemento añadido desde JavaScript"
    listaDinamica.appendChild(nuevo)
    actualizarContador()
})

botonEliminar.addEventListener("click", () => {
    let ultimo = listaDinamica.lastElementChild
    if (ultimo !== null) {
        ultimo.remove()
    }
    actualizarContador()
})

// querySelectorAll + classList se combinan para tocar TODOS los ítems:
botonMarcarTodos.addEventListener("click", () => {
    let elementos = document.querySelectorAll("#lista-dinamica li")
    elementos.forEach((li) => li.classList.toggle("nuevo"))
})

/*
 ERRORES FRECUENTES
 1. Script en <head> SIN defer: el DOM aún no existe al ejecutarse y
    querySelector devuelve null (el error típico: "cannot read property
    of null"). La solución es defer (o escuchar el evento de carga).
 2. Confundir el texto HTML con el DOM: editar el archivo .html no cambia
    el DOM de la página abierta, y viceversa. Hay que recargar para
    releer el HTML.
 3. ussar innerHTML con textos de usuario o datos externos: puede
    inyectar código (lección 44). textContent no interpreta nada.
 4. querySelector devuelve uno solo (el primero); para varios hay que
    usar querySelectorAll y recorrer la lista.
 5. Asignar textContent a un elemento que aún no está en el documento:
    funciona, pero el usuario no lo verá hasta insertarlo (appendChild).
 */

/*
 EJERCICIOS GRADUADOS

 EJERCICIO 1 (reproducir)
 Añade un botón "Restablecer título" al HTML y escribe el código para que,
 al pulsarlo, el <h1> vuelva a mostrar "Lección 43: El DOM".

 EJERCICIO 2 (comprender)
 Sin abrir la consola, responde con tus palabras:
  a) ¿Qué diferencia hay entre el archivo 43-dom.html y el DOM?
  b) ¿Para qué sirve el atributo `defer`?
  c) ¿Por qué se usa textContent y no innerHTML para asignar texto?

 EJERCICIO 3 (aplicar)
 Haz que al pulsar "Añadir ítem" el texto del nuevo <li> incluya un
 número correlativo (1, 2, 3...). Pista: usa un contador y
 querySelectorAll("#lista-dinamica li").length + 1 para el número.
*/

/*
 SOLUCIONES

 EJERCICIO 1
 En el HTML, dentro de la sección 1:
   <button type="button" id="boton-restablecer-titulo">Restablecer título</button>
 En el JavaScript:
   document.querySelector("#boton-restablecer-titulo").addEventListener("click", () => {
     document.querySelector("#titulo-principal").textContent = "Lección 43: El DOM"
   })

 EJERCICIO 2
  a) El .html es TEXTO inmutable guardado en disco; el DOM es la estructura
     EN MEMORIA que el navegador crea al leerlo y que JavaScript modifica.
     Los cambios en el DOM no se escriben de vuelta en el archivo.
  b) Hace que el navegador ejecute el script después de analizar el HTML,
     así el DOM completo ya existe cuando el código se ejecuta.
  c) textContent trata el valor como TEXTO puro; innerHTML lo interpretaría
     como HTML (un usuario podría meter etiquetas). Es la vía segura.

 EJERCICIO 3
 En botonAnadir:
   let numero = document.querySelectorAll("#lista-dinamica li").length + 1
   nuevo.textContent = "Ítem número " + numero
 El resto del código no cambia: se crea, se rellena y se inserta igual.
*/

/*
 RESUMEN Y AUTOEVALUACIÓN
 Resumen: el HTML es el texto inicial; el navegador construye con él el
 DOM (árbol en memoria) y JavaScript lo lee y lo modifica. `defer`
 garantiza que el DOM esté listo. Para trabajar con la página: se
 selecciona con querySelector(All), se cambia el texto con textContent,
 se gestionan clases con classList, se leen/cambian atributos con
 get/setAttribute, y se crean/borran nodos con createElement + appendChild
 y remove(). Para textos dinámicos se usa textContent, nunca innerHTML.

 Autoevaluación: tras esta lección deberías poder...
 [ ] Distinguir HTML, DOM y JavaScript
 [ ] Explicar qué hace defer en el <script>
 [ ] Seleccionar el primer elemento y todos los que coinciden
 [ ] Cambiar el texto de un elemento con textContent
 [ ] Añadir/quitar clases con classList
 [ ] Leer y cambiar atributos
 [ ] Crear y eliminar elementos en la página

 RETO OPCIONAL
 En la sección 4, "Marcar todos como nuevos" usa la clase `nuevo`, que
 todavía no tiene estilo. Añade en el <style> de la página una regla
 `.nuevo { font-weight: bold; }` y comprueba que el toggle se ve. Si
 quieres ir más allá, cambia el archivo para que el botón diga
 "Desmarcar todos" cuando todo esté marcado.
 */