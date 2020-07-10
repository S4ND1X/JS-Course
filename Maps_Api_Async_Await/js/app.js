//* Se crea el objeto del mapa
const ui = new UI();

//* Se agrega el listener para que se carge el mapa al cargarse la pagina
document.addEventListener("DOMContentLoaded", () => {
  ui.showBuildings();
});

// Filtrar busqueda

//* Se obtiene el elemento del input
const searchBar = document.querySelector("#buscar input");
//* Cada vez que se teclee algo mayor a tres letras. se
searchBar.addEventListener("input", () => {
  if (searchBar.value.length > 3) {
    ui.obtenerSugerencias(searchBar.value);
  } else {
    ui.showBuildings();
  }
});
