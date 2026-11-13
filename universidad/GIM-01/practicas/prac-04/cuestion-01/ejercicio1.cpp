/**
 *
 * @file Ejercicio1.cpp
 *
 * @brief 
 *
 * Determina si un número leido desde teclado es par o impar.
 *
 * @version 1.0
 * @author Carlos Galán Cubells
 * @date 13-11-2026
 *
 * @copyright Universidad de Valencia
 */

#include <iostream>
using namespace std;

bool numeroImpar (int);

int main ()
{
   int valor_leido;
   bool res;
	
      cout << "Introduce un valor: ";
      cin >> valor_leido;

   res = numeroImpar (valor_leido);

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
bool numeroImpar (int valor)
{
   bool r = false;

   if (valor % 2 != 0)
      r = true;
   
   return r;
}
