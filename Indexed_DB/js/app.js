let DB;

// Elementos del formulario
const form = document.querySelector("form"),
  nombreMascota = document.querySelector("#mascota"),
  nombreCliente = document.querySelector("#cliente"),
  telefono = document.querySelector("#telefono"),
  fecha = document.querySelector("#fecha"),
  hora = document.querySelector("#hora"),
  sintomas = document.querySelector("#sintomas"),
  cita = document.querySelector("#citas"),
  headingAdministra = document.querySelector("administra");

document.addEventListener("DOMContentLoaded", () => {
  let crearDB = window.indexedDB.open("citas", 1);

  crearDB.onerror = function () {
    console.log("Hubo un error");
  };

  crearDB.onsuccess = function () {
    console.log("Cargada correctamente");

    DB = crearDB.result;
  };

  //? Metodo que se ejecuta solo cuando es necesario volver a crear la base de datos o hacer algun cambio
  crearDB.onupgradeneeded = function (e) {
    let db = e.target.result;

    // En este metodo se toma el nombre de la base de datos asi como las opciones con las cuales se iniciaria
    //Keypath es el indice de la base de datos
    let objectStore = db.createObjectStore("citas", {
      keyPath: "key",
      autoIncrement: true,
    });

    objectStore.createIndex("mascota", "mascota", { unique: false });
    objectStore.createIndex("cliente", "cliente", { unique: false });
    objectStore.createIndex("telefono", "telefono", { unique: false });
    objectStore.createIndex("fecha", "fecha", { unique: false });
    objectStore.createIndex("hora", "hora", { unique: false });
    objectStore.createIndex("sintomas", "sintomas", { unique: false });

    console.log(objectStore);
  };

  form.addEventListener("submit", agregarDatos);

  function agregarDatos(e) {
    e.preventDefault();

    const nuevaCita = {
      mascota: nombreMascota.value,
      cliente: nombreCliente.value,
      telefono: telefono.value,
      fecha: fecha.value,
      hora: hora.value,
      sintomas: sintomas.value,
    };

    let transaction = DB.transaction(["citas"], "readwrite");

    let objectStore = transaction.objectStore("citas");
    console.log(objectStore);

    let peticion = objectStore.add(nuevaCita);

    peticion.onsuccess = () => {
      form.reset();
    };

    transaction.oncomplete = () => {
      console.log("completada");
    };

    transaction.onerror = () => {
      console.log("Error");
    };
  }

  function mostrarCitas() {
    while (citas.firstChild) {
      cita.remove(cita.firstChild);
    }

    let objectStore = DB.transaction("citas").objectStore("citas");

    //retorna peticion

    objectStore.openCursor().onsuccess = function (e) {
      let cursor = e.target.result;

      console.log(cursor);

      if (cursor) {
        let citasHtml = document.createElement("li");
        citasHtml.setAttribute("data-cita-id", cursor.value.key);
        citasHtml.classList.add("list-group-item");

        citasHtml.innerHTML = `<p class="font-weight-bold">Mascota: <span class="font-weight-normal">${cursor.value.mascota}</span></p>`;
      }
      citas.appendChild(citasHtml);
      cursor.continue();
    };
  }
});
