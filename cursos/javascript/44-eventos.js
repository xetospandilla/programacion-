/*
 ============================================================================
 LECCIÓN 44 - Eventos: ratón, teclado, formularios y lista de tareas
 ============================================================================

 OBJETIVOS DE APRENDIZAJE
 - Explicar qué es un evento y qué hace addEventListener.
 - Usar eventos de ratón (mouseenter, mouseleave) y de teclado (keydown).
 - Capturar el envío de un formulario y usar preventDefault.
 - Explicar qué es event.target y usarlo con delegación.
 - Construir una lista de tareas con validación básica.
 - Crear nodos de forma segura con textContent (nunca innerHTML) para
   el texto del usuario.

 PRERREQUISITOS
 - Lección 43 (DOM): querySelector, textContent, classList, crear nodos.

 CÓMO SE EJECUTA ESTA LECCIÓN
 - Abre `44-eventos.html` en un navegador. NO se ejecuta con `node`.
 - La teoría está aquí, en los comentarios; la práctica es la página.

 ============================================================================
 1. EVENTOS Y addEventListener
 ============================================================================

 Un EVENTO es una señal que el navegador emite cuando algo ocurre: un
 clic, una tecla, el envío de un formulario, mover el ratón...

 addEventListener("evento", funcion) pide al navegador: "cuando pase
 `evento`, ejecuta `funcion`". La función recibe un objeto evento (se
 suele llamar `event` o `e`) con información: qué elemento fue pulsado,
 qué tecla se ha usado, etc.

 El primer argumento es el NOMBRE del evento (string); el segundo es la
 FUNCIÓN que hay que ejecutar. Ojo: se pasa la función SIN paréntesis
 (no la invocamos, solo la entregamos).
 */

console.log("Lección 44 cargada. La práctica está en la página abierta.")

/*
 2. EVENTOS DE RATÓN: mouseenter Y mouseleave
 - mouseenter: se dispara cuando el cursor entra en el elemento.
 - mouseleave: se dispara cuando el cursor sale.
 En la página, un recuadro se resalta al entrar y se "desresalta" al salir.
 */

let zonaRaton = document.querySelector("#zona-raton")

zonaRaton.addEventListener("mouseenter", () => {
    zonaRaton.classList.add("resaltada")
})

zonaRaton.addEventListener("mouseleave", () => {
    zonaRaton.classList.remove("resaltada")
})

/*
 3. EVENTOS DE TECLADO: keydown
 keydown se dispara al pulsar una tecla. El objeto evento trae `e.key`,
 la tecla concreta (letra, "Enter", "Shift"...).
 El evento de teclado también sirve para bloquear teclas, pero aquí solo
 lo usamos para mostrarlas.
 */

let campoTeclado = document.querySelector("#campo-teclado")
let resultadoTeclado = document.querySelector("#resultado-teclado")

campoTeclado.addEventListener("keydown", (e) => {
    resultadoTeclado.textContent = "Última tecla pulsada: " + e.key
})

/*
 4. FORMULARIOS, preventDefault Y LA VALIDACIÓN BÁSICA
 Un <form> tiene un comportamiento NATIVO: al enviarlo, la página se
 recarga (o navega). Como nosotros queremos manejar los datos con
 JavaScript, capturamos el evento "submit" del formulario y llamamos a
 event.preventDefault(): así evitamos la recarga y controlamos nosotros
 el flujo.
 Validación básica = comprobar la entrada ANTES de usarla. Aquí: si el
 texto está vacío (o solo espacios), mostramos un mensaje y NO añadimos.
 El atributo `novalidate` del formulario desactiva las validaciones del
 navegador para que toda la responsabilidad esté en nuestro código.
 */

let formulario = document.querySelector("#formulario-tarea")
let entrada = document.querySelector("#entrada-tarea")
let listaTareas = document.querySelector("#lista-tareas")
let mensajeError = document.querySelector("#mensaje-error")

