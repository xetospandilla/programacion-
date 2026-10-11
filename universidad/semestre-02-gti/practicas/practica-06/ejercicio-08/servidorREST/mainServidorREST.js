// mainServidorREST.js
const express = require('express');
const bodyParser = require('body-parser');

function main() {
    var servidorExpress = express();
    
    // Configurar para recibir JSON
    servidorExpress.use(bodyParser.text({ type: 'application/json' }));
    
    // Cargar las reglas REST
    var reglas = require("./ReglasREST.js");
    reglas.cargar(servidorExpress);
    
    // Arrancar el servidor
    var servicio = servidorExpress.listen(8080, function() {
        console.log("Servidor REST escuchando en el puerto 8080");
    });

    process.on('SIGINT', function() {
        console.log(" Terminando servicio...");
        servicio.close();
    });
}

main();