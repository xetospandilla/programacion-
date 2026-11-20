/*
-------------------------------------------------------------------------------------------------------
Crea un programa que simule una calculadora de estadísticas para una lista de números.

Debe permitir al usuario:

Introducir varios números.

Ver un menú con opciones (suma, media, máximo, mínimo, salir).

Cada opción debe ejecutarse mediante métodos de una clase llamada CalculadoraVector.

Usa vectores para almacenar los números, switch-case para el menú y funciones miembro para los cálculos.
-------------------------------------------------------------------------------------------------------
*/

#include <iostream>
#include <vector>
#include <limits>
using namespace std;

class CalculadoraVector {
private:
    vector<double> datos;

public:
    void introducirNumeros() {
        int tam;
        cout << "Cuantos valores quieres meter dentro: ";
        if(!(cin >> tam) || tam < 0){
            cout << "Cantidad no válida." << endl;
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            return;
        }

        double valor;
        for(int v = 0; v < tam; v++){
            cout << "Introduce el valor " << v+1 << ": ";
            if(!(cin >> valor)){
                cout << "Valor no válido. Se descarta esta entrada." << endl;
                cin.clear();
                cin.ignore(numeric_limits<streamsize>::max(), '\n');
                return;
            }
            datos.push_back(valor); // Se añade a los valores ya introducidos.
        }
    }

    void vaciar() {
        datos.clear(); // Utilidad adicional para empezar una lista nueva.
    }

    void mostrarNumeros() const {
        cout << "Los valores almacenados son: ";
        for(double n:datos) cout << n << ", ";
        cout << endl;
    }

    double suma() const {
        double res = 0;
        for(double n : datos) res += n;
        return res;
    }

    double media() const {
        if(datos.empty()) return 0;
        return suma() / datos.size();
    }

    double max() const {
        if(datos.empty()) return 0;
        double mayor = datos[0];
        for(size_t i = 1; i < datos.size(); i++)
            if(datos[i] > mayor) mayor = datos[i];
        return mayor;
    }

    double min() const {
        if(datos.empty()) return 0;
        double menor = datos[0];
        for(size_t i = 1; i < datos.size(); i++)
            if(datos[i] < menor) menor = datos[i];
        return menor;
    }
};

int main(){
    int opcion;
    CalculadoraVector est;
    do{
        cout << "=======================================" << endl;
        cout << "           MENÚ DE OPCIONES            " << endl;
        cout << "=======================================" << endl;
        cout << "1. Introducir números.                 " << endl;
        cout << "2. Mostrar números.                    " << endl;
        cout << "3. Calcular suma.                      " << endl;
        cout << "4. Calcular media.                     " << endl;
        cout << "5. Mostrar número máximo.              " << endl;
        cout << "6. Mostrar número mínimo.              " << endl;
        cout << "7. Vaciar la lista.                    " << endl;
        cout << "8. Salir.                              " << endl;
        cout << "=======================================" << endl;
        cout << "Elige una opción: ";
        if(!(cin >> opcion)){
            if(cin.eof()){
                cout << "Entrada agotada. Saliendo..." << endl;
                break;
            }
            cout << "Opción no válida." << endl;
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            opcion = 0;
            continue;
        }

        switch(opcion){
            case 1: est.introducirNumeros(); break;

            case 2: est.mostrarNumeros(); break;

            case 3: cout << "Suma: " << est.suma() << endl; break;

            case 4: cout << "Media: " << est.media() << endl; break;

            case 5: cout << "Máximo: " << est.max() << endl; break;

            case 6: cout << "Mínimo: " << est.min() << endl; break;

            case 7: est.vaciar(); break;

            case 8: cout << "Saliendo..." << endl; break;

            default: cout << "Opción no válida" << endl; break;
        }
    }while(opcion != 8); return 0;
}