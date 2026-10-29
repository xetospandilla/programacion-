/*
======================================================================================================================
    Enunciado
======================================================================================================================
Convierte la clase Item en una clase abstracta para evitar que el sistema permita
instanciar objetos genéricos, asegurando que solo se puedan crear sus clases hijas (como Pocion).

    1. Toma la clase Item básica del ejercicio anterior.

    2. Modifica su método virtual void usar() para convertirlo en una "función virtual pura". 
    Esto se logra borrando las llaves { } y el cout de su interior, y escribiendo = 0; al final de la declaración.

    3. En la función main(), intenta crear un objeto genérico escribiendo: Item *miObjeto = new Item;
======================================================================================================================
*/
#include <iostream>
using namespace std;
// =============================================================================
//  Clase Item
// =============================================================================
class Item
{
    public:
        //  Métodos
        virtual void usar() = 0;
};
// =============================================================================
//  Clase Pocion
// =============================================================================
class Pocion : public Item
{
    public:
        //  Métodos
        void usar () override
        {
            cout << "Bebiendo poción de vida\n";
        }
};
// =============================================================================
//  main()
// =============================================================================
int main()
{
    // Item *miObjeto = new Item;
    Item *miObjeto = new Pocion;
    // Produce error de compilación se niega en rotundo a crear un objeto que no sabría qué hacer si alguien llamara a ese método. Se solucionaría añadiendo la clase hija Pocion.

    return 0;
}
// =============================================================================