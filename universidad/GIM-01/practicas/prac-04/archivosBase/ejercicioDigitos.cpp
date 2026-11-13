/**
 *
 * @file ejercicioDigitos.cpp
 *
 * @brief 
 *
 * Calcula la cantidad de cifras de un numero entero. 
 * Muestra los digitos por pantalla.
 * 
 * Datos de Entrada: el numero.
 *
 * Datos de Salida: la cantidad de cifras.
 *
 * @version 1.0
 * @author Elena Díaz
 * @date 04-11-2026
 *
 * @copyright Universidad de Valencia
 */

#include <iostream>

using namespace std;

int main() 
{
   unsigned int n, num;
   unsigned short digito, c = 0;
   
   cout << "Introduce un numero:" << endl;
   cin >> n;
   
   num = n;
   
   do
   {
      digito = num % 10;
      c++; // cuenta la cantidad de digitos
      num = num / 10;
      cout << digito << endl; // muestra el digito
   } 
   while (num > 0);
   
   cout << "La cantidad de cifras de " << n << " es: " << c << endl;
      
   return 0;
}
