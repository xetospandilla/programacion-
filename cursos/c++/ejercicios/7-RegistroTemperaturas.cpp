/*
Requisitos
Crea una clase RegistroTemperatura con:

Atributos privados

- temperatura (double).

Constructores

- Un constructor parametrizado que reciba la temperatura inicial.

Métodos
- actualizarTemperatura(double nuevaTemperatura): modifica la temperatura.
- obtenerTemperatura(): devuelve la temperatura y debe ser const.
- esSuperiorA(const RegistroTemperatura& otro): devuelve true si la temperatura actual es superior a la del otro registro.
- mostrarInformacion(): muestra la temperatura almacenada.
Prueba en main()
1. Crea dos registros con temperaturas diferentes.
2. Muestra sus temperaturas.
3. Compara ambos registros.
4. Actualiza la temperatura de uno.
5. Vuelve a compararlos.
Condiciones
- Utiliza referencias constantes donde corresponda.
- Utiliza this-> si te resulta útil.
- No accedas directamente a los atributos privados de otro objeto.
- Los métodos que no modifiquen el objeto deben ser const.
*/

#include <iostream>
using namespace std;

class RegistroTemperatura
{
    private:
        //  Atributos de la clase:
        double temperatura;
    
    public:
        //  Constructor de la clase:
        RegistroTemperatura( double tempInicial ): temperatura( tempInicial ) {}

        //  Método actualizarTemperatura()
        void actualizarTemperatura( double nuevaTemp )
        {
            this->temperatura = nuevaTemp;
        }

        //  Método obtenerTemperatura()
        double obtenerTemperatura() const
        {
            return this->temperatura;
        }

        //  Método esSuperiorA()
        bool esSuperiorA( const RegistroTemperatura &otro ) const
        {
            return this->obtenerTemperatura() > otro.obtenerTemperatura();
        }

        //  Método mostrarInformación()
        void mostrarInformacion() const
        {
            cout << "Temperatura almacenada: " << this->obtenerTemperatura() << endl;
        }

};

int main()
{
    RegistroTemperatura t1( 200.0 );
    RegistroTemperatura t2( 300.0 );

    t1.mostrarInformacion();
    t2.mostrarInformacion();

    cout << "Getter -> t1: " << t1.obtenerTemperatura()
         << ", t2: " << t2.obtenerTemperatura() << endl;

    cout << boolalpha << "¿t1 > t2?: " << t1.esSuperiorA( t2 ) << endl;

    t1.actualizarTemperatura( 400.0 );

    cout << "¿t1 > t2?: " << t1.esSuperiorA( t2 ) << endl;

    return 0;
}