// ReglasREST.js
module.exports.cargar = function(servidorExpress) {

    // GET /prueba
    servidorExpress.get('/prueba/', function(peticion, respuesta) {
        console.log("GET /prueba");
        respuesta.send("¡Funciona!");
    });

    // GET /longitud/:palabra
    servidorExpress.get('/longitud/:palabra', function(peticion, respuesta) {
        console.log("GET /longitud");
        var palabra = peticion.params.palabra;
        var solucion = { palabra: palabra, longitud: palabra.length };
        respuesta.send(JSON.stringify(solucion));
    });

    // GET /dividir?a=<num>&b=<num>
    servidorExpress.get('/dividir', function(peticion, respuesta) {
        console.log("GET /dividir");
        var a = peticion.query.a;
        var b = peticion.query.b;
        if (isNaN(a) || isNaN(b) || b == 0) {
            respuesta.status(400).send("No puedo dividir");
            return;
        }
        var solucion = { a: a, b: b, division: a/b };
        respuesta.send(JSON.stringify(solucion));
    });

    // POST /alta
    servidorExpress.post('/alta', function(peticion, respuesta) {
        console.log("POST /alta");
        var datos = JSON.parse(peticion.body);
        if (datos.dni == "1234A") {
            respuesta.send("OK");
        } else {
            respuesta.status(404).send("no acertaste con el dni");
        }
    });

    // --- SOLUCIÓN AL EJERCICIO DE LA PÁGINA 39 ---
    // POST /dividirPost
    servidorExpress.post('/dividirPost', function(peticion, respuesta) {
        console.log("POST /dividirPost");
        var datos = JSON.parse(peticion.body);
        var a = datos.a;
        var b = datos.b;
        
        if (isNaN(a) || isNaN(b) || b == 0) {
            respuesta.status(400).send("No puedo dividir");
            return;
        }
        
        var solucion = { a: a, b: b, division: a/b };
        respuesta.send(JSON.stringify(solucion));
    });
}