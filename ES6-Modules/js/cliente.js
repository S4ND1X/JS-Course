//* En este documento se declararon variables y funciones necesarias en otro documento por lo que es necesario que se exporten para que puedan importarse en el otro documento

export const clientName = "Jorge";
export let savings = 0;

export function showInfo(name, saving) {
  return `Cliente: ${name} ahrros: ${saving}`;
}

//* Exportar clase con metodos

export class Alumno {
  constructor(name, savings) {
    this.name = name;
    this.savings = savings;
  }

  showInfo() {
    return `El Alumno: ${this.name} tiene $${this.savings} ahorrados.`;
  }
}
