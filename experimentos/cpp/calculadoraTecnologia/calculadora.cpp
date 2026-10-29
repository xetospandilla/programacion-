/*
    ===================================================================================================================================================
    Desarrolla una herramienta interactiva de consola 
    mediante Programación Orientada a Objetos para resolver cálculos de tecnología de computadores.
    El programa debe cumplir los siguientes requisitos:

    🕹️ Menú Interactivo:
        Un bucle principal que permita al usuario elegir entre: "1. Resistencias", "2. Transistores" o "3. Salir".

    🧮 Módulo de Resistencias:
        Utilizando las clases CircuitoSerie y CircuitoParalelo, debe pedir valores por pantalla hasta que el usuario introduzca un 0 y devolver la resistencia equivalente.

    ⚡ Módulo de Transistores: 
        Una clase Transistor que almacene internamente las variables típicas del circuito (vcc, vbb, rb, rc, ib, ic, vce, beta).
        Debe contar con métodos que, al pedirle evaluar una malla concreta, detecten qué variable es la incógnita (indicada por el usuario con un -1)
        y la calculen despejando la fórmula correspondiente.
    ===================================================================================================================================================
*/
#include <iostream>
using namespace std;
// ===========================================================================
//  Clase Transistor
// ===========================================================================
class Transistor
{
    protected:
        //  Atributos
        double vcc, vbb, rb, rc, ib, ic, vce;
        int beta;

    public:
        //  Constructor
        Transistor()
        {
            this->vcc = 0.0;
            this->vbb = 0.0;
            this->rb = 0.0;
            this->rc = 0.0;
            this->ib = 0.0;
            this->ic = 0.0;
            this->vce = 0.0;
        }

        //  Métodos
        void resolverMallaEntrada()
        {
            if( this->vbb == -1 )
            {
                this->vbb = this->ib * this->rb + 0.7;
                cout << "Vbb calculado: " << this->vbb << "\n";
            }

            else if( this->ib == -1 )
            {
                this->ib = ( this->vbb - 0.7 ) / this->rb;
                cout << "Ib calculada: " << this->ib << "\n";
            }

            else 
            {
                this->rb = ( this->vbb - 0.7 ) / this->ib;
                cout << "Rb calculada: " << this->rb << "\n";
            }
        }

        void resolverMallaSalida()
        {
            if( this->vcc == -1 )
            {
                this->vcc = this->ic * this->rc + this->vce;
                cout << "Vcc calculado: " << this->vcc << "\n";
            }

            else if( this->ic == -1 )
            {
                this->ic = ( this->vcc - this->vce ) / this->rc;
                cout << "Ic calculada: " << this->ic << "\n";
            }

            else if( this->rc == -1 )
            {
                this->rc = ( this->vcc - this->vce ) / this->ic;
                cout << "Rc calculada: " << this->rc << "\n";
            }

            else
            {
                this->vce = this->vcc - this->ic * this->rc;
                cout << "Vce calculada: " << this->vce << "\n";
            }
        }

        void resolverGanancia()
        {
            if( this->ic == -1)
            {
                this->ic = this->beta * this->ib;
                cout << "Ic calculada: " << this->ic << "\n";
            }

            else if( this->ib == -1 )
            {
                this->ib = this->ic / this->beta;
                cout << "Ib calculada: " << this->ib << "\n";
            }

            else
            {
                this->beta = this->ic / this->ib;
            }
        }

        void pedirDatos()
        {
            
        }
};
// ===========================================================================