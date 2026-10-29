/*
Clase 20 - Ejercicios: Operadores
Vídeo: https://youtu.be/1glVfFxj8a4?t=6458
*/

// 1. Crea una variable para cada operación aritmética
let suma = 10 + 5
let resta = 10 - 5
let multiplicacion = 10 * 5
let division = 10 / 5
let modulo = 10 % 3
let exponente = 2 ** 3
let incremento = 0
incremento++
let decremento = 5
decremento--

// 2. Crea una variable para cada tipo de operación de asignación,
//    que haga uso de las variables utilizadas para las operaciones aritméticas
let x = 10
x += suma      // x = x + suma
x -= resta     // x = x - resta
x *= multiplicacion // x = x * multiplicacion
x /= division  // x = x / division
x %= modulo    // x = x % modulo
x **= exponente // x = x ** exponente

// 3. Imprime 5 comparaciones verdaderas con diferentes operadores de comparación
console.log(5 == 5)    // true, igualdad
console.log(10 != 5)   // true, desigualdad
console.log(15 > 10)   // true, mayor que
console.log(8 < 12)    // true, menor que
console.log(7 >= 7)    // true, mayor o igual

// 4. Imprime 5 comparaciones falsas con diferentes operadores de comparación
console.log(5 == 3)    // false
console.log(10 != 10)  // false
console.log(15 < 10)   // false
console.log(8 > 12)    // false
console.log(7 >= 10)   // false

// 5. Utiliza el operador lógico and
let a = true
let b = false
console.log(a && b)   // false, porque b es false

// 6. Utiliza el operador lógico or
console.log(a || b)   // true, porque a es true

// 7. Combina ambos operadores lógicos
let c = true
console.log((a && b) || c)  // false || true = true

// 8. Añade alguna negación
console.log(!a)     // false, negación de true
console.log(!b)     // true, negación de false

// 9. Utiliza el operador ternario
let edad = 20
let mensaje = edad >= 18 ? "Eres mayor de edad" : "Eres menor de edad"
console.log(mensaje)

// 10. Combina operadores aritméticos, de comparáción y lógicas
let num1 = 15
let num2 = 8
let resultado = (num1 + num2) > 20 && (num1 - num2) < 10
console.log("Resultado combinado:", resultado)