/*
 ============================================================================
 errores.js — Demostración de los TRES tipos de error (sin Internet)
 ============================================================================
 En main.js los tres errores se tratan en producción. Este archivo los
 reproduce UNO A UNO con simulaciones locales, para que se vea la salida
 de cada tipo sin depender de la red. Ejecución: node errores.js
 ============================================================================
 */

async function principal() {
    // 1) ERROR DE RED: fetch rechazaría su promesa (sin conexión, etc.).
    //    Simulamos ese rechazo con Promise.reject.
    try {
        await Promise.reject(new Error("getaddrinfo ENOTFOUND jsonplaceholder.typicode.com"))
    } catch (error) {
        console.log("Red:", error.message)
    }

    // 2) ERROR HTTP: el servidor responde, pero con código de error.
    //    Simulamos un objeto response con ok false (como haría fetch ante
    //    un 503). La comprobación es la misma que en main.js.
    const respuestaSimulada = { ok: false, status: 503, statusText: "Service Unavailable" }
    if (!respuestaSimulada.ok) {
        console.log("HTTP: el servidor respondió " + respuestaSimulada.status + " " + respuestaSimulada.statusText)
    }

    // 3) ERROR DE FORMATO: llega una respuesta "correcta", pero no tiene
    //    la forma esperada (no es una lista). La validación es la misma.
    const datosMalFormados = { mensaje: "esto no es una lista" }
    if (!Array.isArray(datosMalFormados)) {
        console.log("Formato: la respuesta no es una lista de resultados.")
    }

    console.log("Con esto has visto cómo se ETIQUETA cada tipo de error.")
}

principal()