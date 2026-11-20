/*
-------------------------------------------------------------------------------------------------------------------------------
Paso de punteros por parámetros
-------------------------------------------------------------------------------------------------------------------------------
- Modificación Directa: Permite modificar la variable original sin necesidad de retornar un valor y asignarlo y sin hacer
copias.

- Eficiencia en la Transmisión de Datos Grandes: Al pasar solo la dirección de memoria de un objeto grande (como arrays o
estructuras complejas), se ahorra tiempo y memoria porque no es necesario copiar el objeto.

- Trabajo con Arrays y Cadenas: Los arrays se pasan por defecto como punteros a sus primeros elementos, lo que hace 
trabajar con ellos mediante funciones sea natural y eficiente.

- Gestión de Memoria Dinámica: Facilita el trabajo con la memoria dinámica (asignada con new o malloc), permitiendo que
las funciones modifiquen estructuras de datos complejas o arrays dinámicos.
--------------------------------------------------------------------------------------------------------------------------------
Diferencias entre paso por referencia y paso de punteros.
--------------------------------------------------------------------------------------------------------------------------------
- Por referencia:

    - No trabajas directamente con direcciones de memoria en el código.

    - Acceso directo al original, sin necesidad de desreferenciar.

    - Sintaxis y el manejo son generalmente más sencillos y seguros.

    - No permite trabajo a bajo nivel y trabajo con la memoria.

- Por punteros:

    - Pasas la dirección de memoria de la variable.

    - Hay que desreferenciar el puntero para modificar el valor al que apunta.

    - Sintaxis más compleja.

    - Permite el trabajo a bajo nivel y el trabajo directo con la memoria.
--------------------------------------------------------------------------------------------------------------------------------
EJM:
*/

#include <iostream>
using namespace std;



void cambiarValor(int* valor){

    (*valor) += 5;

}


int main(){

    int num = 5;

    cout << "Antes de llamar a la función: " << num << endl;

    cambiarValor(&num);

    cout << "Después de llamar a la función: " << num << endl;

}
//------------------------------------------------------------------------------------------------------------------------------