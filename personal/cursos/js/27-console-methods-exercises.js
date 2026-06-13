/*
Clase 43 - Ejercicios: Console
Vídeo: https://youtu.be/1glVfFxj8a4?t=21421
*/

// 1. Crea un función que utilice error correctamente
function mostrarError(mensaje) {
    console.error("ERROR:", mensaje)
}
mostrarError("Esto es un error de prueba")

// 2. Crea una función que utilice warn correctamente
function mostrarAdvertencia(mensaje) {
    console.warn("ADVERTENCIA:", mensaje)
}
mostrarAdvertencia("Esto es una advertencia")

// 3. Crea una función que utilice info correctamente
function mostrarInfo(mensaje) {
    console.info("INFO:", mensaje)
}
mostrarInfo("Esto es un mensaje informativo")

// 4. Utiliza table
let personas = [
    { nombre: "Ana", edad: 28, ciudad: "Madrid" },
    { nombre: "Luis", edad: 35, ciudad: "Barcelona" },
    { nombre: "Sofía", edad: 22, ciudad: "Valencia" }
]
console.table(personas)

// 5. Utiliza group
console.group("Grupo de pruebas")
console.log("Elemento 1")
console.log("Elemento 2")
console.groupEnd()

// 6. Utiliza time
console.time("Medición")
let suma = 0
for (let i = 0; i < 1000000; i++) {
    suma += i
}
console.timeEnd("Medición")

// 7. Valida con assert si un número es positivo
let numeroPositivo = 5
console.assert(numeroPositivo > 0, "El número debería ser positivo")
let numeroNegativo = -3
console.assert(numeroNegativo > 0, "Error: el número es negativo")

// 8. Utiliza count
function contar() {
    console.count("Contador")
}
contar()
contar()
contar()
console.countReset("Contador")
contar()

// 9. Utiliza trace
function funcionInterna() {
    console.trace("Rastreando la llamada")
}
function funcionIntermedia() {
    funcionInterna()
}
function funcionPrincipal() {
    funcionIntermedia()
}
funcionPrincipal()

// 10. Utiliza clear
// console.clear() // Descomenta esta línea para limpiar la consola
console.log("Para limpiar la consola, descomenta la línea anterior")