#include <iostream>
using namespace std;

int main()
{
    unsigned int num;

    do
    {
        cout << "Introduzca un número entero positivo: " << endl;
        cin >> num;

        if( num % 2 != 0 )
        {
            cout << "El número " << num << " no es divisible entre dos." << endl;
        }
        else
        {
            cout << "El número " << num << " es divisible entre dos." << endl;
        }
    } 
    while ( num != 0 );
    
    return 0;
}