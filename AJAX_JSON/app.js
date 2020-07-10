const employees = document.getElementById("empleados");
const employee = document.getElementById("empleado");

const btn = document.getElementById("boton1");
const btn2 = document.getElementById("boton2");

//*Al hacer click se hara el request al json de empleado
btn.addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "empleado.json", true);

  //* Cuando haya hecho el request se creara un template con los datos del empleado y se pondra dentro del div de empleado
  xhr.onload = function () {
    if (this.status === 200) {
      const persona = JSON.parse(this.responseText);

      const htmlTempl = `
           <ul>
            <li> ID: ${persona.id}</li>
            <li> Nombre: ${persona.nombre}</li>
            <li> Empresa: ${persona.empresa}</li>
            <li> Actividades: ${persona.trabajo}</li>
           </ul>
           `;

      employee.innerHTML = htmlTempl;
    }
  };

  xhr.send();
});

//*Aqui se hace lo mismo solo que de varios objetos de json, se convierten a objeto con JSON.parse
btn2.addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "empleados.json", true);

  //*Para cada uno de los objetos se construye su template y se agrega a la variable de template y al final se agrega al div de empleados
  xhr.onload = function () {
    if (this.status === 200) {
      const personas = JSON.parse(this.responseText);

      let htmlTempl;
      personas.forEach((persona) => {
        htmlTempl += `
            <ul>
             <li> ID: ${persona.id}</li>
             <li> Nombre: ${persona.nombre}</li>
             <li> Empresa: ${persona.empresa}</li>
             <li> Actividades: ${persona.trabajo}</li>
            </ul>
            `;
      });
      employee.innerHTML = htmlTempl;
    }
  };

  xhr.send();
});
