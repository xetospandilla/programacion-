/*
-----------------------------------------------------------------------------------------------------------------------------
Smart Pointers (Punteros Inteligentes): shared_ptr y RAII
-----------------------------------------------------------------------------------------------------------------------------
    RAII (Resource Acquisition Is Initialization)
-----------------------------------------------------------------------------------------------------------------------------

        - Traducción: "La adquisición del recurso es la inicialización".
        
        - Definición: Técnica fundamental de C++ moderno según la cual la vida de un recurso queda ligada
        estrictamente al ciclo de vida de un objeto en el stack.
        
        - Funcionamiento: El recurso se adquiere en el constructor al crear el objeto y se libera automáticamente
        en su destructor cuando el objeto sale de su ámbito (scope) y se destruye.
        
        - ¿Qué puede ser un "recurso"?
            · Memoria dinámica (heap).
            
            · Archivos abiertos.
            
            · Conexiones de red.
            
            · Sockets, mutex, texturas gráficas, etc.

-----------------------------------------------------------------------------------------------------------------------------
    std::shared_ptr y Contador de Referencias
-----------------------------------------------------------------------------------------------------------------------------

        - A diferencia de 'unique_ptr' (propiedad exclusiva), 'shared_ptr' permite que múltiples punteros compartan
        la propiedad de un mismo recurso en el heap.

        - Internamente mantiene un contador de referencias ('use_count()'):
            · Cada vez que se copia un 'shared_ptr' (o se pasa por valor a un constructor), el contador sube (+1).
            
            · Cada vez que uno de los propietarios se destruye o se asigna a 'nullptr', el contador baja (-1).
            
            · El recurso (y su destructor) se libera automáticamente ÚNICAMENTE cuando el contador llega a 0 (es decir,
            cuando ya no queda ningún propietario vivo).
        
            - Se crea preferiblemente con 'std::make_shared<Tipo>(args)' por eficiencia (reserva en una sola operación
        el objeto y el bloque de control del contador).

-----------------------------------------------------------------------------------------------------------------------------
    Utilidad práctica
-----------------------------------------------------------------------------------------------------------------------------

        - Resulta ideal cuando varias partes o entidades del programa necesitan compartir un mismo recurso pesado
        (ej: una textura o malla en un videojuego usada por varios enemigos a la vez) y no está claro cuál de ellas
        será la última en dejar de usarlo, garantizando que el recurso siga vivo mientras al menos uno lo necesite.

-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
#include <memory>
using namespace std;

// --------------------------------------------------------------------------------------------------------------------------
//  Clases creadas para el Ejemplo 2
// --------------------------------------------------------------------------------------------------------------------------
class Textura
{
    private:
        string archivo;

    public:
        Textura( string a ) : archivo( a )
        {
            cout << "Cargando textura: " << archivo << endl;
        }

        ~Textura()
        {
            cout << "Destruyendo textura: " << archivo << endl;
        }

        void dibujar()
        {
            cout << "Dibujando con textura: " << archivo << endl;
        }
};

class Enemigo
{
    private:
        shared_ptr<Textura> textura;

    public:
        // Al recibir shared_ptr por valor y guardarlo, incrementa en +1 el contador de propietarios
        Enemigo( shared_ptr<Textura> textura ) : textura( textura ) {}

        void dibujar()
        {
            textura->dibujar();
        }
};
// --------------------------------------------------------------------------------------------------------------------------

int main()
{
    // ----------------------------------------------------------------------------------------------------------------------
    //  Ejemplo 1: Ciclo de vida y use_count()
    // ----------------------------------------------------------------------------------------------------------------------
    shared_ptr<int> n1 = make_shared<int>( 100 ); // Propietarios: 1

    {
        shared_ptr<int> n2 = n1; // Se comparte la propiedad -> Propietarios: 2

        cout << "Valor: " << *n1 << endl;
        cout << "Propietarios: " << n1.use_count() << endl; // Imprime 2

        n2 = nullptr; // Liberamos manualmente la referencia de n2 -> Propietarios: 1

        cout << "Propietarios: " << n1.use_count() << endl; // Imprime 1

    } // <-- Aquí se destruye n2 al salir del bloque (ya estaba en nullptr, así que el contador sigue en 1)

    cout << "------------------- Ejemplo 1 -------------------" << endl;
    cout << "Propietarios después del bloque: " << n1.use_count() << endl; // Imprime 1
    cout << "-------------------------------------------------" << endl;

    // ----------------------------------------------------------------------------------------------------------------------
    //  Ejemplo 2: Recurso compartido entre múltiples objetos (Videojuego)
    // ----------------------------------------------------------------------------------------------------------------------
    shared_ptr<Textura> texturaEnemigo = make_shared<Textura>( "enemigo.png" ); // Propietarios: 1

    {
        Enemigo enemigo1( texturaEnemigo ); // Propietarios: 2
        Enemigo enemigo2( texturaEnemigo ); // Propietarios: 3
        Enemigo enemigo3( texturaEnemigo ); // Propietarios: 4

        cout << "Propietarios de la textura: " << texturaEnemigo.use_count() << endl; // Imprime 4

        enemigo1.dibujar();
        enemigo2.dibujar();
        enemigo3.dibujar();

    } // <-- Aquí salen de ámbito enemigo1, enemigo2 y enemigo3 (se destruyen) -> Propietarios baja a 1

    cout << "------------------- Ejemplo 2 -------------------" << endl;
    cout << "Después de destruir enemigos." << endl;
    cout << "Propietarios de la textura: " << texturaEnemigo.use_count() << endl; // Imprime 1
    cout << "-------------------------------------------------" << endl;

    // Al llegar al final de main(), se destruye 'texturaEnemigo', el contador llega a 0
    // y se ejecuta automáticamente el destructor ~Textura().
    return 0;
}