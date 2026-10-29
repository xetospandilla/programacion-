/*
======================================================================================================================
    Enunciado
======================================================================================================================
Construye un sistema de inventario básico que demuestre el uso de polimorfismo y colecciones dinámicas.

    1. Define una clase padre Item con un método virtual void usar().

    2. Define una clase hija Pocion que sobrescriba el método usar() usando override.

    3. En la función main(), declara un std::vector llamado mochila que almacene punteros a la clase base (Item*).

    4. Añade a la mochila un objeto de tipo Item y otro de tipo Pocion utilizando memoria dinámica (new).

    5. Recorre la mochila con un bucle, ejecutando el método usar() de cada elemento.

    6. Recorre la mochila nuevamente para liberar la memoria de cada objeto con delete.
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
        virtual void usar()
        {
            cout << "Usando item genérico\n";
        }
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
    Item *itemPtr = new Pocion;

    itemPtr->usar();

    delete itemPtr;
    itemPtr = nullptr;

    return 0;
}
// =============================================================================

/*
Anotaciones de este fichero para POLIFORMISMO en C++:

virtual (Se pone en la clase PADRE): 
Le dice a C++ "Si alguien llama a este método usando un puntero genérico,
no ejecutes mi código de inmediato. Revisa qué objeto real se creó con new y ejecuta el código de ese objeto hijo".
Esto es lo que hace posible el polimorfismo (enlazado dinámico).

override (Se pone en la clase HIJA): 
Es una medida de seguridad. Le dice al compilador "Mi intención es sobrescribir un método virtual de mi padre".
Si te equivocas escribiendo el nombre (por ejemplo, escribes usarr()), el compilador te dará un error avisándote,
en lugar de crear un método nuevo por accidente sin que te des cuenta.
*/