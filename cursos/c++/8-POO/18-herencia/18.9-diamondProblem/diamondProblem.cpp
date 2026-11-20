/*
-----------------------------------------------------------------------------------------------------------------------------
Diamond Problem (Problema del Diamante) y sus soluciones
-----------------------------------------------------------------------------------------------------------------------------
    ¿Qué es el Diamond Problem?
-----------------------------------------------------------------------------------------------------------------------------

        - Es un problema de ambigüedad que surge en C++ al utilizar herencia múltiple en una jerarquía con forma de
        diamante:
                                          Animal
                                          /    \
                                   Mamifero    Volador
                                          \    /
                                        Murcielago

        - Como 'Mamifero' hereda de 'Animal' y 'Volador' también hereda de 'Animal', cuando 'Murcielago' hereda de
        ambas clases recibe DOS copias independientes de los atributos y métodos de 'Animal' (dos 'edad' y dos
        'respirar').
        
        - Al intentar acceder desde 'Murcielago' a 'miMurcielago.respirar()' o 'miMurcielago.edad', el compilador
        lanza un error de ambigüedad porque no sabe si nos referimos a la copia heredada vía 'Mamifero' o vía 'Volador'.

-----------------------------------------------------------------------------------------------------------------------------
    Las 3 soluciones en C++
-----------------------------------------------------------------------------------------------------------------------------

        1. Especificar la clase de origen (Operador de resolución de ámbito '::'):
            - Consiste en indicar explícitamente de qué rama de la herencia queremos usar el miembro:
            ej: miMurcielago.Mamifero::respirar();  o  miMurcielago.Volador::edad = 5;
            
            - Inconveniente: Siguen existiendo dos copias en memoria y obliga a escribir sintaxis verbosa cada vez.

        2. Herencia virtual ('virtual public'):
            - Se añade la palabra 'virtual' al heredar de la clase base en las clases intermedias:
            ej: class Mamifero : virtual public Animal  y  class Volador : virtual public Animal
            
            - Hace que ambas clases compartan una ÚNICA instancia/copia de 'Animal', eliminando la duplicidad y
            permitiendo llamar directamente a miMurcielago.respirar() o miMurcielago.edad.

        3. Rediseño mediante Clase Abstracta + Interfaces (Solución más limpia y recomendada):
            - Se rompe el diamante eliminando la herencia de 'Animal' en las clases intermedias y convirtiéndolas
            en interfaces puras ('IMamifero' e 'IVolador') que solo definen capacidades.
            
            - 'Animal' se convierte en la única clase base abstracta (con el estado y comportamiento común a todos,
            como 'edad' y 'respirar() = 0'), y 'Murcielago' hereda directamente de 'Animal' e implementa las
            interfaces 'IMamifero' e 'IVolador'.

-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
#include <string>
using namespace std;

// Clase base abstracta (contiene estado y comportamiento común a todos los animales)
class Animal
{
    public:
        int edad;

        Animal() : edad(0) {}

        virtual void respirar() = 0;

        virtual ~Animal() {}
};

// Interfaz 1 (representa capacidad, NO hereda de Animal -> rompe el diamante)
class IMamifero
{
    public:
        virtual void amamantar() = 0;

        virtual ~IMamifero() {}
};

// Interfaz 2 (representa capacidad, NO hereda de Animal -> rompe el diamante)
class IVolador
{
    public:
        virtual void volar() = 0;

        virtual ~IVolador() {}
};

// Hereda de una única clase base (Animal) e implementa múltiples interfaces
class Murcielago : public Animal, public IMamifero, public IVolador
{
    public:
        void respirar() override
        {
            cout << "El murciélago respira." << endl;
        }

        void amamantar() override
        {
            cout << "El murciélago amamanta a sus crías." << endl;
        }

        void volar() override
        {
            cout << "El murciélago vuela guiándose por ultrasonido." << endl;
        }

        void dormir()
        {
            cout << "El murciélago duerme boca abajo." << endl;
        }
};

int main()
{
    Murcielago miMurcielago;

    miMurcielago.edad = 5;
    cout << "La edad del murciélago es: " << miMurcielago.edad << endl;

    miMurcielago.respirar();
    miMurcielago.amamantar();
    miMurcielago.volar();
    miMurcielago.dormir();

    return 0;
}