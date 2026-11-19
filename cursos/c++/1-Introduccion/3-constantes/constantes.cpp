/*
-------------------------------------------------------------------------------------------------------
Constantes en C++
-------------------------------------------------------------------------------------------------------
- Una constante es un valor que no puede modificarse durante la ejecucion del programa.

- Se utilizan para representar datos fijos, mejorar la legibilidad del codigo y evitar errores
  por cambios accidentales.

- A diferencia de las variables, una vez inicializadas no se les puede asignar un nuevo valor.
-------------------------------------------------------------------------------------------------------
Formas de definir constantes
-------------------------------------------------------------------------------------------------------
1. Palabra clave const:

    - Sintaxis: const "tipo" "nombre" = "valor";
    - Es la forma mas habitual y recomendada en C++ moderno.
    - El valor debe conocerse en el momento de la inicializacion.

2. Palabra clave constexpr:

    - Sintaxis: constexpr "tipo" "nombre" = "valor";
    - Indica que el valor puede evaluarse en tiempo de compilacion.
    - Util cuando el valor es conocido de antemano y se quiere optimizar.

3. Directiva del preprocesador #define:

    - Sintaxis: #define NOMBRE valor
    - No es una variable, sino una sustitucion de texto antes de compilar.
    - No tiene tipo asociado, por lo que se recomienda preferir const o constexpr.

4. Literales constantes:

    - Son valores escritos directamente en el codigo (ej: 10, 3.14, 'A', "Hola").
    - Tambien pueden tener sufijos para indicar su tipo (ej: 10u, 3.14f, 100L).
-------------------------------------------------------------------------------------------------------
Buenas practicas
-------------------------------------------------------------------------------------------------------
- Usar nombres descriptivos, normalmente en mayusculas o con estilo claro y consistente.

- Preferir const y constexpr frente a #define cuando sea posible.

- Declarar las constantes con el ambito mas reducido posible.

- Utilizar constantes para valores magicos (numeros o cadenas repetidas sin contexto).
-------------------------------------------------------------------------------------------------------
EJM:
*/

#include <iostream>
using namespace std;

#define PI_DEFINE 3.14159

int main() {
    const int DIAS_SEMANA = 7;
    const double IVA = 0.21;
    constexpr int HORAS_DIA = 24;

    double precio = 100.0;
    double precioFinal = precio + (precio * IVA);

    cout << "Dias de la semana: " << DIAS_SEMANA << endl;
    cout << "Horas al dia: " << HORAS_DIA << endl;
    cout << "Precio final con IVA: " << precioFinal << endl;
    cout << "Valor de PI (define): " << PI_DEFINE << endl;

    // DIAS_SEMANA = 8; // Error: no se puede modificar una constante.

    return 0;
}

/*
-------------------------------------------------------------------------------------------------------
*/
