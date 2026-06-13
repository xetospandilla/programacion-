/*
Clase 30 - Ejercicios: Bucles
Vídeo: https://youtu.be/1glVfFxj8a4?t=12732
*/

// NOTA: Explora diferentes sintaxis de bucles para resolver los ejercicios

// 1. Crea un bucle que imprima los números del 1 al 20
for (let i = 1; i <= 20; i++) {
    console.log(i)
}

// 2. Crea un bucle que sume todos los números del 1 al 100 y muestre el resultado
let sumaTotal = 0
for (let i = 1; i <= 100; i++) {
    sumaTotal += i
}
console.log("Suma del 1 al 100:", sumaTotal)

// 3. Crea un bucle que imprima todos los números pares entre 1 y 50
for (let i = 2; i <= 50; i += 2) {
    console.log(i)
}

// 4. Dado un array de nombres, usa un bucle para imprimir cada nombre en la consola
let nombres = ["Ana", "Luis", "Carlos", "María", "Sofía"]
for (let nombre of nombres) {
    console.log(nombre)
}

// 5. Escribe un bucle que cuente el número de vocales en una cadena de texto
let textoVocales = "Hola Mundo"
let contadorVocales = 0
let vocales = "aeiouAEIOU"
for (let letra of textoVocales) {
    if (vocales.includes(letra)) {
        contadorVocales++
    }
}
console.log("Número de vocales:", contadorVocales)

// 6. Dado un array de números, usa un bucle para multiplicar todos los números y mostrar el producto
let numerosProducto = [2, 3, 4, 5]
let producto = 1
for (let num of numerosProducto) {
    producto *= num
}
console.log("Producto:", producto)

// 7. Escribe un bucle que imprima la tabla de multiplicar del 5
for (let i = 1; i <= 10; i++) {
    console.log(`5 x ${i} = ${5 * i}`)
}

// 8. Usa un bucle para invertir una cadena de texto
let textoInvertir = "JavaScript"
let invertida = ""
for (let i = textoInvertir.length - 1; i >= 0; i--) {
    invertida += textoInvertir[i]
}
console.log("Texto invertido:", invertida)

// 9. Usa un bucle para generar los primeros 10 números de la secuencia de Fibonacci
let fib = [0, 1]
for (let i = 2; i < 10; i++) {
    fib[i] = fib[i - 1] + fib[i - 2]
}
console.log("Fibonacci:", fib)

// 10. Dado un array de números, usa un bucle para crear un nuevo array que contenga solo los números mayores a 10
let arrayOriginal = [5, 12, 8, 20, 3, 15, 7]
let mayoresa10 = []
for (let num of arrayOriginal) {
    if (num > 10) {
        mayoresa10.push(num)
    }
}
console.log("Números mayores a 10:", mayoresa10)