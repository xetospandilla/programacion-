#include <iostream>
using namespace std;

void sumarDiez( int *ptr ) {

    *ptr += 10;

}

int main() {

    int num = 5;

    sumarDiez( &num ); // Pasamos la dirección de memoría para que pueda modificar la variable.

    cout << num << endl;

}