/*
======================================================================================================================
    Enunciado
======================================================================================================================
Crea una clase abstracta Circuito que tenga:

    1º Un atributo protegido de tipo std::vector<double> llamado resistencias.

        - Un constructor que reciba un std::vector<double> para inicializar el atributo.

        - Un método virtual puro llamado calcularResistencia().

    2º Crea dos clases hijas: CircuitoSerie y CircuitoParalelo.

        - Ambas deben heredar de Circuito y llamar a su constructor mediante la lista de inicialización.

        - Ambas deben sobrescribir (override) el método calcularResistencia() aplicando la fórmula matemática
        correspondiente al vector de resistencias y devolviendo el resultado (double).

    3º En el main():

        - Crea un vector con los valores 10.0, 20.0 y 30.0.

        - Declara un puntero de tipo Circuito* e instáncialo dinámicamente como un CircuitoSerie pasándole el vector.
        Imprime su resistencia equivalente.

        - Reasigna ese mismo puntero para que ahora apunte a un nuevo CircuitoParalelo (recuerda liberar la memoria del anterior primero)
        pasándole el mismo vector. Imprime su resistencia.

        - Libera la memoria final.
======================================================================================================================
*/
#include <iostream>
#include <vector>
using namespace std;
// =============================================================================
//  Clase Circuito
// =============================================================================
class Circuito
{
    protected:
        //  Atributos
        vector <double> resistencias;
    public:
        //  Construcor
        Circuito( vector<double> resitencias )
        {
            this->resistencias = resistencias;
        }
        
        //  Métodos
        virtual double calcularResistencia() = 0;
};
// =============================================================================
//  Clase CircuitoSerie
// =============================================================================
class CircuitoSerie : public Circuito
{
    public:
        //  Constructor Hederado
        CircuitoSerie( vector<double> resistencias ) : Circuito( resistencias ) {}

        //  Métodos
        double calcularResistencia() override 
        {
            double res = 0.0;

            for( double resistencia : this->resistencias )
            {
                res += resistencia;
            }

            return res;
        }
};
// =============================================================================
//  Clase CircuitoParalelo
// =============================================================================
class CircuitoParalelo : Circuito
{
    public:
        //  Constructor Hederado
        CircuitoParalelo( vector<double> resistencias ) : Circuito( resistencias) {}

        //  Métodos
        double calcularResistencia() override
        {
            double res = 0.0;

            for( double resistencia : this->resistencias )
            {
                res += 1.0 / resistencia;
            }

            return 1.0 / res;
        }
};
// =============================================================================
//  main()
// =============================================================================
int main()
{
    //  Hacer un código que solicite las resistencias por pantalla y si están en paralelo o serie, devolviendo los datos por consola.
    return 0;
}
// =============================================================================