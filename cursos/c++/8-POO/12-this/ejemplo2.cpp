#include <iostream>
using namespace std;

//  Ejemplo 2: 'this' para comparar si dos objetos son exactamente el mismo objeto.
class CuentaBancaria
{
    private:
        double saldo;

    public:
        void setSaldo( double s )
        {
            saldo = s;
        }

        double getSaldo() const
        {
            return saldo;
        }

        //  'this' es la dirección del objeto que llama al método.
        //  '&otra' es la dirección del objeto que se pasa como argumento.
        //  Si coinciden, ambos nombres se refieren al mismo objeto.
        void compararCuentas( const CuentaBancaria &otra )
        {
            if( this == &otra )
            {
                cout << "Son la misma cuenta." << endl;
            }
            else
            {
                cout << "Son cuentas distintas." << endl;
            }
        }
};

int main()
{
    CuentaBancaria c1;
    CuentaBancaria c2;

    c1.compararCuentas( c2 );   //  Objetos distintos.
    c1.compararCuentas( c1 );   //  El mismo objeto.

    return 0;
}
