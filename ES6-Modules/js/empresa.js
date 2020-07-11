//* En este documento se declararon variables y funciones necesarias en otro documento por lo que es necesario que se exporten para que puedan importarse en el otro documento

export const companyName = "Udemy";
export let funds = 2000000;
export const category = "learning";

export function showInfo(name, funds) {
  return `Empresa: ${name} Funds: ${funds} Category: ${category}`;
}
