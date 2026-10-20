// test/mainTest1.js
var request = require('request');
var assert = require('assert');

const IP_PUERTO = "http://localhost:8080";

describe("Test 1 Servidor Sencillo (Recuerda arrancar el servidor)", function() {

    it("probar GET /prueba", function(hecho) {
        request.get({ url: IP_PUERTO + "/prueba", headers: { 'User-Agent': 'jordi' } }, function(err, respuesta, carga) {
            assert.equal(err, null);
            assert.equal(respuesta.statusCode, 200);
            assert.equal(carga, "¡Funciona!");
            hecho();
        });
    });

    it("probar GET /longitud", function(hecho) {
        request.get({ url: IP_PUERTO + "/longitud/hola", headers: { 'User-Agent': 'jordi' } }, function(err, respuesta, carga) {
            assert.equal(err, null);
            assert.equal(respuesta.statusCode, 200);
            var solucion = JSON.parse(carga);
            assert.equal(solucion.longitud, 4);
            hecho();
        });
    });

    it("probar GET /dividir", function(hecho) {
        request.get({ url: IP_PUERTO + "/dividir?a=10&b=2.5", headers: { 'User-Agent': 'jordi' } }, function(err, respuesta, carga) {
            assert.equal(err, null);
            assert.equal(respuesta.statusCode, 200);
            var solucion = JSON.parse(carga);
            assert.equal(solucion.division, 4);
            hecho();
        });
    });

    it("probar POST /alta", function(hecho) {
        var datosPersona = { dni: "1234A", nombre: "Pepe", apellidos: "García" };
        request.post({ 
            url: IP_PUERTO + "/alta", 
            headers: { 'User-Agent': 'jordi', 'Content-Type': 'application/json' },
            body: JSON.stringify(datosPersona)
        }, function(err, respuesta, carga) {
            assert.equal(err, null);
            assert.equal(respuesta.statusCode, 200);
            assert.equal(carga, "OK");
            hecho();
        });
    });

    // --- TEST DEL EJERCICIO DE LA PÁGINA 39 ---
    it("probar POST /dividirPost (Ejercicio)", function(hecho) {
        var datosDivision = { a: 20, b: 5 };
        request.post({ 
            url: IP_PUERTO + "/dividirPost", 
            headers: { 'User-Agent': 'jordi', 'Content-Type': 'application/json' },
            body: JSON.stringify(datosDivision)
        }, function(err, respuesta, carga) {
            assert.equal(err, null);
            assert.equal(respuesta.statusCode, 200);
            var solucion = JSON.parse(carga);
            assert.equal(solucion.division, 4);
            hecho();
        });
    });
});