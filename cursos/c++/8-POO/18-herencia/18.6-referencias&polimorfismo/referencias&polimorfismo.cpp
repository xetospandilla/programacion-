/*
-----------------------------------------------------------------------------------------------------------------------------
Referencias y polimorfismo
-----------------------------------------------------------------------------------------------------------------------------
    El principio "Es un" ("Is-a")
-----------------------------------------------------------------------------------------------------------------------------

        - Sirve para comprobar si una jerarquía de herencia está bien diseñada antes de escribir código.
        - Ejemplo: "¿Un Perro es un Animal?" -> SÍ (Perro hereda de Animal).
                    "¿Un Animal es un Perro?" -> NO (puede ser gato, mono, etc., por lo que Animal NO hereda de Perro).
        - Gracias a esta relación podemos asignar un objeto derivado a una referencia o puntero de la clase base
        (Animal& a = miPerro;), pero nunca al revés.

-----------------------------------------------------------------------------------------------------------------------------
    Polimorfismo en C++ vs. Otros lenguajes (Java / C#)
-----------------------------------------------------------------------------------------------------------------------------

        - En lenguajes como Java o C#, los objetos funcionan por referencia y el polimorfismo está activado por defecto.

        - En C++, el polimorfismo NO es el comportamiento por defecto: el lenguaje trabaja por valor (copias) para
        priorizar el control y el rendimiento a bajo nivel.

        - Si asignamos por valor (Animal a = miPerro;), se produce Object Slicing: se recorta la parte específica de
        Perro, nos quedamos solo con una copia de Animal y al llamar a a.hacerSonido() se ejecuta el método del padre.

-----------------------------------------------------------------------------------------------------------------------------
    ¿Cómo activar el polimorfismo en C++? (Base Class References)
-----------------------------------------------------------------------------------------------------------------------------

        - Para que el polimorfismo funcione en tiempo de ejecución se necesitan DOS requisitos obligatorios:
            1. Declarar el método como 'virtual' en la clase padre (virtual void hacerSonido()).

            2. Manipular el objeto derivado a través de una REFERENCIA (Animal& a = miPerro;) o un PUNTERO (Animal* a)
            de la clase base.

-----------------------------------------------------------------------------------------------------------------------------
    Ventajas y desventajas de este diseño en C++
-----------------------------------------------------------------------------------------------------------------------------

        - Ventaja (Rendimiento - "No pagas por lo que no usas"): En C++ tú decides cuándo usar el polimorfismo.
        Si no usas referencias/punteros, la llamada se resuelve en tiempo de compilación y evitas la indirección
        de la vtable. Eso sí: una clase con métodos virtuales ya tiene vtable y vptr aunque se use por valor.
        Por eso C++ es habitual en videojuegos, motores gráficos y sistemas embebidos.

        - Desventaja: Al dar tanta libertad al programador, es más fácil cometer errores lógicos (como olvidar el '&'
        y provocar object slicing sin darse cuenta).

-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
using namespace std;

class Animal
{
    public:
        virtual void hacerSonido()
        {
            cout << "Estoy emitiendo un sonido." << endl;
        }
};

class Perro : public Animal
{
    public:
        void hacerSonido() override
        {
            cout << "Estoy ladrando." << endl;
        }
};

int main()
{
    Perro miPerro;

    // Sin '&' (Animal a = miPerro;) -> Se produce Object Slicing: imprime "Estoy emitiendo un sonido."
    // Con '&' (Animal& a = miPerro;) -> Funciona el polimorfismo: imprime "Estoy ladrando."
    Animal& a = miPerro;

    a.hacerSonido();

    return 0;
}