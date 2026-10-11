# programación

Repositorio personal de **aprendizaje y práctica de programación**, principalmente durante el Grado en Tecnologías Interactivas (UPV), junto con cursos y experimentos hechos por cuenta propia.

Reúne ejercicios, prácticas y apuntes de distintas etapas. No es un producto profesional terminado: es material de estudio que refleja un proceso de aprendizaje.

## Estructura

```text
programacion/
├── universidad/
│   ├── semestre-01-gti/   Prácticas, ejercicios propuestos y exámenes corregidos (C++)
│   └── semestre-02-gti/   Prácticas de JavaScript/Node.js, servidores REST y SQL
├── cursos/
│   ├── cpp/               Curso de C++: fundamentos → punteros → POO
│   ├── javascript/        Curso de JavaScript ordenado por temas + módulos
│   └── html-css/          Introducción a HTML y CSS
└── experimentos/
    └── cpp/               Pequeños experimentos personales en C++ (consola)
```

## Áreas y tecnologías

| Área | Dónde | Qué se practica |
|---|---|---|
| C++ | `cursos/cpp`, `universidad/semestre-01-gti`, `experimentos/cpp` | Fundamentos, control de flujo, funciones, arrays, punteros, referencias y programación orientada a objetos. |
| JavaScript | `cursos/javascript`, `universidad/semestre-02-gti` | Variables, tipos, estructuras, funciones, objetos, clases, módulos, manejo de errores y testing con Mocha. |
| Node.js / Express | `universidad/semestre-02-gti` | Servidores REST básicos, lógica de negocio y acceso a datos. |
| SQL / SQLite | `universidad/semestre-02-gti` | Scripts de esquema y consultas, y bases de datos locales `.bd`. |
| HTML / CSS | `cursos/html-css` | Documentos, listas, enlaces, imágenes, formularios y estilos básicos. |

## Tres bloques de contenido

- **Prácticas universitarias** (`universidad/`): trabajo del grado, ordenado por semestre.
  - `semestre-01-gti`: mayoritariamente C++. Contiene `practicas/`, `ejercicios_propuestos/` y `examenes_corregidos/`.
  - `semestre-02-gti`: mayoritariamente JavaScript/Node.js y SQL. Contiene prácticas y exámenes, con servidores REST hechos con Express y acceso a datos con SQLite.
- **Cursos** (`cursos/`): apuntes y ejercicios seguidos por mi cuenta, ordenados por tema: `cpp/`, `javascript/` y `html-css/`.
- **Experimentos** (`experimentos/cpp/`): pequeños programas de consola en C++ (por ejemplo `misionMars`, `tamagochi`, `robot`, `gestorAlumnos` y `tiempo`), hechos para practicar lógica y POO. Son pruebas, no aplicaciones completas.

## Cómo orientarse y ejecutar

Cada práctica o ejercicio es autocontenido: entra en su carpeta y consulta la guía según el lenguaje.

- **C++** (`cursos/cpp`, `universidad/semestre-01-gti`, `experimentos/cpp`): normalmente un único archivo `.cpp`. Compila y ejecuta con tu compilador habitual; por ejemplo:

  ```bash
  g++ archivo.cpp -o programa
  ./programa
  ```

- **JavaScript / Node.js** (`cursos/javascript`, `universidad/semestre-02-gti`):
  - Los archivos sueltos del curso se ejecutan con `node archivo.js`.
  - Las carpetas con `package.json` necesitan `npm install` antes de usarse. Scripts comprobados en los propios archivos:
    - `universidad/semestre-02-gti/practicas/practica-05/mocha`: `npm test` (ejecuta Mocha).
    - `universidad/semestre-02-gti/practicas/practica-05/npm`: `npm run main` (ejecuta `node main.js`).
    - `universidad/semestre-02-gti/practicas/practica-06/ejercicio-08/servidorREST`: `npm run servidor` (arranca el servidor) y `npm test` (Mocha).
    - Los `package.json` de nivel superior de `practica-06/ejercicio-09`, `-10` y `-11` solo declaran dependencias, como `sqlite3`. Sus subcarpetas `servidorREST/` sí declaran los scripts `servidor` (ejecuta `node mainServidorREST.js`) y `test` (Mocha), igual que el servidor del ejercicio 08. Estos comandos `npm run servidor` y `npm test` corresponden a la subcarpeta `servidorREST/` y se ejecutan desde ella, no desde la carpeta raíz del ejercicio.

- **SQL y bases de datos** (`universidad/semestre-02-gti`, práctica 6): los archivos `.sql` son scripts de creación y consulta pensados para SQLite, que es el motor de referencia de estos ejemplos. Los archivos `.bd` son bases de datos locales de SQLite que usan algunos ejercicios de Node.js. No se garantiza que los scripts sean directamente compatibles con otros motores.

## Nota

Este repositorio documenta un proceso de aprendizaje. Los ejercicios y prácticas tienen distintos grados de acabado: algunos están completos, otros son parciales, y no todos están pensados para ejecutarse tal cual sin revisarlos. No pretende ser un portfolio profesional.
