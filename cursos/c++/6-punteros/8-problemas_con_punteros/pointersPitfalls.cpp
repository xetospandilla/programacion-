/*
-------------------------------------------------------------------------------------------------------------------------------
Pointers Pitfalls
-------------------------------------------------------------------------------------------------------------------------------
- Desreferenciación de punteros nulos.

- Fugas de memoria (Memory leaks).

- Desbordamiento de buffer (Buffer overflow).

- Doble liberación (Double free).

- Punteros colgantes (Dangling pointers).

- Violación del acceso (Access violation).
--------------------------------------------------------------------------------------------------------------------------------
*/

#include <iostream>
#include <string>
using namespace std;

int main(){

    //-----------------------------------
    //Desreferenciación de punteros nulos
    int *ptr = new int[10];//Asigna nuevo espacio en la memoria. new[] se libera con delete[].

    delete[] ptr;//Borra la última asignación.

    ptr = new int [20];//Asigna nuevo espacio en la memoria.

    delete[] ptr;//Borra la última asignación.

    ptr = nullptr;                  //Tras liberar, dejar el puntero nulo

    // PELIGRO: *ptr = 5;           //ERROR: desreferenciar un puntero nulo
    if(ptr != nullptr) *ptr = 5;    //Correcto: solo se usa si apunta a algo
    //-----------------------------------
    //Memory leaks
    int array[5];                   //Array automático: no necesita delete

    for(int i = 0; i<5; i++){
        array[i] = i;
    }
    cout << "Último valor del array automático: " << array[4] << endl;

    int* dinamico = new int[5];     //Si se olvida liberarlo, se produce una fuga
    // PELIGRO: omitir delete[] dinamico;
    delete[] dinamico;              //Correcto: new[] se libera con delete[]
    //-----------------------------------
    //Doble liberación
    int *pt = new int;

    delete pt;                      //Correcto: new se libera con delete

    pt = nullptr;                   //Evita que quede colgante

    // PELIGRO: if(pt != nullptr) delete ptr;  //ERROR: doble liberación; además 'ptr' era new[] y se liberó con delete[]
    if(pt != nullptr) delete pt;    //Correcto: la guarda evita liberar dos veces
    //-----------------------------------
    //Punteros colgantes
    int *pr = new int(10);

    delete pr;

    // PELIGRO: *pr = 5;            //ERROR: 'pr' queda colgante tras delete
    pr = nullptr;                   //Solución: dejarlo nulo

    if(pr != nullptr) *pr = 5;      //Correcto: la guarda evita usar el puntero colgante
    //-----------------------------------
    //Violación de acceso
    int array2[5] = {1,2,3,4,5};    //Índices válidos: 0..4

    // PELIGRO: int *prt = &array2[6];  //ERROR: índice 6 fuera de límites
    // int valor = *prt;               //ERROR: desreferenciaría memoria ajena

    int *prt = &array2[2];          //Correcto: índice dentro del array
    int valor = *prt;

    cout << "Valor leído sin violar límites: " << valor << endl;
    //-----------------------------------
}
//------------------------------------------------------------------------------------------------------------------------------