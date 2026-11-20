/*
-----------------------------------------------------------------------------------------------------------------------------
Destructores Virtuales
-----------------------------------------------------------------------------------------------------------------------------
    ¿Qué es un destructor virtual?
-----------------------------------------------------------------------------------------------------------------------------

        Es el destructor de una clase base declarado con la palabra reservada 'virtual' (ej: virtual ~Persona()). 
        Permite que la destrucción de un objeto se resuelva de forma polimórfica en tiempo de ejecución.

-----------------------------------------------------------------------------------------------------------------------------
    ¿Para qué sirve?
-----------------------------------------------------------------------------------------------------------------------------

        Sirve para asegurar que, al eliminar un objeto de una clase derivada a través de un puntero de la clase base 
        (ej: Persona *p1 = new Alumno(...); delete p1;), se ejecuten todos los destructores de la jerarquía en orden 
        inverso a su creación: primero el destructor de la clase hija (~Alumno) y después el de la clase padre (~Persona).

-----------------------------------------------------------------------------------------------------------------------------
    ¿Qué problemáticas resuelve?
-----------------------------------------------------------------------------------------------------------------------------

        Evita fugas de memoria (memory leaks) y comportamientos indefinidos. Sin 'virtual', al hacer 'delete' sobre el 
        puntero base solo se llama al destructor del padre, dejando sin liberar la memoria dinámica (heap) que la clase 
        derivada haya reservado para sus propios atributos (como 'estudios' o 'materia').
        
-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
#include <string>
using namespace std;

class Persona
{
    protected:
        string nombre;
        int edad;

    public:

        Persona( string n, int e ): nombre( n ), edad( e ) {};

        virtual ~Persona()
        {
            cout << "--------------------------" << endl;
            cout << "| Destructor de Persona. |" << endl;
            cout << "--------------------------" << endl;
        }

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
        string *estudios;   //  Este objeto es propietario de la memoria dinámica que libera su destructor.
                            //  Aquí no se copian objetos; si se hiciera, haría falta la regla de tres.

    public:

        Alumno( string n, int e, string es ): Persona( n, e )
        {
            estudios = new string( es );
        };

        ~Alumno()
        {
            cout << "-------------------------" << endl;
            cout << "| Destructor de Alumno. |" << endl;
            cout << "-------------------------" << endl;

            delete estudios;
            estudios = nullptr;
        }

        // Reutilización del método de la clase padre:
        void mostrarDatos() override
        {
            Persona::mostrarDatos();
            cout << "Estudios: " << *estudios << endl; // Con '*' imprimimos el texto y no la dirección del heap
        }

};

//  Clase derivada o subclase Profesor
class Profesor : public Persona
{
    private:
        string *materia;    //  Propiedad dinámica: el destructor libera este recurso (ver nota en Alumno).

    public:

        Profesor( string n, int e, string m ): Persona( n, e )
        {
            materia = new string( m );
        };

        ~Profesor()
        {
            cout << "---------------------------" << endl;
            cout << "| Destructor de Profesor. |" << endl;
            cout << "---------------------------" << endl;

            delete materia;
            materia = nullptr;
        }

        // Reutilización del método de la clase padre:
        void mostrarDatos() override
        {
            Persona::mostrarDatos();
            cout << "Materia: " << *materia << endl; // Con '*' imprimimos el texto y no la dirección del heap
        }

};

int main()
{

    Persona *p1 = new Alumno( "Ana", 20, "Informática" );

    p1->mostrarDatos();

    delete p1; 
        // Sin 'virtual': Solo llamaría al destructor de Persona (fuga de memoria en 'estudios').
        // Con 'virtual': Llama primero al destructor de Alumno y luego al de Persona.

    return 0;
}