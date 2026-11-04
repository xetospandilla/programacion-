/*
-----------------------------------------------------------------------------------------------------------------------------
Referencias en C++
-----------------------------------------------------------------------------------------------------------------------------
Este apartado es una guía de consulta sobre referencias. Se supone que ya se conocen las variables, los punteros y las
funciones. La idea es entender qué son las referencias, cómo se comportan, en qué se diferencian de los punteros y cuándo
conviene utilizarlas.

Una idea que conviene tener desde el principio: una referencia NO es un objeto independiente, es otro nombre para un
objeto que ya existe. Sin embargo, eso no la convierte en una herramienta mágica ni absolutamente segura: si el objeto
referenciado deja de existir, la referencia queda colgante.
-----------------------------------------------------------------------------------------------------------------------------
1. ¿QUÉ ES UNA REFERENCIA?
-----------------------------------------------------------------------------------------------------------------------------
Una referencia es un alias: otro nombre para un objeto que ya existe. Al declarar una referencia no se crea una copia
del objeto, sino una nueva forma de acceder a él.

Sintaxis de declaración:

    Tipo& nombre = objeto;

    - El símbolo & se coloca junto al tipo (o junto al nombre, según el estilo) y forma parte del tipo: "int&" se lee
      como "referencia a int".
    - La referencia debe inicializarse en el momento de declararla, porque tiene que quedar ligada a un objeto.
    - A partir de ese momento, usar la referencia es equivalente a usar el objeto original.

Ejemplo sencillo:

    int numero = 10;
    int& alias = numero;    // alias es otro nombre para numero

    alias = 20;             // modifica numero, no una copia
    cout << numero;         // muestra 20
    cout << &numero;        // misma dirección que &alias

También se pueden declarar referencias a tipos más complejos:

    string nombre = "Ana";
    string& refNombre = nombre;

    refNombre += " García"; // el cambio se produce en el string original

Una referencia debe tener un tipo compatible con el objeto al que se liga. No se puede crear una referencia a un tipo
distinto sin una conversión válida por medio.

Importante: una referencia no se puede dejar "sin apuntar a nada". Siempre debe estar ligada a un objeto válido en el
momento de su creación. Esto es una diferencia fundamental con los punteros, que sí pueden valer nullptr.

1.1. Tipos de referencias que conviene distinguir

En C++ conviven tres formas de referencia. Las dos primeras son el centro de este apartado; la tercera se menciona solo
para no confundirla con ellas. En el tema de L-values y R-values ya se vio que un objeto con nombre es un lvalue y que
un valor temporal es un rvalue.

    Tipo&           referencia lvalue
    const Tipo&     referencia lvalue constante
    Tipo&&          referencia rvalue

- Tipo& (referencia lvalue):
  Se liga a un objeto con nombre (un lvalue) y permite modificarlo.

      int a = 10;
      int& r = a;
      r = 20;               // modifica a

- const Tipo& (referencia lvalue constante):
  Se liga a un lvalue o a un rvalue y no permite modificar el objeto a través de ella.

      const int& cr = 10;   // se liga a un temporal
      // cr = 20;           // ERROR: no se puede modificar a través de cr

- Tipo&& (referencia rvalue):
  Se liga a un temporal o a una expresión tratada como rvalue. Es la pieza que hace posible las operaciones de
  movimiento ( std::move, constructores de movimiento... ), pero eso pertenece al tema de movimiento y no se desarrolla
  aquí.

      int&& rr = 10;        // se liga a un temporal

Regla para no mezclarlas: T& y const T& son las referencias "normales" para acceder a objetos existentes; T&& está
pensada para recursos temporales y se estudia junto con el movimiento.
-----------------------------------------------------------------------------------------------------------------------------
2. ¿CÓMO FUNCIONA UNA REFERENCIA?
-----------------------------------------------------------------------------------------------------------------------------
2.1. Declaración e inicialización

    int a = 5;
    int& r = a;     // correcto: se inicializa con un objeto existente

    int& r;         // ERROR: una referencia debe inicializarse al declararse
    int& r = 10;    // ERROR: un literal no es un lvalue modificable

La referencia queda ligada a "a" desde el primer momento y ya no puede cambiar de objeto.

2.2. Por qué debe inicializarse al declararla

Porque una referencia no es un objeto que se pueda crear vacío y "rellenar" después: es un alias que debe estar ligado a
algo desde que existe. El compilador necesita saber a qué objeto se refiere para poder generar el acceso correcto.

2.3. Por qué no puede reasignarse para referenciar otro objeto

    int a = 5;
    int b = 10;
    int& r = a;

    r = b;          // NO cambia la referencia: asigna el valor de b al objeto a

Aquí "r = b" no hace que r pase a referirse a b. Como r es otro nombre para a, la instrucción equivale a "a = b".
Después de ejecutarla, a vale 10 y r sigue siendo un alias de a.

Lo que sí se puede hacer es cambiar el valor del objeto referenciado. Pero no se puede hacer que la referencia "apunte"
a otro objeto distinto.

2.4. Diferencia entre modificar el objeto y modificar la referencia

    int a = 5;
    int& r = a;

    r = 20;         // modifica el objeto a través de la referencia

No existe una operación para "modificar la referencia" en el sentido de hacerla apuntar a otro sitio. La referencia en sí
es una ligadura fija; lo que se modifica es siempre el objeto al que está ligada.

2.5. Una nota sobre la implementación

En la práctica, muchos compiladores implementan las referencias como punteros constantes por debajo. Pero eso es un
detalle de implementación: en el lenguaje, una referencia es un alias, y no se debe razonar sobre ella como si fuera un
puntero que se puede manipular.

    int a = 5;
    int& r = a;

    // &r devuelve la dirección de a, no la dirección de una supuesta "variable referencia".
    cout << (&r == &a);   // true
-----------------------------------------------------------------------------------------------------------------------------
3. REFERENCIAS FRENTE A PUNTEROS
-----------------------------------------------------------------------------------------------------------------------------
Ambas herramientas permiten acceder indirectamente a un objeto, pero no son equivalentes.

3.1. Diferencias sintácticas

    int a = 5;

    int& r = a;     // referencia: se usa como el objeto
    int* p = &a;    // puntero: se usa con * y ->

    r = 10;         // modifica a
    *p = 20;        // modifica a
    p = nullptr;    // el puntero puede dejar de apuntar a a

    r = 30;         // sigue modificando a; no hay una operación equivalente a "r = nullptr"

3.2. Inicialización

    - La referencia debe inicializarse al declararse y no puede quedar vacía.
    - El puntero puede declararse sin inicializar (aunque es mala idea) y puede valer nullptr.

3.3. Posibilidad de representar ausencia de objeto

    - La referencia siempre representa un objeto; no existe una referencia nula.
    - El puntero puede valer nullptr, lo que permite expresar "no hay objeto" o "todavía no hay objeto".

3.4. Indirección

    - La referencia se usa directamente, sin operadores de desreferencia.
    - El puntero necesita * para acceder al objeto y -> para acceder a miembros.

3.5. Reasignación

    - La referencia no puede volver a ligarse a otro objeto.
    - El puntero puede cambiar de destino tantas veces como se quiera.

3.6. Aritmética

    - Las referencias no tienen aritmética propia (no se puede hacer "r + 1" para avanzar a otro objeto).
    - Los punteros sí permiten aritmética de punteros, útil en arrays y estructuras de bajo nivel.

3.7. Seguridad y limitaciones

    - La referencia evita tener que comprobar nullptr y elimina la posibilidad de desreferenciar un puntero nulo por
      accidente. Pero NO es absolutamente segura: puede quedar colgante si el objeto al que se refiere se destruye.
    - El puntero obliga a comprobar nullptr y a gestionar la propiedad del recurso, pero ofrece más flexibilidad.

3.8. Tabla comparativa

    +----------------------------+-----------------------------+-----------------------------+
    | Aspecto                    | Referencia (T&)             | Puntero (T*)                |
    +----------------------------+-----------------------------+-----------------------------+
    | Qué es                     | Alias de un objeto          | Variable que guarda una     |
    |                            |                             | dirección                  |
    | Inicialización             | Obligatoria                 | Opcional                    |
    | Puede ser nula             | No                          | Sí (nullptr)                |
    | Puede reasignarse          | No                          | Sí                          |
    | Indirección                | Implícita (se usa directo)  | Explícita (* y ->)          |
    | Aritmética                 | No                          | Sí                          |
    | Seguridad frente a null    | No puede ser nula           | Hay que comprobar nullptr   |
    | Riesgo principal           | Quedar colgante             | Nulo, colgante, fugas       |
    | Uso típico                 | Parámetros, retornos,       | Memoria dinámica, estructuras|
    |                            | sobrecarga, alias           | de datos, polimorfismo      |
    +----------------------------+-----------------------------+-----------------------------+

3.9. Casos de uso de cada una

    Referencias:
        - Paso de parámetros por referencia (modificar o evitar copias).
        - Devolución de referencias a objetos que sobreviven a la función.
        - Sobrecarga de operadores.
        - Encadenamiento de métodos ( return *this ).
        - Alias locales para simplificar expresiones.

    Punteros:
        - Gestión de memoria dinámica y estructuras enlazadas.
        - Representar la ausencia de objeto (nullptr).
        - Aritmética de punteros y recorrido de arrays.
        - Polimorfismo y manejo de objetos derivados.
        - Interfaces de bajo nivel y APIs que necesitan expresar propiedad o ausencia.

Una referencia no es "la versión segura del puntero". Es una herramienta con otras reglas. Puede ser más cómoda cuando
el objeto siempre existe, pero no elimina el problema de la vida útil.
-----------------------------------------------------------------------------------------------------------------------------
4. PASO DE PARÁMETROS A FUNCIONES
-----------------------------------------------------------------------------------------------------------------------------
Hay cuatro formas habituales de pasar un argumento a una función. La elección cambia si se copia el objeto, si se puede
modificar y si se puede pasar "nada".

4.1. Paso por valor

    void porValor( int x )
    {
        x += 10;    // modifica la copia, no el argumento original
    }

    int a = 5;
    porValor( a );  // a sigue valiendo 5

    - Se copia el argumento.
    - La función trabaja con una copia independiente.
    - Los cambios no afectan al original.
    - Para tipos grandes, la copia puede ser costosa.

4.2. Paso por referencia

    void porReferencia( int& x )
    {
        x += 10;    // modifica el argumento original
    }

    int a = 5;
    porReferencia( a ); // a pasa a valer 15

    - No se copia el objeto.
    - La función puede modificar el original.
    - No se puede pasar un literal ni una expresión temporal (salvo con const&).

4.3. Paso por referencia constante

    void porReferenciaConst( const int& x )
    {
        // x += 10;     // ERROR: no se puede modificar a través de una referencia const
        cout << x;
    }

    int a = 5;
    porReferenciaConst( a );
    porReferenciaConst( 42 );   // también acepta temporales

    - No se copia el objeto (o se evita la copia cuando el tipo es grande).
    - La función no puede modificar el argumento.
    - Acepta objetos no const, objetos const y valores temporales.
    - Es la opción habitual para leer objetos grandes sin copiarlos.

4.4. Paso mediante puntero

    void porPuntero( int* p )
    {
        if( p != nullptr )
        {
            *p += 10;   // modifica el objeto apuntado
        }
    }

    int a = 5;
    porPuntero( &a );       // a pasa a valer 15
    porPuntero( nullptr );  // la función debe comprobarlo

    - Se pasa una dirección.
    - La función puede modificar el objeto apuntado.
    - El puntero puede ser nullptr, por lo que hay que comprobar su validez.
    - La sintaxis es más explícita y algo más pesada.

4.5. Diferencias prácticas y cuándo conviene cada una

    - Por valor: tipos pequeños (int, double, char...) cuando la función no necesita modificar el original. Es simple y
      seguro.
    - Por referencia: cuando la función debe modificar el argumento y el objeto siempre existe.
    - Por referencia constante: cuando la función solo necesita leer y el objeto puede ser grande ( string, vector,
      clases...). Evita copias sin permitir modificaciones.
    - Por puntero: cuando es válido no tener objeto (nullptr), cuando se trabaja con memoria dinámica o cuando la
      interfaz necesita expresar de forma explícita que se maneja una dirección.

Regla práctica: si solo se lee, usar const T& para tipos grandes; si se modifica, usar T&; si la ausencia de objeto es
posible, usar T* y comprobar nullptr.
-----------------------------------------------------------------------------------------------------------------------------
5. REFERENCIAS CONSTANTES ( const T& )
-----------------------------------------------------------------------------------------------------------------------------
Una referencia constante es una referencia que no permite modificar el objeto a través de ella.

    int a = 5;
    const int& r = a;

    cout << r;      // correcto: se puede leer
    // r = 10;      // ERROR: no se puede modificar a través de r

    a = 10;         // correcto: el objeto original no es const, solo la referencia
    cout << r;      // muestra 10

Lo importante es distinguir dos ideas:

    - "const T&" impide modificar el objeto A TRAVÉS DE LA REFERENCIA.
    - No convierte necesariamente al objeto original en constante. Si el objeto era modificable, se puede modificar por
      otra vía y la referencia verá el cambio.

5.1. Qué permiten hacer

    - Leer el objeto.
    - Recibir objetos const y objetos no const.
    - Enlazarse con valores temporales, algo que una referencia no const no puede hacer.
    - Evitar copias en parámetros y retornos.

5.2. Por qué son útiles para evitar copias

    void imprimir( const string& texto )
    {
        cout << texto << endl;
    }

    string nombre = "Ana";
    imprimir( nombre );         // no copia el string
    imprimir( "Hola mundo" );   // crea un temporal y lo enlaza con la referencia const

Si el parámetro fuera "string texto" por valor, cada llamada copiaría el string completo. Con "const string&" solo se
pasa una referencia.

5.3. Ejemplos con tipos básicos y con std::string

    void mostrarEntero( const int& valor )
    {
        cout << valor << endl;
    }

    int numero = 42;
    mostrarEntero( numero );
    mostrarEntero( 7 );         // acepta un temporal

    void mostrarNombre( const string& nombre )
    {
        cout << "Nombre: " << nombre << endl;
    }

    string n = "Lucía";
    mostrarNombre( n );
    mostrarNombre( "Carlos" );  // acepta un temporal

5.4. Una nota sobre la vida útil de los temporales

Cuando una referencia const local se liga a un temporal, el temporal se mantiene vivo mientras viva la referencia:

    const string& ref = string( "temporal" );
    cout << ref;    // válido: el temporal se ha extendido hasta el final del ámbito

Esto NO ocurre igual al devolver una referencia desde una función. Devolver una referencia a un temporal local produce
una referencia colgante. Se explica en el apartado 6.
-----------------------------------------------------------------------------------------------------------------------------
6. DEVOLUCIÓN DE REFERENCIAS
-----------------------------------------------------------------------------------------------------------------------------
6.1. Qué significa devolver T&

    int& obtenerReferencia( int& valor )
    {
        return valor;   // devuelve una referencia al objeto recibido
    }

    int a = 5;
    int& r = obtenerReferencia( a );
    r = 10;             // modifica a

Devolver T& significa devolver un alias a un objeto que ya existe. No se copia el objeto. El llamador puede usar la
referencia para leer o modificar el original, siempre que el objeto siga vivo.

6.2. Cuándo puede ser útil

    - Sobrecarga de operator[] para acceder a elementos de un contenedor.
    - Métodos que devuelven un atributo por referencia para permitir modificarlo.
    - Encadenamiento de métodos ( return *this ).
    - Funciones que ya reciben una referencia y quieren devolverla sin copiar.

Ejemplo con un atributo:

    class Cuenta
    {
        private:
            double saldo;

        public:
            double& saldoRef() { return saldo; }
    };

    Cuenta c;
    c.saldoRef() = 1000;    // modifica el atributo a través de la referencia

6.3. Diferencia frente a devolver por valor

    int porValor()          { return 10; }      // devuelve una copia del valor
    int& porReferencia()    { ... }             // devuelve un alias a un objeto existente

Devolver por valor es seguro porque el llamador recibe su propio objeto. Devolver por referencia evita la copia, pero
exige que el objeto referenciado siga existiendo después de la función.

6.4. Riesgo de devolver una referencia a una variable local

    int& crearReferencia()
    {
        int local = 5;
        return local;   // INCORRECTO: local se destruye al salir de la función
    }

    int& r = crearReferencia();
    cout << r;          // comportamiento indefinido: la referencia está colgante

La variable local vive en la pila y se destruye al terminar la función. La referencia devuelta apunta a memoria que ya
no es válida.

6.5. Ejemplos correctos

    // Referencia a un objeto que recibe la función y sigue vivo fuera de ella.
    int& devolverParametro( int& valor )
    {
        return valor;
    }

    // Referencia a un objeto estático: existe durante toda la ejecución.
    int& devolverEstatico()
    {
        static int valor = 5;
        return valor;
    }

    // Referencia a un miembro de un objeto que sigue vivo.
    class Caja
    {
        private:
            int contenido;

        public:
            int& contenidoRef() { return contenido; }
    };

6.6. Ejemplo incorrecto con un temporal

    const string& crearTexto()
    {
        return string( "Hola" );    // INCORRECTO: el temporal muere al salir de la función
    }

Aunque el parámetro sea const&, el temporal se destruye al terminar la función y la referencia devuelta queda colgante.

Regla: solo se debe devolver una referencia si el objeto referenciado sobrevive a la llamada.
-----------------------------------------------------------------------------------------------------------------------------
7. REFERENCIAS COLGANTES
-----------------------------------------------------------------------------------------------------------------------------
7.1. Qué son

Una referencia colgante es una referencia ligada a un objeto que ya no existe. Usarla es comportamiento indefinido:
puede parecer que funciona, puede devolver basura o puede provocar un fallo.

7.2. Cómo pueden producirse

    - Devolver una referencia a una variable local.
    - Guardar una referencia a un objeto que se destruye después.
    - Referenciar memoria liberada con delete.
    - Referenciar un elemento de un contenedor que se reasigna o se redimensiona.
    - Devolver una referencia a un temporal creado dentro de una función.

7.3. Ejemplo sencillo del problema

    int& referenciaColgante()
    {
        int local = 42;
        return local;       // local desaparece al salir de la función
    }

    int& r = referenciaColgante();
    cout << r;              // comportamiento indefinido

Otro caso habitual:

    int* p = new int( 10 );
    int& r = *p;
    delete p;               // el objeto ya no existe
    cout << r;              // referencia colgante

7.4. Cómo evitarlas

    - Devolver por valor cuando el objeto sea local.
    - Asegurarse de que el objeto referenciado vive más tiempo que la referencia.
    - No guardar referencias a elementos de contenedores que puedan reasignarse.
    - No devolver referencias a temporales.
    - Usar punteros o contenedores con propiedad clara cuando la vida útil no esté garantizada.
    - Revisar quién es el propietario del recurso.

Las referencias evitan algunos errores de los punteros, pero no eliminan el problema de la vida útil. Una referencia
colgante es tan peligrosa como un puntero colgante.
-----------------------------------------------------------------------------------------------------------------------------
8. CASOS DE USO HABITUALES
-----------------------------------------------------------------------------------------------------------------------------
8.1. Modificación de argumentos

    void intercambiar( int& a, int& b )
    {
        int temp = a;
        a = b;
        b = temp;
    }

    int x = 1;
    int y = 2;
    intercambiar( x, y );   // x vale 2, y vale 1

La referencia permite modificar los argumentos sin usar punteros ni return.

8.2. Evitar copias innecesarias

    void analizar( const vector<int>& datos )
    {
        // Solo lectura: no se copia el vector.
    }

Pasar objetos grandes por const& evita copiarlos y deja claro que la función no los modifica.

8.3. Acceso a elementos de estructuras

    struct Punto
    {
        int x;
        int y;
    };

    Punto p{ 1, 2 };
    int& coordX = p.x;      // alias a un miembro
    coordX = 10;            // modifica p.x

    vector<int> numeros{ 1, 2, 3 };
    for( int& n : numeros ) // referencia a cada elemento
    {
        n *= 2;             // modifica los elementos del vector
    }

8.4. Encadenamiento de métodos ( this y return *this )

    class Cuenta
    {
        private:
            double saldo;

        public:
            Cuenta& setSaldo( double s )
            {
                saldo = s;
                return *this;       // devuelve una referencia al propio objeto
            }

            Cuenta& ingresar( double cantidad )
            {
                saldo += cantidad;
                return *this;
            }
    };

    Cuenta c;
    c.setSaldo( 100 ).ingresar( 50 );

Devolver Cuenta& permite encadenar llamadas sobre el mismo objeto. Si se devolviera por valor, se encadenaría sobre una
copia y los cambios no afectarían al objeto original. Esto conecta directamente con el uso de this y *this.
-----------------------------------------------------------------------------------------------------------------------------
9. RESUMEN FINAL
-----------------------------------------------------------------------------------------------------------------------------
Reglas que conviene recordar:

    - Una referencia es un alias de un objeto existente; no es una copia.
    - Debe inicializarse al declararse y no puede quedar vacía.
    - No puede reasignarse para referenciar otro objeto distinto.
    - Modificar la referencia es modificar el objeto al que está ligada.
    - Una referencia puede quedar colgante si el objeto referenciado se destruye.
    - const T& permite leer sin copiar y acepta temporales; no permite modificar a través de la referencia.
    - Devolver T& solo es seguro si el objeto devuelto sobrevive a la función.
    - Devolver *this por referencia permite encadenar métodos.

Cuándo utilizar referencias:

    - Para pasar parámetros que se van a modificar ( T& ).
    - Para pasar objetos grandes sin copiarlos cuando solo se leen ( const T& ).
    - Para devolver referencias a objetos que sobreviven a la función.
    - Para sobrecargar operadores y encadenar métodos.
    - Para crear alias locales que simplifiquen el código.

Cuándo utilizar punteros:

    - Cuando la ausencia de objeto es posible ( nullptr ).
    - Cuando se gestiona memoria dinámica.
    - Cuando se construyen estructuras de datos enlazadas.
    - Cuando se necesita aritmética de punteros.
    - Cuando se trabaja con polimorfismo o interfaces de bajo nivel.
    - Cuando se quiere expresar de forma explícita una dirección o una relación de propiedad.

Idea final: las referencias son cómodas y expresivas cuando el objeto siempre existe y su vida útil está clara. Los
punteros son más flexibles cuando hay que representar ausencia, cambiar de destino o trabajar cerca de la memoria. En
ambos casos, la responsabilidad principal sigue siendo controlar la vida útil del objeto.
-----------------------------------------------------------------------------------------------------------------------------
*/
