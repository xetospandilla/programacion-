#include <iostream>
using namespace std;

int main()
{
    unsigned short x, y, acc;

    cout << "Introduzca el primer número entero." << endl;
    cin >> x;
    cout << "Introduzca el segundo número entero." << endl;
    cin >> y;

    while( x != 0 )
    {
        x /= 2;
        y *= 2;

        acc += y;

    }

    cout << "Valores finales: " << endl;
    cout << "-----------------" << endl;
    cout << "x: " << x << endl;
    cout << "y: " << y << endl;
    cout << "acc: " << acc << endl;
    cout << "-----------------" << endl;

    return 0;
}