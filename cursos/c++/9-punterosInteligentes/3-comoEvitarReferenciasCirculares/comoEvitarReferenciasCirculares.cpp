/*
-----------------------------------------------------------------------------------------------------------------------------
Smart Pointers (Punteros Inteligentes): Cómo evitar referencias circulares (weak_ptr)
-----------------------------------------------------------------------------------------------------------------------------
    El problema de las referencias circulares
-----------------------------------------------------------------------------------------------------------------------------

        - Ocurre cuando dos objetos en el heap se apuntan mutuamente mediante 'shared_ptr' (A tiene un shared_ptr a B,
        y B tiene un shared_ptr a A).
        
        - Al crearse ambos en el main ('objetoA' y 'objetoB') y enlazarse entre sí, el contador de propietarios
        ('use_count()') de ambos sube a 2.
        
        - Al terminar el main, se destruyen 'objetoB' y 'objetoA' del stack, bajando los contadores de 2 a 1.
        
        - Como ambos objetos en el heap siguen teniendo 1 propietario (se mantienen vivos el uno al otro), sus
        contadores NUNCA llegan a 0, sus destructores jamás se ejecutan y se produce una fuga de memoria (memory leak).

-----------------------------------------------------------------------------------------------------------------------------
    La solución: std::weak_ptr (Puntero débil / observador)
-----------------------------------------------------------------------------------------------------------------------------

        - Definición: Es un puntero inteligente que observa y apunta a un recurso gestionado por un 'shared_ptr',
        pero SIN adquirir su propiedad (no incrementa el contador 'use_count()').
        
        - Cómo rompe el ciclo: Al sustituir uno de los 'shared_ptr' de la relación por un 'weak_ptr' (ej: 'weak_ptr<ClaseB> b;'
        en ClaseA), el contador de ClaseB se queda en 1 (solo 'objetoB').
        
        - Cadena de destrucción limpia al salir de ámbito:
            1. Se destruye 'objetoB' -> el contador de ClaseB baja a 0 -> se destruye ClaseB.
            
            2. Al destruirse ClaseB, se destruye su atributo interno 'shared_ptr<ClaseA> a'.
            
            3. Al destruirse ese atributo y 'objetoA', el contador de ClaseA baja a 0 -> se destruye ClaseA.

-----------------------------------------------------------------------------------------------------------------------------
    Otros casos de uso reales de weak_ptr
-----------------------------------------------------------------------------------------------------------------------------

        - Sistemas de caché: Por ejemplo, en un videojuego donde una caché recuerda si una textura sigue cargada en
        memoria observándola con 'weak_ptr', pero sin impedir que se libere automáticamente cuando los enemigos
        ('shared_ptr') dejan de usarla.
        
        - Relaciones padre-hijo en árboles o estructuras de datos donde el padre es dueño del hijo ('shared_ptr'),
        pero el hijo solo necesita observar al padre ('weak_ptr').

-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
#include <memory>
using namespace std;

class ClaseB; // Declaración adelantada (forward declaration) para que ClaseA reconozca el tipo ClaseB

class ClaseA
{
    public:
        weak_ptr<ClaseB> b; // Puntero observador: NO suma propietarios a ClaseB (rompe la referencia circular)

        ClaseA()
        {
            cout << "ClaseA creó un objeto." << endl;
        }

        ~ClaseA()
        {
            cout << "ClaseA destruyó un objeto." << endl;
        }
};

class ClaseB
{
    public:
        shared_ptr<ClaseA> a; // Puntero propietario: SÍ suma +1 al contador de propietarios de ClaseA

        ClaseB()
        {
            cout << "ClaseB creó un objeto." << endl;
        }

        ~ClaseB()
        {
            cout << "ClaseB destruyó un objeto." << endl;
        }
};

int main()
{
    shared_ptr<ClaseA> objetoA = make_shared<ClaseA>(); // Propietarios de ClaseA: 1
    shared_ptr<ClaseB> objetoB = make_shared<ClaseB>(); // Propietarios de ClaseB: 1

    objetoA->b = objetoB;
    // Al ser 'b' un weak_ptr, ClaseB sigue teniendo 1 solo propietario (objetoB).
    // Si 'b' fuera shared_ptr, ClaseB pasaría a tener 2 propietarios.

    objetoB->a = objetoA;
    // Al ser 'a' un shared_ptr, ClaseA pasa a tener 2 propietarios (objetoA y objetoB->a).
    // Si ambos fueran shared_ptr, al salir de main() ambos quedarían en 1 y ninguno se destruiría.

    cout << "Propietarios (objetoA): " << objetoA.use_count() << endl; // Imprime 2
    cout << "Propietarios (objetoB): " << objetoB.use_count() << endl; // Imprime 1

    // Al cerrar main():
    // 1. Se destruye objetoB -> ClaseB llega a 0 propietarios -> se ejecuta ~ClaseB() (y destruye su atributo 'a').
    // 2. Se destruye objetoA -> ClaseA llega a 0 propietarios -> se ejecuta ~ClaseA().
    return 0;
}