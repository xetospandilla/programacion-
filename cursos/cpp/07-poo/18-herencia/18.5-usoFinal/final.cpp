/*
-----------------------------------------------------------------------------------------------------------------------------
Uso del final
-----------------------------------------------------------------------------------------------------------------------------
    ¿Qué es 'final'?
-----------------------------------------------------------------------------------------------------------------------------

        - Es un especificador (introducido en C++11) que permite poner un límite explícito en una jerarquía de herencia.
        
        - A diferencia de otros lenguajes como Java, en C++ 'final' SOLO puede aplicarse a clases y a métodos virtuales
        (nunca a variables ni constantes).

-----------------------------------------------------------------------------------------------------------------------------
    ¿Para qué sirve?
-----------------------------------------------------------------------------------------------------------------------------

        - Para evitar que una clase pueda seguir heredándose (convirtiéndola en el último eslabón del árbol de herencia)
        o impedir que un método virtual pueda volver a sobrescribirse en futuras clases derivadas.
        
        - Muy útil al diseñar arquitecturas complejas o trabajar en equipo para proteger el diseño original frente a
        extensiones no previstas.

-----------------------------------------------------------------------------------------------------------------------------
    ¿Cómo lo hace?
-----------------------------------------------------------------------------------------------------------------------------

        - En métodos: Agregando el especificador 'final' al final de la firma del método virtual (junto o tras 'override').
        
        - En clases: Agregando el especificador 'final' justo después del nombre de la clase y antes de los dos puntos
        de herencia (ej: class Profesor final : public Persona).

-----------------------------------------------------------------------------------------------------------------------------
    ¿Cómo funciona?
-----------------------------------------------------------------------------------------------------------------------------

        - El compilador verifica las restricciones antes de ejecutar el programa: si una clase intenta heredar de una
        clase 'final' o sobrescribir un método 'final', lanza un error en tiempo de compilación (y el IDE lo marca
        al instante).

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
        string *estudios;

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
        void mostrarDatos() override final
        {
            Persona::mostrarDatos();
            cout << "Estudios: " << *estudios << endl;
        }

        /*
            NOTA sobre 'final' en métodos:

            Al poner 'final' justo después de la firma del método, hacemos que este
            método no pueda modificarse ni sobrescribirse de nuevo en ninguna clase
            que herede de Alumno (aunque la clase Alumno sí pueda seguir heredándose).
        */

};

//  Clase derivada o subclase Profesor
class Profesor final : public Persona
{
    private:
        string *materia;

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

        void mostrarDatos() override
        {
            Persona::mostrarDatos();
            cout << "Materia: " << *materia << endl;
        }

};

/*
    NOTA sobre 'final' en clases:

    Al colocar 'final' justo después del nombre de la clase, bloqueamos por completo
    la herencia a partir de ella. Ninguna otra clase podrá heredar ni los métodos
    ni los atributos de Profesor.
*/

int main()
{

    Persona *p1 = new Alumno( "Ana", 20, "Informática" );

    p1->mostrarDatos();

    delete p1; 

    return 0;
}