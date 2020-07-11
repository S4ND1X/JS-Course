// Documento encargado de hacer la consulta al api y regresar el resultado en formato json
//*La clase Api contiene el artista y la cancion a hacer request
export class Api {
  constructor(artist, title) {
    this.artist = artist;
    this.title = title;
  }

  //* Se declara el metodo asincrono, que hara el fetch al api
  async getData() {
    //* Se declara el fetch y se utiliza await para esperar a que se termine de hacer el fetch y se agregan los endpoints
    const url = await fetch(
      `https://api.lyrics.ovh/v1/${this.artist}/${this.title}`
    );

    //* Y por utlimo se convierte la respuesta a formato JSON igualmente con await para esperar a que termine de convertirse
    const res = await url.json();

    return res;
  }
}
