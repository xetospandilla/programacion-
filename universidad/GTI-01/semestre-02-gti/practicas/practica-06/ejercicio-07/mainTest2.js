const Logica = require("../Logica.js");
var assert = require('assert');

describe("Test 2: Insertar una asignatura", function() {
    var laLogica = null;

it("conectar a la base de datos", function(hecho) {
    laLogica = new Logica("../bd/datos.bd", function(err) {
        if (err) throw new Error("No he podido conectar con datos.bd");
        hecho();
    });
});

it("borrar todas las filas", async function() {
    await laLogica.borrarFilasDeTodasLasTablas();
});

it("puedo insertar una asignatura", async function() {
    await laLogica.insertarAsignatura({ codigo: "13929", nombre: "Programacion 2" });
    var res = await laLogica.buscarAsignaturaConCodigo("13929");
    assert.equal(res.length, 1, "¿no hay un resultado?");
    assert.equal(res[0].nombre, "Programacion 2", "¿no es Programacion 2?");
});

it("cerrar conexión a la base de datos", async function() {
    await laLogica.cerrar();
    });
});