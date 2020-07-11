//* Se importan los modulos que vas a utilizar del otro documento, en este caso se importaron dos variables y una funcion, de este modo ya no es necesario vincularlos en index
import * as clientes from "./cliente.js";
import { companyName, funds, category } from "./empresa.js";

console.log(clientes.clientName);
console.log(companyName, funds, category);

// //* La clase Alumno se declaro en cliente.js pero al ser importada sus metodos y variables pueden ser usadas
// let prueba = new clientes.Client(clientes.clientName, clientes.savings);

// console.log(prueba.showInfo());
