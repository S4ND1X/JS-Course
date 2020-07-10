class API {


  //* Declaracion de funcion asincrona, es decir que tendra que esperar a ciertos procesos
  async getData() {
    //*Cantidad total de datos regresados, max = 10080
    const total = 500;

    //* En data se guarda la informacion regresada por el api, pero se utiliza await para esperar este proceso antes de seguir al siguiente
    const data = await fetch(
      `https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`
    );

    //* Una vez obtenida la informacion en data se utiliza await para esperar a que se parse correctamente el objeto regresado a fromato JSON
    const response = await data.json();


      //* Al final se regresa la informacion
    return response;
  }
}
