/*
Clase 22 - Ejercicios: Strings
Vídeo: https://youtu.be/1glVfFxj8a4?t=7226
*/

// 1. Concatena dos cadenas de texto
let saludo = "Hola" + " " + "Mundo"
console.log(saludo)

// 2. Muestra la longitud de una cadena de texto
let texto = "JavaScript"
console.log("Longitud:", texto.length)

// 3. Muestra el primer y último carácter de un string
console.log("Primer carácter:", texto[0])
console.log("Último carácter:", texto[texto.length - 1])

// 4. Convierte a mayúsculas y minúsculas un string
console.log("Mayúsculas:", texto.toUpperCase())
console.log("Minúsculas:", texto.toLowerCase())

// 5. Crea una cadena de texto en varias líneas
let multilinea = `Esta es una cadena
que tiene varias
líneas de texto`
console.log(multilinea)

// 6. Interpola el valor de una variable en un string
let lenguaje = "JavaScript"
console.log(`Estoy aprendiendo ${lenguaje}`)

// 7. Reemplaza todos los espacios en blanco de un string por guiones
let frase = "Hola mundo desde JavaScript"
let fraseSinEspacios = frase.replaceAll(" ", "-")
console.log(fraseSinEspacios)

// 8. Comprueba si una cadena de texto contiene una palabra concreta
console.log(frase.includes("mundo"))
console.log(frase.includes("Python"))

// 9. Comprueba si dos strings son iguales
let str1 = "Hola"
let str2 = "Hola"
let str3 = "hola"
console.log(str1 === str2) // true
console.log(str1 === str3) // false (diferente mayúscula)

// 10. Comprueba si dos strings tienen la misma longitud
console.log(str1.length === str2.length)