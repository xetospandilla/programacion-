const Logica = require("../Logica.js");
var assert = require('assert');

describe("Test 4: Consulta de asignaturas por apellidos", function() {
    var laLogica = null;

it("conectar a la base de datos", function(hecho) {
    laLogica = new Logica("../bd/datos.bd", function(err) {
        if (err) throw new Error("Error de conexión");
        hecho();
    });
});

it("preparar datos de prueba", async function() {
    await laLogica.borrarFilasDeTodasLasTablas();
    await laLogica.insertarPersona({ dni: "222B", nombre: "Carlos", apellidos: "Gomez" });
    await laLogica.insertarAsignatura({ codigo: "11111", nombre: "Bases de Datos" });
    await laLogica.insertarAsignatura({ codigo: "22222", nombre: "Redes" });
    
    // Matriculamos a Carlos en ambas asignaturas
    await laLogica.insertarMatricula({ dni: "222B", codigo: "11111" });
    await laLogica.insertarMatricula({ dni: "222B", codigo: "22222" });
});

it("buscar códigos matriculados dando el apellido", async function() {
    var res = await laLogica.buscarAsignaturasPorApellidos("Gomez");
    assert.equal(res.length, 2, "¿No está matriculado en 2 asignaturas?");
    
    // Comprobamos que trajo los códigos correctos
    let codigos = res.map(fila => fila.codigo);
    assert(codigos.includes("11111"), "Falta el código 11111");
    assert(codigos.includes("22222"), "Falta el código 22222");
});

it("cerrar conexión", async function() {
    await laLogica.cerrar();
    });
});