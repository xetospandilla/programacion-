#include <iostream>
using namespace std;

int main(){

    int humedad = 80;
    int temperatura = 21;

    if ( humedad > 85 )
    {
        if ( temperatura < 15 )
        {
            cout << " Gota Fria " << endl;
        }
        else
        {
            cout << " Poniente " << endl;
        }
    } 
    else 
    {
        cout << " Despejado "<< endl;
    }

    return 0;
}

// Para ( 90, 14 ) imprime "Gota Fría".
// Para ( 91, 32 ) imprime "Poniente".
// Para ( 80, 21 ) imprime "Despejado".