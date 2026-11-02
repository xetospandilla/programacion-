#include <iostream>
using namespace std;

class CuentaBancaria
{
    private:
        double saldo;
    
    public:
        CuentaBancaria( double saldo ): saldo( saldo ) {}

        CuentaBancaria& setSaldo( double saldo )
        {
            this->saldo = saldo;
            return *this;
        }

        void mostrarSaldo()
        {
            cout << "Saldo: " << saldo << endl;
        }
};

int main()
{
    CuentaBancaria c( 1000 );

    c.setSaldo( 2000 ).mostrarSaldo();
}