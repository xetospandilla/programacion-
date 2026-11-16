/*
-----------------------------------------------------------------------------------------------------------------------------
Delegación de Constructores
-----------------------------------------------------------------------------------------------------------------------------
Consiste en que un constructor "delegue" el trabajo realizado a otro constructor de la misma clase.

Sirve para evitar la duplicidad de código bajo algunos escenarios.
-----------------------------------------------------------------------------------------------------------------------------
En este ejercicio se puede resolver tanto con parámetros opcionales como con delegación de constructores.
La delegación resulta útil cuando los valores dependen unos de otros o cuando hay que ejecutar lógica
que no se puede expresar con un simple valor por defecto.
-----------------------------------------------------------------------------------------------------------------------------
Dos alternativas válidas (no se pueden usar a la vez):

1) Un solo constructor con parámetro opcional:
       CuentaBancaria( string t, double s = 0.0 ): titular( t ), saldo( s ) { ... }

2) Dos constructores, donde el de un solo parámetro delega en el otro:
       CuentaBancaria( string t, double s ): titular( t ), saldo( s ) { ... }
       CuentaBancaria( string t ): CuentaBancaria( t, 0.0 ) {}

¿Por qué no pueden coexistir estas dos declaraciones?
       CuentaBancaria( string titular, double saldo )
       CuentaBancaria( string t, double s = 0.0 )

El valor por defecto no forma parte de la firma (los tipos de los parámetros). Para el compilador
las dos declaraciones son la misma función, así que la segunda no es una sobrecarga independiente:
sería una redeclaración de la primera. Si las dos llevan cuerpo, el error es de redefinición;
si una es solo declaración, la otra únicamente añade el valor por defecto, pero sigue siendo
la misma función. Por eso hay que elegir una de las dos alternativas.

#include <iostream>
#include <string>
using namespace std;

class CuentaBancaria
{
    private:
        string titular;
        double saldo;

    public:
        //  Alternativa con delegación: el constructor completo hace el trabajo real.
        CuentaBancaria( string titular, double saldo ): titular( titular ), saldo( saldo )
        {
            cout << "Cuenta creada, para el cliente " << titular << " con un saldo de " << saldo << endl;
        }

        //  Este constructor delega en el anterior con saldo 0.0.
        CuentaBancaria( string titular ): CuentaBancaria( titular, 0.0 ) {}
};

int main()
{
    CuentaBancaria cuenta1( "María" );
    CuentaBancaria cuenta2( "Antonio", 1750.25);

    return 0;
}
*/
#include <iostream>
using namespace std;

class Figura
{
    private:
        int base;
        int altura;
        int area;

    public:
/*
        //  Alternativa con parámetro opcional. Sustituye a los dos constructores
        //  siguientes; no se pueden tener todos a la vez.
        //  El valor por defecto no cambia la firma, igual que en CuentaBancaria.
        //  Con un solo argumento, h valdría 0 y el área saldría 0.
        Figura( int b, int h = 0 ): base( b ), altura( h ), area( b*h ) 
        {
            cout << "La figura tiene una base de " << base << " y una altura de " << altura << " y un área de " << area << endl;
        }
*/

        //  Constructor con delegación de constructores.
        //  El constructor de dos parámetros hace el cálculo real.
        Figura( int b, int h ): base( b ), altura( h ), area( b*h )
        {
            cout << "La figura tiene una base de " << base << " y una altura de " << altura << " y un área de " << area << endl;
        }

        //  Un cuadrado delega en el constructor anterior con base = altura = lado.
        Figura( int lado ) : Figura( lado, lado ) {}
};

int main()
{
    Figura rectangulo( 3, 4 );

    //  Con un solo lado, el constructor delega en Figura( lado, lado ),
    //  así que el área del cuadrado es correcta (7 * 7 = 49).
    Figura cuadrado( 7 );

    return 0;
}