function mostrarMensaje(visible) {
    if (visible) {
        mensajeError.classList.remove("oculto")
    } else {
        mensajeError.classList.add("oculto")
    }
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault() // sin esto, la página se recargaría

    let texto = entrada.value.trim() // quitamos espacios al inicio y al final

    if (texto === "") {
        mostrarMensaje(true)
        return // salimos: no añadimos una tarea vacía
    }

    mostrarMensaje(false)
    crearTarea(texto)
    entrada.value = "" // limpiamos el campo para la siguiente tarea
    entrada.focus()    // y devolvemos el foco al campo
})

/*
 CREAR TAREAS DE FORMA SEGURA
 Para la tarea usamos:
 - document.createElement("li")  -> creamos el nodo
 - nodo.textContent = texto      -> rellenamos con TEXTO PURO
   (textContent trata `texto` como texto; si un usuario escribiera
   "<img ...>", se mostraría tal cual y NO se interpretaría. Con
   innerHTML ese texto se trataría como HTML y podría inyectar código.
   Por eso la regla: para texto del usuario, siempre textContent.)
 - Los botones también se crean con createElement, y se les asigna
   type="button" para que NO disparen el envío del formulario.
 */

function crearTarea(texto) {
    let item = document.createElement("li")

    // Texto de la tarea, siempre con textContent:
    let tarea = document.createElement("span")
    tarea.textContent = texto
    item.appendChild(tarea)

    // Botón "Completar":
    let botonCompletar = document.createElement("button")
    botonCompletar.type = "button"
    botonCompletar.textContent = "Completar"
    item.appendChild(botonCompletar)

    // Botón "Eliminar":
    let botonEliminar = document.createElement("button")
    botonEliminar.type = "button"
    botonEliminar.textContent = "Eliminar"
    item.appendChild(botonEliminar)

    listaTareas.appendChild(item)
}

/*
 5. event.target Y LA DELEGACIÓN
 Cuando pulsamos un botón cualquiera de la lista, ¿cómo sabe el código
 qué botón fue y de qué tarea es?

 Two conceptos:
 - event.target: el elemento CONCRETO que el usuario pulsó.
 - DELEGACIÓN: en lugar de poner un listener a cada botón (que se crean
   en marcha), ponemos UN SOLO listener en la lista (que ya existe) y
   usamos event.target para saber qué se pulsó. Funciona porque los
   eventos "suben" (burbujean) desde el elemento pulsado hacia sus
   ancestros.
 - element.closest("selector"): parte del elemento pulsado y sube
   buscando un ancestro que cumpla el selector. Así, desde el botón
   llegamos al <li> que lo contiene y lo identificamos.
 */

listaTareas.addEventListener("click", (e) => {
    // e.target puede ser el propio botón (o lo que esté dentro)
    let boton = e.target.closest("button")
    if (boton === null) {
        return // no se pulsó un botón; no hacemos nada
    }

    let item = boton.closest("li")

    if (boton.textContent === "Completar") {
        // marcamos/completamos: alternamos la clase que tacha el texto
        item.classList.toggle("completada")
    } else if (boton.textContent === "Eliminar") {
        item.remove() // quitamos la tarea de la lista
    }
})

/*
 ERRORES FRECUENTES
 1. Olvidar preventDefault en submit: la página se recarga al enviar el
    formulario y la lista "desaparece" (vuelve al HTML original).
 2. innerHTML con el texto del usuario: se interpreta como HTML y puede
    romper la página o inyectar código. Siempre textContent.
 3. Pasar la función INVOCADA: addEventListener("click", fn()) ejecuta
    fn en el momento del registro. Debe ser addEventListener("click", fn).
 4. Botones sin type="button" dentro de un formulario: actúan como
    submit y disparan el envío. Hay que declarar type="button".
 5. Confundir event.target con el elemento que tiene el listener: en la
    delegación el listener está en la lista, pero target es el botón
    pulsado. Se combina con closest() para llegar al ítem.
 6. No limpiar el campo ni devolver el foco: tras añadir, el usuario
    tiene que borrar a mano para escribir la siguiente tarea.
 */

