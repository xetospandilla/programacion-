/*
--------------------------------------------------------------------------------------------------------
Tipos de datos en C++
-------------------------------------------------------------------------------------------------------

Los tamaños indicados son los habituales: C++ solo garantiza mínimos y pueden variar según el compilador
y la plataforma. Para conocer el tamaño exacto en cada sistema se usa sizeof(tipo).

- Caracteres -> Para caracteres:

        · char -> Pueden ser caracteres o enteros pequeños de un byte de tamaño.
                RgValores: -128 a 127 si es signed / 0 a 255 si es unsigned (según el compilador).

        · char8_t -> Unidades UTF-8 de ocho bits, un byte de tamaño (C++20).

        · char16_t -> Unidades UTF-16 de dieciséis bits, normalmente dos bytes de tamaño.

        · char32_t -> Unidades UTF-32 de treinta y dos bits, normalmente cuatro bytes de tamaño.

        · wchar_t -> Su tamaño depende de la plataforma: normalmente 2 bytes en Windows y 4 en sistemas Unix.

- Enteros ->  Para números enteros:

        · short -> para números pequeños, normalmente de dos bytes.
                RgValores: -32.768 a 32.767 / unsigned: 0 a 65.535.

        · int -> números enteros, normalmente de cuatro bytes.
                RgValores: -2.147.483.648 a 2.147.483.647 / unsigned: 0 a 4.294.967.295.

        · long -> para números enteros largos; 4 bytes en Windows y normalmente 8 en sistemas Unix de 64 bits.
                RgValores: -2.147.483.648 a 2.147.483.647 si ocupa 4 bytes / unsigned: 0 a 4.294.967.295.

        · long long -> para números enteros muy largos, normalmente de ocho bytes.
                RgValores: -9.223.372.036.854.775.808 a 9.223.372.036.854.775.807 /
                unsigned: 0 a 18.446.744.073.709.551.615.

- Decimales -> Para valores con decimales:

        · float -> unas 7 cifras de precisión, normalmente de cuatro bytes.
                RgValores: 1,2e-38 a 3,4e38.

        · double -> unas 15 cifras de precisión, normalmente de ocho bytes.
                RgValores: 2,2e-308 a 1,8e308.

        · long double -> unas 19 cifras de precisión; su tamaño depende de la plataforma (8, 12 o 16 bytes).
                RgValores: 3,3e-4932 a 1,2e4932 si usa 80 bits.

- Booleanos -> condiciones que pueden ser verdaderas o falsas:

        · bool -> Para valores lógicos verdadero/falso, normalmente de un byte.
                RgValores: true / false.

--------------------------------------------------------------------------------------------------------
*/

/*
--------------------------------------------------------------------------------------------------------
Variables:

Una variable es un espacio en la memoria del ordenador donde se almacenará un valor
que podrá cambiar (variar) durante el programa.

Memoria RAM -> Memoria de acceso volátil. Los datos guardados aquí solo se mantienen
almacenados mientras el ordenador esté encendido.

Las variables en C++ tienen tipo. C++ es un lenguaje tipado.

--------------------------------------------------------------------------------------------------------
*/