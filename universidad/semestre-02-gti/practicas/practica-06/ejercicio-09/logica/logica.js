
// Logica.js

const sqlite3 = require("sqlite3")

module.exports = class Logica {

    
    // constructor (nombreBD, cb)
    
    constructor(nombreBD, cb) {
        this.laConexion = new sqlite3.Database(
            nombreBD,
            (err) => {
                if (!err) {
                    this.laConexion.run("PRAGMA foreign_keys = ON")
                }
                cb(err)
            }
        )
    }

    
    // borrarFilasDe(tabla)
    
    borrarFilasDe(tabla) {
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(
                "delete from " + tabla + ";",
                (err) => (err ? rechazar(err) : resolver())
            )
        })
    }

    
    // borrarFilasDeTodasLasTablas()
    
    async borrarFilasDeTodasLasTablas() {
        await this.borrarFilasDe("Matricula")
        await this.borrarFilasDe("Asignatura")
        await this.borrarFilasDe("Persona")
    }

    
    // insertarPersona(datos)
    
    insertarPersona(datos) {
        var textoSQL = 'insert into Persona values($dni, $nombre, $apellidos);'
        var valoresParaSQL = { $dni: datos.dni, $nombre: datos.nombre, $apellidos: datos.apellidos }
        
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function(err) {
                (err ? rechazar(err) : resolver())
            })
        })
    }

    
    // buscarPersonaConDNI(dni)
    
    buscarPersonaConDNI(dni) {
        var textoSQL = "select * from Persona where dni = $dni";
        var valoresParaSQL = { $dni: dni }
        
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, (err, res) => {
                (err ? rechazar(err) : resolver(res))
            })
        })
    }

    
    // cerrar()
    
    cerrar() {
        return new Promise((resolver, rechazar) => {
            this.laConexion.close((err) => {
                (err ? rechazar(err) : resolver())
            })
        })
    }

    // ---------------------------------------------------
    // AMPLIACIÓN PARA ASIGNATURAS
    // ---------------------------------------------------
    insertarAsignatura(datos) {
        var textoSQL = 'insert into Asignatura values($codigo, $nombre);'
        var valoresParaSQL = { $codigo: datos.codigo, $nombre: datos.nombre }
        
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function(err) {
                (err ? rechazar(err) : resolver())
            })
        })
    }

    buscarAsignaturaConCodigo(codigo) {
        var textoSQL = "select * from Asignatura where codigo=$codigo";
        var valoresParaSQL = { $codigo: codigo }
        
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, (err, res) => {
                (err ? rechazar(err) : resolver(res))
            })
        })
    }

    // ---------------------------------------------------
    // AMPLIACIÓN PARA MATRÍCULAS
    // ---------------------------------------------------
    insertarMatricula(datos) {
        var textoSQL = 'insert into Matricula values($dni, $codigo);'
        var valoresParaSQL = { $dni: datos.dni, $codigo: datos.codigo }
        
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function(err) {
                (err ? rechazar(err) : resolver())
            })
        })
    }

    // ---------------------------------------------------
    // AMPLIACIÓN PARA CONSULTA AVANZADA (Apellidos -> Códigos)
    // ---------------------------------------------------
    buscarAsignaturasPorApellidos(apellidos) {
        var textoSQL = `
            select Matricula.codigo 
            from Persona 
            inner join Matricula on Persona.dni = Matricula.dni 
            where Persona.apellidos = $apellidos
        `;
        var valoresParaSQL = { $apellidos: apellidos }
        
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, (err, res) => {
                (err ? rechazar(err) : resolver(res))
            })
        })
    }

}