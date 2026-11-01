/*
-----------------------------------------------------------------------------------------------------------------------------
Constructor-Copia
-----------------------------------------------------------------------------------------------------------------------------
Se usa cuando se va a crear uan copia de un objeto, a partir de uno ya existente. 

Generalmente creamos una copia de un objeto cuando:

    - Cuando pasamos un objeto a una función por valor.

    - Cuando una función devuelve por valor un objeto.

    - Cuando construimos un objeto basado en otro objeto de la misma clase.
---------------------------------------------------------------------------------------------------------------------------
¡¡Bajo ciertos escenarios, el compilador de C++ propociona una manera para realizar estas tareas
proporcionando un "constructor copia" si no lo creamos explícitamente.!!

Ocasionando los siguientes problemas:

    - Problema: El constructor-copia por defecto proporcionado por el compilador realiza una copia superficial.
    
        Una copia superficial copia los valores de los miembros pero no los recursos dinámicos( posiciones en memoría, punteros, 
        archivos abiertos, etc ).

        Puede ocasionar dobles liberaciones de memoría o dar complicaciones a la hora de hacer referencias compartidas.
---------------------------------------------------------------------------------------------------------------------------
Cuando crearlos?

    - Cuando haya que gestionar recursos dinámicos que vayan a ser copiados de otros objetos( memoría, archivos, conexiones, etc.)

    - Cuando una clase tiene recursos exclusivos no copiales por diseño( Sockets de red, Handles, Archivos abiertos ).

    - Cuando queremos controlar cómo se copia un objeto.

    - Cuando queremos evitar referencias compartidas no deseadas.

    - Cuando trabajamos con clases que no pueden ser copiadas automáticamente.
-----------------------------------------------------------------------------------------------------------------------------
*/
#include<iostream>
using namespace std;

//  Primer problema:
class Ejemplo
{

    private:
        int *ptr;
    
    public:
        Ejemplo( int valor )
        {
            ptr = new int( valor );
        }

        //  Constructor Copia Personalizado
        //  ( Utilizamos el 'const' para forzar a que el objeto que será copiado no se va a poder modificar ).
        Ejemplo( const Ejemplo &origen ) 
        {
            ptr = new int( *origen.ptr );
            //  Con 'new int' reservamos un nuevo espacio de memoría dinámica en el heap para ese valor entero.
            //  Haciendo esto nos aseguramos de que no comparta espacio, teniendo su propio espacio en memoría.

            //  A esto se le denomina una copia profunda( deep copy ). Implica que hay nueva memoría independiente, copiandose el contenido en él.
        }

        ~Ejemplo()
        {
            delete ptr;
        }
};

int main()
{
    Ejemplo obj1( 10 );
    Ejemplo obj2 = obj1;
    /*
        Al usar el mismo destructor, cuando obj2 vaya a utilizarlo. Al apuntar al mismo lugar que obj1
        intentará liberar una memoría que ya ha sido liberada, ocasionando este error.
    */

    return 0;
}