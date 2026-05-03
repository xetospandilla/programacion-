//--------------------------------------------------------------------------------------------

const Punto = require('../punto.js')

let assert = require ('assert')

//--------------------------------------------------------------------------------------------
//  main
//--------------------------------------------------------------------------------------------

describe("Prueba constructor y getters", function(){
    before(function( hecho ){
        console.log("esto ocurre antes de los it(")
        hecho() //llamamos a esta función para seguir
    })
})

//--------------------------------------------------------------------------------------------

//  Prueba de getY

it("pruebo getY()", function( hecho ){
    let p1 = new Punto( 3,4 )

    //Comprobación:

    assert.equal(p1.getY(), 4)
    hecho()
})

//  Prueba de getX

it("pruebo getX()", function( hecho ){
    let p1 = new Punto( 3,4 )

    //Comprobación:

    assert.equal(p1.getX(), 3)
    hecho()
})

//  Test asíncrono

setTimeout(function(){
    assert.equal(p1.getX(), 3)
}, 500)

//--------------------------------------------------------------------------------------------

after(function(){
    console.log("esto ocurre después de los it()")
})

//--------------------------------------------------------------------------------------------
