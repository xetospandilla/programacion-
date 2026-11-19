/*
-----------------------------------------------------------------------------------------------------------------------------
Poliformismo
-----------------------------------------------------------------------------------------------------------------------------
    Sirve para
-----------------------------------------------------------------------------------------------------------------------------

        - Permite guardar diferentes clases hijas (por ejemplo, Alumno y Profesor) en una misma estructura (como
        un array o std::vector de punteros Persona*) y recorrerlos llamando al mismo método (mostrarDatos()).

        - Puedes añadir nuevas clases derivadas en el futuro sin tener que modificar la lógica
        que gestiona los punteros de la clase base.

-----------------------------------------------------------------------------------------------------------------------------
    Anotaciones a tener en cuenta:
-----------------------------------------------------------------------------------------------------------------------------

    - Si almacenas o pasas los objetos por valor en lugar de usar punteros (Persona*) o referencias (Persona&),
    el compilador reserva solo el tamaño en memoria de la clase base (Persona) y "recorta"
    los atributos extra de la clase hija (object slicing). Con punteros y virtual, conservas la identidad completa
    del objeto derivado.

    - Efectivamente, tiene una ligera penalización de rendimiento. El compilador crea una tabla
    de funciones virtuales (vtable) y añade un puntero oculto (vptr) a cada objeto, lo que implica un pequeño gasto extra 
    de memoria y una indirección adicional al resolver qué función llamar en tiempo de ejecución
    (aunque en la práctica suele ser despreciable frente a la flexibilidad que aporta).

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

        virtual void mostrarDatos()
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

    Persona *persona1 = &a1;
    Persona *persona2 = &p1;

    persona1->mostrarDatos();

    return 0;

}