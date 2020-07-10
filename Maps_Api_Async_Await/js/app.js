const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
  ui.showBuildings();
});

// Filtrar busqueda

const searchBar = document.querySelector("#buscar input");

searchBar.addEventListener("input", () => {
  if (searchBar.value.length > 3) {
    ui.obtenerSugerencias(searchBar.value);
  } else {
    ui.showBuildings();
  }
});
