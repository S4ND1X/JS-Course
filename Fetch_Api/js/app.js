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
