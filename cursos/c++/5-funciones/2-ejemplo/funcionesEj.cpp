/*
-------------------------------------------------------------------------------------------------------------------------
Escribe un programa en C++ que tenga una función llamada mediaTres() que reciba tres números reales y devuelva su media.
Desde el main(), pide los tres números al usuario, llama a la función y muestra el resultado con dos decimales.
-------------------------------------------------------------------------------------------------------------------------
*/
#include <iostream>
#include <iomanip>
using namespace std;

double mediaTres(double a, double b, double c){
    return (a + b + c) / 3;
}

int main(){
    double a, b, c;

    cout << "Introduzca tres números reales: " << endl;
    cin >> a >> b >> c;

    double media = mediaTres(a, b, c);

    cout << "------------------------------------------" << endl;
    cout << "Los valores escogidos son: " << a << ", " << b << ", " << c << endl;
    cout << "La media de esos tres valores: " << fixed << setprecision(2) << media << endl;
    cout << "------------------------------------------" << endl;

    return 0;
}
