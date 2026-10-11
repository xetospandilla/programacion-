//--------------------------------------------------------------------------------------------
//  Ficheros de texto
//--------------------------------------------------------------------------------------------

// Crear ficheros de texto

let fs = require("fs")
    fs.writeFile("hola.txt", "hola mundo", function( err ){
        if( err ){
            console.log( "hubo un problema al escribir en hola.txt")
        }
    })

//  Leer un fichero de texto

let fs = require("fs")
fs.readFile("hola.txt", "utf8", function( err, contenido) {
    if( err ){
        console.log( "hubo un problema al leer de hola.txt" )
        return
    }

    console.log( contenido )
})
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------

let fs = require("fs") 

fs.writeFile("nombre.txt", "Carlos Galán Cubells", function( err ){
    if( err ){
        console.log("hubo un problema al escribir en hola.txt")
    }
})

fs.readFile("nombre.txt", "utf8", function( err, contenido ){
    if(err){ console.log("hubo un problema al leer nombre.txt"); return }
    console.log( contenido )
}) 

//--------------------------------------------------------------------------------------------