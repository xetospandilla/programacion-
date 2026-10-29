#include <iostream>
using namespace std; // Falta esta línea q nos facilita los cout en consola. Para no tener q poner las etiquetas en cada cout.

int main() //   No se puede poner "void" dentro de los parámetros de una función. En todo caso se podría sustituir por el "int" para indicar q la función no devuelve nada.
{
    unsigned short i, suma;

    for( i = 1; i < 10; i++ )
    {
        suma = suma + i;
    }

    cout << suma; //    Lo mejor sería mover esta linea afuera para que imprima la suma total, en vez de ir imprimiendo la suma a cada vuelta de bucle.
    
    return 0;
}