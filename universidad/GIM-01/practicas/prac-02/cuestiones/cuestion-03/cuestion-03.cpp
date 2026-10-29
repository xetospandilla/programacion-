#include <iostream>
using namespace std;

int main()
{
    //  Generamos la variable que almacenará el DNI
    unsigned int dni;

    //  Solicitamos por consola el DNI y lo almacenamos
    cout << "Introduzca su DNI( sin letra ): " << endl;
    cin >> dni;

    //  Calculamos la letra con el DNI
    int res;
    res = dni % 23;

    //  Buscamos cuál será la letra del DNI
    switch( res )
    {
        case 0:
            cout << "La letra del DNI es T." << endl;
            break;
        case 1:
            cout << "La letra del DNI es R." << endl;
            break;
        case 2:
            cout << "La letra del DNI es W." << endl;
            break;
        case 3:
            cout << "La letra del DNI es A." << endl;
            break;
        case 4:
            cout << "La letra del DNI es G." << endl;
            break;
        case 5:
            cout << "La letra del DNI es M." << endl;
            break;
        case 6:
            cout << "La letra del DNI es Y." << endl;
            break;
        case 7:
            cout << "La letra del DNI es F." << endl;
            break;
        case 8:
            cout << "La letra del DNI es P." << endl;
            break;
        case 9:
            cout << "La letra del DNI es D." << endl;
            break;
        case 10:
            cout << "La letra del DNI es X." << endl;
            break;
        case 11:
            cout << "La letra del DNI es B." << endl;
            break;
        case 12:
            cout << "La letra del DNI es N." << endl;
            break;
        case 13:
            cout << "La letra del DNI es J." << endl;
            break;
        case 14:
            cout << "La letra del DNI es Z." << endl;
            break;
        case 15:
            cout << "La letra del DNI es S." << endl;
            break;
        case 16:
            cout << "La letra del DNI es Q." << endl;
            break;
        case 17:
            cout << "La letra del DNI es V." << endl;
            break;
        case 18:
            cout << "La letra del DNI es H." << endl;
            break;
        case 19:
            cout << "La letra del DNI es L." << endl;
            break;
        case 20:
            cout << "La letra del DNI es C." << endl;
            break;
        case 21:
            cout << "La letra del DNI es K." << endl;
            break;
        case 22:
            cout << "La letra del DNI es E." << endl;
            break;
        
        default:
            cout << "Valor del DNI introducido incorrecto." << endl;
            break;
    }

    return 0;
}