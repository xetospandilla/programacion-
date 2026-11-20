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
        
        - Su utilidad real aparece al gestionar recursos externos o de bajo nivel (estilo C) que NO se liberan
        con 'delete', sino que requieren una función de cierre o limpieza específica:
            · Archivos abiertos (FILE* -> requiere llamar a fclose(archivo)).
            
            · Sockets y conexiones de red (requieren cerrar el descriptor/conexión con close()).
            
            · Recursos de librerías externas en C (texturas de SDL/OpenGL, contextos de hardware, etc.).

-----------------------------------------------------------------------------------------------------------------------------
    ¿Cómo se implementa? (Las 2 formas habituales)
-----------------------------------------------------------------------------------------------------------------------------

        - Se pasa como segundo argumento al constructor del 'shared_ptr' (nota: con Custom Deleter se usa el
        constructor directo 'shared_ptr<T>(ptr, deleter)' en lugar de 'make_shared'):

            1. Mediante una expresión Lambda (Recomendada para limpiezas cortas y sencillas):
               shared_ptr<Persona> p( new Persona(), []( Persona *ptr ) { delete ptr; } );

            2. Mediante una Función tradicional (Recomendada cuando la liberación es compleja y lleva varias líneas):
            shared_ptr<Persona> p( new Persona(), eliminarPersonas );

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

/*
// Alternativa 1: Custom Deleter mediante una función normal (ideal si la lógica es larga o reutilizable)
void eliminarPersonas( Persona *p )
{
    cout << "Custom deleter (función) ejecutándose." << endl;

    delete p;
}
*/

int main()
{
    {
        // Alternativa 2: Custom Deleter mediante una expresión Lambda (ideal para limpiezas rápidas)
        shared_ptr<Persona> persona(
            new Persona(),
            []( Persona *p )
            {
                cout << "Custom deleter (lambda) ejecutándose." << endl;

                delete p; // Al ejecutar 'delete p', se dispara el destructor ~Persona()
            }
        );

        persona->saludar();

        cout << "Número de propietarios: " << persona.use_count() << endl;

    } // <-- Al salir del bloque, el contador llega a 0 y se invoca el Custom Deleter antes que ~Persona()

    cout << "Fin del programa." << endl;

    return 0;
}