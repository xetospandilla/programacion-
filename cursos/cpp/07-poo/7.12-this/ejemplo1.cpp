#include <iostream>
using namespace std;

class CuentaBancaria
{
    private:
        double saldo;
    
    public:
        void setSaldo( double saldo )
        {
            this->saldo = saldo;
        }

        double getSaldo()
        {
            return saldo;
        }
};

int main()
{
    CuentaBancaria c1;

    c1.setSaldo( 15000 );

    cout << c1.getSaldo() << endl;
}