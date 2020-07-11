// Documento encargado de hacer la consulta al api y regresar el resultado en formato json

export class Api {
  constructor(artist, title) {
    this.artist = artist;
    this.title = title;
  }

  async getData() {
    const url = await fetch(`https://api.lyrics.ovh/v1/${this.artist}/${this.title}`);

    const res = await url.json();

    return res;

  }
}
