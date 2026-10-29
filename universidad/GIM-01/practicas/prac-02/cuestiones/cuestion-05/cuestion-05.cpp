#include <iostream>
using namespace std;

int main()
{
    unsigned int l; // variable que almacenará la cantidad de litros
    char opcion; // variable auxiliar para el menu, almacenará la opción seleccionada

    //  Solicitamos una cantidad de litros por consola y la almacenamos en l
    cout << "Introduzca la cantida de litros deseada: " << endl;
    cin >> l;

    //  Solicitamos una opcion de combustible por consola y la almacenamos en opcion
    cout << "=================================" << endl;
    cout << "Tipo de combustible: " << endl;
    cout << "a) - Gasolina 95 a 1,88 euros/l" << endl;
    cout << "b) - Gasolina 98 a 1,94 euros/l" << endl;
    cout << "c) - Gasoleo A a 1,85 euros/l" << endl;
    cout << "=================================" << endl;

    cout << "Seleccione una opción: " << endl;
    cin >> opcion;
    cout << "=================================" << endl;

    // Imprimimos un mensaje dependiendo del tipo de combustible seleccionado. También calculamos el precio a pagar según al cantidad y el tipo de combustible. 
    switch ( opcion )
    {
        case 'a':
            cout << "Ha puesto " << l << " litros de Gasolina 95. Pase por caja y pague " << l * 1.88 << " euros." << endl;
            break;
        case 'b':
            cout << "Ha puesto " << l << " litros de Gasolina 98. Pase por caja y pague " << l * 1.94 << " euros." << endl;
            break;
        case 'c':
            cout << "Ha puesto " << l << " litros de Gaseleo A. Pase por caja y pague " << l * 1.85 << " euros." << endl;
            break;
    }

    return 0;
}