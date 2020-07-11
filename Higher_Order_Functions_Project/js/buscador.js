//Listeners de los inputs y se agrega el valor seleccionado al objeto que buscara los carros
const container = document.getElementById("resultado");

const marca = document
  .getElementById("marca")
  .addEventListener("input", (e) => {
    e.preventDefault();
    carsSearched.marca = e.target.value;

    filterCars();
  });

const year = document.getElementById("year").addEventListener("input", (e) => {
  e.preventDefault();
  carsSearched.year = Number(e.target.value);
  filterCars();
});

const minimo = document
  .getElementById("minimo")
  .addEventListener("input", (e) => {
    e.preventDefault();
    carsSearched.minimo = Number(e.target.value);
    filterCars();
  });
const maximo = document
  .getElementById("maximo")
  .addEventListener("input", (e) => {
    e.preventDefault();
    carsSearched.maximo = Number(e.target.value);
    filterCars();
  });

const puertas = document
  .getElementById("puertas")
  .addEventListener("input", (e) => {
    e.preventDefault();
    carsSearched.puertas = Number(e.target.value);
    filterCars();
  });
const transmision = document
  .getElementById("transmision")
  .addEventListener("input", (e) => {
    e.preventDefault();
    carsSearched.transmision = e.target.value;
    filterCars();
  });

const color = document
  .getElementById("color")
  .addEventListener("input", (e) => {
    e.preventDefault();
    carsSearched.color = e.target.value;
    filterCars();
  });

// crear los años
const years = document.createElement("option");
const max = new Date().getFullYear();
let min = max - 10;

for (let i = max; i > min; i--) {
  let option = document.createElement("option");
  option.value = i;
  option.innerText = i;
  document.querySelector("#year").appendChild(option);
}

function getCars() {
  return [
    {
      marca: "BMW",
      modelo: "Serie 3",
      year: 2012,
      precio: 30000,
      puertas: 4,
      color: "Blanco",
      transmision: "automatico",
    },
    {
      marca: "Audi",
      modelo: "A4",
      year: 2018,
      precio: 40000,
      puertas: 4,
      color: "Negro",
      transmision: "automatico",
    },
    {
      marca: "Ford",
      modelo: "Mustang",
      year: 2015,
      precio: 20000,
      puertas: 2,
      color: "Blanco",
      transmision: "automatico",
    },
    {
      marca: "Audi",
      modelo: "A6",
      year: 2010,
      precio: 35000,
      puertas: 4,
      color: "Negro",
      transmision: "automatico",
    },
    {
      marca: "BMW",
      modelo: "Serie 5",
      year: 2016,
      precio: 70000,
      puertas: 4,
      color: "Rojo",
      transmision: "automatico",
    },
    {
      marca: "Mercedes Benz",
      modelo: "Clase C",
      year: 2015,
      precio: 25000,
      puertas: 4,
      color: "Blanco",
      transmision: "automatico",
    },
    {
      marca: "Chevrolet",
      modelo: "Camaro",
      year: 2018,
      precio: 60000,
      puertas: 2,
      color: "Rojo",
      transmision: "manual",
    },
    {
      marca: "Ford",
      modelo: "Mustang",
      year: 2019,
      precio: 80000,
      puertas: 2,
      color: "Rojo",
      transmision: "manual",
    },
    {
      marca: "Dodge",
      modelo: "Challenger",
      year: 2017,
      precio: 40000,
      puertas: 4,
      color: "Blanco",
      transmision: "automatico",
    },
    {
      marca: "Audi",
      modelo: "A3",
      year: 2017,
      precio: 55000,
      puertas: 2,
      color: "Negro",
      transmision: "manual",
    },
    {
      marca: "Dodge",
      modelo: "Challenger",
      year: 2012,
      precio: 25000,
      puertas: 2,
      color: "Rojo",
      transmision: "manual",
    },
    {
      marca: "Mercedes Benz",
      modelo: "Clase C",
      year: 2018,
      precio: 45000,
      puertas: 4,
      color: "Azul",
      transmision: "automatico",
    },
    {
      marca: "BMW",
      modelo: "Serie 5",
      year: 2019,
      precio: 90000,
      puertas: 4,
      color: "Blanco",
      transmision: "automatico",
    },
    {
      marca: "Ford",
      modelo: "Mustang",
      year: 2017,
      precio: 60000,
      puertas: 2,
      color: "Negro",
      transmision: "manual",
    },
    {
      marca: "Dodge",
      modelo: "Challenger",
      year: 2015,
      precio: 35000,
      puertas: 2,
      color: "Azul",
      transmision: "automatico",
    },
    {
      marca: "BMW",
      modelo: "Serie 3",
      year: 2018,
      precio: 50000,
      puertas: 4,
      color: "Blanco",
      transmision: "automatico",
    },
    {
      marca: "BMW",
      modelo: "Serie 5",
      year: 2017,
      precio: 80000,
      puertas: 4,
      color: "Negro",
      transmision: "automatico",
    },
    {
      marca: "Mercedes Benz",
      modelo: "Clase C",
      year: 2018,
      precio: 40000,
      puertas: 4,
      color: "Blanco",
      transmision: "automatico",
    },
    {
      marca: "Audi",
      modelo: "A4",
      year: 2016,
      precio: 30000,
      puertas: 4,
      color: "Azul",
      transmision: "automatico",
    },
  ];
}

