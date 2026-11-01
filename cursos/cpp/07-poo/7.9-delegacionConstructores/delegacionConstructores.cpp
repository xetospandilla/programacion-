/*
-----------------------------------------------------------------------------------------------------------------------------
Delegación de Constructores
-----------------------------------------------------------------------------------------------------------------------------
Consiste en que un constructor "delegue" el trabajo realizado a otro constructor de la misma clase.

Sirve para evitar la duplicidad de código bajo algunos escenarios.
-----------------------------------------------------------------------------------------------------------------------------
En el caso de este ejerciocio, se puede hacer tanto por parámetros opcionales como por delegación de constructores,
pero en casos en los que no es posible actuar con parámetros opcionales ya que son dependientes de otros. 
En esos casos deberemos utilizar delegación de constructores.
-----------------------------------------------------------------------------------------------------------------------------

#include <iostream>
using namespace std;

class CuentaBancaria
{
    private:
        string titular;
        double saldo;

    public:
        //  Constructor -> Tiene en cuenta que conocemos ambos datos.
        CuentaBancaria( string titular, double saldo ): titular( titular ), saldo( saldo )
        {
            cout << "Cuenta creada, para el cliente " << titular << " con un saldo de " << saldo << endl;
        }

        //  Constructor -> Tiene en cuenta que conocemos el titular pero no el saldo, usando delegación de constructores.
        CuentaBancaria( string titular ): CuentaBancaria( titular, 0.0 ) {}


//  Mismo caso pero con parametros opcionales:
    CuentaBancaria( string t, double s = 0.0 ): titular( t ), saldo( s ) 
    {
        cout << "Cuenta creada, para el cliente " << titular << " con un saldo de " << saldo << endl;
    }

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
        //  Constructor con parámetros opcionales:
        Figura( int b, int h = 0 ): base( b ), altura( h ), area( b*h ) 
        {
            cout << "La figura tiene una base de " << base << " y una altura de " << altura << " y una área de " << area << endl;
        }
*/

        //Constructor con delegación de constructores:
        Figura( int b, int h ): base( b ), altura( h ), area( b*h )
        {
            cout << "La figura tiene una base de " << base << " y una altura de " << altura << " y una área de " << area << endl;
        }

        Figura( int lado ) : Figura( lado, lado ) {};
};

int main()
{
    Figura rectangulo( 3, 4 );

    Figura cuadrado( 7 ); //    Al intentar hacer lo mismo con un cuadrado( indicando un solo un lado, ya que su aréa es lado por lado), el cáldulo será erróneo.

    return 0;
}