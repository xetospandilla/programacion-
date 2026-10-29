// test/mainTest1.js
var request = require('request');
var assert = require('assert');

const IP_PUERTO = "http://localhost:8080";

// Generamos un código único para que no falle si ejecutas el test varias veces
const codigoAleatorio = "ASIG_" + Date.now(); 

describe("Test Ejercicio 10: Ampliación Servidor REST", function() {

    it("probar GET /persona/:dni", function(hecho) {

        var miDniReal = "35612207L"; 

        request.get({ url: IP_PUERTO + "/persona/" + miDniReal, headers: { 'User-Agent': 'jordi' } }, function(err, respuesta, carga) {
            assert.equal(err, null);
            assert.equal(respuesta.statusCode, 200, "Falló: El DNI no existe en la BD");
            hecho();
        });
    });

    it("probar POST /asignatura", function(hecho) {
        var nuevaAsignatura = { codigo: codigoAleatorio, nombre: "Programación Web" };
        request.post({
            url: IP_PUERTO + "/asignatura",
            headers: { 'User-Agent': 'jordi', 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevaAsignatura)
        }, function(err, respuesta, carga) {
            assert.equal(err, null);
            assert.equal(respuesta.statusCode, 200);
            assert.equal(carga, "Asignatura insertada OK");
            hecho();
        });
    });

    it("probar POST /matricula", function(hecho) {

        var miDniReal = "35612207L";
        
        var nuevaMatricula = { dni: miDniReal, codigo: codigoAleatorio };
        request.post({
            url: IP_PUERTO + "/matricula",
            headers: { 'User-Agent': 'jordi', 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevaMatricula)
        }, function(err, respuesta, carga) {
            assert.equal(err, null);
            // Comprobamos que el servidor responde OK (status 200)
            assert.equal(respuesta.statusCode, 200, "Falló: Revisa que el DNI exista para matricularlo");
            hecho();
        });
    });

    it("probar GET /asignaturas/:apellidos", function(hecho) {
        var miApellidoReal = "Galan Cubells";
        
        request.get({ url: IP_PUERTO + "/asignaturas/" + miApellidoReal, headers: { 'User-Agent': 'jordi' } }, function(err, respuesta, carga) {
            assert.equal(err, null);
            assert.equal(respuesta.statusCode, 200, "Falló: Apellido no encontrado o error SQL");
            var lista = JSON.parse(carga);
            assert.ok(Array.isArray(lista));
            hecho();
        });
    });

});