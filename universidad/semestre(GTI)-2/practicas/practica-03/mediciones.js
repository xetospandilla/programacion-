//--------------------------------------------------------------------------------------------
//  Mediciones.js
//--------------------------------------------------------------------------------------------
// Importamos el módulo de sistema de archivos
const fs = require("fs");

//  Diseño: medirTemperatura() -> JSON{ hora: N, Temperatura: R }
//  Realiza una medida de temperatura y devuelve el valor junto con la hora
//--------------------------------------------------------------------------------------------
function medirTemperatura() {
    let ahora = new Date();
    
    // Generamos un número aleatorio entre 15 y 20 con dos decimales
    let tempAleatoria = parseFloat((Math.random() * (20 - 15) + 15).toFixed(2));

    return {
        hora: ahora.toLocaleTimeString(),
        temperatura: tempAleatoria
    };
}

//--------------------------------------------------------------------------------------------
//  Diseño: cuantas : N -> tomarMediciones() -> Lista<JSON{hora:N, temperatura:R}
//  Toma la cantidad de mediciones llamando cada segundo a medirTemperatura()
//--------------------------------------------------------------------------------------------
function tomarMediciones(cuantas, mediciones, callback) {
    
    // CASO BASE: Si ya no hay que tomar más medidas, terminamos
    if (cuantas == 0) {
        callback(mediciones);
        return;
    }

    // Tomamos una medida y la guardamos en el arreglo
    mediciones.push(medirTemperatura());

    // Esperamos 1 segundo (1000ms) y volvemos a llamar a la función
    setTimeout(function() {
        tomarMediciones(cuantas - 1, mediciones, callback);
    }, 1000);
}

//--------------------------------------------------------------------------------------------
//  main
//--------------------------------------------------------------------------------------------

let medidas = [];

// Llamamos a la función para pedir 7 medidas
tomarMediciones(7, medidas, function(resultadoFinal) {
    
    console.log("¡Mediciones completadas!");

    // Convertimos el arreglo de objetos a una cadena de texto JSON
    // El "null, 2" es para que el archivo .txt se vea ordenado y bonito
    let contenidoTexto = JSON.stringify(resultadoFinal, null, 2);

    // Guardamos el resultado en el fichero "datos.txt"
    fs.writeFileSync("datos.txt", contenidoTexto);

    console.log("Los datos se han guardado en datos.txt");
});

//--------------------------------------------------------------------------------------------