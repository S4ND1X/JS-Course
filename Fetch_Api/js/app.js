//*Fetch a un txt
document.getElementById("txtBtn").addEventListener("click", loadTXT);

function loadTXT() {
  //?Al hacer fetch se genera un promise que de ser concretada .then se encargara de hacer algo con esa respuesta, en este caso se convierte a texto y una vez con eso se imprime
  fetch("datos.txt")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.getElementById("resultado").innerHTML = data;
    })
    .catch((error) => {
      console.log(error);
    });
}

//*Fetch a un json
document.getElementById("jsonBtn").addEventListener("click", loadJSON);

function loadJSON() {
  fetch("empleados.json")
    //?Al hacer fetch se genera un promise que de ser concretada .then se encargara de hacer algo con esa respuesta, en este caso se convierte a json y una vez con eso se imprime
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let html = ``;
      data.forEach((element) => {
        html += `<ul>
                    <li>${element.nombre}</li>
                    <li>${element.puesto}</li>
                </ul>`;
      });
      document.getElementById("resultado").innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}

//* Fetch RestApi
document.getElementById("apiBTN").addEventListener("click", loadRest);

function loadRest() {
  fetch("https://picsum.photos/list")
    //?Al hacer fetch se genera un promise que de ser concretada .then se encargara de hacer algo con esa respuesta, en este caso se convierte a json y una vez con eso se imprime
    .then((response) => {
      return response.json();
    })
    .then((images) => {
      let html = ``;
      images.forEach((image) => {
        html += `<ul>
                    <li>${image.author}</li>
                    <li>
                        <img src="${image.post_url}">
                    </li>
                </ul>`;
      });
      document.getElementById("resultado").innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}
