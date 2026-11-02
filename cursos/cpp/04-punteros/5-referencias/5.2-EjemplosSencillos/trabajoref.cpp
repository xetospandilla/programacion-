#include <iostream>
#include <string>
#include <vector>
using namespace std;

//---------------------------------------------------------------------------------------------------------------------------
//  CÓMO USAR ESTE ARCHIVO
//---------------------------------------------------------------------------------------------------------------------------
//  Cada ejemplo es independiente y tiene su propio main(). Solo se compila el bloque seleccionado.
//  Cambia el número de EJEMPLO_ACTIVO (1 a 8) y vuelve a compilar:
//
//      g++ -std=c++11 -Wall -Wextra -pedantic trabajoref.cpp -o trabajoref.exe
//
//  También puedes elegirlo desde la línea de comandos:
//
//      g++ -std=c++11 -Wall -Wextra -pedantic -DEJEMPLO_ACTIVO=3 trabajoref.cpp -o trabajoref.exe
//---------------------------------------------------------------------------------------------------------------------------
#ifndef EJEMPLO_ACTIVO
#define EJEMPLO_ACTIVO 1
#endif

//---------------------------------------------------------------------------------------------------------------------------
//  EJEMPLO 1: Declaración de una referencia y modificación del objeto original
//---------------------------------------------------------------------------------------------------------------------------
//  Una referencia es un alias: otro nombre para un objeto que ya existe.
//  Al modificar la referencia se modifica el objeto original, no una copia.
//
//  Resultado esperado:
//      numero antes: 10
//      numero despues: 20
//      misma direccion: 1
//---------------------------------------------------------------------------------------------------------------------------
#if EJEMPLO_ACTIVO == 1

int main()
{
    int numero = 10;
    int& alias = numero;        // alias es otro nombre para numero

    cout << "numero antes: " << numero << endl;

    alias = 20;                 // equivale a numero = 20;

    cout << "numero despues: " << numero << endl;
    cout << "misma direccion: " << (&alias == &numero) << endl;

    return 0;
}

#endif

//---------------------------------------------------------------------------------------------------------------------------
//  EJEMPLO 2: Intercambio de dos variables mediante referencias
//---------------------------------------------------------------------------------------------------------------------------
//  La función recibe referencias, así que trabaja directamente sobre las variables originales.
//  No hace falta devolver nada ni usar punteros.
//
//  Resultado esperado:
//      Antes: a=10, b=20
//      Despues: a=20, b=10
//---------------------------------------------------------------------------------------------------------------------------
#if EJEMPLO_ACTIVO == 2

void intercambiar(int& a, int& b)
{
    int temp = a;
    a = b;
    b = temp;
}

int main()
{
    int a = 10;
    int b = 20;

    cout << "Antes: a=" << a << ", b=" << b << endl;

    intercambiar(a, b);

    cout << "Despues: a=" << a << ", b=" << b << endl;

    return 0;
}

#endif

//---------------------------------------------------------------------------------------------------------------------------
//  EJEMPLO 3: Comparación entre pasar por valor y pasar por referencia
//---------------------------------------------------------------------------------------------------------------------------
//  Por valor se copia el argumento: la función modifica su copia y el original no cambia.
//  Por referencia no se copia: la función modifica el argumento original.
//
//  Resultado esperado:
//      Antes: porValor=5, porReferencia=5
//      Despues: porValor=5, porReferencia=105
//---------------------------------------------------------------------------------------------------------------------------
#if EJEMPLO_ACTIVO == 3

void incrementarPorValor(int x)
{
    x += 100;           // modifica la copia
}

void incrementarPorReferencia(int& x)
{
    x += 100;           // modifica el original
}

int main()
{
    int porValor = 5;
    int porReferencia = 5;

    cout << "Antes: porValor=" << porValor
         << ", porReferencia=" << porReferencia << endl;

    incrementarPorValor(porValor);
    incrementarPorReferencia(porReferencia);

    cout << "Despues: porValor=" << porValor
         << ", porReferencia=" << porReferencia << endl;

    return 0;
}

#endif

//---------------------------------------------------------------------------------------------------------------------------
//  EJEMPLO 4: Paso de una referencia constante ( const T& )
//---------------------------------------------------------------------------------------------------------------------------
//  const string& permite leer el string sin copiarlo y, además, acepta temporales.
//  Dentro de la función no se puede modificar el texto.
//
//  Resultado esperado:
//      Texto: Ana
//      Texto: temporal
//      Texto: Ana y Luis
//---------------------------------------------------------------------------------------------------------------------------
#if EJEMPLO_ACTIVO == 4

void mostrarTexto(const string& texto)
{
    cout << "Texto: " << texto << endl;

    // texto += "!";   // ERROR: no se puede modificar a través de una referencia const
}

int main()
{
    string nombre = "Ana";

    mostrarTexto(nombre);               // no copia el string
    mostrarTexto("temporal");           // acepta un temporal
    mostrarTexto(nombre + " y Luis");    // acepta el resultado temporal de una expresión

    return 0;
}

#endif

//---------------------------------------------------------------------------------------------------------------------------
//  EJEMPLO 5: Comparación entre referencia y puntero
//---------------------------------------------------------------------------------------------------------------------------
//  La referencia es un alias fijo: no se puede reasignar a otro objeto.
//  El puntero guarda una dirección: puede cambiar de destino y puede valer nullptr.
//
//  Resultado esperado:
//      a: 300
//      b: 200
//---------------------------------------------------------------------------------------------------------------------------
#if EJEMPLO_ACTIVO == 5

