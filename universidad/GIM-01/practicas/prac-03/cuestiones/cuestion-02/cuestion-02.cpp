#include <iostream>
using namespace std;

int main()
{
    unsigned short num;
    char carta;
    char seguir;

    cout << "Dame un valor: " << endl;
    cin >> num;
    cout << "Dame el palo ( 'o', 'c', 'e', 'b'): " << endl;
    cin >> carta;
    
    do
    {
        switch( carta )
        {
            case 'o':
                cout << "Las cartas por debajo del  " << num << " de oros son: " << endl;
                for( unsigned int i = 1; 0 < num; i++ )
                {
                    if( num != 8 || num != 9 )
                    {
                        cout << i << " de oros" << endl;
                    }
                    cout << "";
                    break;
                }
            case 'c':
                cout << "Las cartas por debajo del  " << num << " de copas son: " << endl;
                for( unsigned int i = 1; 0 < num; i++ )
                {
                    if( num != 8 || num != 9 )
                    {
                        cout << i << " de copas" << endl;
                    }
                    cout << "";
                    break;
                }
            case 'e':
                cout << "Las cartas por debajo del  " << num << " de espadas son: " << endl;
                for( unsigned int i = 1; 0 < num; i++ )
                {
                    if( num != 8 || num != 9 )
                    {
                        cout << i << " de espadas" << endl;
                    }
                    cout << "";
                    break;
                }
            case 'b':
                cout << "Las cartas por debajo del  " << num << " de bastos son: " << endl;
                for( unsigned int i = 1; 0 < num; i++ )
                {
                    if( num != 8 || num != 9 )
                    {
                        cout << i << " de bastos" << endl;
                    }
                    cout << "";
                    break;
                }
            default:
                cout << "Numero o palo no encontrado en la baraja española." << endl;
                cout << "--------------------------------------------------" << endl;
                cout << "Dame un valor: " << endl;
                cin >> num;
                cout << "Dame el palo ( 'o', 'c', 'e', 'b'): " << endl;
                cin >> carta;
                break;
        }

        cout << "Quieres continuar (s/n)?" << endl;
        cin >> seguir;
    }
    while( seguir == 's' );
    cout << "Bye-bye!" << endl;

    return 0;
}