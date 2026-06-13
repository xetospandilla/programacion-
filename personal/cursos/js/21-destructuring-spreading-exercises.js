/*
Clase 36 - Ejercicios: Desestructuración y propagación
Vídeo: https://youtu.be/1glVfFxj8a4?t=16802
*/

// 1. Usa desestructuración para extraer los dos primeros elementos de un array 
let colores = ["rojo", "verde", "azul", "amarillo"]
let [primero, segundo] = colores
console.log(primero, segundo)

// 2. Usa desestructuración en un array y asigna un valor predeterminado a una variable
let [a, b, c = "por defecto"] = [1, 2]
console.log(a, b, c)

// 3. Usa desestructuración para extraer dos propiedades de un objeto
let coche = { marca: "Toyota", modelo: "Corolla", año: 2022 }
let { marca, modelo } = coche
console.log(marca, modelo)

// 4. Usa desestructuración para extraer dos propiedades de un objeto y asígnalas
//    a nuevas variables con nombres diferentes
let { marca: brand, modelo: model } = coche
console.log(brand, model)

// 5. Usa desestructuración para extraer dos propiedades de un objeto anidado
let empleado = {
    nombre: "Laura",
    puesto: "Desarrolladora",
    direccion: {
        calle: "Av. Principal",
        numero: 42
    }
}
let { direccion: { calle, numero } } = empleado
console.log(calle, numero)

// 6. Usa propagación para combinar dos arrays en uno nuevo
let array1 = [1, 2, 3]
let array2 = [4, 5, 6]
let combinado = [...array1, ...array2]
console.log(combinado)

// 7. Usa propagación para crear una copia de un array
let copiaArray = [...array1]
console.log(copiaArray)

// 8. Usa propagación para combinar dos objetos en uno nuevo
let objA = { x: 1, y: 2 }
let objB = { z: 3, w: 4 }
let combinadoObj = { ...objA, ...objB }
console.log(combinadoObj)

// 9. Usa propagación para crear una copia de un objeto
let copiaObj = { ...objA }
console.log(copiaObj)

// 10. Combina desestructuración y propagación
let datos = { nombre: "Pedro", edad: 30, pais: "Chile", idioma: "Español" }
let { nombre: nom, ...resto } = datos
console.log(nom)
console.log(resto)