const Logica = require("../Logica.js");
var assert = require('assert');

describe("Test 3: Realizar una matrícula", function() {
    var laLogica = null;

it("conectar a la base de datos", function(hecho) {
    laLogica = new Logica("../bd/datos.bd", function(err) {
        if (err) throw new Error("Error de conexión");
        hecho();
    });
});

it("preparar datos (borrar, insertar persona y asignatura)", async function() {
    await laLogica.borrarFilasDeTodasLasTablas();
    await laLogica.insertarPersona({ dni: "111A", nombre: "Ana", apellidos: "Ruiz" });
    await laLogica.insertarAsignatura({ codigo: "13929", nombre: "Programacion 2" });
});

it("puedo matricular a la persona en la asignatura", async function() {
    // Si no falla la promesa, es que se ha insertado correctamente (las foreign keys están OK)
    await laLogica.insertarMatricula({ dni: "111A", codigo: "13929" });
});

it("cerrar conexión", async function() {
    await laLogica.cerrar();
    });
});