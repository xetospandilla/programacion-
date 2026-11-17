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

class RegistroTemperaturas
{
    private:
        //  Atributos de la clase:
        double temperatura;
    
    public:
        //  Constructor de la clase:
        RegistroTemperaturas( double tempInicial ): temperatura( tempInicial ) {}

        //  Método actualizarTemperatura()
        void actualizarTemperatura( double nuevaTemp )
        {
            this->temperatura = nuevaTemp;
        }

        //  Método esSuperiorA()
        bool esSuperiorA( const RegistroTemperaturas &otro ) const
        {
            if( this->temperatura < otro.temperatura )
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        //  Método mostrarInformación()
        void mostrarInformacion() const
        {
            cout << "Temperatura almacenada: " << this->temperatura << endl;
        }

};

int main()
{
    RegistroTemperaturas t1( 200.0 );
    RegistroTemperaturas t2( 300.0 );

    t1.mostrarInformacion();
    t2.mostrarInformacion();

    t1.esSuperiorA( t2 );

    t1.actualizarTemperatura( 400.0 );

    t1.esSuperiorA( t2 );

    return 0;
}