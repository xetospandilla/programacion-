// test/mainTest1.js
var request = require('request');
var assert = require('assert');

const IP_PUERTO = "http://localhost:8080";

describe("Test Ejercicio 9: GET /persona/:dni", function() {

    it("probar GET /persona/:dni (Debe buscar en la BD)", function(hecho) {
        // Sustituye 35612207L por el DNI real que tengas en tu BD
        request.get({ url: IP_PUERTO + "/persona/35612207L", headers: { 'User-Agent': 'jordi' } }, function(err, respuesta, carga) {
            assert.equal(err, null);
            assert.equal(respuesta.statusCode, 200, "Si da 404, revisa que este DNI exista en tu tabla Persona");
            
            var persona = JSON.parse(carga);
            assert.equal(persona.dni, "35612207L"); // Cambia el DNI aquí también si usaste otro
            assert.notEqual(persona.nombre, undefined, "¿No devolvió el nombre?");
            hecho();
        });
    });

});