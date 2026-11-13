/**
 *
 * @file ejercicio5.cpp
 *
 * @brief 
 *
 * Convierte temperaturas entre grados Celsius y Fahrenheit.
 *
 * Datos de Entrada: la opcion del menu y la temperatura.
 *
 * Datos de Salida: la temperatura convertida.
 *
 * @version 1.0
 * @author Carlos Galán Cubells
 * @date 13-11-2026
 *
 * @copyright Universidad de Valencia
 */

#include <iostream>

using namespace std;

int Menu ();
double CelsiusAFahrenheit (double);
double FahrenheitACelsius (double);

int main()
{
   int opcion;
   double temperatura;

   do
   {
      opcion = Menu();

      switch (opcion)
      {
         case 1:
            cout << "Introduce la temperatura en Celsius: ";
            cin >> temperatura;
            cout << "La temperatura en Fahrenheit es: " << CelsiusAFahrenheit (temperatura) << endl;
            break;
         case 2:
            cout << "Introduce la temperatura en Fahrenheit: ";
            cin >> temperatura;
            cout << "La temperatura en Celsius es: " << FahrenheitACelsius (temperatura) << endl;
            break;
         case 0:
            break;
         default:
            cout << "Opcion no valida." << endl;
      }
   }
   while (opcion != 0);

   return 0;
}

/**
 *
 * Muestra el menu de opciones y lee la opcion elegida.
 *
 * @return la opcion introducida por el usuario
 *
 */ 
int Menu ()
{
   int opcion;

   cout << "1. De Celsius a Fahrenheit." << endl;
   cout << "2. De Fahrenheit a Celsius." << endl;
   cout << "0. Acabar." << endl;
   cout << "Introduce una opcion: ";
   cin >> opcion;

   return opcion;
}

/**
 *
 * Convierte una temperatura de grados Celsius a Fahrenheit.
 *
 * @param [in] c temperatura en grados Celsius
 *
 * @return la temperatura equivalente en grados Fahrenheit
 *
 */ 
double CelsiusAFahrenheit (double c)
{
   return c * 9.0 / 5.0 + 32.0;
}

/**
 *
 * Convierte una temperatura de grados Fahrenheit a Celsius.
 *
 * @param [in] f temperatura en grados Fahrenheit
 *
 * @return la temperatura equivalente en grados Celsius
 *
 */ 
double FahrenheitACelsius (double f)
{
   return (f - 32.0) * 5.0 / 9.0;
}
