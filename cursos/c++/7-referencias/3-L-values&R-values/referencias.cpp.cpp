// Observación pendiente: el nombre de este archivo tiene doble extensión (.cpp.cpp).
/*
-----------------------------------------------------------------------------------------------------------------------------
L-Values y R-Values
-----------------------------------------------------------------------------------------------------------------------------
- L-Values

    - Un L-value es una expresión que representa una ubicación en memoria. Esto significa que un L-Value tiene
    una dirección de memoria asociada.

    - Características

        - Puede aparecer en el lado izquierdo de una asignación.

        - Puede ser modificado.

        - Puede incluir variables, referencias y desreferencias de punteros.

- R-values

    - Un R-Value es una expresión que representa un valor temporal que no tiene una ubicación en memoria persistente.
    Se trata de datos que están "a la derecha" de una asignación.

    - Características

        - No puede aparecer en el lado izquierdo de una asignación (excepto casos de referencia a R-values
        o con movimientos).

        - Es temporal y suele ser destruido a final de la expresión en la que aparece.
-----------------------------------------------------------------------------------------------------------------------------
*/

#include <iostream>
#include <utility> //Para std::move
using namespace std;
//---------------------------------------------------------------------------------------------------------------------------
//EJM1:
    /*
void funcion1(int &x){ //Esta función tiene como argumento un L-value.
    x += 5;
}

void funcion2(int &&x){ //Esta función tiene como argumento un R-value.
    x += 5;
}

int main(){
    int z = 15; //z es un L-value, 15 es un R-value.

    funcion1(z); //No da error ya que le estamos pasando un L-Value.
    funcion2(move(z)); //Tendremos que convertirlo a R-Value utilizando la función std::move;

        cout << "El valor de z es:" << z;

    return 0;
}
    */
//---------------------------------------------------------------------------------------------------------------------------
//EJM 2:
    
string mifuncion(string &&z){
    
    z+= "Texto añadido";

    return move(z);

}

int main(){
    string s1 = "Hola";

    string s2 = mifuncion(move(s1));//Con esto convertimos s1 en un R-Value. Además estamos moviendo su contenido a s2. Como Cx + Cv.

    cout << "El contenido es: " << s1 << endl;
    cout << "El contenido es: " << s2 << endl;

    return 0;
}

//---------------------------------------------------------------------------------------------------------------------------