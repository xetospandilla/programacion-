/*
-----------------------------------------------------------------------------------------------------------------------------
Uso de structs
------------------------------------------------------------------------------------------------------------------------------
¿Que són?

    - Estructuras muy similares a las clases donde se agrupan variables bajo un mismo nombre.
-----------------------------------------------------------------------------------------------------------------------------
¿Para qué sirven?

    - Para organizar información en un solo bloque.

    - Sus miembros son públicos.

    - Ideales para representar datos simples y estructuras sin lógica completa.
-----------------------------------------------------------------------------------------------------------------------------
Cuando usar un Struct y cuando una Clase:

    - Usar Struct cuando solo necesites guardar y acceder a datos de forma directa.

    - Usar Class cuando quieras encapsular, validar o proteger datos.
-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
#include <string>
using namespace std;

struct Persona
{
    string nombre;
    int edad;

    string getDatos()
    {
        return "El nombre es: " + nombre +", y la edad: " + to_string( edad );
    }
};


int main()
{
    Persona p;

    p.nombre = "Juan";
    p.edad = 18;

    cout << p.getDatos();
}