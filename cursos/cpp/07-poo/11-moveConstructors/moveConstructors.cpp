/*
-----------------------------------------------------------------------------------------------------------------------------
Constructores de movimiento (move constructors)
-----------------------------------------------------------------------------------------------------------------------------
Sirven principalmente para evitar copias innecesarias de recursos cuando estos no serán necesarios en su ubicación original.

Sintaxis -> "Nombre de la clase"( "Nombre de la clase" && "Nombre de la variable objeto" );

    - El parámetro "Ejemplo&&" es una referencia a un rvalue (rvalue reference). Un rvalue es una expresión
      temporal: un literal, el resultado de una operación o un objeto sin nombre. Mientras que "T&" solo se
      enlaza con lvalues (objetos con nombre y dirección), "T&&" permite enlazar con esos valores temporales.

    - Gracias a esa referencia podemos capturar objetos temporales o recursos sin necesidad de copiarlos.

Este tipo de constructores es muy útil cuando podemos prescindir del objeto original y queremos mover su contenido
a otro objeto.

Sus ventajas principales son la eficiencia, evitando copias innecesarias, y la seguridad, ya que al anular el puntero
del objeto original se garantiza que no habrá conflictos u errores como una doble liberación de memoria.
-----------------------------------------------------------------------------------------------------------------------------
¿Qué hace std::move?
-----------------------------------------------------------------------------------------------------------------------------
    - std::move NO mueve ningún recurso por sí mismo. Es una función de la cabecera <utility> que hace un cast:
      convierte una expresión lvalue en un rvalue (concretamente, en un xvalue).

    - Lo único que consigue es que el compilador pueda seleccionar una operación de movimiento (como este
      constructor) en lugar de una operación de copia.

    - Por eso hay que incluir <utility> y escribir std::move( *obj1 ). Si no lo usamos, el compilador tratará
      *obj1 como un lvalue y elegirá el constructor copia.
-----------------------------------------------------------------------------------------------------------------------------
¿Cómo se transfiere la propiedad del recurso?
-----------------------------------------------------------------------------------------------------------------------------
    - El constructor de movimiento copia la dirección del recurso ( ptr = origen.ptr ). A partir de ese momento
      el nuevo objeto pasa a ser el propietario del bloque de memoria.

    - Después se asigna nullptr al puntero del objeto de origen. Así el origen deja de creerse propietario y su
      destructor no liberará un recurso que ya pertenece a otro objeto.

    - Sin esa asignación, los dos objetos guardarían la misma dirección y sus destructores harían delete dos veces
      sobre ella: doble liberación.

    - El destructor puede trabajar con un puntero nulo sin problema: "delete nullptr" es una operación válida y
      no hace nada. Por eso un objeto del que se han movido los recursos puede destruirse con seguridad.
-----------------------------------------------------------------------------------------------------------------------------
Pendiente para más adelante:
-----------------------------------------------------------------------------------------------------------------------------
    - Regla de cinco: destructor, constructor copia, constructor de movimiento, operador de asignación de copia
      y operador de asignación de movimiento.

    - En este apartado solo se estudia el constructor de movimiento. Los operadores de asignación (incluido el
      de movimiento) se verán más adelante, junto con la regla de cinco.
-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
#include <utility>
using namespace std;

class Ejemplo
{
    private:
        int *ptr;

    public:
        //  Constructor parametrizado: reserva un entero en el heap.
        Ejemplo( int valor )
        {
            ptr = new int( valor );
        }

        //  Constructor de movimiento.
        //  Toma el puntero del objeto origen y se queda con la propiedad del recurso.
        Ejemplo( Ejemplo &&origen ): ptr( origen.ptr )
        {
            origen.ptr = nullptr;   //  El origen deja de ser propietario: su destructor no liberará nada.
        }

        //  Constructor copia: reserva memoria nueva y copia el contenido (copia profunda).
        Ejemplo( const Ejemplo &origen )
        {
            ptr = new int( *origen.ptr );
        }

        ~Ejemplo()
        {
            delete ptr;             //  Es seguro tanto si ptr apunta a memoria válida como si vale nullptr.
        }
};

int main()
{
    Ejemplo *obj1 = new Ejemplo( 10 );  //  Creamos el obj1 en el heap.

    //  std::move( *obj1 ) no mueve nada: solo convierte *obj1 en un rvalue para que se seleccione
    //  el constructor de movimiento. La propiedad del entero pasa de *obj1 a obj2.
    Ejemplo obj2 = std::move( *obj1 );

    delete obj1;    //  Destruye el objeto del heap. Su ptr ya vale nullptr, así que no libera el recurso movido.

    return 0;
}
