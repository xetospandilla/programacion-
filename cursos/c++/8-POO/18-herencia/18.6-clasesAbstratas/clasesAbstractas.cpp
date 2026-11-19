/*
-----------------------------------------------------------------------------------------------------------------------------
Clases abstractas y métodos virtuales
-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
#include <string>
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