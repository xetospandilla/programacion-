/*
-----------------------------------------------------------------------------------------------------------------------------
Smart Pointers (Punteros Inteligentes): Adiós a new y delete
-----------------------------------------------------------------------------------------------------------------------------
    Problemas principales con punteros tradicionales (raw pointers)
-----------------------------------------------------------------------------------------------------------------------------

        - Fuga de memoria (Memory Leak):
            · Reservamos memoria dinámica con 'new', pero olvidamos liberarla con 'delete'. El recurso queda
            ocupando espacio en el heap sin usarse.

        - Doble liberación (Double Free):
            · Llamar dos veces a 'delete' sobre la misma dirección de memoria (muy fácil de cometer por accidente
            en programas grandes de miles de líneas).

            · Asignar el puntero a 'nullptr' tras el primer delete evita algunos fallos, pero no soluciona el
            problema de raíz.

        - Puntero colgante (Dangling Pointer):
            · Un puntero que sigue apuntando a una zona de memoria que ya fue liberada previamente.

        - Pérdida de ownership (Propiedad):
            · En aplicaciones complejas, cuando varios punteros apuntan al mismo recurso, no queda claro quién
            es el dueño responsable de ejecutar el 'delete'.

-----------------------------------------------------------------------------------------------------------------------------
    Smart Pointers (Biblioteca <memory>)
-----------------------------------------------------------------------------------------------------------------------------

        - Son objetos envoltorio (wrappers) que gestionan automáticamente la memoria dinámica en el heap y ejecutan
        'delete' por nosotros en su destructor cuando dejan de existir (anticipo del principio RAII).

        - A diferencia del Garbage Collector de Java (que pasa periódicamente), aquí la liberación es determinista e
        inmediata en cuanto el objeto sale de su ámbito (scope).

    Tipos:

        - Unique pointers (std::unique_ptr):
            · Gestionan un recurso con un ÚNICO propietario exclusivo.

            · La memoria se libera automáticamente en el momento en que el 'unique_ptr' sale de ámbito y se destruye.

            · Se crean preferiblemente con 'std::make_unique<Tipo>(valor)' en lugar de 'new'.

        - Shared pointers (std::shared_ptr):
            · Permiten que varios punteros compartan la propiedad del mismo recurso (llevan un contador de referencias).

            · La memoria se libera automáticamente cuando el último propietario deja de existir (contador llega a 0).

        - Weak pointers (std::weak_ptr):
            · Permiten observar un recurso gestionado por un 'shared_ptr' sin ser propietarios de él (no incrementan
            el contador de referencias).
            
            · Ayudan a evitar referencias circulares (fugas de memoria por ciclos entre shared_ptr).

-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
#include <memory> // Biblioteca obligatoria para usar Smart Pointers
using namespace std;

void crearNumero()
{
    // make_unique<int>(200) reserva el entero en el heap y devuelve un unique_ptr que lo gestiona.
    // 'numero' es un objeto (propietario único), pero se usa sintácticamente igual que un puntero (*numero).
    unique_ptr<int> numero = make_unique<int>(200);

    cout << "Numero: " << *numero << endl;

} // <-- Al llegar aquí, 'numero' sale de ámbito, se llama a su destructor y libera la memoria automáticamente (sin delete).

int main()
{
    crearNumero();

    return 0;
}