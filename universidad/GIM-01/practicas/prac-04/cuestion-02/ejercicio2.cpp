/**
 *
 * @file ejercicio2.cpp
 *
 * @brief 
 *
 * Pide cuatro números reales por teclado y muestra el mayor de ellos.
 *
 * @version 1.0
 * @author Carlos Galán Cubells
 * @date 13-11-2026
 *
 * @copyright Universidad de Valencia
 */

#include <iostream>
using namespace std;

double Comparar (double, double);

int main ()
{
    double n1, n2, n3, n4;
    double mayor;

    cout << "Introduce cuatro valores: ";
    cin >> n1 >> n2 >> n3 >> n4;

    mayor = Comparar (Comparar (n1, n2), Comparar (n3, n4));

    cout << "El mayor es " << mayor << endl;

    return 0;
}

/**
 *
 * Devuelve el mayor de dos números reales.
 *
 * @param [in] a primer numero
 * @param [in] b segundo numero
 *
 * @return el mayor de ambos numeros
 *
 */ 
double Comparar (double a, double b)
{
    double mayor = a;

    if (b > a)
       mayor = b;
    
    return mayor;
}
