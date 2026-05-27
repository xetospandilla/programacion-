// mainServidorREST.js
const express = require('express');
const bodyParser = require('body-parser');
const Logica = require("../logica/logica.js"); // Llamamos a tu archivo logica.js

function cargarLogica(fichero) {
    return new Promise((resolver, rechazar) => {
        var laLogica = new Logica(fichero, function(err) {
            if (err) {
                rechazar(err);
            } else {
                resolver(laLogica);
            }
        });
    });
}

async function main() {
    // Cargamos la BD antes de encender el servidor
    var laLogica = await cargarLogica("../bd/datos.bd");
    
    var servidorExpress = express();
    servidorExpress.use(bodyParser.text({ type: 'application/json' }));

    servidorExpress.use( express.static('public') )
    
    var reglas = require("./ReglasREST.js");
    reglas.cargar(servidorExpress, laLogica); // Pasamos laLogica a las reglas
    
    var servicio = servidorExpress.listen(8080, function() {
        console.log("Servidor REST conectado a la BD escuchando en el puerto 8080");
    });

    process.on('SIGINT', function() {
        console.log(" Terminando servicio...");
        servicio.close();
    });
}

main();