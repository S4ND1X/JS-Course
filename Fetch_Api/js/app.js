//*Fetch a un txt
document.getElementById("txtBtn").addEventListener("click", loadTXT);

function loadTXT() {
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
