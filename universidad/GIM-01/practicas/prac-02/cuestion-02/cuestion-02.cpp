#include <iostream>
using namespace std;

int main(){

    int n = 11;

    if( n % 2 != 0 ){
        cout << "+"; 
    } else {
        if( n % 2 == 3 ){
            cout << "**";
        }
    }

    return 0;
}

// para 6 no devuelve nada
// para 9 devuelve +
// para 11 devuelve +