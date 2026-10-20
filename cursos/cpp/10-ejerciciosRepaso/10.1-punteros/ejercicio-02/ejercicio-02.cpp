#include <iostream>
using namespace std;

int main() {

    int numero = 10;

    int *num_ptr = &numero;

    *num_ptr = 50;

    cout << numero << endl;

    // Ahora imprime 50 ya que hemos cambiado el valor mediante el puntero.<

}