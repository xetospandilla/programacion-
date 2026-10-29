#include <iostream>

using namespace std;

/*
    EXPLICACIÓN DEL ERROR Y EL FENÓMENO (OVERFLOW):

    Se produce un desbordamiento de enteros (entero desbordado). Dado que las variables se han declarado como tipo «short» (16 bits con signo), el rango máximo que ocupan en la memoria es de
    -32768 a 32767.

    - En el caso de x = 2: 2^3 = 8 (Correcto; se encuentra en el rango).
    - En el caso de x = 45: 45^3 = 91125 (más grande que 32767), la memoria se desborda y devuelve 25589.
    - Para x = -33: (-33)^3 = -35937 (menor que -32768), desborda hacia abajo y devuelve 29599.

    Solución: Sin cambiar el tipo «short», el rango válido de valores de x para que no se sobrepase la memoria
    es [-32, 31] (ya que 31^3 = 29791 y (-32)³ = -32768). Se incorpora una instrucción de control condicional «if» para comprobar si x se encuentra fuera de ese rango antes de llevar a cabo la operación,
    imprimiendo el mensaje de error correspondiente en su caso.
 */

int main() 
{
	short x, res;

	cout << "Este programa calcula el valor de x^3 en el dominio de los enteros." << endl;
	cout << "Introduce el valor de x:" << endl;
	cin >> x;

	if (x < -32 || x > 31) {
		cout << "Error en el valor de x. El programa no está diseñado para procesar x^3." << endl;
	} else {
		res = x * x * x;
		cout << "El resultado de " << x << "^3 es: " << res << endl;
	}

	return 0;
}