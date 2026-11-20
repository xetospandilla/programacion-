/*
-------------------------------------------------------------------------------------------------------
Instrucciones Break
-------------------------------------------------------------------------------------------------------
- Break se utiliza para terminar el bucle inmediatamente, sin importar la condición de bucle.

- Una vez que se ejecuta la instrucción break, el flujo de ejecución del programa se traslada
a la siguiente declaración después del bucle.

- Es particularmente útil cuando se desea salir de un bucle debido a una condición específica
distinta de la condición de bucle.
-------------------------------------------------------------------------------------------------------
Instrucción Continue
-------------------------------------------------------------------------------------------------------
- Continue se utiliza para saltarse el resto de la iteración actual y pasar a la siguiente iteración
del bucle.

- Lo que hace es "continuar" con la siguiente iteración del bucle.
-------------------------------------------------------------------------------------------------------
*/
#include <iostream>
#include <vector>
using namespace std;

int main(){
    //-----------------------------------------------------------------------------------------------
    vector<int> nums = {1,2,3,4,5,6,7,8};

    int num = 6;

    // break: termina el bucle en cuanto encuentra el número buscado.
    for(size_t i = 0; i < nums.size(); i++){
        if(nums[i] == num){
            cout << "Número encontrado. Número: " << num << " encontrado en la posición: " << i << endl;
            break;
        }
    }
    cout << "Hemos salido del bucle." << endl;
    //-----------------------------------------------------------------------------------------------
    double descuento = 0.15;
    vector<double> precios = {50, 120, 75, 300, 90, 200};

    // continue: salta los precios <= 100, por lo que no reciben descuento.
    for(size_t i = 0; i < precios.size(); i++){
        if(precios[i] <= 100){
            continue;
        }
        precios[i] -= precios[i]*descuento;
    }

    cout << "Precios con descuento: ";
    for(size_t i = 0; i < precios.size(); i++){
        cout << precios[i] << " ";
    }
    cout << endl;
    //-----------------------------------------------------------------------------------------------
    return 0;
}
/*
-------------------------------------------------------------------------------------------------------
*/

