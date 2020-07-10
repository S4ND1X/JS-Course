class API {
  async getData() {
    const total = 500;

    const data = await fetch(
      `https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`
    );

    const response = await data.json();
    
    return response;
  }
}
