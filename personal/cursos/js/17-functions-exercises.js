/*
Clase 32 - Ejercicios: Funciones
Vídeo: https://youtu.be/1glVfFxj8a4?t=14146
*/

// NOTA: Explora diferentes sintaxis de funciones para resolver los ejercicios

// 1. Crea una función que reciba dos números y devuelva su suma
function sumar(a, b) {
    return a + b
}
console.log("Suma:", sumar(5, 3))

// 2. Crea una función que reciba un array de números y devuelva el mayor de ellos
function encontrarMayor(array) {
    return Math.max(...array)
}
console.log("Mayor:", encontrarMayor([10, 25, 8, 42, 17]))

// 3. Crea una función que reciba un string y devuelva el número de vocales que contiene
function contarVocales(texto) {
    let vocales = "aeiouAEIOU"
    let contador = 0
    for (let letra of texto) {
        if (vocales.includes(letra)) contador++
    }
    return contador
}
console.log("Vocales:", contarVocales("Hola JavaScript"))

// 4. Crea una función que reciba un array de strings y devuelva un nuevo array con las strings en mayúsculas
function convertirMayusculas(array) {
    return array.map(str => str.toUpperCase())
}
console.log("Mayúsculas:", convertirMayusculas(["hola", "mundo", "js"]))

// 5. Crea una función que reciba un número y devuelva true si es primo, y false en caso contrario
function esPrimo(num) {
    if (num <= 1) return false
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false
    }
    return true
}
console.log("¿Es primo 7?:", esPrimo(7))
console.log("¿Es primo 10?:", esPrimo(10))

// 6. Crea una función que reciba dos arrays y devuelva un nuevo array que contenga los elementos comunes entre ambos
function elementosComunes(arr1, arr2) {
    return arr1.filter(elemento => arr2.includes(elemento))
}
console.log("Comunes:", elementosComunes([1, 2, 3, 4], [3, 4, 5, 6]))

// 7. Crea una función que reciba un array de números y devuelva la suma de todos los números pares
function sumaPares(array) {
    return array.filter(num => num % 2 === 0).reduce((acc, num) => acc + num, 0)
}
console.log("Suma pares:", sumaPares([1, 2, 3, 4, 5, 6]))

// 8. Crea una función que reciba un array de números y devuelva un nuevo array con cada número elevado al cuadrado
function elevarCuadrado(array) {
    return array.map(num => num ** 2)
}
console.log("Cuadrados:", elevarCuadrado([1, 2, 3, 4, 5]))

// 9. Crea una función que reciba una cadena de texto y devuelva la misma cadena con las palabras en orden inverso
function invertirPalabras(texto) {
    return texto.split(" ").reverse().join(" ")
}
console.log("Invertido:", invertirPalabras("Hola mundo desde JavaScript"))

// 10. Crea una función que calcule el factorial de un número dado
function factorial(n) {
    if (n < 0) return undefined
    if (n === 0 || n === 1) return 1
    let resultado = 1
    for (let i = 2; i <= n; i++) {
        resultado *= i
    }
    return resultado
}
console.log("Factorial de 5:", factorial(5))
console.log("Factorial de 0:", factorial(0))