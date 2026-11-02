/*
-----------------------------------------------------------------------------------------------------------------------------
Constructores de movimiento
-----------------------------------------------------------------------------------------------------------------------------
Sirven principalmente para evitar copias innecesarias de recursos cuando estos no serán necesarios en su ubicación original

Sintaxis -> "Nombre de la clase"( "Nombre de la clase"&& "Nombre de la variable objeto");

    El parámetro "Ejemplo&&" es una referencia a un rvalue. Permite capturar objetos temporales o recursos
    sin necesidad de copiarlos.

Este tipo de constructores es muy útil cuando podemos prescindir del objeto original y queremos mover su contenido
a otro objeto.

Sus ventajas principales es la eficiencia, evitando copias innecesarias. Además de seguridad, ya que al anular el puntero
del objeto original, garantiza que no habrá conflictos u errores como una doble liberación de memoría.
-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
using namespace std;

class Ejemplo
{
    private:
        int *ptr;

    public:
        //  Constructor copia
        Ejemplo( int valor )
        {
            ptr = new int( valor );
        }

        //  Move Constructor
        Ejemplo( Ejemplo&& origen ): ptr( origen.ptr )
        {
            origen.ptr = nullptr;
        }

        Ejemplo( const Ejemplo &origen )
        {
            ptr = new int( *origen.ptr );
        }

        ~Ejemplo()
        {
            delete ptr;
        }
};

int main()
{
    Ejemplo *obj1 = new Ejemplo( 10 ); // Creamos el obj1 en el heap.
    Ejemplo obj2 = move( *obj1 );
    
    delete obj1;

    return 0;
}