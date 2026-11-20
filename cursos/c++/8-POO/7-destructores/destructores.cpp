/*
-----------------------------------------------------------------------------------------------------------------------------
Destructores
-----------------------------------------------------------------------------------------------------------------------------
- Método especial.

- Invocado al destruir un objeto (al salir del ámbito o al aplicar delete).

- Mismo nombre que la clase, precedido de ~.

- No devuelven tipo(no return).

- No admiten sobrecarga. Solo un destructor por clase.

- Útil para liberar memoria y recursos.

- Nota: Todas las clases tienen destructor por defecto.
-----------------------------------------------------------------------------------------------------------------------------
-Se usa cuando:

  - Si tu clase asigna memoria dinámica con new o new[], debes liberar esa memoria en el destructor usando delete
  o delete[]. Si no lo haces, tendrás fugas de memoria.

  - Archivos abiertos:

    - Si tu clase abre archivos, deberías cerrarlos en el destructor para liberar correctamente esos recursos.

  - Conexiones de red o BDD:

    -Si tu clase establece conexiones a bases de datos o redes, el destructor debería cerrarlas para evitar mantener recursos
    innecesarios abiertos.

  - Handles / Recursos del sistema:

    -Cualquier otro recurso del sistema operativo, como descriptores de archivos, mutex o recursos gráficos, también deben
    ser liberados adecuadamente en el destructor.
-----------------------------------------------------------------------------------------------------------------------------
Diferencias entre tipos de memoria:

  - Tipo de memoria:

    - Automática.(Pila)

    - Dinámica.(montón)

    - Estática.(global)

  - Ubicación:

    - Stack(pila)

    - Heap(montón)

    - Memoria estática

  - Asignación:

    - Automática en tiempo de compilación.

    - Explícita con new / new[]

    - En tiempo de compilación.

  - Liberación:

    - Automática al salir del bloque.

    - Manual con delete / delete[].

    - Automática al final del programa.

  - Alcance:

    - Dentro de un bloque o función.

    - Mientras se gestione manualmente.

    - Todo el programa.

  - Ejemplos de uso:

    - Variables locales dentro de funciones.

    - Estructuras de datos dinámicas, arrays de tamaño dinámico.

    - Variables globales y estáticas locales.
-----------------------------------------------------------------------------------------------------------------------------
EJM:
*/

#include <iostream>
using namespace std;

class Rectangulo{

    private:

        int ancho; int alto;

        string nombre;

    public:
        Rectangulo(string nom){ //Esto es un constructor. Se invoca automáticamente al declarar una variable con esta clase.
            ancho = 10; alto = 5;

            nombre = nom;
            //Todas las variables declaradas con esta clase, tendrán este estado inicial.
        }

        Rectangulo(int al, string nom){
            ancho = 17; alto = al;

            nombre = nom;
        }

        Rectangulo(int an, int al, string nom){
            ancho = an;
            alto = al;

            nombre = nom;
        }

        ~Rectangulo(){ //Se invoca al destruir el objeto; aquí solo imprime, porque no hay memoria del Heap que liberar.
          cout << "Destructor invocado para el objeto: " << nombre << endl;

        }

};

int main(){

    Rectangulo r1("r1"); //Se invoca el constructor con un parámetro definido más arriba.
                //El compilador solo genera uno por defecto si no se declara ningún constructor.

    Rectangulo r2(12,"r2");

    Rectangulo r3(17,9,"r3");

    /*Cómo estamos trabajando en el stack de momento. Lo que se eliminará primero será r3, después r2 y por último, r1.
    Ya que no hay punteros declarados ni nada que gestiones memoria dinámica.*/
    return 0;
}
//---------------------------------------------------------------------------------------------------------------------------