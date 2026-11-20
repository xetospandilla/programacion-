/*
-----------------------------------------------------------------------------------------------------------------------------
Smart Pointers (Punteros Inteligentes): Custom Deleters (Eliminadores Personalizados)
-----------------------------------------------------------------------------------------------------------------------------
    ¿Qué es un Custom Deleter y para qué sirve?
-----------------------------------------------------------------------------------------------------------------------------

        - Por defecto, cuando el contador de propietarios de un 'shared_ptr' llega a 0 (o un 'unique_ptr' sale de
        ámbito), el smart pointer ejecuta internamente la instrucción estándar 'delete' para liberar la memoria.

        - Un Custom Deleter es una función o lógica personalizada que sustituye a ese 'delete' por defecto,
        indicándole al puntero inteligente exactamente CÓMO debe liberar el recurso cuando llegue el momento.

-----------------------------------------------------------------------------------------------------------------------------
    ¿Cuándo es necesario utilizarlo?
-----------------------------------------------------------------------------------------------------------------------------

        - Para objetos normales creados con 'new' en el heap (como 'new Persona()'), el 'delete' por defecto basta.

        - Es útil cuando el recurso necesita una operación de liberación propia además de liberar la memoria:
          por ejemplo, cerrar una conexión antes de destruir el objeto. El eliminador ejecuta esa operación
          y después libera la memoria con 'delete'.

        - En proyectos heredados de otros lenguajes aparecen recursos con funciones de cierre propias; en C++
          se prefiere encapsular esa operación en el propio tipo, como hace 'Conexion::cerrar()' en este ejemplo.

-----------------------------------------------------------------------------------------------------------------------------
    ¿Cómo se implementa? (Las 2 formas habituales)
-----------------------------------------------------------------------------------------------------------------------------

        - Se pasa como segundo argumento al constructor del 'shared_ptr' (nota: con Custom Deleter se usa el
        constructor directo 'shared_ptr<T>(ptr, deleter)' en lugar de 'make_shared'):

            1. Mediante una Función tradicional (Recomendada cuando la liberación es compleja y lleva varias líneas):
               shared_ptr<Conexion> c( new Conexion("BD"), cerrarConexion );

            2. Mediante una expresión Lambda (Recomendada para limpiezas cortas y sencillas):
               shared_ptr<Conexion> c( new Conexion("BD"), []( Conexion *ptr ){ ptr->cerrar(); delete ptr; } );

        El ejemplo usa 'Conexion::cerrar()' para que se vea la diferencia respecto a 'make_shared<Persona>()':
        allí el 'delete' por defecto es suficiente; aquí el eliminador ejecuta una operación adicional.

        Nota: en un diseño RAII puro, 'cerrar()' podría hacerse en el destructor; se hace desde el eliminador
        para mostrar cómo el 'shared_ptr' ejecuta lógica personalizada.

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
            cout << "Destructor de Persona ejecutado." << endl;
        }

        void saludar()
        {
            cout << "Hola desde Persona." << endl;
        }
};

// Recurso de C++ con una operación de liberación propia: hay que cerrarlo antes de destruirlo.
class Conexion
{
    string nombre;

    public:
        Conexion( string n ) : nombre( n )
        {
            cout << "Conexión abierta: " << nombre << endl;
        }

        void cerrar()
        {
            cout << "Conexión cerrada: " << nombre << endl;
        }

        ~Conexion()
        {
            cout << "Destructor de Conexion ejecutado." << endl;
        }
};

// Alternativa 1: Custom Deleter mediante una función normal (ideal si la lógica es larga o reutilizable)
void cerrarConexion( Conexion *c )
{
    cout << "Custom deleter (función) ejecutándose." << endl;

    c->cerrar();
    delete c;
}

int main()
{
    {
        // Con new, el eliminador por defecto ya es correcto: no hace falta personalizarlo.
        shared_ptr<Persona> persona = make_shared<Persona>();
        persona->saludar();

        cout << "Número de propietarios: " << persona.use_count() << endl;
    }

    {
        // Alternativa 1: la función cerrarConexion() cierra y después libera la memoria.
        shared_ptr<Conexion> conexion( new Conexion( "Servidor" ), cerrarConexion );

        cout << "Número de propietarios: " << conexion.use_count() << endl;
    }

    {
        // Alternativa 2: la misma lógica en una lambda, útil cuando es corta.
        shared_ptr<Conexion> conexion(
            new Conexion( "Base de datos" ),
            []( Conexion *c )
            {
                cout << "Custom deleter (lambda) ejecutándose." << endl;

                c->cerrar();
                delete c;
            }
        );

        cout << "Número de propietarios: " << conexion.use_count() << endl;

    } // <-- Al salir del bloque, el contador llega a 0 y se invoca el Custom Deleter.

    cout << "Fin del programa." << endl;

    return 0;
}
