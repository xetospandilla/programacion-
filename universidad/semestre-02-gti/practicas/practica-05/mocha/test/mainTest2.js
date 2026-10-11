//--------------------------------------------------------------------------------------------

const Punto = require('../punto.js')
let assert = require('assert')

//--------------------------------------------------------------------------------------------
//  main
//--------------------------------------------------------------------------------------------

describe("Pruebas de distancia()", 
    function(){
        let p1 = new Punto( 0,0 )
        let p2 = new Punto( 3,4 )

        it("la distacia de p1 a p2 es 5", function( hecho ){
            assert.equal(p1.diferencia(p2), 5)
            hecho()
        })

        it("la distacia de p2 a p1 es 5", function( hecho ){
            assert.equal(p2.diferencia(p1), 5)
            hecho()
        })

        it("la distancia de p1 a p1 es 0", function( hecho ){
            assert.equal(p1.distancia(p1), 0)
            hecho()
        })
    }
)
//--------------------------------------------------------------------------------------------