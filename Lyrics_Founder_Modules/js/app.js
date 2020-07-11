//Encargado de juntar tanto la interfaz como la capa de api

//* Se importa el documento de UI y ademas la clase Api
import * as UI from "./interfaz.js";
import { Api } from "./api.js";

//* Se registra el submit del boton y se ejecuta la aplicacion
UI.form.addEventListener("submit", (e) => {
  e.preventDefault();

  //Obtener datos del formulario

  const artist = document.getElementById("artista").value,
    song = document.getElementById("cancion").value;

  //Si esta vacio se ejecuta la aplicacion
  if (artist !== "" && song !== "") {
    const api = new Api(artist, song);
    // const lyrics =  api.getData().lyrics;
    //* Se hace el fetch a la aplicacion, y como eso regresa una promesa se obtiene el json y se accede al atributo de lyrics, una vez con esos datos se hace el display en pantalla
    const lyrics = api
      .getData()
      .then((data) => {
        if (data.lyrics) {
          const songLyrics = data.lyrics;
          UI.Divlyrics.innerHTML = `<p>${songLyrics}</p>`;
          UI.divMessages.innerHTML = "";
          UI.divMessages.classList.remove("error");
        } else {
          UI.divMessages.innerHTML = "Song not found";
          UI.divMessages.classList.add("error");
          UI.form.reset();
        }
      })
      .catch((error) => {
        console.log(`No se pudo encontrar la cancion ${error}`);
      });
  } else {
    UI.divMessages.innerHTML = "Error, please fill al data";
    UI.divMessages.classList.add("error");

    setTimeout(() => {
      UI.divMessages.innerHTML = "";
      UI.divMessages.classList.remove("error");
    }, 3000);
  }
});
