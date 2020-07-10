class UI {
  constructor() {
    this.api = new API();

    this.markers = new L.LayerGroup();

    // Iniciar el mapa
    this.mapa = this.inicializarMapa();
  }

  inicializarMapa() {
    // Inicializar y obtener la propiedad del mapa
    const map = L.map("mapa").setView([19.390519, -99.3739778], 6);
    const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; " + enlaceMapa + " Contributors",
      maxZoom: 18,
    }).addTo(map);
    return map;
  }

  showBuildings() {
    this.api.getData().then((datos) => {
      const resultados = datos.results;

      //showPins
      this.showPins(resultados);
    });
  }

  showPins(datos) {
    this.markers.clearLayers();

    datos.forEach((element) => {
      const { latitude, longitude, calle, regular, premium } = element;

      const opcionesPopUp = L.popup().setContent(`<p>Calle: ${calle}</p>
                    <p><b>Regular:${regular}</b></p>
                    <p><b>Premium:${premium}</b></p>`);

      const marker = new L.marker([
        parseFloat(latitude),
        parseFloat(longitude),
      ]).bindPopup(opcionesPopUp);
      this.markers.addLayer(marker);
    });
    this.markers.addTo(this.mapa);
  }

  obtenerSugerencias(search) {
    this.api.getData().then((response) => {
      const resultados = response.results;

      this.filterData(resultados, search);
    });
  }

  filterData(resultados, search) {
    const filtro = resultados.filter(
      (element) => element.calle.indexOf(search) !== -1
    );
    this.showPins(filtro);
  }
}
