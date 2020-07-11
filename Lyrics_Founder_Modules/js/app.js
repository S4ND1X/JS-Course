//Encargado de juntar tanto la interfaz como la capa de api

import * as UI from "./interfaz.js";
import { Api } from "./api.js";
UI.form.addEventListener("submit", (e) => {
  e.preventDefault();

  //Obtener dato del formulario

  const artist = document.getElementById("artista").value,
    song = document.getElementById("cancion").value;

  if (artist !== "" && song !== "") {
    const api = new Api(artist, song);
    // const lyrics =  api.getData().lyrics;
    const lyrics = api.getData().then((data) => {
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
    }).catch(error =>{
        console.log(`No se pudo encontrar la cancion ${error}`)
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