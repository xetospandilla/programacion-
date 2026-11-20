/*
-----------------------------------------------------------------------------------------------------------------------------
Interfaces vs Clases abstractas
-----------------------------------------------------------------------------------------------------------------------------
    Diferencia conceptual y semántica en C++
-----------------------------------------------------------------------------------------------------------------------------

        - A diferencia de lenguajes como Java o C# (donde existe la palabra reservada 'interface'), en C++ NO hay
        ninguna diferencia sintáctica entre una clase abstracta y una interfaz.
        
        - La diferencia reside en su significado semántico y en el uso que se les da:

            * Clase abstracta: Hace referencia a pertenencia u objetos (principio "Es-un" -> ej: un Perro ES UN Animal).
            Representa tanto comportamiento como estado.

            * Interfaz: Hace referencia a capacidades o comportamientos ("¿Qué puede hacer?" -> ej: un Pájaro, un Avión
            o Superman no pertenecen a la misma familia de objetos, pero todos PUEDEN VOLAR).

-----------------------------------------------------------------------------------------------------------------------------
    Reglas prácticas: Clases abstractas VS Interfaces
-----------------------------------------------------------------------------------------------------------------------------

    Clase abstracta:

        - Puede tener atributos (representa estado).
        
        - Puede tener métodos implementados (desarrollados) junto con métodos virtuales puros.
        
        - Tiene al menos un método virtual puro (= 0).
        
        - No es instanciable.

    Interfaz:

        - No tiene normalmente atributos (no almacena estado, solo define capacidades).
        
        - No tiene normalmente métodos implementados (es un contrato 100% puro).
        
        - Tiene solo métodos virtuales puros (= 0) y suele incluir un destructor virtual.
        
        - No es instanciable.
        
        - Convención de nombres: Aunque no es obligatorio, en C++ se suele anteponer una 'I' mayúscula al nombre de
        la interfaz para identificarla a simple vista (ej: IVolador).

-----------------------------------------------------------------------------------------------------------------------------
    Usos habituales
-----------------------------------------------------------------------------------------------------------------------------

        - Herencia múltiple: A diferencia de Java, C++ permite que una clase herede de varias clases a la vez, lo que
        puede provocar el "Diamond Problem" (problema del diamante). Las interfaces se utilizan habitualmente para
        implementar herencia múltiple de capacidades de forma limpia, evitando o simplificando dicho problema.

-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
#include <string>
using namespace std;

// Interfaz (por convención en C++ suele nombrarse con 'I' delante: IVolador)
class Volador
{
    public:
        virtual void puedoVolar() = 0;

        virtual ~Volador() {};
};

class Pajaro : public Volador
{
    public:
        void puedoVolar() override
        {
            cout << "Vuelo batiendo las alas." << endl;
        }
};

class Avion : public Volador
{
    public:
        void puedoVolar() override
        {
            cout << "Vuelo consumiendo combustible." << endl;
        }
};

class Murcielago : public Volador
{
    public:
        void puedoVolar() override
        {
            cout << "Vuelo guiándome por ultrasonido." << endl;
        }
};

class Superman : public Volador
{
    public:
        void puedoVolar() override
        {
            cout << "Vuelo utilizando mis superpoderes." << endl;
        }
};

int main()
{
    Pajaro p;
    Avion a;
    Murcielago m;
    Superman s;

    // Podemos agrupar objetos totalmente distintos bajo la misma interfaz común:
    Volador* voladores[] = { &p, &a, &m, &s };

    for ( Volador* v : voladores )
    {
        v->puedoVolar();
    }

    return 0;
}