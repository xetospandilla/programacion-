/*
-------------------------------------------------------------------------------------------------------
Estructuras condicionales: if, else if, else
-------------------------------------------------------------------------------------------------------
- Las estructuras condicionales permiten ejecutar diferentes bloques de codigo segun se cumpla
  o no una condicion.

- La condicion es una expresion que se evalua como verdadera (true) o falsa (false).

- Son fundamentales para controlar el flujo de ejecucion de un programa.
-------------------------------------------------------------------------------------------------------
Sintaxis
-------------------------------------------------------------------------------------------------------
1. if:

    if (condicion) {
        // Codigo que se ejecuta si la condicion es verdadera
    }

2. if - else:

    if (condicion) {
        // Codigo si la condicion es verdadera
    } else {
        // Codigo si la condicion es falsa
    }

3. if - else if - else:

    if (condicion1) {
        // Codigo si condicion1 es verdadera
    } else if (condicion2) {
        // Codigo si condicion2 es verdadera
    } else {
        // Codigo si ninguna condicion anterior es verdadera
    }

4. if anidados:

    - Un if puede contener otro if en su interior.
    - Se deben usar con cuidado para mantener la legibilidad del codigo.
-------------------------------------------------------------------------------------------------------
Buenas practicas
-------------------------------------------------------------------------------------------------------
- Usar llaves {} incluso cuando el bloque tenga una sola instruccion.

- Mantener las condiciones simples y claras.

- Evitar anidaciones excesivas; en algunos casos es mejor usar operadores logicos o switch.

- Ordenar las condiciones de forma logica (por ejemplo, de mas especifica a mas general).
-------------------------------------------------------------------------------------------------------
EJM:
*/

#include <iostream>
using namespace std;

int main() {
    int nota;

    cout << "Introduce una nota (0-10): ";
    cin >> nota;

    if (nota < 0 || nota > 10) {
        cout << "Nota no valida." << endl;
    } else if (nota >= 9) {
        cout << "Calificacion: Sobresaliente" << endl;
    } else if (nota >= 7) {
        cout << "Calificacion: Notable" << endl;
    } else if (nota >= 5) {
        cout << "Calificacion: Aprobado" << endl;
    } else {
        cout << "Calificacion: Suspenso" << endl;
    }

    int numero = 8;

    if (numero % 2 == 0) {
        cout << numero << " es par." << endl;
    } else {
        cout << numero << " es impar." << endl;
    }

    return 0;
}

/*
-------------------------------------------------------------------------------------------------------
*/