int main()
{
    int a = 5;
    int b = 100;

    int& r = a;         // r siempre será un alias de a
    int* p = &a;        // p apunta a a

    r = 10;             // modifica a
    *p = 20;            // también modifica a, porque p apunta a a

    p = &b;             // el puntero cambia de destino
    *p = 200;           // modifica b

    r = 300;            // sigue modificando a (no cambia de objeto)

    cout << "a: " << a << endl;
    cout << "b: " << b << endl;

    // r = b;           // asigna b a a; NO hace que r referencie b
    // p = nullptr;     // válido en un puntero, imposible en una referencia

    return 0;
}

#endif

//---------------------------------------------------------------------------------------------------------------------------
//  EJEMPLO 6: Función que devuelve una referencia correctamente
//---------------------------------------------------------------------------------------------------------------------------
//  Devolver T& solo es seguro si el objeto referenciado sigue vivo después de la función.
//  Aquí se devuelve una referencia a un parámetro (que vive fuera) y a una variable static
//  (que vive durante toda la ejecución).
//
//  Resultado esperado:
//      numero: 456
//      r: 456
//      estatico: 75
//---------------------------------------------------------------------------------------------------------------------------
#if EJEMPLO_ACTIVO == 6

int& devolverParametro(int& valor)
{
    return valor;       // el objeto recibido sigue vivo fuera de la función
}

int& devolverEstatico()
{
    static int valor = 50;  // existe durante toda la ejecución
    return valor;
}

int main()
{
    int numero = 123;

    int& r = devolverParametro(numero);
    r = 456;            // modifica numero a través de la referencia devuelta

    int& e = devolverEstatico();
    e += 25;

    cout << "numero: " << numero << endl;
    cout << "r: " << r << endl;
    cout << "estatico: " << devolverEstatico() << endl;

    return 0;
}

#endif

//---------------------------------------------------------------------------------------------------------------------------
//  EJEMPLO 7: Referencia colgante (código incorrecto, NO se ejecuta)
//---------------------------------------------------------------------------------------------------------------------------
//  El siguiente código es incorrecto:
//
//      int& crearReferenciaColgante()
//      {
//          int local = 42;
//          return local;       // local se destruye al salir de la función
//      }
//
//      int& r = crearReferenciaColgante();
//      cout << r;              // comportamiento indefinido
//
//  La referencia queda ligada a un objeto que ya no existe. Puede parecer que funciona
//  o devolver basura, pero es un error.
//
//  Forma correcta: devolver por valor.
//
//      int crearValor()
//      {
//          int local = 42;
//          return local;       // se devuelve una copia
//      }
//
//  Este bloque no compila ni ejecuta el código incorrecto a propósito.
//
//  Resultado esperado:
//      Este bloque no ejecuta el ejemplo incorrecto.
//---------------------------------------------------------------------------------------------------------------------------
#if EJEMPLO_ACTIVO == 7

int main()
{
    cout << "Este bloque no ejecuta el ejemplo incorrecto." << endl;
    cout << "Lee los comentarios del archivo para ver por que es peligroso." << endl;

    return 0;
}

#endif

//---------------------------------------------------------------------------------------------------------------------------
//  EJEMPLO 8: Modificación de elementos de una estructura o clase mediante referencias
//---------------------------------------------------------------------------------------------------------------------------
//  Las referencias permiten modificar miembros y elementos sin copiarlos.
//  Hay que asegurarse de que el objeto o contenedor siga vivo mientras se usa la referencia.
//
//  Resultado esperado:
//      Punto: x=10, y=2
//      Vector: 2 4 6
//      Contador: 7
//---------------------------------------------------------------------------------------------------------------------------
#if EJEMPLO_ACTIVO == 8

struct Punto
{
    int x;
    int y;
};

void desplazarX(Punto& p, int dx)
{
    p.x += dx;
}

class Contador
{
    private:
        int valor;

    public:
        Contador() : valor(0) {}

        int& valorRef()
        {
            return valor;   // referencia al miembro, no una copia
        }
};

int main()
{
    Punto p{ 1, 2 };
    desplazarX(p, 5);       // p.x pasa a valer 6

    int& coordX = p.x;      // alias a un miembro
    coordX = 10;            // modifica p.x

    cout << "Punto: x=" << p.x << ", y=" << p.y << endl;

    vector<int> numeros{ 1, 2, 3 };
    for (int& n : numeros)  // referencia a cada elemento
    {
        n *= 2;             // modifica el vector original
    }

    cout << "Vector: ";
    for (int n : numeros)
    {
        cout << n << " ";
    }
    cout << endl;

    Contador c;
    c.valorRef() = 7;       // modifica el atributo mediante la referencia devuelta

    cout << "Contador: " << c.valorRef() << endl;

    return 0;
}

#endif

//---------------------------------------------------------------------------------------------------------------------------
//  NOTAS FINALES
//---------------------------------------------------------------------------------------------------------------------------
//  - T& permite modificar el objeto original y no se puede reasignar.
//  - const T& permite leer sin copiar, acepta temporales y no permite modificar.
//  - T* puede valer nullptr, cambiar de destino y requiere desreferencia.
//  - Devolver T& solo es seguro si el objeto referenciado sobrevive a la función.
//  - Una referencia colgante es un error: el objeto referenciado ya no existe.
//  - return *this con T& permite encadenar métodos, como se vio en el tema de 'this'.
//---------------------------------------------------------------------------------------------------------------------------
