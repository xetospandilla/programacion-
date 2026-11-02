# Nota de continuidad — Curso de C++

Actualizada el 2 de noviembre de 2026.

## Estado de los vídeos

- **Vídeo 63: constructor de movimiento — completado.**
  - Archivo: `7.11-moveConstructors/moveConstructors.cpp`.
  - Incluye `std::move` con `<utility>`, explicación de las referencias a rvalue, transferencia de propiedad, asignación de `nullptr` al origen y seguridad del destructor.
  - La regla de cinco y los operadores de asignación de movimiento quedan como contenido futuro.

- **Vídeo 64: puntero `this` — completado.**
  - Archivos: `7.12-this/teoriaThis.cpp`, `ejemplo1.cpp`, `ejemplo2.cpp`, `ejemplo3.cpp`.
  - Se explica qué representa `this`, su disponibilidad en funciones miembro no estáticas, su ausencia en métodos estáticos, la diferencia entre `this` y `*this`, el encadenamiento con `return *this` y el tipo `const T*` en métodos `const`.

## Próximo vídeo

- **Vídeo 65.**

## Ejercicio pendiente

- **`Inventario`: pendiente.** Debe resolverlo el estudiante. No se incluye solución en el repositorio.

## Referencias de consulta

- `04-punteros/5-referencias/5.1-Introducción/referencias.cpp`: teoría ampliada de referencias.
- `04-punteros/5-referencias/5.2-EjemplosSencillos/trabajoref.cpp`: ocho ejemplos independientes y activables.
- `06-L-values&R-values/values.cpp`: base para distinguir lvalues, rvalues, `T&`, `const T&` y `T&&`.
