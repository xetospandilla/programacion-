/*
-----------------------------------------------------------------------------------------------------------------------------
Uso del Override
-----------------------------------------------------------------------------------------------------------------------------
    ¿Qué es 'override'?
-----------------------------------------------------------------------------------------------------------------------------

        - Es un especificador (introducido en C++11) que se coloca al final de la firma de un método en una clase 
        derivada para declarar explícitamente que dicho método está redefiniendo un método virtual de la clase base.

-----------------------------------------------------------------------------------------------------------------------------
    ¿Para qué sirve?
-----------------------------------------------------------------------------------------------------------------------------

        - Para evitar errores silenciosos al sobrescribir métodos de la clase padre provocados por fallos en la firma 
        del método (nombre mal escrito, distintos parámetros, distinto tipo de retorno o falta de 'const').

        - Sin 'override', si te equivocas al escribir la firma (ej: mostrarDato() en lugar de mostrarDatos()), C++ no 
        da error: lo interpreta como un método nuevo independiente de la clase hija, rompiendo el polimorfismo sin 
        avisar y ejecutando siempre la versión del padre.

-----------------------------------------------------------------------------------------------------------------------------
    ¿Cómo lo hace y cómo funciona?
-----------------------------------------------------------------------------------------------------------------------------

        - Indica explícitamente al compilador que el método debe sobrescribir obligatoriamente un método 'virtual' 
        existente en la clase padre con exactamente la misma firma.

        - Si no encuentra coincidencia exacta en la clase base (o si el método base no es 'virtual'), el compilador 
        detiene la compilación y lanza un error inmediato (y el IDE lo marca al instante), transformando un fallo 
        silencioso en tiempo de ejecución en un error detectable en tiempo de compilación.

-----------------------------------------------------------------------------------------------------------------------------
        NOTA: En definitiva, 'override' añade seguridad, claridad y mantenimiento a largo plazo. Su verdadero valor 
            no está solo en evitar despistes propios al escribir, sino en proteger el código frente a cambios 
            externos y futuros.
-----------------------------------------------------------------------------------------------------------------------------
    Casos de uso en la vida real
-----------------------------------------------------------------------------------------------------------------------------

        - Protección ante cambios en la clase base: Si la clase padre pertenece a una librería externa o a otro equipo 
        y modifican la firma del método virtual (nombre, parámetros o 'const'), el compilador avisará de inmediato 
        en todas las clases derivadas que usen 'override'.

        - Mejora la legibilidad del código: Cualquier desarrollador que lea la clase derivada sabe al instante que ese 
        método proviene y redefine uno de la clase padre, sin tener que ir a revisar la jerarquía completa.

        - Previene errores de mantenimiento o refactorización: Si se cambia la firma del método base (nombre,
        parámetros, tipo de retorno o 'const'), se elimina o deja de ser virtual, 'override' actúa como red de
        seguridad detectando el desajuste entre padre e hija.

        - Claridad semántica: Expresa de forma explícita la intención del programador ("estoy modificando un 
        comportamiento heredado, no creando uno nuevo"). Es considerada una buena práctica estándar en C++ moderno.

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
        string *estudios;   //  Propiedad dinámica: el destructor libera este recurso.
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
            cout << "Estudios: " << *estudios << endl;
        }
            /*
            NOTA sobre 'override':

            Al colocar 'override' justo después del paréntesis, forzamos al compilador a verificar que este método 
            sobrescribe exactamente un método virtual de la clase padre. Si la firma no coincide (por ejemplo, si 
            escribiéramos 'mostrarDato()'), el programa ni siquiera compilará.
            */

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

        void mostrarDatos() override
        {
            Persona::mostrarDatos();
            cout << "Materia: " << *materia << endl;
        }

};

int main()
{

    Persona *p1 = new Alumno( "Ana", 20, "Informática" );

    p1->mostrarDatos();

    delete p1; 

    return 0;
}