//Objeto en el que se almacenan los datos de los inputs del usuario que quiere buscar
let carsSearched = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

//* Esta variable contiene todos los elementos del carro
const autos = getCars();

//Detectar cuando la pagina se carga y ejecutar funcion
document.addEventListener("DOMContentLoaded", () => {
  showCars(autos);
});

//Funcion que crea un elemento html y agrega las caracteristicas del carro a el
function showCars(autos) {
  cleanHtml();

  autos.forEach((auto) => {
    const htmlCar = document.createElement("p");
    htmlCar.innerHTML = `
        <p> ${auto.marca} ${auto.modelo}  - ${auto.year} ${auto.puertas} Puertas - Transmision: ${auto.transmision} - Precio: $${auto.precio} - Color: ${auto.color}</p>
        `;
    container.appendChild(htmlCar);
  });
}

//* Filtrar los carros por todos los filtros, si es que el array de resultados regresa algo entonces se despliega
function filterCars() {
  const results = getCars()
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);
  if (results.length) {
    showCars(results);
  } else {
    noResult();
  }
}

//* Desplegar el error
function noResult() {
  cleanHtml();

  const noResultHtml = document.createElement("div");
  noResultHtml.classList.add("alerta", "error");
  noResultHtml.appendChild(document.createTextNode("No Result"));
  container.appendChild(noResultHtml);
}

//* Borrar los elementos html
function cleanHtml() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}


//* Todos los filtros que se van a usar, es decir aqui son las funciones utilizadas por el filter, y unicamente comprueban si en la base de carros los datos son iguales al objeto creado al hacer una busqueda, si es que ese input fue llenado, si no se regresan todos los carros

function filtrarMarca(car) {
  if (carsSearched.marca) {
    return carsSearched.marca === car.marca;
  } else {
    return car;
  }
}

function filtrarYear(car) {
  if (carsSearched.year) {
    return carsSearched.year === car.year;
  } else {
    return car;
  }
}

function filtrarMinimo(car) {
  if (carsSearched.minimo) {
    return car.precio >= carsSearched.minimo;
  } else {
    return car;
  }
}

function filtrarMaximo(car) {
  if (carsSearched.maximo) {
    return car.precio <= carsSearched.maximo;
  } else {
    return car;
  }
}

function filtrarPuertas(car) {
  if (carsSearched.puertas) {
    return car.puertas === carsSearched.puertas;
  } else {
    return car;
  }
}

function filtrarTransmision(car) {
  if (carsSearched.transmision) {
    return car.transmision === carsSearched.transmision;
  } else {
    return car;
  }
}

function filtrarColor(car) {
  if (carsSearched.color) {
    return car.color === carsSearched.color;
  } else {
    return car;
  }
}
