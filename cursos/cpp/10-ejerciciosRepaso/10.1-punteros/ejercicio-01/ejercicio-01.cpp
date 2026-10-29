#include <iostream>
using namespace std;

int main() {

    int numero = 10;

    int *num_ptr = &numero;

    cout << &numero << endl; // Imprime la dirección de memoría de la variable.
    cout << *num_ptr << endl; // Imprime el valor dentro de la dirección de memoría de la variable.

}