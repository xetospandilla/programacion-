#include <iostream>
using namespace std;

int main()
{
    unsigned int g; // variable que almacenará el importe
    unsigned int des; // variable que almacenará el descuento

    //  Solicitamos el descuento por consola y lo almacenamos
    cout << "Introduzca el importe: " << endl;
    cin >> g;

    //  Comprobamos el importe para calcular el descuento
    if( g < 1000 )
    {
        des = g * 0.10;
    }
    else if( 1000 <= g < 2000 )
    {
        des = g * 0.15;
    }
    else if( 2000 <= g < 4000 )
    {
        des = g * 0.20;
    }
    else if( g >= 4000 )
    {
        des = g * 0.25;
    }

    //  Imprimimos los datos por consola
    cout << "Gasto: " << g << " euros." << endl;
    cout << "Destuento: " << des << " euros." << endl;
    cout << "---------------------------------" << endl;
    cout << "Importe a pagar: " << g - des << " euros." << endl;

    return 0;
}