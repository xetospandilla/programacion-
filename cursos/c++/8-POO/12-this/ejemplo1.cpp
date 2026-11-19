#include <iostream>
using namespace std;

//  Ejemplo 1: 'this' para resolver la ambigüedad entre un atributo y un parámetro.
class CuentaBancaria
{
    private:
        double saldo = 0;

    public:
        //  El parámetro se llama igual que el atributo.
        //  'this->saldo' se refiere al atributo del objeto; 'saldo' es el parámetro.
        void setSaldo( double saldo )
        {
            this->saldo = saldo;
        }

        //  Método const: no modifica el objeto y, por tanto, 'this' es de tipo const CuentaBancaria*.
        double getSaldo() const
        {
            return saldo;
        }
};

int main()
{
    CuentaBancaria c1;

    c1.setSaldo( 15000 );

    cout << c1.getSaldo() << endl;

    return 0;
}
