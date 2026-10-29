// app.js

const urlBase = "http://localhost:8080";
const cajaResultados = document.getElementById("resultados");

function mostrarResultado(mensaje) {
    cajaResultados.innerHTML = typeof mensaje === 'object' ? JSON.stringify(mensaje, null, 2) : mensaje;
}

// Función para buscar a una persona
async function buscarPersona() {
    const dni = document.getElementById("dniBuscar").value;
    if (!dni) {
        mostrarResultado("Por favor, escribe un DNI.");
        return;
    }

    try {
        mostrarResultado("Buscando...");
        const respuesta = await fetch(urlBase + "/persona/" + dni);
        
        if (respuesta.status === 404) {
            mostrarResultado("Persona no encontrada.");
            return;
        }
        
        const datos = await respuesta.json();
        mostrarResultado(`Encontrado: ${datos.nombre} ${datos.apellidos} (DNI: ${datos.dni})`);
    } catch (error) {
        mostrarResultado("Error al conectar con el servidor.");
    }
}

// Función para buscar asignaturas por apellido
async function buscarPorApellido() {
    const apellido = document.getElementById("apellidoBuscar").value;
    if (!apellido) {
        mostrarResultado("Por favor, escribe un apellido.");
        return;
    }

    try {
        mostrarResultado("Buscando asignaturas...");
        const respuesta = await fetch(urlBase + "/asignaturas/" + apellido);
        const datos = await respuesta.json();
        
        if (datos.length === 0) {
            mostrarResultado("No hay asignaturas para este apellido.");
        } else {
            // Extraemos solo los códigos para mostrarlos bonitos
            const codigos = datos.map(fila => fila.codigo).join(", ");
            mostrarResultado(`Asignaturas matriculadas: ${codigos}`);
        }
    } catch (error) {
        mostrarResultado("Error al conectar con el servidor.");
    }
}