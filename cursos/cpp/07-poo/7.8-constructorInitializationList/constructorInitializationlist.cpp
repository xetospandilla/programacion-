/*
-----------------------------------------------------------------------------------------------------------------------------
Constructor Initialization List
-----------------------------------------------------------------------------------------------------------------------------
Consiste en mejorar la eficiencia del constructor, inicializando los campos de clase justo después
de la declaración del constructor. Haciendolo mucho más efiniciente que un constructor tradicional.
-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
using namespace std;
#include <chrono> //    Incluye la clase chrono

class Persona
{

    private:
        string nombre;
        int edad;

    public:
/*    
        //  Constructor tradicional
        Persona( string nombre, int edad )
        {
            this->nombre = nombre;
            this->edad = edad;

            cout << "Constructor llamado" << endl;
        }
*/

        //  Constructor de inicialización en lista
        Persona( string nombre, int edad ): nombre( nombre ), edad( edad )
        {
            cout << "Constructor llamado" << endl;
        }
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
    Usamos la inferencia de tipos con la palabra "auto" para que el tipo
    de la variable comienzo sea decidido durante la ejecuciónd el código.
    */

    Persona p1( "Carlos", 30 );
    //  p1.mostrarDatos();

    auto final = chrono::high_resolution_clock::now();

    chrono::duration<double> lapso = final - comienzo; 

    cout << "Tiempo de ejecución: " << lapso.count() << " segundos." << endl;

    return 0;
}