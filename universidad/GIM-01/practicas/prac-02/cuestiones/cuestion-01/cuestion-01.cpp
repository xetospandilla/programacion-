#include <iostream>
#include <cmath>
using namespace std;

int main()
{

    float a;
    float b;
    float c;
    float x1; 
    x1 = 0;
    float x2;
    x2 = 0;
    float disc;

    cout << "Este programa resuelve una ecuacion de segundo grado de la forma: " << endl;
    cout << "a x^2 + b x + c = 0" << endl;

    cout << "Inroduce los tres coeficientes en orden (a, b, c)" << endl;
    cin >> a;
    cin >> b;
    cin >> c;

    disc = b * b - 4 * a * c;

    // Comprobamos si disc < 0 antes de llamar a sqrt() para evitar indeterminaciones(Nan).
    if( disc < 0 )
    {
        cout << "Error en los valores de los coeficientes, la ecuación no tiene solución." << endl;
    }
    else
    {
        //  Calculo correcto:
        x1 = (-b + sqrt( disc )) / ( 2 * a );

        //  Se cambia el '+' por el '-' en la segunda raíz para obtener la otra solución.
        x2 = (-b - sqrt( disc )) / ( 2 * a );

        cout << "Las raices son: " << endl;
        cout << x1 << " y " << x2 << endl;
    }

}