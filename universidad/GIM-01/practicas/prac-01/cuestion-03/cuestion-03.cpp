#include <iostream>
using namespace std;

int main(){

    float a = 7.0;
    float b = 9.0;
    float c = 4.0;
    float d = c / 2.0;
    float e;
    e = a / (b - a - d);
    cout << " El valor de e es: " << e << endl;
    return 0;

}

// podemos comprobar que devuelve inf, ya que 4 / 0 = infinito


