#include <iostream>
using namespace std;

class CuentaBancaria
{
    private:
        double saldo;

    public:
        void setSaldo( double s )
        {
            saldo = s;
        }

        double getSaldo()
        {
            return saldo;
        }

        void compararCuentas( const CuentaBancaria &otra )
        {
            if( this == &otra )
            {
                cout << "Son la misma cuenta." << endl;
            }
        }
};

int main()
{
    CuentaBancaria c1;
    CuentaBancaria c2;

    c1.compararCuentas( c2 );

    return 0;
}