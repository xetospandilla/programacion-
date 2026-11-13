/**
 *
 * @file ejercicio4.cpp
 *
 * @brief 
 *
 * Genera una secuencia de números enteros aleatorios en un intervalo.
 *
 * Datos de Entrada: la cantidad de numeros y los limites del intervalo.
 *
 * Datos de Salida: la secuencia de numeros aleatorios.
 *
 * @version 1.0
 * @author Carlos Galán Cubells
 * @date 13-11-2026
 *
 * @copyright Universidad de Valencia
 */

#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

int NumAleatorio (int, int);
void SecuenciaAleatoria (int, int, int);

int main()
{
   int cantidad, inf, sup;

   do
   {
      cout << "Introduce la cantidad de numeros: ";
      cin >> cantidad;
   }
   while (cantidad <= 0);

   cout << "Introduce el limite inferior: ";
   cin >> inf;
   cout << "Introduce el limite superior: ";
   cin >> sup;

   while (sup <= inf)
   {
      cout << "El limite superior debe ser mayor que el inferior." << endl;
      cout << "Introduce el limite inferior: ";
      cin >> inf;
      cout << "Introduce el limite superior: ";
      cin >> sup;
   }

   SecuenciaAleatoria (cantidad, inf, sup);

   return 0;
}

/**
 *
 * Devuelve un numero entero aleatorio dentro del intervalo cerrado.
 *
 * @param [in] inf limite inferior del intervalo
 * @param [in] sup limite superior del intervalo
 *
 * @return un numero aleatorio en el intervalo [inf, sup]
 *
 */ 
int NumAleatorio (int inf, int sup)
{
   return rand() % (sup - inf + 1) + inf;
}

/**
 *
 * Muestra por pantalla una secuencia de numeros aleatorios.
 *
 * @param [in] cantidad numero de valores a generar
 * @param [in] inf limite inferior del intervalo
 * @param [in] sup limite superior del intervalo
 *
 */ 
void SecuenciaAleatoria (int cantidad, int inf, int sup)
{
   srand(time(NULL));

   for (int i = 0; i < cantidad; i++)
      cout << NumAleatorio (inf, sup) << endl;
}
