/*
 ============================================================================
 LECCIÓN 34 - Números y operaciones habituales
 ============================================================================

 OBJETIVOS DE APRENDIZAJE
 - Realizar operaciones aritméticas básicas y explicar casos límite
   como la división entre cero y el resto con decimales.
 - Usar Math.round(), Math.floor(), Math.ceil(), Math.abs(), Math.min(),
   Math.max() y Math.random().
 - Obtener un número entero aleatorio dentro de un intervalo inclusivo.
 - Explicar la imprecisión de los decimales en JavaScript y manejarla
   con un redondeo o una comprobación aproximada.

 PRERREQUISITOS
 - Lección 04 (operadores aritméticos).
 - Lección 33 (Number(), parseInt(), NaN).

 1. OPERACIONES ARITMÉTICAS Y CASOS LÍMITE
 Las operaciones básicas ya se vieron en la lección 04: + - * / % **.
 Aquí repasamos los casos límite que conviene conocer antes de usarlas.
 */

console.log("--- 1. Aritmética y casos límite ---")

console.log(7 / 2) // 3.5 -> la división normal entre enteros devuelve decimal
console.log(7 % 2) // 1   -> resto de dividir 7 entre 2 (7 = 3*2 + 1)
console.log(10 % 3) // 1  -> resto de 10 entre 3
console.log(4 % 2) // 0   -> resto al dividir 4 entre 2: útil para ver pares

// Casos límite
console.log(5 / 0) // Infinity -> dividir entre cero en JS NO da error
console.log(-5 / 0) // -Infinity
console.log(0 / 0) // NaN -> cero entre cero no está definido

// El resto con decimales puede dar resultados sorprendentes:
console.log(10.5 % 3) // 1.5 -> se calcula igual que con enteros

/*
 2. EL OBJETO Math
 Math es una colección de utilidades matemáticas que ya viene incluida
 en JavaScript (una API del lenguaje, no una función de tu código).
 Se escribe con M mayúscula y se accede a sus funciones con un punto:
 Math.nombreDeLaFuncion(valor)
 */

console.log("--- 2. Math: redondeos y valores absolutos ---")

let precio = 4.6

console.log(Math.round(precio)) // 5  -> redondea al entero más cercano
console.log(Math.floor(precio)) // 4  -> redondea SIEMPRE hacia abajo
console.log(Math.ceil(precio)) // 5  -> redondea SIEMPRE hacia arriba

console.log(Math.round(4.5)) // 5  -> .5 redondea hacia arriba
console.log(Math.floor(4.999)) // 4  -> floor baja aunque esté casi en 5
console.log(Math.ceil(4.001)) // 5  -> ceil sube aunque esté casi en 4

console.log(Math.abs(-8)) // 8 -> valor absoluto: distancia al cero (sin signo)
console.log(Math.abs(8)) // 8 -> el positivo no cambia

/*
 3. Math.min() Y Math.max()
 Devuelven el menor y el mayor de los valores que reciben.
 Aceptan varios números separados por comas.
 */

console.log("--- 3. Mínimo y máximo ---")

console.log(Math.min(3, 7, 1, 9)) // 1 -> el más pequeño
console.log(Math.max(3, 7, 1, 9)) // 9 -> el más grande

// Con un array se usa el operador de propagación ... (lección 20):
let temperaturas = [12, 18, 9, 21]
console.log(Math.max(...temperaturas)) // 21
console.log(Math.min(...temperaturas)) // 9

/*
 4. Math.random()
 Math.random() devuelve UN NÚMERO DECIMAL ENTRE 0 (incluido) y 1 (excluido).
 Es decir: 0 <= resultado < 1.
 IMPORTANTE: la salida NO es fija. Cada ejecución devuelve un valor
 distinto dentro de ese rango. Por eso en este archivo verás el valor
 impreso, pero el rango se explica como texto, no como un número exacto.
 */

console.log("--- 4. Math.random() ---")

let aleatorio = Math.random()
console.log("Un decimal aleatorio entre 0 y 1 (excluido):", aleatorio)
console.log("Rango posible:", aleatorio >= 0 && aleatorio < 1)

/*
 5. ENTERO ALEATORIO DENTRO DE UN INTERVALO INCLUSIVO
 La fórmula habitual para obtener un entero entre min y max (AMBOS incluidos):
   Math.floor(Math.random() * (max - min + 1)) + min
 Razón:
   1) Math.random() da un decimal entre 0 y 1 (sin llegar a 1).
   2) Al multiplicarlo por (max - min + 1) recorremos un rango de esa
      longitud, pero aún con decimales.
   3) Math.floor() baja al entero inferior, dejando 0, 1, 2, ..., (max-min).
   4) Sumar min desplaza el intervalo a min, min+1, ..., max.
 */

console.log("--- 5. Entero aleatorio en un intervalo ---")

function enteroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// Un dado: mín 1, máx 6 (ambos incluidos)
let dado = enteroAleatorio(1, 6)
console.log("Resultado del dado (un entero entre 1 y 6, ambos incluidos):", dado)
console.log("Está dentro del rango:", dado >= 1 && dado <= 6)

/*
 6. PRECISIÓN DE LOS DECIMALES
 JavaScript guarda los números en sistema binario, y muchos decimales
 "bonitos" (como 0.1) no se pueden representar de forma exacta.
 El resultado son pequeños errores de redondeo que aparecen al operar.
 */

console.log("--- 6. Decimales e imprecisión ---")

console.log(0.1 + 0.2) // 0.30000000000000004  (sorprendente pero esperado)

// Para mostrarlo "limpio" se redondea con Math.round() o con toFixed():
let sumaImprecisa = 0.1 + 0.2
console.log(Math.round(sumaImprecisa * 100) / 100) // 0.3 -> redondeo a 2 decimales
console.log(sumaImprecisa.toFixed(2)) // "0.30" -> texto con 2 decimales

// Para COMPARAR decimales no se usa la igualdad exacta:
console.log(0.1 + 0.2 === 0.3) // false -> por la imprecisión, ¡no lo iguales así!

// Se compara con una tolerancia pequeña (diferencia aceptable):
let diferencia = (0.1 + 0.2) - 0.3 // 5.55e-17, un valor minúsculo
console.log("Diferencia con la tolerancia:", Math.abs(diferencia) < 0.0000001) // true

/*
 ERRORES FRECUENTES
 1. Creer que 5 / 0 da error: en JS da Infinity (ya lo viste arriba).
 2. Confundir Math.floor() (abajo) con Math.round() (al más cercano).
 3. Anotar la salida de Math.random() como si fuera fija: es aleatoria;
    hay que describir el RANGO (0 <= valor < 1).
 4. Usar parseInt() para redondear: parseInt(4.9) da 4, pero parece "casi 5";
    para redondear se usa Math.round(), porque parseInt solo trunca.
 5. Comparar decimales con === (da false por la imprecisión).
*/

/*
 EJERCICIOS GRADUADOS

 EJERCICIO 1 (reproducir)
 Escribe tres instrucciones que muestren, para el número 7.8:
   a) el redondeo al entero más cercano,
   b) el redondeo hacia abajo,
   c) el redondeo hacia arriba.

 EJERCICIO 2 (comprender)
 Sin ejecutar, indica el resultado de cada una:
   a) Math.floor(9.99)
   b) Math.ceil(9.01)
   c) Math.abs(-5.5)
   d) enteroAleatorio devuelve SIEMPRE números enteros: ¿verdadero o falso?

 EJERCICIO 3 (aplicar)
 Completa la función lanzarMoneda() para que devuelva "cara" o "cruz"
 usando enteroAleatorio(0, 1) y un condicional (lección 08). Ejecuta la
 función varias veces y comprueba que solo aparecen esos dos valores.
*/

/*
 SOLUCIONES

 EJERCICIO 1
   let n = 7.8
   console.log(Math.round(n)) // 8
   console.log(Math.floor(n)) // 7
   console.log(Math.ceil(n)) // 8

 EJERCICIO 2
   a) 9      -> floor baja siempre
   b) 10     -> ceil sube siempre
   c) 5.5    -> abs quita el signo
   d) VERDADERO -> la fórmula termina con + min sobre un entero de Math.floor()

 EJERCICIO 3
   function lanzarMoneda() {
     let valor = enteroAleatorio(0, 1)
     if (valor === 1) {
       return "cara"
     } else {
       return "cruz"
     }
   }
   Cada llamada da "cara" o "cruz". El condicional (lección 08) elige la
   rama según el entero devuelto. Naturalmente, no hay salida fija: es un
   resultado aleatorio dentro de dos posibilidades.
*/

/*
 RESUMEN Y AUTOEVALUACIÓN
 Resumen: la aritmética funciona con enteros y decimales; 5/0 da Infinity
 y 0/0 da NaN; Math ofrece redondeos (round, floor, ceil), valor absoluto,
 mínimo, máximo y aleatoriedad; la fórmula floor(random()*(max-min+1))+min
 da un entero inclusivo; los decimales tienen imprecisión y se manejan con
 redondeo o tolerancia.

 Autoevaluación: tras esta lección deberías poder...
 [ ] Predecir el resultado de 7 % 3 y explicar el resto
 [ ] Elegir entre Math.round, Math.floor y Math.ceil según el caso
 [ ] Generar un entero aleatorio entre dos límites inclusivos
 [ ] Explicar por qué 0.1 + 0.2 no es exactamente 0.3
 [ ] Describir el rango de Math.random() sin inventar una salida fija

 RETO OPCIONAL
 (Concepto aún no obligatorio: bucles for, lección 14.)
 Simula 10 tiradas de un dado y cuenta cuántas veces sale 6. Necesitarás
 un bucle que repita la tirada 10 veces. Es un adelanto de la lección 14.
 */