/**
 *
 * @file ejercicio3.cpp
 *
 * @brief 
 *
 * Invierte un número entero positivo y comprueba si es capicúa.
 *
 * Datos de Entrada: el numero.
 *
 * Datos de Salida: el numero invertido y si es capicua.
 *
 * @version 1.0
 * @author Carlos Galán Cubells
 * @date 13-11-2026
 *
 * @copyright Universidad de Valencia
 */

#include <iostream>

using namespace std;

unsigned int InvertirNumDigitos (unsigned int);
bool NumCapicua (unsigned int);

int main()
{
   unsigned int numero;
   char respuesta;

   do
   {
      cout << "Introduce un numero positivo: ";
      cin >> numero;

      cout << "El número invertido es: " << InvertirNumDigitos (numero) << endl;

      if (NumCapicua (numero))
         cout << "El número es capicúa. ¡Suerte!." << endl;

      cout << "Desea continuar (S/N)? ";
      cin >> respuesta;
   }
   while (respuesta == 'S' || respuesta == 's');

   cout << "Bye-Bye." << endl;

   return 0;
}

/**
 *
 * Invierte los digitos de un numero entero positivo.
 *
 * @param [in] num numero a invertir
 *
 * @return el numero con sus digitos invertidos
 *
 */ 
unsigned int InvertirNumDigitos (unsigned int num)
{
   unsigned int invertido = 0;
   unsigned short digito;

   do
   {
      digito = num % 10;
      invertido = invertido * 10 + digito;
      num = num / 10;
   } 
   while (num > 0);

   return invertido;
}

/**
 *
 * Determina si un numero entero positivo es capicua.
 *
 * @param [in] num numero a comprobar
 *
 * @return true si es capicua o false en caso contrario
 *
 */ 
bool NumCapicua (unsigned int num)
{
   bool capicua = false;

   if (num == InvertirNumDigitos (num))
      capicua = true;

   return capicua;
}
