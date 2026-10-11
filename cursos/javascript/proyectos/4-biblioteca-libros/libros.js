/*
 ============================================================================
 libros.js — Clase Libro y alamacén de la biblioteca
 ============================================================================
 Este archivo SOLO define y exporta las piezas (clase y funciones).
 No se ejecuta solo: lo usa main.js mediante import (módulos ES, lección
 28-29). Separar la "lógica" de la "interfaz" hace que cada archivo sea
 pequeño, reutilizable y fácil de probar.
 ============================================================================
 */

export class Libro {
    constructor(titulo, autor) {
        this.titulo = titulo
        this.autor = autor
        this.prestado = false // true cuando está en manos de alguien
    }
}

export class Biblioteca {
    // Un array es el almacén; podría ser una base de datos más adelante.
    constructor() {
        this.libros = []
    }

    anadir(titulo, autor) {
        const tituloLimpio = titulo.trim()
        const autorLimpio = autor.trim()

        if (tituloLimpio === "") {
            return { ok: false, mensaje: "El título no puede estar vacío." }
        }
        if (autorLimpio === "") {
            return { ok: false, mensaje: "El autor no puede estar vacío." }
        }

        this.libros.push(new Libro(tituloLimpio, autorLimpio))
        return { ok: true, mensaje: `Libro añadido: ${tituloLimpio}` }
    }

    listar() {
        if (this.libros.length === 0) {
            return "La biblioteca está vacía."
        }
        return this.libros
            .map(
                (libro, indice) =>
                    `${indice + 1}. ${libro.titulo} (${libro.autor})` +
                    (libro.prestado ? " — PRESTADO" : "")
            )
            .join("\n")
    }

    // Busca por título (coincidencia parcial, sin distinguir mayúsculas).
    buscar(texto) {
        const busqueda = texto.trim().toLowerCase()
        return this.libros.filter((libro) =>
            libro.titulo.toLowerCase().includes(busqueda)
        )
    }

    prestar(posicion) {
        const indice = posicion - 1
        if (indice < 0 || indice >= this.libros.length) {
            return { ok: false, mensaje: "Posición no válida." }
        }
        const libro = this.libros[indice]
        if (libro.prestado) {
            return { ok: false, mensaje: `"${libro.titulo}" ya está prestado.` }
        }
        libro.prestado = true
        return { ok: true, mensaje: `Préstamo registrado: ${libro.titulo}` }
    }

    devolver(posicion) {
        const indice = posicion - 1
        if (indice < 0 || indice >= this.libros.length) {
            return { ok: false, mensaje: "Posición no válida." }
        }
        const libro = this.libros[indice]
        if (!libro.prestado) {
            return { ok: false, mensaje: `"${libro.titulo}" no estaba prestado.` }
        }
        libro.prestado = false
        return { ok: true, mensaje: `Devolución registrada: ${libro.titulo}` }
    }
}