// ReglasREST.js
module.exports.cargar = function(servidorExpress, laLogica) {

    // GET /prueba
    servidorExpress.get('/prueba', function(peticion, respuesta){
        respuesta.send("¡Funciona!");
    });

    // GET /persona/:dni
    servidorExpress.get('/persona/:dni', async function(peticion, respuesta){
        var dni = peticion.params.dni;
        var res = await laLogica.buscarPersonaConDNI(dni);
        if (res.length != 1) {
            respuesta.status(404).send("No encontré el DNI: " + dni);
            return;
        }
        respuesta.send(JSON.stringify(res[0]));
    });

    // --- NUEVO EJERCICIO 10 ---

    // POST /asignatura (Para insertar nueva asignatura)
    servidorExpress.post('/asignatura', async function(peticion, respuesta){
        var datos = JSON.parse(peticion.body);
        try {
            await laLogica.insertarAsignatura(datos);
            respuesta.send("Asignatura insertada OK");
        } catch (err) {
            respuesta.status(500).send("Error al insertar: " + err.message);
        }
    });

    // POST /matricula (Para matricular a un DNI en un código)
    servidorExpress.post('/matricula', async function(peticion, respuesta){
        var datos = JSON.parse(peticion.body);
        try {
            await laLogica.insertarMatricula(datos);
            respuesta.send("Matrícula insertada OK");
        } catch (err) {
            respuesta.status(500).send("Error al matricular: " + err.message);
        }
    });

    // GET /asignaturas/:apellidos (Para buscar matrículas de una persona)
    servidorExpress.get('/asignaturas/:apellidos', async function(peticion, respuesta){
        var apellidos = peticion.params.apellidos;
        try {
            var res = await laLogica.buscarAsignaturasPorApellidos(apellidos);
            respuesta.send(JSON.stringify(res));
        } catch (err) {
            respuesta.status(500).send("Error en la consulta: " + err.message);
        }
    });
}