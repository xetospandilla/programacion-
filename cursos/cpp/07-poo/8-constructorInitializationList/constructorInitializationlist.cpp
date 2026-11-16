/*
-----------------------------------------------------------------------------------------------------------------------------
Constructor Initialization List
-----------------------------------------------------------------------------------------------------------------------------
Consiste en inicializar los campos de clase en la lista que va justo después de la declaración
del constructor. Evita construir los atributos por defecto y asignarles un valor después dentro
del cuerpo; en objetos como string, ese paso extra tiene un coste.
-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
#include <string>
#include <chrono> //    Incluye la clase chrono
using namespace std;

class Persona
{

    private:
        string nombre;
        int edad;

    public:
/*    
        //  Constructor tradicional: primero se inicializan los miembros por defecto
        //  (el int queda sin inicializar) y después se les asigna un valor en el cuerpo.
        Persona( string nombre, int edad )
        {
            this->nombre = nombre;
            this->edad = edad;

            cout << "Constructor llamado" << endl;
        }
*/

        //  Constructor de inicialización en lista.
        //  El nombre que va antes de los paréntesis es el miembro; el que va dentro es el parámetro.
        Persona( string nombre, int edad ): nombre( nombre ), edad( edad )
        {
            cout << "Constructor llamado" << endl;
        }

        /*
            El orden real de inicialización depende del orden en que se declaran
            los miembros en la clase, no del orden escrito en la lista.

            Aquí se inicializa primero "nombre" y después "edad", porque están
            declarados así. Si un miembro se inicializa a partir de otro, hay que
            respetar ese orden para no leer un valor todavía sin inicializar.
        */
        //  Método
        void mostrarDatos()
        {
            cout << "Nombre: " << nombre << endl;
            cout << "Edad: " << edad << endl;
        }
};

int main()
{
    auto comienzo = chrono::high_resolution_clock::now();

    /*
    Usamos la inferencia de tipos con la palabra "auto" para que el compilador
    deduzca el tipo de "comienzo" durante la compilación. El tipo no se decide
    al ejecutar el programa.
    */

    Persona p1( "Carlos", 30 );
    //  p1.mostrarDatos();

    auto final = chrono::high_resolution_clock::now();

    chrono::duration<double> lapso = final - comienzo; 
    //  La medición es orientativa: el compilador puede optimizar el código y el
    //  tiempo depende de la máquina. Sirve para ilustrar, no como prueba exacta.

    cout << "Tiempo de ejecución: " << lapso.count() << " segundos." << endl;

    return 0;
}