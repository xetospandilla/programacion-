/**
 *
 * @file Ejercicio1.cpp
 *
 * @brief 
 *
 * Determina si un número leido desde teclado es par o impar.
 *
 * @version 1.0
 * @author Elena Díaz
 * @date 04-11-2026
 *
 * @copyright Universidad de Valencia
 */

#include <iostream>
using namespace std;

numeroImpar (          ); // línea a modificar

int main ()
{
    int valor_leido;
    bool res;
	  
    cout << "Introduce un valor: ";
    cin >> valor_leido;

    numeroImpar (           ); // línea a modificar

    if (res == true)
       cout << valor_leido << " es impar" << endl;
    else
       cout << valor_leido << " es par" << endl;


    return 0;
}

/**
 *
 * Determina si un número es impar.
 *
 * @param [in] valor numero
 *
 * @return  true o false
 *
 */ 
bool numeroImpar (                 )  // línea a modificar
{
    bool r = false;

    if (valor % 2 != 0)
       r = true;
    
    return r;
}

