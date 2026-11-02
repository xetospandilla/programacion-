/*
-----------------------------------------------------------------------------------------------------------------------------
Uso de 'this'
-----------------------------------------------------------------------------------------------------------------------------
¿Qué es el 'this'?
-----------------------------------------------------------------------------------------------------------------------------
    - El 'this' es una palabra reservada en C++. Podemos traducirla mentalmente por "este mismo".

    - En C++ this es un puntero que contiene la dirección de memoria del objeto actual, es decir, del objeto
      sobre el que se está ejecutando la función miembro.

    - Es un puntero implícito: no se declara como parámetro, pero existe dentro de cada función miembro no
      estática. Cuando dentro de la clase escribimos "saldo", el compilador entiende "this->saldo".

    - Solo puede usarse dentro de la clase, en funciones miembro no estáticas.
-----------------------------------------------------------------------------------------------------------------------------
¿Dónde está disponible 'this'?
-----------------------------------------------------------------------------------------------------------------------------
    - En funciones miembro no estáticas: cada llamada trabaja sobre un objeto concreto y 'this' apunta a él.

    - NO puede utilizarse en métodos estáticos ( static ). Un método estático no se llama sobre un objeto,
      así que no existe un "objeto actual" al que apuntar.

    - Tampoco existe en funciones libres, porque no pertenecen a ninguna clase ni se ejecutan sobre un objeto.
-----------------------------------------------------------------------------------------------------------------------------
¿Para qué se utiliza?
-----------------------------------------------------------------------------------------------------------------------------
    - Para acceder a propiedades y métodos: this->atributo, this->metodo().

    - Para evitar errores de ambigüedad de nombres, por ejemplo cuando un parámetro se llama igual que un
      atributo: this->saldo = saldo;

    - Para comparar si dos objetos son el mismo objeto: this == &otro.

    - Para devolver el propio objeto mediante *this, muy utilizado para llamadas encadenadas.
-----------------------------------------------------------------------------------------------------------------------------
Diferencia entre 'this' y '*this'
-----------------------------------------------------------------------------------------------------------------------------
    - 'this' es un puntero ( Tipo* ). Guarda una dirección y se usa con el operador -> para acceder a miembros:
      this->saldo.

    - '*this' es el objeto actual ( un lvalue de tipo Tipo ). Es el resultado de desreferenciar el puntero, es
      decir, el propio objeto.

    - Si una función devuelve Tipo& y ejecuta "return *this;", está devolviendo una referencia al propio objeto,
      no una copia. Si devolviera "*this" por valor, devolvería una copia.
-----------------------------------------------------------------------------------------------------------------------------
¿Por qué devolver '*this' mediante una referencia permite encadenar llamadas?
-----------------------------------------------------------------------------------------------------------------------------
    - Si un método devuelve void, la llamada termina y no se puede seguir operando sobre el resultado.

    - Si devuelve Tipo&, la llamada produce una referencia al mismo objeto y se puede seguir llamando a otros
      métodos sobre él:

          c.setSaldo( 2000 ).mostrarSaldo();

    - Devolver Tipo& (y no Tipo) es lo que permite encadenar sobre el objeto original. Si se devolviera por
      valor, se encadenaría sobre una copia temporal y los cambios no afectarían al objeto original.
-----------------------------------------------------------------------------------------------------------------------------
¿Qué ocurre con el tipo de 'this' dentro de una función miembro const?
-----------------------------------------------------------------------------------------------------------------------------
    - En un método declarado const, el tipo de 'this' es "const Tipo*": un puntero a objeto constante.

    - Por eso dentro de un método const no se pueden modificar los atributos ni llamar a métodos que no sean
      const. Es la forma que tiene el compilador de garantizar que el método no cambia el objeto.

    - Ejemplo: "double getSaldo() const { return saldo; }".
-----------------------------------------------------------------------------------------------------------------------------
*/
