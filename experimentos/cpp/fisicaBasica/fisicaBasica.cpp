#include <iostream>
#include <windows.h>

using namespace std;

int main()
{
    unsigned int x = 10;
    unsigned int y = 10;

    int direccionX = 1; //  1 = avanza a la derecha, -1 = izquierda
    int direccionY = 1; //  1 = avanza abajo, -1 = arriba
    
    do
    {
        system( "cls" );

        //  Dibujar la pelota en (x, y)
        for( int i = 0; i < y; i++ ) cout << endl;
        for( int j = 0; j < x; j++ ) cout << " ";
        cout << "O" << endl;

        //  Mover la pelota
        x += direccionX;
        y += direccionY;

        //  Controlar la velocidad
        Sleep( 50 );

        //  Lógica de colisiones
            //  Eje x
        if( x == 80 || x == 0 )
        {
            direccionX *= -1;
        }
            //  Eje y
        if( y == 20 || y == 0 )
        {
            direccionY *= -1;
        }

    } 
    while( true );

    return 0;
}