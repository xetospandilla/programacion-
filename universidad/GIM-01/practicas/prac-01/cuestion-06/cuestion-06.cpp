#include <iostream>
using namespace std;

int main(){

    // expresión:
    
        //( l == int(true) ) && ( 1 > 5 / 2 ) || (l < 7 % 3 );

    /*
    1. La primera subexpresión ( l == int(true) ) se evaluará como verdadera 
    estrictamente cuando el valor de l sea 1, ya que int(true) equivale al entero 1.

    2. La segunda subexpresión ( 1 > 5 / 2 ) siempre será falsa. Al tratarse 
    de una división entre números enteros (5 / 2), C++ realiza una división 
    entera cuyo resultado es 2 (y no 2.5). Como 1 nunca es mayor que 2, 
    esta comparación es siempre falsa.

    3. Al combinarse con un operador AND (&&) en el primer bloque:
    ( l == int(true) ) && ( 1 > 5 / 2 )
    Todo el bloque da siempre 'false', ya que uno de sus términos es falso.

    4. Por otro lado, la última condición ( l < 7 % 3 ) utiliza el operador 
    de módulo (%), que calcula el resto de la división. El resto de dividir 
    7 entre 3 es 1, por lo que la condición se reduce a evaluar si l < 1.

    En conclusión: como el primer bloque completo devuelve 'false' y está unido 
    por un operador OR (||), el resultado de toda la expresión depende exclusivamente 
    de la segunda parte. Por lo tanto, toda la condición se evaluará como verdadera 
    únicamente para aquellos valores de l que sean menores que 1.
    */

    return 0;

}