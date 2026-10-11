/*
Clase 18 - Ejercicios: primeros pasos
Vídeo: https://youtu.be/1glVfFxj8a4?t=4733
*/

// 1. Escribe un comentario en una línea
// Este es un comentario de una línea

// 2. Escribe un comentario en varias líneas
/*
Este es un comentario
de varias líneas
*/

// 3. Declara variables con valores asociados a todos los datos de tipo primitivos
let myString = "Hola, mundo!"
let myNumber = 42
let myBoolean = true
let myUndefined = undefined
let myNull = null
let myBigInt = 12345678901234567890n
let mySymbol = Symbol("mi-simbolo")

// 4. Imprime por consola el valor de todas las variables
console.log(myString)
console.log(myNumber)
console.log(myBoolean)
console.log(myUndefined)
console.log(myNull)
console.log(myBigInt)
console.log(mySymbol)

// 5. Imprime por consola el tipo de todas las variables
console.log(typeof myString)
console.log(typeof myNumber)
console.log(typeof myBoolean)
console.log(typeof myUndefined)
console.log(typeof myNull)
console.log(typeof myBigInt)
console.log(typeof mySymbol)

// 6. A continuación, modifica los valores de las variables por otros del mismo tipo
myString = "Nuevo texto"
myNumber = 99
myBoolean = false
myUndefined = undefined
myNull = null
myBigInt = 98765432109876543210n
mySymbol = Symbol("otro-simbolo")

// 7. A continuación, modifica los valores de las variables por otros de distinto tipo
myString = 100
myNumber = "ahora soy texto"
myBoolean = null
myUndefined = "ya no soy undefined"
myNull = true
myBigInt = 42
mySymbol = "simbolo como string"

// 8. Declara constantes con valores asociados a todos los tipos de datos primitivos
const constString = "Soy una constante"
const constNumber = 3.1416
const constBoolean = false
const constUndefined = undefined
const constNull = null
const constBigInt = 999999999999999n
const constSymbol = Symbol("constante-simbolo")

// 9. A continuación, modifica los valores de las constantes
// constString = "nuevo valor" // Error: no se puede reasignar una constante
// constNumber = 2.71 // Error: no se puede reasignar una constante
// constBoolean = true // Error: no se puede reasignar una constante

// 10. Comenta las líneas que produzcan algún tipo de error al ejecutarse
// Las líneas 9 están comentadas para evitar errores de asignación a constantes