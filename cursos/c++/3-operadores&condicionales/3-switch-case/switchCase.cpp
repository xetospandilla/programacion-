/*
-------------------------------------------------------------------------------------------------------
Estructura condicional: switch-case
-------------------------------------------------------------------------------------------------------
- La sentencia switch permite seleccionar entre multiples opciones segun el valor de una expresion.

- Es una alternativa al uso de varios if-else if cuando se compara una misma variable o expresion
  contra valores constantes.

- Suele utilizarse con tipos enteros, caracteres y enumeraciones.
-------------------------------------------------------------------------------------------------------
Sintaxis
-------------------------------------------------------------------------------------------------------
    switch (expresion) {
        case valor1:
            // Codigo a ejecutar si expresion == valor1
            break;
        case valor2:
            // Codigo a ejecutar si expresion == valor2
            break;
        ...
        default:
            // Codigo a ejecutar si no coincide ningun caso
            break;
    }

- case: define un posible valor de la expresion.

- break: finaliza la ejecucion del switch y evita que continue en los siguientes casos.

- default: bloque opcional que se ejecuta si ningun case coincide.
-------------------------------------------------------------------------------------------------------
Consideraciones importantes
-------------------------------------------------------------------------------------------------------
- Si se omite break, se produce "fall-through" (el programa continua ejecutando los siguientes
  casos hasta encontrar un break o el final del switch).

- Los valores de case deben ser constantes y unicos dentro del mismo switch.

- switch no permite evaluar rangos directamente ni condiciones complejas; en esos casos es mas
  adecuado usar if-else.

- Usar default ayuda a manejar valores no contemplados.
-------------------------------------------------------------------------------------------------------
EJM:
*/

#include <iostream>
using namespace std;

int main() {
    int opcion;

    cout << "===== MENU =====" << endl;
    cout << "1. Saludar" << endl;
    cout << "2. Mostrar dia favorito" << endl;
    cout << "3. Salir" << endl;
    cout << "Elige una opcion: ";
    cin >> opcion;

    switch (opcion) {
        case 1:
            cout << "Hola, bienvenido al programa." << endl;
            break;
        case 2:
            cout << "Mi dia favorito es el sabado." << endl;
            break;
        case 3:
            cout << "Saliendo del programa..." << endl;
            return 0; // Termina main() y, por tanto, el programa.
        default:
            cout << "Opcion no valida." << endl;
            break;
    }

    char letra = 'b';

    switch (letra) {
        case 'a':
            cout << "Has elegido la opcion A." << endl;
            break;
        case 'b':
            cout << "Has elegido la opcion B." << endl;
            break;
        case 'c':
            cout << "Has elegido la opcion C." << endl;
            break;
        default:
            cout << "Letra no reconocida." << endl;
            break;
    }

    return 0;
}

/*
-------------------------------------------------------------------------------------------------------
*/
