/*
-----------------------------------------------------------------------------------------------------------------------------
Uso del const
------------------------------------------------------------------------------------------------------------------------------
Importancia de 'const' en C++:

    - Seguridad y robustez en el código:

        - Evita modificaciones accidentales en objetos que no deberían cambiar.

        - Reduce errores difíciles de depurar al mantener la inmutabilidad de ciertos objetos.

    - Optimización:

        - Permite al compilador hace optimizaciones cuando sabe que un método no cambiará el estado del objeto.

    - Buenas prácticas de programación:

        - Código más legible y fácil de entender.

        - Señala de forma clara qué métodos pueden o no modificar un objeto.
-----------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
using namespace std;

class Empleado
{
    private:
        const string nombre;
        const string apellido;
        double salario;

    public:
        Empleado( string n, string a, double s): nombre( n ), apellido( a ), salario( s ) {}

        string getNombre() const 
        {
            return nombre;
        }

        string getApellido() const
        {
            return apellido;
        }

        double getSalario() const
        {
            return salario;
        }

        void setSalario( double nuevoSalario )
        {
            if( nuevoSalario >= 0 )
            {
                salario = nuevoSalario;
            }
            else
            {
                cout << "ERROR: El salario no puede ser negativo." << endl;
            }
        }

        void mostrarInfo() const 
        {
            cout << "Empleado: " << nombre << " " << apellido << endl;
            cout << "Salario: " << salario << endl;
        }
};

int main()
{
    Empleado emp( "Juan", "Perez", 3000 );
    emp.mostrarInfo();


    const Empleado emp2( "Ana", "Gómez", 4500 ); 
    //  Al ser const, no se puede modificar. Su contenido siempre será el mismo y no podrá ser modificado ni si quiera con métodos.
    //  Solo podrá llamar métodos const.

    cout << "Modificando el salario..." << endl;
    emp.setSalario( 3500 );
    emp.mostrarInfo();

    return 0;
}