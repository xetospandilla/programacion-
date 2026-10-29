/*
Clase 41 - Ejercicios: Manejo de errores
Vídeo: https://youtu.be/1glVfFxj8a4?t=20392
*/

// 1. Captura una excepción utilizando try-catch
try {
    let resultado = 10 / 0
    console.log(resultado)
    console.log(variableNoDefinida)
} catch (error) {
    console.log("Error capturado:", error.message)
}

// 2. Captura una excepción utilizando try-catch y finally
try {
    // let json = JSON.parse("texto inválido")
} catch (error) {
    console.log("Error:", error.message)
} finally {
    console.log("Esto siempre se ejecuta")
}

// 3. Lanza una excepción genérica
function dividir(a, b) {
    if (b === 0) {
        throw new Error("No se puede dividir por cero")
    }
    return a / b
}

// 4. Crea una excepción personalizada
class MiErrorPersonalizado extends Error {
    constructor(mensaje, codigo) {
        super(mensaje)
        this.name = "MiErrorPersonalizado"
        this.codigo = codigo
    }
}

// 5. Lanza una excepción personalizada
function validarEdad(edad) {
    if (edad < 0) {
        throw new MiErrorPersonalizado("La edad no puede ser negativa", 400)
    }
    if (edad > 120) {
        throw new MiErrorPersonalizado("Edad no válida", 400)
    }
    return true
}

// 6. Lanza varias excepciones según una lógica definida
function procesarDatos(valor) {
    if (typeof valor !== "number") {
        throw new TypeError("El valor debe ser un número")
    }
    if (valor < 0) {
        throw new RangeError("El valor no puede ser negativo")
    }
    if (!Number.isInteger(valor)) {
        throw new Error("El valor debe ser un entero")
    }
    return valor * 2
}

// 7. Captura varias excepciones en un mismo try-catch
try {
    procesarDatos("texto")
} catch (error) {
    if (error instanceof TypeError) {
        console.log("Error de tipo:", error.message)
    } else if (error instanceof RangeError) {
        console.log("Error de rango:", error.message)
    } else {
        console.log("Error general:", error.message)
    }
}

// 8. Crea un bucle que intente transformar a float cada valor y capture y muestre los errores
let valores = ["123", "45.67", "abc", "78.9", "xyz", "100"]
for (let valor of valores) {
    try {
        let num = parseFloat(valor)
        if (isNaN(num)) {
            throw new Error(`"${valor}" no es un número válido`)
        }
        console.log(`"${valor}" convertido a: ${num}`)
    } catch (error) {
        console.log("Error:", error.message)
    }
}

// 9. Crea una función que verifique si un objeto tiene una propiedad específica y lance una excepción personalizada
function verificarPropiedad(objeto, propiedad) {
    if (!objeto.hasOwnProperty(propiedad)) {
        throw new MiErrorPersonalizado(
            `El objeto no tiene la propiedad "${propiedad}"`,
            404
        )
    }
    return objeto[propiedad]
}

try {
    let testObj = { nombre: "Test" }
    console.log(verificarPropiedad(testObj, "edad"))
} catch (error) {
    console.log(`${error.name}: ${error.message} (código: ${error.codigo})`)
}

// 10. Crea una función que realice reintentos en caso de error hasta un máximo de 10
function operacionInestable() {
    let random = Math.random()
    if (random < 0.7) {
        throw new Error("Falló la operación")
    }
    return "Operación exitosa"
}

function ejecutarConReintentos(maxReintentos = 10) {
    for (let intento = 1; intento <= maxReintentos; intento++) {
        try {
            let resultado = operacionInestable()
            console.log(`Intento ${intento}: ${resultado}`)
            return resultado
        } catch (error) {
            console.log(`Intento ${intento}: ${error.message}`)
            if (intento === maxReintentos) {
                throw new Error("Se agotaron los reintentos")
            }
        }
    }
}

try {
    ejecutarConReintentos()
} catch (error) {
    console.log("Error final:", error.message)
}