/*
 EJERCICIOS GRADUADOS

 EJERCICIO 1 (reproducir)
 Añade un botón "Limpiar todo" bajo la lista y haz que, al pulsarlo, se
 borren todas las tareas. Pista: recorre los <li> de la lista y usa
 remove() en cada uno (o usa listaTareas.replaceChildren()).

 EJERCICIO 2 (comprender)
 Responde con tus palabras:
  a) ¿Por qué la página se recarga al enviar el formulario si no
     llamamos a preventDefault()?
  b) ¿Qué es event.target en el listener de la lista?
  c) ¿Qué diferencia hay entre textContent e innerHTML para una tarea
     escrita por el usuario?

 EJERCICIO 3 (aplicar)
 Muestra en la página un contador de tareas activas (las que NO están
 completadas) que se actualice al añadir, completar y eliminar tareas.
 Pista: cuenta los <li> que NO tengan la clase "completada" después de
 cada cambio, y escribe el número en un elemento con textContent.
*/

/*
 SOLUCIONES

 EJERCICIO 1
 En el HTML, bajo <ul id="lista-tareas">:
   <button type="button" id="boton-limpiar-todo">Limpiar todo</button>
 En el JavaScript:
   document.querySelector("#boton-limpiar-todo").addEventListener("click", () => {
     listaTareas.replaceChildren() // elimina todos los hijos en una llamada
   })
 (replaceChildren() sin argumentos vacía el elemento de forma segura,
 sin interpretar HTML.)

 EJERCICIO 2
  a) El envío de un formulario es el comportamiento nativo del navegador:
     recargar la página o navegar a la URL del action. preventDefault()
     lo cancela para que nuestro código gestione todo sin recarga.
  b) El elemento EXACTO que se pulsó (en nuestro caso, el botón). La
     delegación lo usa, junto con closest("button") y closest("li"),
     para saber qué acción pedir y sobre qué tarea.
  c) textContent muestra el texto tal cual (seguro); innerHTML lo
     interpreta como HTML (peligroso si el texto lo escribió un usuario).

 EJERCICIO 3
   function actualizarContadorActivas() {
     let activas = document.querySelectorAll("#lista-tareas li:not(.completada)").length
     contadorActivas.textContent = "Tareas activas: " + activas
   }
 Se llama a actualizarContadorActivas() después de añadir (en submit),
 al completar/descompletar, al eliminar y en "Limpiar todo". El selector
 :not(.completada) es CSS: selecciona los <li> sin esa clase.
*/

/*
 RESUMEN Y AUTOEVALUACIÓN
 Resumen: los eventos son señales del navegador; addEventListener las
 captura (ratón: mouseenter/mouseleave; teclado: keydown; formularios:
 submit). Con preventDefault cancelamos el comportamiento nativo del
 formulario y validamos la entrada nosotros. event.target identifica el
 elemento pulsado y, con delegación (un solo listener en la lista) y
 closest(), manejamos botones creados en marcha. Para texto del usuario,
 textContent siempre, nunca innerHTML.

 Autoevaluación: tras esta lección deberías poder...
 [ ] Explicar qué es un evento y cómo se registra un listener
 [ ] Usar eventos de ratón y de teclado
 [ ] Capturar un submit y aplicar preventDefault
 [ ] Validar una entrada y mostrar un mensaje de error
 [ ] Explicar event.target y la delegación de eventos
 [ ] Añadir, completar y eliminar tareas creando nodos seguros

 RETO OPCIONAL
 Dos mejoras: 1) que la tarea se marque como completada también al hacer
 clic sobre el texto (no solo con el botón); 2) que el "Completar" cambie
 su etiqueta a "Deshacer" cuando la tarea esté completada y viceversa.
 Pista: en el listener de la lista, compara el texto del botón y usa
 classList.contains("completada") para decidir la nueva etiqueta.
 */