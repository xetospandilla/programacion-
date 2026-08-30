# programacion-

Repositorio personal de **aprendizaje y práctica de programación** durante el Grado en Tecnologías Interactivas (UPV).

No es un proyecto profesional: recoge ejercicios, apuntes de cursos, prácticas universitarias y pequeños experimentos que reflejan la evolución de mi aprendizaje.

## Propósito

- Practicar fundamentos de programación (C++ y JavaScript).
- Organizar el trabajo del grado: prácticas, ejercicios propuestos y exámenes corregidos.
- Explorar temas por mi cuenta (curso de C++, curso de JavaScript, POO, HTML/CSS, Node.js).

## Lenguajes y áreas

| Área | Contenido |
|---|---|
| C++ | Fundamentos, control de flujo, funciones, arrays, punteros, referencias y programación orientada a objetos. |
| JavaScript | Curso de introducción (variables, estructuras, funciones, objetos, arrays, closures, clases), ejercicios, módulos y testing con Mocha. |
| Node.js | Servidores REST con Express (práctica 6): rutas, lógica, base de datos SQLite y tests. |
| HTML/CSS | Fundamentos de maquetación y formularios. |
| SQL | Consultas, esquemas y scripts de las prácticas de Bases de Datos. |

## Estructura

```text
personal/
├── cursos/                Apuntes y ejercicios de cursos propios
│   ├── c++/               Fundamentos → punteros → POO (C++ moderno)
│   ├── js/                Curso de JavaScript (ejercicios por tema)
│   └── html&css/          Introducción a HTML y CSS
└── experimentos/
    └── c++/               Mini-proyectos personales en consola

universidad/
├── semestre(GTI)-1/       Prácticas, ejercicios propuestos y exámenes corregidos (C++)
└── semestre(GTI)-2/       Prácticas de servidores REST, Node.js y SQL
```

## Mini-proyectos de `personal/experimentos/`

Pequeños programas de consola (C++, un solo archivo) creados para practicar POO y lógica:

- **misionMars** — minijuego de exploración en un mapa 10x10.
- **tamagochi** — mascota virtual con estados (hambre, energía…).
- **robot** — simulación con coordenadas y movimientos (clases `Punto`, robot).
- **gestorAlumnos** — gestión de alumnos con vector de notas.
- **tiempo** — clase para representar y operar con horas.

Son experimentos de aprendizaje, no aplicaciones profesionales.

## Cómo usar

Cada práctica o ejercicio es autocontenido:

- **C++**: compilar con el compilador habitual (`g++ archivo.cpp -o programa`) y ejecutar.
- **JavaScript/Node**: `npm install` dentro de cada subproyecto (por ejemplo `servidorREST`) y ejecutar con `node`.
- **SQL**: importar los scripts en un gestor como MySQL/MariaDB o SQLite según la práctica.

Los proyectos con `package.json` incluyen scripts (p. ej. `npm test` con Mocha).

## Nota

Este repositorio representa una etapa de formación: incluye ejercicios básicos a propósito y no debe valorarse como un portfolio de desarrollo profesional.