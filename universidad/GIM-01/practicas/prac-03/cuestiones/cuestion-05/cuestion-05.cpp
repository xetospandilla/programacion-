#include <iostream>
using namespace std;

int main()
{

    for( unsigned int i = 0; i <=6; i++ )
    {
        for( unsigned int j = 0; i <= i; j++ )
        {
            cout << i << "-" << j;
            if( j < i)
            {
                cout << " ";
            }
        }
        cout << "\n";
    }

    return 0;
}