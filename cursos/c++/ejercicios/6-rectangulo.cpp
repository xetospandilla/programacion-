/*
Crea una clase Rectangulo que permita gestionar las dimensiones de un rectángulo.

Requisitos:
- Dos atributos privados: base y altura.
- Constructor por defecto que inicialice ambos a 1.
- Constructor parametrizado que reciba ambas dimensiones.
- Método calcularArea() que devuelva el área.
- Método calcularPerimetro() que devuelva el perímetro.
- Método mostrarInformacion() que muestre las dimensiones, el área y el perímetro.
- Los métodos que no modifiquen el objeto deben ser const.
Prueba: crea dos rectángulos, uno con el constructor por defecto y otro con dimensiones introducidas por ti. Muestra sus resultados.
*/

#include <iostream>
using namespace std;

class Rectangulo
{

    private:

        //  Atributos de la clase:
        double base;
        double altura;

    public:

        //  Constructor base de la clase:
        Rectangulo()
        {
            this->base = 1;
            this->altura = 1;
        }

        //  Constructor parametrizado de la clase, con control de acceso:
        Rectangulo( double b, double a )
        {
            if( a < 0 )
            {
                altura = 0;
            }
            else
            {
                altura = a;
            }

            if( b < 0 )
            {
                base = 0;
            }
            else
            {
                base = b;
            }
        }

        //  Método calcularArea()
        double calcularArea() const
        {
            return this->base * this->altura;
        }

        //  Método calcularPerímetro()
        double calcularPerimetro() const
        {
            return ( this->base * 2 ) + ( this->altura * 2 );
        }

        //  Método mostrarInformacion(): muestra dimensiones, área y perímetro.
        void mostrarInformacion() const
        {
            cout << "--------------------" << endl;
            cout << "Datos del Rectangulo" << endl;
            cout << "--------------------" << endl;
            cout << "Base: " << this->base << endl;
            cout << "Altura: " << this->altura << endl;
            cout << "Area: " << this->calcularArea() << endl;
            cout << "Perimetro: " << this->calcularPerimetro() << endl;
            cout << "--------------------" << endl;
        }

};

int main()
{

    Rectangulo r1;                  // Constructor por defecto: 1 y 1.
    Rectangulo r2( 10.0, 5.0 );     // Dimensiones elegidas para la prueba.

    cout << "Rectangulo 1" << endl;
    r1.mostrarInformacion();

    cout << "Rectangulo 2" << endl;
    r2.mostrarInformacion();

    return 0;
}