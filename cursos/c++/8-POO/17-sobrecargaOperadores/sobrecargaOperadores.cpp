/*
-----------------------------------------------------------------------------------------------------------------------------
Sobrecarga de Operadores
-----------------------------------------------------------------------------------------------------------------------------
    Qué és la sobrecarga de operadores?
-----------------------------------------------------------------------------------------------------------------------------

        - Mecanismo que permite cambiar el comportamiento por deferto de los operadores cuando los aplicamos a objetos propios.

-----------------------------------------------------------------------------------------------------------------------------
    Para qué sirve?
-----------------------------------------------------------------------------------------------------------------------------

        - Para que los objetos de una clase puedan interactuar de "forma natural" con los operadores igual
        que los tipos primitivos.

-----------------------------------------------------------------------------------------------------------------------------
    Cómo se sobrecarga un operador?
-----------------------------------------------------------------------------------------------------------------------------

    - Utilizando la palabra reservada 'operator' seguida del operador que se quiere sobrecargar.

-----------------------------------------------------------------------------------------------------------------------------
    Qué operadores podemos sobrecargar?
-----------------------------------------------------------------------------------------------------------------------------
        - Artiméticos: +,-,*,/,%

        - Relacionales: ==,!=,<,>,<=,>=

        - De asingación: =,+=,-=,etc.

        - De acceso: [],(),->,*
-----------------------------------------------------------------------------------------------------------------------------
    IMPORTANTE
-----------------------------------------------------------------------------------------------------------------------------
        - No se pueden crear operadores nuevos.

        - No puedes cambiar la precedencia ni cantidad de operadores de un operador.

        - Hay operadores que no se pueden sobrecargar( .*, sizeof, etc. )
-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
#include <string>
using namespace std;

class Empleado
{
    private:
        string nombre;
        double sueldo;

    public:
        Empleado( string n, double s ): nombre( n ), sueldo( s ) {};

        // void mostrar() const 
        // {
        //     cout << "Empleado: " << nombre << ", Sueldo: " << sueldo << endl;
        // }

        //   sobrecargar del operador +
        Empleado operator + ( const Empleado &otro ) const
        {
            double nuevoSueldo = this->sueldo + otro.sueldo;

            return Empleado( "Nuevo Empleado", nuevoSueldo );
        }

        bool operator == ( const Empleado& otro ) const
        {
            return this->sueldo == otro.sueldo;
        }

        //  Funcion amiga para poder acceder a los campos encapsulados e implementar sobrecarga
        friend ostream& operator << ( ostream& salida, const Empleado& e );

};

ostream& operator << ( ostream& salida, const Empleado& e )
{
    salida << "Empleado: " << e.nombre << ", Sueldo: " << e.sueldo << "€\n";

    return salida;
}
/*
int main()
{
    Empleado emp1( "Ana", 2000 );
    Empleado emp2( "Luis", 2000 );

    Empleado nuevo = emp1 + emp2;

    // cout << nuevo;

    if( emp1 == emp2 )
    {
        cout << "El salario de ambos empleados es igual.\n";
    }
    else{
        cout << "El salario de ambos empleados es diferente.\n";
    }

    return 0;
}
*/
/*
-----------------------------------------------------------------------------------------------------------------------------
Sobrecargar del operador asignación
-----------------------------------------------------------------------------------------------------------------------------
*/
class MiClase
{
    private:
        int* datos;
    
    public:
        MiClase( int valor )
        {
            datos = new int( valor );
        }

        //  Constructor de copia( copia profunda )
        MiClase( const MiClase& otro ): datos( new int( *otro.datos ) ) {}

        //  Acceso de solo lectura para comprobar la copia
        int valor() const
        {
            return *datos;
        }

        //  Sobrecarga del operador asignación( copia profunda )
        MiClase& operator = ( const MiClase& otro )
        {
            if( this == &otro ) return *this;   // Evita la autoasignación

            delete datos;

            datos = new int( *otro.datos );

            return *this;
        }

        ~MiClase()
        {
            delete datos;
            datos = nullptr;
        }
};

int main()
{
    Empleado emp1( "Ana", 2000 );
    Empleado emp2( "Luis", 2000 );

    cout << emp1 + emp2;                                  // operator+ y operator<<

    if( emp1 == emp2 )                                    // operator==
    {
        cout << "El salario de ambos empleados es igual.\n";
    }
    else{
        cout << "El salario de ambos empleados es diferente.\n";
    }

    MiClase a(5);
    MiClase b(10);
    MiClase copia( a );                                   // constructor de copia

    b = a;                                                // asignación
    b = b;                                                // autoasignación

    cout << "MiClase -> a: " << a.valor()
         << ", b: " << b.valor()
         << ", copia: " << copia.valor() << endl;

    return 0;
}