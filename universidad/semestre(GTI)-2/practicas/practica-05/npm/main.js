//--------------------------------------------------------------------------------------------
// main.js
//--------------------------------------------------------------------------------------------
// requires
const express = require( "express" )
//--------------------------------------------------------------------------------------------
// main()
//--------------------------------------------------------------------------------------------
// creo un servidor
const servidor = express()
// cuando llegue GET /hola
servidor.get("/hola", function( peticion, respuesta ) {
respuesta.send( "Hola a todos")
})
// cuando llegue GET /adios
servidor.get("/adios", function( peticion, respuesta ) {
respuesta.send( "Hasta pronto")
})
// arranco el servicio en el puerto 8080
servidor.listen( 8080, function() {
console.log( "Escuchando en el puerto 8080")
console.log( "Conéctate a localhost:8080/hola" )
})
//--------------------------------------------------------------------------------------------