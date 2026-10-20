#include <iostream>
using namespace std;

int main(){

    int *ptr = new int; // Reservamos la dirección de memoría para un entero.

    *ptr = 5; // Asignamos un valor a la dirección de memoría reservada.

    cout << *ptr << endl; // Devuelve 5, el valor que habíamos asignado a la dirección reservada.

    delete ptr; // Liberamos el espacio de memoría

    cout << *ptr << endl; // Devuelve valor aleatorio ya que no tiene dirección de memoría al que apuntar. Es buena práctica indicar que está apuntando a nullptr( ptr = nullptr ), para evitar esto.

}