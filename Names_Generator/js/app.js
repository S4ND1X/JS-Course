//Formulario
const generateName = document.getElementById("generar-nombre");

generateName.addEventListener("submit", (e) => {
  e.preventDefault();

  //* Obteniendo los inputs

  const originName = document.getElementById("origen");
  const selectedOriginName = originName.options[originName.selectedIndex].value;
  console.log(selectedOriginName);

  const gender = document.getElementById("genero");
  const selectedGender = gender.options[gender.selectedIndex].value;
  console.log(selectedGender);

  const cant = document.getElementById("numero").value;

  let url = "";
  url += "http://uinames.com/api/?";

  //* Construyendo el url
  if (selectedOriginName !== "") {
    url += `region=${selectedOriginName}&`;
  }

  if (selectedGender !== "") {
    url += `gender=${selectedGender}&`;
  }

  if (cant) {
    url += `amount=${cant}&`;
  }

  const xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);

  //* Construir el template con la respuesta del servidor
  xhr.onload = () => {
    if (this.status === 200) {
      const nombres = JSON.parse(this.responseText);
      let htmlNombres = `<h2>Nombres Generados</h2>`;
      htmlNombres += '<ul class="lista">';

      nombres.forEach((nombre) => {
        htmlNombres += `

        <li>${nombre.name}
        
        `;
      });

      htmlNombres += "</ul>";

      document.getElementById("resultado").innerHTML = htmlNombres;
    }
  };

  xhr.send();
});
