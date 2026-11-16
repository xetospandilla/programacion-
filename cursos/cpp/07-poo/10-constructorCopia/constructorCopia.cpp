/*
-----------------------------------------------------------------------------------------------------------------------------
Constructor-Copia
-----------------------------------------------------------------------------------------------------------------------------
Se usa cuando se va a crear una copia de un objeto a partir de uno ya existente.

Generalmente creamos una copia de un objeto cuando:

    - Pasamos un objeto a una función por valor.

    - Una función devuelve por valor un objeto.

    - Construimos un objeto basado en otro objeto de la misma clase.
---------------------------------------------------------------------------------------------------------------------------
Bajo ciertos escenarios, el compilador de C++ proporciona una manera de realizar estas tareas:
genera un "constructor copia" si no lo creamos explícitamente.

Esto puede ocasionar los siguientes problemas:

    - Problema: el constructor copia por defecto proporcionado por el compilador realiza una copia superficial.
    
        Una copia superficial copia los valores de los miembros tal cual. Si un miembro es un puntero,
        copia la dirección, pero no reserva ni copia el recurso al que apunta (memoria, archivo, etc.).

        Puede ocasionar dobles liberaciones de memoria o problemas con referencias compartidas.
---------------------------------------------------------------------------------------------------------------------------
¿Cuándo crearlo?

    - Cuando haya que gestionar recursos dinámicos que vayan a ser copiados de otros objetos
    (memoria, archivos, conexiones, etc.).

    - Cuando una clase tiene recursos exclusivos no copiables por diseño (sockets de red, handles, archivos abiertos).

    - Cuando queremos controlar cómo se copia un objeto.

    - Cuando queremos evitar referencias compartidas no deseadas.

    - Cuando trabajamos con clases que no pueden ser copiadas automáticamente.
-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
using namespace std;

//  Primer problema: copia superficial de un puntero.
class Ejemplo
{

    private:
        int *ptr;
    
    public:
        Ejemplo( int valor )
        {
            ptr = new int( valor );
        }

        //  Constructor copia personalizado.
        //  'const' indica que el objeto origen no se modifica; '&' evita copiarlo otra vez.
        Ejemplo( const Ejemplo &origen ) 
        {
            ptr = new int( *origen.ptr );
            //  Con 'new int' reservamos un nuevo espacio de memoria dinámica en el heap.
            //  Copiamos el valor almacenado (*origen.ptr), no la dirección del puntero.
            //  Así cada objeto tiene su propio bloque de memoria.

            //  A esto se le denomina copia profunda (deep copy): hay memoria nueva
            //  e independiente, y se copia el contenido en ella.
        }

        ~Ejemplo()
        {
            delete ptr;
        }

        /*
            Pendiente para más adelante:
            esta clase tiene destructor y constructor copia, pero no un operador de
            asignación de copia. El que genera el compilador haría una asignación
            miembro a miembro (superficial), así que una instrucción como obj2 = obj1
            podría perder la memoria anterior de obj2 y dejar dos punteros apuntando
            al mismo sitio. Se estudiará con la regla de tres y la regla de cinco.
        */
};

int main()
{
    Ejemplo obj1( 10 );

    //  Esto es una inicialización por copia: se llama al constructor copia,
    //  no al operador de asignación.
    Ejemplo obj2 = obj1;

    /*
        obj2 se ha construido con el constructor copia personalizado, así que tiene
        su propia copia del entero. Al destruirse obj2 y obj1 se liberan dos bloques
        de memoria distintos: no hay doble liberación.

        El problema aparecería con una copia superficial (por ejemplo, si no
        hubiéramos definido el constructor copia): los dos objetos guardarían la
        misma dirección y el destructor haría delete dos veces sobre ella.
    */

    return 0;
}