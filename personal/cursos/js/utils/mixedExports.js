// utils/mixedExports.js
// Exportación de Función (Nombrada)
export function greet(name) {
  return `Hola, ${name}.`;
}

// Exportación de Constante (Nombrada)
export const VERSION = "1.0";

// Exportación por defecto (Default) - El valor principal del módulo
export default class Animal {
    constructor(sound) {
        this.sound = sound;
    }
    speak() {
        console.log(`El animal hace: ${this.sound}`);
    }
}