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

  //* Fetch data to url

  fetch(url)
    //* Se obtiene la respuesta del servidor y una vez se haya complteado se utilizara esa respuesta para hacer algo con la informacion
    .then((response) => {
      response.json();
    })
    .then((data) => {
      let htmlNombres = `<h2>Nombres Generados</h2>`;
      htmlNombres += '<ul class="lista">';

      data.forEach((nombre) => {
        htmlNombres += `
        <li>${nombre.name}
      `;
      });
      htmlNombres += "</ul>";
      document.getElementById("resultado").innerHTML = htmlNombres;
    })
    .catch((error) => {
      console.log(error);
    });
});
