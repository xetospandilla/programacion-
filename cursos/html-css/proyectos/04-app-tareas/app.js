/* ============================================================
   Proyecto 04 — App de tareas: lógica de la aplicación.

   Reglas de oro seguidas:
   - Nada de innerHTML con contenido del usuario: los textos se
     insertan con textContent o creando nodos.
   - Todo el comportamiento se engancha con addEventListener.
   - El resultado es accesible: contador con aria-live, mensaje
     de error con role="alert" y cada control con su etiqueta.
   ============================================================ */

"use strict";

/* --- Referencias a los elementos de la página --- */
const formulario = document.getElementById("formulario");
const entrada = document.getElementById("nueva-tarea");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");
const mensajeVacio = document.getElementById("mensaje-vacio");
const error = document.getElementById("error");

/* --- Actualizar el mensaje de "no hay tareas" --- */
function mostrarVacio() {
    const hayTareas = lista.children.length > 0;
    mensajeVacio.hidden = hayTareas;
}

/* --- Contar las tareas pendientes (casillas sin marcar) --- */
function actualizarContador() {
    const casillas = lista.querySelectorAll("input[type='checkbox']");
    let pendientes = 0;
    casillas.forEach(function (casilla) {
        if (!casilla.checked) {
            pendientes += 1;
        }
    });
    contador.textContent = String(pendientes);
}

/* --- Crear una fila de tarea nueva desde cero --- */
function crearTarea(texto) {
    const fila = document.createElement("li");

    // Etiqueta que envuelve el checkbox y el texto: al pulsar el
    // texto también se marca o desmarca la casilla.
    const etiqueta = document.createElement("label");
    etiqueta.className = "etiqueta";

    const casilla = document.createElement("input");
    casilla.type = "checkbox";
    casilla.setAttribute("aria-label", "Marcar como completada: " + texto);

    const textoNodo = document.createElement("span");
    textoNodo.className = "texto";
    textoNodo.textContent = texto; // texto del usuario: textContent, nunca innerHTML

    etiqueta.append(casilla, textoNodo);

    // El botón de eliminar lleva su propia etiqueta accesible.
    const botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.className = "eliminar";
    botonEliminar.textContent = "Eliminar";
    botonEliminar.setAttribute("aria-label", "Eliminar tarea: " + texto);

    // Marcar / desmarcar: cambia la clase que tacha el texto y
    // actualiza el contador.
    casilla.addEventListener("change", function () {
        fila.classList.toggle("completada", casilla.checked);
        actualizarContador();
    });

    // Eliminar la tarea y recomprobar contador y mensaje vacío.
    botonEliminar.addEventListener("click", function () {
        fila.remove();
        mostrarVacio();
        actualizarContador();
    });

    fila.append(etiqueta, botonEliminar);
    lista.append(fila);
}

/* --- Añadir una tarea desde el formulario --- */
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); // no recargar la página

    const texto = entrada.value.trim();

    // Validación: no se añaden tareas vacías (ni solo con espacios).
    if (texto === "") {
        error.hidden = false;
        entrada.focus();
        return;
    }

    error.hidden = true;
    crearTarea(texto);
    entrada.value = "";
    entrada.focus(); // se devuelve el foco al campo: cómodo con teclado
    mostrarVacio();
    actualizarContador();
});

/* --- Estado inicial --- */
mostrarVacio();
actualizarContador();