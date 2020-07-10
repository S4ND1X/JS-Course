//*Esta clase ya viene por default al usar la aplicaicon de leeftLeaf
class UI {
  constructor() {
    //*Se crea una nueva api que contiene el json regresado por la api
    this.api = new API();

    //? Se crea una nueva capa, como si fuera photoshop ya que los pines se renderizan encima de la capa del mapa
    this.markers = new L.LayerGroup();

    // Iniciar el mapa
    this.mapa = this.inicializarMapa();
  }

  //* Este metodo viene por default, donde se crea un mapa con cierta latitud y longitud ademas de un zoom
  inicializarMapa() {
    // Inicializar y obtener la propiedad del mapa
    const map = L.map("mapa").setView([19.390519, -99.3739778], 6);
    //*Aqui se declara el footer del mapa con elementos que contendra, y al final se agregan encima del mapa
    const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; " + enlaceMapa + " Contributors",
      maxZoom: 18,
    }).addTo(map);
    return map;
  }

  //* En este metodo obtenemos la informacion del api, y ya que es asincrona es como trabajar con promesas por lo que se utiliza .then para en caso de ser exitosa la conexion, utilizar los datos regresados
  showBuildings() {
    this.api.getData().then((datos) => {
      const resultados = datos.results;
      //* Una vez accedito a los results dados por la api estos se pasan a la funcion que se encargara de dibujarlos
      //showPins
      this.showPins(resultados);
    }).catch((error) =>{
      console.log(`No se pudo obtener la informacion de la API => ${error}`);
    });
  }

  //* Metodo encargado de dibujar los pines sobre el mapa
  showPins(datos) {
    //* Primero se limpia cualquier layer que este antes
    this.markers.clearLayers();

    //*De los datos obtenidos para cada uno solo seleccionamos algunos atributos usando destructuring
    datos.forEach((element) => {
      const { latitude, longitude, calle, regular, premium } = element;

      //? Popup es el cuadro que sale al darle click a algun pin, en este se mostrara la calle, y el precio de la gasolina regular y premium
      const opcionesPopUp = L.popup().setContent(`<p>Calle: ${calle}</p>
                    <p><b>Regular:${regular}</b></p>
                    <p><b>Premium:${premium}</b></p>`);

      //? Marker es el pin a crear en el cual se le dan como parametros la latitud y longitud y posteriormente se agregan a la capa de los pines 
      const marker = new L.marker([
        parseFloat(latitude),
        parseFloat(longitude),
      ]).bindPopup(opcionesPopUp);
      this.markers.addLayer(marker);
    });
    //* Por ultimo se agrega la capa con todos los pines al mapa
    this.markers.addTo(this.mapa);
  }

  obtenerSugerencias(search) {
    //* Para obtener nuevos resultados basados en solamente la busqueda del usuario se hace una consulta de nuevo al api y con ;la busqueda hecha se manda a la funcion de filtrar los datos
    this.api.getData().then((response) => {
      const resultados = response.results;

      this.filterData(resultados, search);
    });
  }

  //* Una vez con los datos en la mano se filtra buscando cuales de ellos tienen una calle que contenga la palabra buscada y las que encuentre se mandan a pintar
  filterData(resultados, search) {
    const filtro = resultados.filter(
      (element) => element.calle.indexOf(search) !== -1
    );
    this.showPins(filtro);
  }
}
