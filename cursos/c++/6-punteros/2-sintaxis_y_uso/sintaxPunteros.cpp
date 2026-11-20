/*
 -------------------------------------------------------------------------------------------------------------------------------
 Sintaxis y uso de punteros
 -------------------------------------------------------------------------------------------------------------------------------

     - Declaración: tipo *nombre;

     - Inicialización: nullptr cuando todavía no apunta a un objeto válido.

     - & obtiene la dirección de una variable.

     - * accede al valor almacenado en la dirección apuntada (desreferenciación).

     - Esquema: numero (valor)  <->  &numero (dirección)  <->  pnumero (puntero)  <->  *pnumero (valor).

 -------------------------------------------------------------------------------------------------------------------------------
 */

#include <iostream>
using namespace std;

int main(){

    int numero = 10;
    int *pnumero = nullptr;   // Inicializado a nullptr: aún no apunta a nada

    cout << "Valor de numero: " << numero << endl;
    cout << "Direccion de numero: " << &numero << endl;

    pnumero = &numero;        // & obtiene la dirección de la variable

    cout << "Direccion guardada en pnumero: " << pnumero << endl;
    cout << "Valor a traves del puntero: " << *pnumero << endl;

    *pnumero = 20;            // Modifica la variable original

    cout << "Nuevo valor de numero: " << numero << endl;
    cout << "Nuevo valor a traves de pnumero: " << *pnumero << endl;

    return 0;
}
//-------------------------------------------------------------------------------------------------------------------------------
