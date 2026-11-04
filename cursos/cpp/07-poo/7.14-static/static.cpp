/*
-----------------------------------------------------------------------------------------------------------------------------
Uso static I
------------------------------------------------------------------------------------------------------------------------------
¿Qué es static?

    - Atributo o método que pertenece a la propia clase y no a instancias de clase.
------------------------------------------------------------------------------------------------------------------------------
¿Qué significa que un atributo o método sea static?

    - Atribtributos:

        - Son compartidos por todas las instancias de clase.

        - No dependen de un objeto/instancia en particular.

        - Se almacenan en un solo lugar de la memoría y no se replica en cada instancia.

    - Métodos static:

        - No pueden acceder a miembros de instancia de la clase, es decir, aquellos que no son static.

        - Pueden manipular solo a otros miembros static.

        - No requieren una instancia/objeto para ser llamados.
-----------------------------------------------------------------------------------------------------------------------------
Utilidad del static:

    - Obtener información de la clase sin necesidad de instanciarla.

    - Funciones de utiliada en clase especializadas( ejm: Math -> cálculos matemáticos )

    - 
-----------------------------------------------------------------------------------------------------------------------------
NOTA:
    A partir de la version 17 de C++, se le puede agregar la palabra 'inline' antes de la declaración para poder tener
    la inicialización y la definición dentro de la propia clase.
-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
using namespace std;

class Empleado
{
    private:
        string nombre;
        int id;

        inline static int siguienteID = 1;
        inline static int numEmpleados = 0;

    public:

        Empleado( string nombre )
        {
            this->nombre = nombre;
            id = siguienteID++;
            numEmpleados++;
        }

        ~Empleado()
        {
            numEmpleados--;
        }

        void mostrarInfo()
        {
            cout << "Nombre: " << this->nombre << endl;
            cout << "ID: " << this->id << endl;
        }

        static int obtenerSiguienteId()
        {
            return siguienteID;
        }

        static int contarEmpleados()
        {
            return numEmpleados;
        }
};

int main()
{
    Empleado e1( "Juan" );
    Empleado e2 ( "María" );
    {
        Empleado e3 ( "Carlos" );
    }

    e1.mostrarInfo();
    e2.mostrarInfo();

    cout << "El siguiente Id disponible es: " << Empleado::obtenerSiguienteId() << endl;
    cout << "Total de empleados: " << Empleado::contarEmpleados() << endl;

    return 0;
}