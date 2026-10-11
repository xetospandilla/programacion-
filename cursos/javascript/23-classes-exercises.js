/*
Clase 39 - Ejercicios: Clases
Basado en: https://youtu.be/1glVfFxj8a4?t=18630
*/

// 1. Crea una clase que reciba dos propiedades
class User {
    constructor(name, password) {
        this.name = name
        this.password = password
    }
}

// ---------------------------------------------------------

// 2. Añade un método a la clase que utilice las propiedades
class UserV2 {
    constructor(name, password) {
        this.name = name
        this.password = password
    }

    viewUserName() {
        console.log("El usuario es: ", this.name)
    }
}

// ---------------------------------------------------------

// 3. Muestra los valores de las propiedades e invoca a la función
let myUserV2 = new UserV2("Xety", "1234567@")
myUserV2.viewUserName()

// ---------------------------------------------------------

// 4. Añade un método estático a la primera clase
class UserV3 {
    constructor(name, password) {
        this.name = name
        this.password = password
    }

    // Un método estático no accede a "this.password" (instancia).
    // Se usa para utilidades de la clase en general.
    static isStrongPassword(password) {
        return password.length > 8
    }
}

// 5. Haz uso del método estático (Se llama desde la Clase, no desde el objeto)
console.log("¿Es segura '123'?:", UserV3.isStrongPassword("123"))

// ---------------------------------------------------------

// 6. Crea una clase que haga uso de herencia
class Client extends UserV3 {
    pay() {
        console.log(`${this.name} está pagando...`)
    }
}

// ---------------------------------------------------------

// 7. Crea una clase que haga uso de getters y setters
class UserV4 {
    constructor(name, password) {
        this.name = name
        this.password = password
    }

    get getName() {
        return this.name
    }

    set setName(newName) {
        this.name = newName // Correcto: destino = origen
    }
}

// ---------------------------------------------------------

// 8. Modifica la clase con getters y setters para que use propiedades privadas
class FinalUser {
    #password // Propiedad privada

    constructor(name, password) {
        this.name = name
        this.#password = password
    }

    viewUserName() {
        console.log("El usuario es: ", this.name)
    }

    get getName() {
        return this.name
    }

    // Un getter se accede como propiedad, no como función
    get viewPassword() {
        return this.#password
    }

    set setName(newName) {
        this.name = newName
    }

    changePassword(newPassword) {
        this.#password = newPassword // Correcto: destino = origen
    }
}

// 9. Utiliza los get y set y muestra sus valores
let myUser = new FinalUser("Xety", "12345678@")

myUser.changePassword("6767676@@@")
console.log("Nueva contraseña (via getter):", myUser.viewPassword) // Sin paréntesis

// 10. Sobrescribe un método de una clase que utilice herencia 

class Admin extends FinalUser {
    // Sobrescribimos el método original
    viewUserName() {
        console.log(`[ADMIN]: ${this.name} tiene el control.`)
    }
}


let myAdmin = new Admin("AdminX", "secret_pass")
myAdmin.viewUserName() // Ejecuta el método sobrescrito