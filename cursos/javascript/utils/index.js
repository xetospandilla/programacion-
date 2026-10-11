// utils/index.js
import { sum } from './mathFunctions.js';
import { PI } from './constants.js';
export { sum, PI }; // Exportamos las cosas nombradas individualmente

const combined = { sum: sum, PI: PI };
export default combined; 