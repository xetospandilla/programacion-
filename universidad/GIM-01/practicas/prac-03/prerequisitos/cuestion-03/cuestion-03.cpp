#include <iostream>
using namespace std;
int main()
{
    unsigned int n, k = 2;
    bool primo = true; //variable bandera

    cout << "Introduce un numero:" << endl;
    cin >> n;

    do
    {
    if (n % k == 0)
        primo = false;
        k++;
    }
    while (k <= n/2 && primo == true);
    cout << primo << endl;

    return 0;
}

//  n = 15 -> imprime 1 ( es decir, primo == true ).
//  n = 25 -> imprime 0 ( primo == false ).
//  para n = 25 el bucle se ejecuta 4 veces ( con k = 2, 3, 4 y 5; en la cuarta vuelta 25 % 5 == 0 pone primo a false y ya sale ).