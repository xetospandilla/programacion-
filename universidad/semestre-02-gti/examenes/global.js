//  ----------------------------------------------------------
    //  funcion letrasIguales:

        //  examen:
/*
function letrasIguales( desconocida, prueba ){

    return desconocida.filter( (letra, prueba) => {
        let i = 0
        if( letra === prueba[i] ){
            if( desconocida[i] === prueba[i] ){
                return "OK"
            } return "ESTA"
        } else {
            return "NO_ESTA"
        }
    })
}
*/

        //  correcion:

function letrasIguales( desconocida, prueba ){
    return prueba.map( (letra, i) =>{
        if( letra = desconocida[i] ){
            return "OK"
        } else if ( desconocida.includes(letra) ){
            return "ESTA"
        } else {
            return "NO_ESTA"
        }
    })
}
//  ----------------------------------------------------------
    // funcion devolverTelefono( nombre, arr1, arr2 ):

function devolverTelefono( nombre, arr1, arr2 ){
    let res =  arr1.filter( a => {
        let nombreDNI = undefined
        if( a.nombre === nombre ){
            nombreDNI = a.dni
        }

        arr2.filter( b => {
            if( b.dni === nombreDNI ){
                return b.telefono
            }
        })
    })

    return res
}
//  ----------------------------------------------------------
    //  testing:

let test1 = letrasIguales( "martes", "jueves" )

const testingTable = [
    {"Resultado del Test 1: " : test1}
]
//  ----------------------------------------------------------