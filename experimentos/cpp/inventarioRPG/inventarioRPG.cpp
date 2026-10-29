#include <iostream>
#include <string>
#include <vector>

using namespace std;
// ===========================================================================
//  Clase Arma
// ===========================================================================
class Arma
{

    private:
        //  Atributos
        string nombre;
        unsigned int dano;

    public:
        //  Constructor
        Arma( string nombre, unsigned int dano ){
            this->nombre = nombre;
            this->dano = dano;
        }

        //  Métodos
        string getNombre()
        {
            return nombre;
        }

        unsigned int getDano()
        {
            return dano;
        }
};
// ===========================================================================
// Enemigo
// ===========================================================================
class Enemigo
{
    private:
        //  Atributos
        string nombre;
        int vida;

    public:
        //  Constructor
        Enemigo( string nombre, int vida )
        {
            this->nombre = nombre;
            this->vida = vida;
        }

        //  Métodos
        void recibirDano( int cantidad )
        {
            this->vida -= cantidad;

            if( this->vida <= 0 )
            {
                cout << "El enemigo " << this->nombre << " ha muerto." << endl;
            }
            else
            {
                cout << "El enemigo " << this->nombre << " ha recibido " << cantidad << " de daño y se quedó a " << this->vida << " de HP." << endl;
            }
        }
};
// ===========================================================================
// Clase Personaje
// ===========================================================================
class Personaje
{
    private:
        //  Atributos
        string nombre;
        vector<Arma> inventario;

    public:
        //  Constructor
        Personaje( string Nombre, vector<Arma> Inventario )
        {
            this->nombre = Nombre;
            this->inventario = Inventario;
        }
        
        //  Métodos

        void recogerArma( Arma nueva )
        {
            this->inventario.push_back( nueva );
        }

        void atacar( Enemigo& objetivo )
        {
            if( this->inventario.empty() ){
                cout << this->nombre << " no tiene armas para atacar." << endl;
                return;
            }

            Arma mejor = this->inventario[ 0 ];

            for( unsigned int i = 0; i < this->inventario.size(); i++ )
            {
                if( this->inventario[ i ].getDano() > mejor.getDano() )
                {
                    mejor = this->inventario[ i ];
                }
            }

            cout << this->nombre << " ataca con " << mejor.getNombre() << "..." << endl;

            objetivo.recibirDano( mejor.getDano() );
        }
};
// ===========================================================================
// MAIN
// ===========================================================================
int main()
{

    vector<Arma> inventarioVacio;
    string nombrePj;

    cout << "===Bienvenido al RPG===" << endl;
    cout << "Introduce el nombre de tu personaje: " << endl;
    cin >> nombrePj;

    //  Instanciamiento a los participantes
    Personaje pj(nombrePj, inventarioVacio );
    Enemigo jefe( "Malenia", 1000 );

    //  Armas tiradas en el suelo( se pueden recoger )
    Arma daga( "Daga", 100 );
    Arma espadaRecta( "Espada Recta", 220 );
    Arma espadon( "Espadon", 500 );

    int opcion = 0;

    //  Bucle para el juego
    while( opcion != 3 ){

        cout << "---- QUE HARÁS? ----" << endl;
        cout << "1. Equipar un arma" << endl;
        cout << "2. Atacar al jefe" << endl;
        cout << "3. Huir (Salir)" << endl;
        cout << "Elige (1-3): ";
        cin >> opcion;

        if( opcion == 1 )
        {
            int eleccionArma;
            cout << "Hay tres armas en el suelo:" << endl;
            cout << "1. Daga (50) | 2. Espada (150) | 3. Espadon (300)" << endl;
            cout << "Cual recoges?: ";
            cin >> eleccionArma;

            if (eleccionArma == 1) 
            {
                pj.recogerArma(daga);
            } 
            else if (eleccionArma == 2) 
            {
                pj.recogerArma(espadaRecta);
            } 
            else if (eleccionArma == 3) 
            {
                pj.recogerArma(espadon);
            } 
            else 
            {
                cout << "Arma no valida." << endl;
            }
        }
        else if( opcion == 2 )
        {
            pj.atacar(jefe);
        }
        else if( opcion == 3 )
        {
            cout << "Has huido de la batalla..." << endl;
        }
        else
        {
            cout << "Opcion no valida." << endl;
        }
    }

    return 0;
}
// ===========================================================================