#include <iostream>
using namespace std;

int main() {

    int n = 5;

    int *arr = new int[ n ]; // Guardamos memoría para 5 enteros de golpe

    cout << "Numeros almacenados en el arreglo: " << endl;
    cout << "----------------------------------" << endl;

    for( int i = 0; i < n ; i++ ){

        arr[ i ] = i; // Asignamos a cada posición del arreglo el valor de la variable i.

        cout << "Numero " << i << " : " << arr[ i ] << endl; // Vamos imprimiendo a cada vuelta de bucle el valor asignado.

    }
    cout << "----------------------------------" << endl;

    delete[] arr; // Eliminamos el arreglo para recuperar el espacio de memoría.
    arr = nullptr; // Indicamos al puntero a que apunte a la nada, para prevenir errores.

}