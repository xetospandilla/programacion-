/*
-------------------------------------------------------------------------------------------------------
Juego de azar
-------------------------------------------------------------------------------------------------------
*/
#include <iostream>
#include <random> //Para random_device, mt19937 y uniform_int_distribution
using namespace std;

int main(){

    random_device rd;
    mt19937 generador( rd() );
    uniform_int_distribution<int> distribucion( 1, 100 );

    char continuar;

    do{
        int numeroSecreto = distribucion( generador ); // número entre 1 y 100

        int intentos = 0;

        bool adivinado = false;

        while(intentos < 5 && !adivinado){
            int miNum;
            cout << "Introduce un número del uno al 100: " << endl;
            cin >> miNum;

            if(miNum == numeroSecreto){
                cout << "!!Adivinado!!";
                adivinado = true;
            } else if (miNum < numeroSecreto){ cout << "El número es mayor " << endl;}
            else {cout << "El número es menor" << endl;}

            intentos++;
        }

        if(!adivinado){
            cout << "Lo siento, no lo has adivinado. El número era: " << numeroSecreto << endl;
        }
        cout << "Quieres jugar de nuevo? (s/n)" << endl;
        cin >> continuar;
    }while(continuar == 's'|| continuar == 'S' );

    return 0;
}
//-----------------------------------------------------------------------------------------------------