/*
-----------------------------------------------------------------------------------------------------------------------------
Herencia
-----------------------------------------------------------------------------------------------------------------------------

        - Sirve para reutilizar código en caso de crear objetos similares.

        - Permite estructurar el código mediante relaciones de tipo "es un" (por ejemplo, Coche y Moto heredan de Vehículo).

        - Si corriges o mejoras algo en la clase padre, el cambio se aplica a todas sus subclases, permitiendo además
        que cada hija añada sus propias características o sobrescriba comportamientos específicos (polimorfismo).

-----------------------------------------------------------------------------------------------------------------------------
    Principio de es-un
-----------------------------------------------------------------------------------------------------------------------------

        Principio en programación, que facilita saber que clase está heradando de otra. Ya que por norma
        la clase hija suele ir debajo de la clase padre, de la que está heredando.

-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
using namespace std;

class Persona
{
    protected:
        string nombre;
        int edad;

    public:

        Persona( string n, int e ): nombre( n ), edad( e ) {};

        void mostrarDatos()
        {
            cout << "Nombre: " << nombre << endl;
            cout << "Edad: " << edad << endl;
        }

};

//  Clase derivada o subclase Alumno
class Alumno : public Persona
{
    private:
        string estudios;

    public:

        Alumno( string n, int e, string es ): Persona( n, e ), estudios( es ) {};

        // Reutilización del método de la clase padre:

        void mostrarDatos()
        {

            Persona::mostrarDatos();
            cout << "Estudios: " << estudios << endl;

        }

};

//  Clase derivada o subclase Alumno
class Profesor : public Persona
{
    private:
        string materia;

    public:

        Profesor( string n, int e, string m ): Persona( n, e ), materia( m ) {};

        // Reutilización del método de la clase padre:

        void mostrarDatos()
        {

            Persona::mostrarDatos();
            cout << "Materia: " << materia << endl;

        }

};

int main()
{

    Alumno a1( "Laura", 20, "Ingeniería Informática" );
    Profesor p1( "Carlos", 45, "Programación en C++" );

    cout << "---------Alumno---------" << endl;

    a1.mostrarDatos();

    cout << "---------Profesor---------" << endl;

    p1.mostrarDatos();

}