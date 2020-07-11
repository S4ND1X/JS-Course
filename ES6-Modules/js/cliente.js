//* En este documento se declararon variables y funciones necesarias en otro documento por lo que es necesario que se exporten para que puedan importarse en el otro documento

export const clientName = "Jorge";
export let savings = 120;

export function showInfo(name, saving) {
  return `Cliente: ${name} ahrros: ${saving}`;
}

//* Exportar clase con metodos

export class Client {
  constructor(name, savings) {
    this.name = name;
    this.savings = savings;
  }

  showInfo() {
    return `El Cliente: ${this.name} tiene $${this.savings} ahorrados.`;
  }
}
