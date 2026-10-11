// ReglasREST.js
module.exports.cargar = function(servidorExpress, laLogica) {

    // GET /prueba (de control)
    servidorExpress.get('/prueba', function(peticion, respuesta){
        console.log("GET /prueba");
        respuesta.send("¡Funciona!");
    });

    // GET /persona/:dni
    servidorExpress.get('/persona/:dni', async function(peticion, respuesta){
        console.log("GET /persona");
        var dni = peticion.params.dni;
        
        // Llamamos a la base de datos a través de la lógica
        var res = await laLogica.buscarPersonaConDNI(dni);
        
        // Si el array está vacío, la persona no existe
        if (res.length != 1) {
            respuesta.status(404).send("No encontré el DNI: " + dni);
            return;
        }
        
        // Todo OK, devolvemos el JSON con los datos de la persona
        respuesta.send(JSON.stringify(res[0]));
    });

}