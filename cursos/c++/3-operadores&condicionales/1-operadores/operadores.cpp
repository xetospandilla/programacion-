/*
-------------------------------------------------------------------------------------------------------
Operadores en C++
-------------------------------------------------------------------------------------------------------
- Los operadores son simbolos que permiten realizar operaciones sobre variables y valores.

- Se utilizan para realizar calculos, comparaciones, asignaciones y operaciones logicas.

- Segun el numero de operandos pueden ser unarios, binarios o ternarios.
-------------------------------------------------------------------------------------------------------
Tipos de operadores
-------------------------------------------------------------------------------------------------------
1. Operadores aritmeticos:

    - +   Suma
    - -   Resta
    - *   Multiplicacion
    - /   Division
    - %   Modulo (resto de la division entera)

2. Operadores de asignacion:

    - =   Asignacion simple
    - +=  Suma y asigna
    - -=  Resta y asigna
    - *=  Multiplica y asigna
    - /=  Divide y asigna
    - %=  Modulo y asigna

3. Operadores de incremento y decremento:

    - ++  Incrementa en 1
    - --  Decrementa en 1

    - Prefijo (++i): incrementa antes de usar el valor.
    - Sufijo (i++): usa el valor y despues incrementa.

4. Operadores relacionales (comparacion):

    - ==  Igual a
    - !=  Distinto de
    - >   Mayor que
    - <   Menor que
    - >=  Mayor o igual que
    - <=  Menor o igual que

    - Devuelven un valor booleano: true o false.

5. Operadores logicos:

    - &&  AND logico: true si ambas condiciones son verdaderas.
    - ||  OR logico: true si al menos una condicion es verdadera.
    - !   NOT logico: invierte el valor booleano.

6. Operador ternario (condicional):

    - Sintaxis: condicion ? valor_si_verdadero : valor_si_falso;
    - Permite escribir una condicion simple en una sola expresion.
-------------------------------------------------------------------------------------------------------
Precedencia y asociatividad
-------------------------------------------------------------------------------------------------------
- La precedencia determina que operaciones se realizan primero en una expresion.

- La asociatividad indica el orden de evaluacion cuando varios operadores tienen la misma precedencia.

- Se recomienda usar parentesis para mejorar la claridad y evitar ambiguedades.
-------------------------------------------------------------------------------------------------------
EJM:
*/

#include <iostream>
using namespace std;

int main() {
    int a = 10;
    int b = 3;

    // Operadores aritmeticos
    cout << "Suma: " << (a + b) << endl;
    cout << "Resta: " << (a - b) << endl;
    cout << "Multiplicacion: " << (a * b) << endl;
    cout << "Division entera: " << (a / b) << endl;
    cout << "Modulo: " << (a % b) << endl;

    // Operadores de asignacion
    int c = a;
    c += b;
    cout << "c += b: " << c << endl;

    // Incremento y decremento
    int x = 5;
    cout << "x: " << x << endl;
    cout << "++x: " << ++x << endl;
    cout << "x++: " << x++ << endl;
    cout << "x final: " << x << endl;

    // Operadores relacionales y logicos
    bool mayor = a > b;
    bool condicion = (a > 0) && (b > 0);
    cout << "a > b: " << mayor << endl;
    cout << "(a > 0) && (b > 0): " << condicion << endl;

    // Operador ternario
    int maximo = (a > b) ? a : b;
    cout << "Maximo: " << maximo << endl;

    return 0;
}

/*
-------------------------------------------------------------------------------------------------------
*/
