/*
-----------------------------------------------------------------------------------------------------------------------------
Constructores
-----------------------------------------------------------------------------------------------------------------------------
- Método especial.

- Invocado durante la creación de un objeto.

- Tiene como finalidad dar estado inicial a los objetos.

- Tiene el mismo nombre que la clase.

- No devuelven tipo(no return).

- Admiten sobrecarga.
-----------------------------------------------------------------------------------------------------------------------------
EJM:
*/

#include <iostream>
using namespace std;

class Rectangulo{

    private:

        int ancho; int alto;

    public:
        Rectangulo(){ //Esto es un constructor. Se invoca automáticamente al declarar una variable con esta clase.
            ancho = 10; alto = 5;
            //Todas las variables declaradas con esta clase, tendrán este estado inicial.
        }

        Rectangulo(int al){
            ancho = 17; alto = al;
        }

        Rectangulo(int an, int al){
            ancho = an;
            alto = al;
        }

};

int main(){

    Rectangulo r1; //Se invoca el constructor sin parámetros definido más arriba.
                //El compilador solo genera uno por defecto si no se declara ningún constructor.

    Rectangulo r2(12);

    Rectangulo r3(17,9);

    return 0;
}
//---------------------------------------------------------------------------------------------------------------------------