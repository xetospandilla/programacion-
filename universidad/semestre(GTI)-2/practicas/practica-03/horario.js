//------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
// horario.js
//--------------------------------------------------------------------------------------------
let horario = {

    lunes : [
        ["Proyecto diseño y Programación Web", "8:45 - 11:15"],
        ["Redes y servicios telemáticos", "11:30 - 12:30"]
    ],

    martes : [
        ["Proyecto diseño y Programación Web", "8:30 - 10:30"],
        ["Programación 2", "10:45 - 12:45"]
    ]
,
    miercoles : [
        ["Proyecto diseño y Programación Web", "11:15 - 13:15"],
        ["Diseño de interfaces y experiencia de usuario", "13:15 - 14:15"]
    ],

    jueves : [
        ["Programación 2", "8:30 - 10:30"],
        ["Diseño de interfaces y experiencia de usuario", "10:45 - 12:30"]
    ],

    viernes : [ "No hay clase", "No hay clase"]
    
}

let horarioJSON = JSON.stringify(horario)

console.log(horarioJSON)
//--------------------------------------------------------------------------------------------
// Función horarioClase()
//--------------------------------------------------------------------------------------------
// Diseño: Objeto + string -> horarioClase -> lista<strings>
//--------------------------------------------------------------------------------------------

function horarioClase(horario, asignatura){

    let clases = []

    for(let dia in horario){ 

        let listaDeClases = horario[dia]
        /*Utilizamos "in" en vez de "of", ya que "in"
        recorre las llaves del objeto(lunes, martes, ...) y "of" los elementos 
        */
        for(clase of listaDeClases){
            /*Con este bucle anidado recorremos ambas listas, ahora
            clase[0] es el nombre, clase[1] es la hora.*/
            if(clase[0] == asignatura){
                clases.push([dia, clase[1]])
            }
        }
    }

    return clases
}
//--------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------