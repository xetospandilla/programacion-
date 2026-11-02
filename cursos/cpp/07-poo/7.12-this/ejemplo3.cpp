#include <iostream>
using namespace std;

//  Ejemplo 3: devolver '*this' mediante una referencia para encadenar llamadas.
class CuentaBancaria
{
    private:
        double saldo;

    public:
        CuentaBancaria( double saldo ): saldo( saldo ) {}

        //  Devuelve CuentaBancaria& (una referencia al propio objeto), no una copia.
        //  Así el resultado de la llamada sigue siendo el objeto original y se pueden
        //  encadenar más llamadas sobre él.
        CuentaBancaria& setSaldo( double saldo )
        {
            this->saldo = saldo;
            return *this;
        }

        void mostrarSaldo() const
        {
            cout << "Saldo: " << saldo << endl;
        }
};

int main()
{
    CuentaBancaria c( 1000 );

    //  setSaldo devuelve una referencia a c, por eso se puede llamar a mostrarSaldo() a continuación.
    c.setSaldo( 2000 ).mostrarSaldo();

    return 0;
}
