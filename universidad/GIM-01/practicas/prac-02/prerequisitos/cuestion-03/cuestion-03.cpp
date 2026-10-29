#include <iostream>
using namespace std;

int main(){

    int a = 20;

    if( a % 2 + 2 == -1){
        cout << "Salmon" << endl;
    } else if( a % 2 + 2 == 2 ){
        cout << "Chuleta ternera" << endl;
    } else if( a % 2 + 2 == 9 ){
        cout << "Chuletón" << endl;
    } else if( a % 2 + 2 == 12 ){
        cout << "Piña" << endl;
    } else if( a % 2 + 2 != -1 || a % 2 + 2 != 2 || a % 2 + 2 != 9 || a % 2 + 2 != 12 ){
        cout << "Adios" << endl;
    }

    //La salida es "Chulera ternera"

    return 0;
}