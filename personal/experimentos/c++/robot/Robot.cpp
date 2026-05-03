#include <iostream>
#include <cmath>
#include <vector>
#include <string> // Necesaria para string
using namespace std;

//-----------------------------------------------------------------------------------------------
class Punto {
private:
    double x, y;

public:
    Punto(double X = 0, double Y = 0) { // Mejor poner double en el constructor
        this->x = X;
        this->y = Y;
    }

    double getX() const { return x; }
    double getY() const { return y; }

    void setX(double x) { this->x = x; }
    void setY(double y) { this->y = y; }

    double distancia(const Punto& otro) const {
        double restaX = otro.x - this->x;
        double restaY = otro.y - this->y;
        return sqrt(pow(restaX, 2) + pow(restaY, 2));
    }
};

//-----------------------------------------------------------------------------------------------
class Conjunto {
private:
    vector<double> elementos;

public:
    Conjunto() {};

    void vaciar() { elementos.clear(); }

    bool contiene(double valor) const {
        for (unsigned int i = 0; i < elementos.size(); i++) {
            if (elementos[i] == valor) return true;
        }
        return false;
    }

    void agregar(double valor) {
        if (!contiene(valor)) {
            elementos.push_back(valor);
        }
    }

    void eliminar(double valor) {
        for (unsigned int i = 0; i < elementos.size(); i++) {
            if (elementos[i] == valor) {
                elementos.erase(elementos.begin() + i);
                return; // <--- CORREGIDO: Salir al borrar para no romper el índice
            }
        }
    }

    // Método seguro para obtener elementos
    double getElemento(unsigned int i) const {
        if (i < elementos.size()) return elementos[i];
        return 0.0;
    }

    // UNIR (Versión Segura)
    Conjunto unir(const Conjunto& otro) const {
        Conjunto resultado;
        
        // 1. Añado MIS elementos
        for(unsigned int i = 0; i < elementos.size(); i++){
            resultado.agregar(elementos[i]);
        }
        
        // 2. Añado los del OTRO (con su talla, no la mía)
        for(unsigned int i = 0; i < otro.talla(); i++){
            resultado.agregar(otro.getElemento(i));
        }
        return resultado;
    }

    unsigned int talla() const { return elementos.size(); }

    void imprimir() const {
        cout << "{ ";
        for (unsigned int i = 0; i < elementos.size(); i++) {
            cout << elementos[i] << " ";
        }
        cout << "}" << endl; // Quitada la coma final por estética
    }
};

//-----------------------------------------------------------------------------------------------
class Robot {
private:
    string nombre;
    double bateria; // <--- CORREGIDO: Sin tilde
    Punto posicion; // <--- CORREGIDO: Sin tilde
    Conjunto mochila;

public:
    // Constructor
    Robot(string name) {
        this->nombre = name; // <--- CORREGIDO: El orden importa
        this->bateria = 100.0;
        // Punto y Conjunto se inician solos con sus constructores vacíos
    }

    // Moverse
    void mover(int dx, int dy) {
        if (this->bateria >= 10) { // Mejor >= que >
            
            // Actualizamos posición usando lo que nos pasan
            double nuevaX = this->posicion.getX() + dx;
            double nuevaY = this->posicion.getY() + dy;
            
            this->posicion.setX(nuevaX);
            this->posicion.setY(nuevaY);

            this->bateria -= 10.0;
            
            cout << "🤖 " << nombre << " se mueve. Bateria: " << bateria << "%" << endl;
        } else {
            cout << "⚠️ " << nombre << ": Bateria baja, no me muevo." << endl;
        }
    }

    // Recolectar
    void recolectar(double idObjeto) {
        if (this->bateria >= 5) { // Bajamos coste a 5 (opcional)
            
            // Lógica Smart: Comprobamos si ya lo tenemos antes de gastar batería
            if(mochila.contiene(idObjeto)){
                cout << "❌ Ya tengo el objeto " << idObjeto << endl;
            } else {
                this->mochila.agregar(idObjeto);
                this->bateria -= 5.0;
                cout << "🎒 Objeto " << idObjeto << " recolectado." << endl;
            }
        } else {
            cout << "⚠️ Bateria baja, no puedo recolectar." << endl;
        }
    }

    void mostrarEstado() {
        cout << "--- ESTADO DE " << this->nombre << " ---" << endl;
        cout << "📍 Pos: (" << posicion.getX() << ", " << posicion.getY() << ")" << endl;
        cout << "🔋 Bateria: " << this->bateria << "%" << endl;
        cout << "📦 Inventario: ";
        this->mochila.imprimir();
        cout << "-------------------------" << endl;
    }

    void recargar() {
        this->bateria = 100.0;
        cout << "⚡ Bateria recargada." << endl;
    }
};

//-----------------------------------------------------------------------------------------------
int main() {
    // 1. Crear Robot (Con string literal)
    Robot Wall_E("Wall-E"); // <--- CORREGIDO: Comillas

    // 2. Movimientos
    Wall_E.mover(1, 1);
    Wall_E.mover(2, 2);

    // 3. Recolección
    Wall_E.recolectar(101);
    Wall_E.recolectar(202);

    // 4. Intento de repetido (Ahora te avisa)
    Wall_E.recolectar(101);

    // 5. Ver estado
    Wall_E.mostrarEstado();

    // 6. Gastar batería a lo loco
    Wall_E.mover(10, 10);
    Wall_E.mover(10, 10);
    Wall_E.mover(10, 10);
    Wall_E.mover(10, 10);
    Wall_E.mover(10, 10); 
    Wall_E.mover(10, 10); // Aquí debería morir la batería

    Wall_E.mostrarEstado();

    return 0;
}