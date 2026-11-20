/*
-------------------------------------------------------------------------------------------------------
Vectores
-------------------------------------------------------------------------------------------------------
- Es una clase de la biblioteca estándar de C++. Esta clase crea estructuras contenedoras
para almacenar datos secuenciales.

- los vectores pueden crecer o decrecer en tamaño de forma dinámica.

- Tienen una sintaxis muy similar a los arrays.

- Proporcionan múltiples funciones para comprobar límites, tamaño, si existe un elemento, etc.

- Almacenan los valores en posiciones contiguas de memoria; también se puede acceder a ellos
mediante punteros.
-------------------------------------------------------------------------------------------------------
Características:

- Tamaño dinámico.

- Los elementos almacenados en su interior son del mismo tipo.

- Se accede a los elementos almacenados con su posición o su índice.

- El primer elemento siempre tiene índice 0.

- El último siempre tiene índice size-1.

- Se suele interaccionar con ellos usando bucles.
-------------------------------------------------------------------------------------------------------
*/
//EJM:

#include <iostream>
#include <vector>
#include <cstddef>
using namespace std;

int main(){
    vector <int> records {25, 45, 60, 35}; //Con esto estamos dando valores dentro del vector.
    //Vector <"tipos de valores a almacenar"> "nombre del vector" (opcional: nº de valores que almacenará).

    vector <char> letras {'z', 'w', 'r'};

    vector <double> salario_base (350, 2125.5);/*Esto rellena las 350 casillas del vector con el mismo número
    en este caso, con el número 2125.5.*/

    //Para acceder a valores del vector:

    size_t i = 0; // size() devuelve un size_t, no un int.

    while(i<salario_base.size()){
        cout << salario_base[i] << endl;
        i++;
    }

    /*Este bucle recorre el vector mientras i sea menor que su tamaño (350).
    En cada vuelta muestra un salario y aumenta i en uno; el vector no cambia de tamaño.*/
}
/*-----------------------------------------------------------------------------------------------------
Cosas importantes:

- "nombre del vector".at("posición dentro del vector") => Hace una comprobación de límites.
Si la posición existe, devuelve el valor; si no, nos dará error.

- "nombre del vector".size() => devuelve el número de elementos del vector.

- "nombre del vector".push_back("valor") => Añade un elemento al final del vector.
-----------------------------------------------------------------------------------------------------*/