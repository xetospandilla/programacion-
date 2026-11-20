/*
-----------------------------------------------------------------------------------------------------------------------------
Clases abstractas y métodos virtuales puros
-----------------------------------------------------------------------------------------------------------------------------
    ¿Qué es una clase abstracta y qué hace?
-----------------------------------------------------------------------------------------------------------------------------

        - A medida que subimos en una jerarquía de herencia hacia la cúspide, las clases son cada vez más genéricas
        y tienen menos comportamientos concretos (aumenta la abstracción), hasta llegar a clases cuya única función
        es definir reglas para sus descendientes.
        
        - En C++, una clase se convierte en abstracta cuando tiene al menos un método virtual puro (un método virtual
        declarado sin implementación e igualado a 0 -> ej: virtual void hacerSonido() = 0;), aunque tenga otros
        métodos o atributos normales.
        
        - No se pueden instanciar objetos directos de una clase abstracta (ej: Animal a; da error de compilación),
        aunque sí se pueden crear punteros o referencias de su tipo para aplicar polimorfismo.
        
        - Las clases hijas que hereden de una clase abstracta están obligadas a implementar (sobrescribir) todos sus
        métodos virtuales puros. Si no lo hacen, la clase hija también se convierte automáticamente en abstracta y
        tampoco podrá instanciarse.
        
        - En definitiva, una clase abstracta actúa como un contrato, guía o conjunto de normas que define qué deben
        hacer las clases derivadas, sin especificar cómo lo hace cada una.

-----------------------------------------------------------------------------------------------------------------------------
    Utilidades
-----------------------------------------------------------------------------------------------------------------------------

        - Definir cómo será el diseño de la herencia (contratos): Obliga a todas las subclases a implementar ciertos
        comportamientos esenciales (ej: en un videojuego, una clase abstracta 'Personaje' con 'moverse() = 0'
        garantiza que tanto 'Persona' como 'Dragon' tengan que definir su propia forma de moverse).

        - Garantizar coherencia en un equipo de trabajo: En proyectos grandes donde distintos programadores o equipos
        desarrollan diferentes subclases, el contrato asegura que todos respeten las reglas base establecidas.

        - Permitir extensibilidad futura: Si en el futuro se añaden nuevas clases derivadas (ej: 'Elfo' o 'Hobbit' en
        una actualización), seguirán automáticamente las mismas normas del sistema sin quedar desconectadas.

        - Reducir acoplamiento: Disminuye la dependencia directa entre partes del código. Las subclases o el código
        cliente solo necesitan conocer el contrato de la clase abstracta, sin depender de los detalles internos.

        - Facilitar pruebas (Mocks / Tests unitarios): Al depender de una abstracción en lugar de una implementación
        concreta, es muy sencillo crear subclases simuladas (mocks) que imiten recursos externos como bases de datos
        o redes para probar la lógica de forma aislada.

        - Forzar la consistencia semántica: Asegura que todas las clases derivadas implementen el método respetando el
        mismo significado conceptual definido en la clase padre.

-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
#include <string>
using namespace std;

// Clase abstracta (actúa como contrato)
class Animal
{
    public:
        // Método virtual puro: sin implementación e igualado a 0
        virtual void hacerSonido() = 0;

        // Buena práctica: si vas a destruir objetos derivados mediante un puntero Animal*,
        // recuerda incluir siempre un destructor virtual:
        virtual ~Animal() = default;
};

// Clase concreta: implementa el método virtual puro, por lo que SÍ se puede instanciar
class Perro : public Animal
{
    public:
        void hacerSonido() override
        {
            cout << "Estoy ladrando." << endl;
        }
};

// Clase concreta: implementa el método virtual puro, por lo que SÍ se puede instanciar
class Gato : public Animal
{
    public:
        void hacerSonido() override
        {
            cout << "Estoy maullando." << endl;
        }
};

int main()
{
    // Animal miAnimal;  // ERROR: No se puede instanciar una clase abstracta

    Perro miPerro;
    Gato miGato;

    // Aunque Animal no se puede instanciar, sí podemos usar referencias o punteros
    // de tipo Animal para aplicar polimorfismo:
    Animal& a1 = miPerro;
    Animal& a2 = miGato;

    a1.hacerSonido();
    a2.hacerSonido();

    return 0;
}