/*
Clase 34 - Ejercicios: Objetos
Vídeo: https://youtu.be/1glVfFxj8a4?t=15675
*/

// 1. Crea un objeto con 3 propiedades
let persona = {
    nombre: "Ana",
    edad: 28,
    ciudad: "Madrid"
}
console.log(persona)

// 2. Accede y muestra su valor
console.log(persona.nombre)
console.log(persona.edad)
console.log(persona["ciudad"])

// 3. Agrega una nueva propiedad
persona.profesion = "Ingeniera"
console.log(persona)

// 4. Elimina una de las 3 primeras propiedades
delete persona.ciudad
console.log(persona)

// 5. Agrega una función e invócala
persona.saludar = function () {
    console.log(`Hola, soy ${this.nombre}`)
}
persona.saludar()

// 6. Itera las propiedades del objeto
for (let clave in persona) {
    console.log(`${clave}: ${persona[clave]}`)
}

// 7. Crea un objeto anidado
let usuario = {
    nombre: "Carlos",
    direccion: {
        calle: "Calle Mayor",
        numero: 15,
        ciudad: "Barcelona"
    },
    hobbies: ["leer", "viajar", "programar"]
}
console.log(usuario)

// 8. Accede y muestra el valor de las propiedades anidadas
console.log(usuario.direccion.calle)
console.log(usuario.direccion.ciudad)
console.log(usuario.hobbies[1])

// 9. Comprueba si los dos objetos creados son iguales
let obj1 = { a: 1, b: 2 }
let obj2 = { a: 1, b: 2 }
console.log(JSON.stringify(obj1) === JSON.stringify(obj2)) // true

// 10. Comprueba si dos propiedades diferentes son iguales
console.log(persona.nombre === persona.profesion) // false
console.log(persona.edad === obj1.a) // false (28 !== 1)