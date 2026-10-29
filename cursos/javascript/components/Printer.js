// components/Printer.js
export class Printer {
  constructor(name) {
    this.name = name;
  }
  print(message) {
    console.log(`[${this.name}]: ${message}`);
  }
}