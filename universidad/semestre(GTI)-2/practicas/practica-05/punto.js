//--------------------------------------------------------------------------------------------
//  punto.js
//--------------------------------------------------------------------------------------------

module.exports = class Punto {

    constructor(x, y){
        this.x = x
        this.y = y
    }

    getX(){
        return this.x
    }

    getY(){
        return this.y
    }

    distancia(otro){
        let dx = this.x - otro.x
        let dy = this.y - otro.y
        
        return Math.sqrt( Math.pow(dx, 2) + Math.pow(dy, 2))
    }

    diferencia(otro){
        let nuevo = new Punto

        nuevo.x = this.x - otro.x
        nuevo.y = this.y - otro.y

        return nuevo
    }
}

//--------------------------------------------------------------------------------------------