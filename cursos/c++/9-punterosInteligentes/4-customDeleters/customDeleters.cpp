/*
-----------------------------------------------------------------------------------------------------------------------------
Smart Pointers (Punteros Inteligentes): Cómo evitar referencias circulares (weak_ptr)
-----------------------------------------------------------------------------------------------------------------------------

    Un custom deleter es una forma personalizada de indicar como se debe eliminar un smart pointer
    a la hora de ser eliminado.

-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
#include <memory>
using namespace std;

class Persona
{
    public:
        
        Persona()
        {
            cout << "Objeto Persona creado." << endl;
        }

        ~Persona()
        {
            cout << "Destructor de Persona eliminado." << endl;
        }

        void saludar()
        {
            cout << "Hola desde Persona." << endl;
        }
};

int main()
{

    return 0;
}