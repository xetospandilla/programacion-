/*
-----------------------------------------------------------------------------------------------------------------------------
Friend of a Class
-----------------------------------------------------------------------------------------------------------------------------
Qué es?
-----------------------------------------------------------------------------------------------------------------------------
    - Caracterísitca del lenguaje que permite dar acceso a funciones u otras clases a los campos privados
    o protegidos de una clase.
-----------------------------------------------------------------------------------------------------------------------------
Para qué sirven?
-----------------------------------------------------------------------------------------------------------------------------
    - Para que ciertas funciones o incluso otras clases sí puedan acceder a esos miembros internos sin
    ser parte de la clase.
-----------------------------------------------------------------------------------------------------------------------------
    Precacuciones: Rompe la encapsulación( no del todo, pero la romp )
-----------------------------------------------------------------------------------------------------------------------------
Donde se declaran
-----------------------------------------------------------------------------------------------------------------------------
    - Dentro de la clase, escribiendo 'friend' antes de la función o clase.
-----------------------------------------------------------------------------------------------------------------------------
Cuando usar friend en vez de getters y setters:
-----------------------------------------------------------------------------------------------------------------------------
    - Necesitas acceso a múltiples campos privados de golpe.

    - Cuando además el acceso lo quieres rápido sin tener que dessarrollar getters

    - Cuando hay relación estrecha entre clases y funciones.

    - Cuando necesitas acceso puntual a campos o atributos
-----------------------------------------------------------------------------------------------------------------------------
Reglas de oro al usar 'friend'
-----------------------------------------------------------------------------------------------------------------------------
    - Primero intentar usar getters/setters

    - Solo usa frien si tienes una buena razón técnica para ello( relación especial, rendimiento,
    diseño de operadores, etc. ).
-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
using namespace std;

class Caja
{
    private:
        double largo;
        double ancho;
    public:
        Caja( double l, double a ): largo( l ), ancho( a ) {};

        // friend double calcularArea( const Caja& c );

        friend class Inspector;
};

// double calcularArea( const Caja& c )
// {
//     return c.largo * c.ancho;
// }

class Inspector
{
    public:
        void mostrarDimensiones( const Caja& c )
        {
            cout << "Largo: " << c.largo << ", ancho: " << c.ancho << endl;
        }
};

int main()
{
    Caja c( 5.0, 3.0 );
    // cout << "Área de la caja: " << calcularArea( c ) << endl; 
    return 0;
}