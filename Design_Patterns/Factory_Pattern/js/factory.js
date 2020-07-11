//* Factory te ayuda a crear objetos que tienen caracteristicas en comun entonces puede estar recibiendo mismos parametros pero dependiendo que sea puedes crear su tipo de elemento

// Se va a crear el objeto de la factory
function ConstructorSitios() {
  this.createElement = function (text, type) {
    let html;

    //* Se va a recibir un texto y un tipo, dependiendo de ese input se va a llamar a una funcion dependiendo de que objeto se quiera construir
    if (type === "input") {
      html = new InputHtml(text);
    } else if (type === "img") {
      html = new ImageHTML(text);
    } else if (type === "h1") {
      html = new HeadingHTML(text);
    } else if (type === "p") {
      html = new ParrafoHTML(text);
    }

    //* Al objeto html se le asigna el tipo para poder referenciarlo mas facil
    html.type = type;

    //* La funcion ahow se encarga de agregar el elemento creado al html y dependiendo del elemento se agrega su atributo 
    html.show = function () {
      const element = document.createElement(this.type);
      if (type === "input") {
        element.setAttribute("placeholder", this.text);
      } else if (type === "img") {
        element.setAttribute("src", this.text);
      } else if (type === "h1") {
        element.appendChild(document.createTextNode(this.text));
      } else if (type === "p") {
        element.appendChild(document.createTextNode(this.text));
      }
      //* Se agrega al html
      document.getElementById("app").appendChild(element);
    };

    return html;
  };
}
//* Las funciones para asignar el texto a cada elemento
const InputHtml = function (text) {
  this.text = text;
};
const ImageHTML = function (text) {
  this.text = text;
};
const HeadingHTML = function (text) {
  this.text = text;
};
const ParrafoHTML = function (text) {
  this.text = text;
};

//* Crear el objeto factory
const sitioWeb = new ConstructorSitios();

//* Array para contener los elementos
const elementosWeb = [];

elementosWeb.push(sitioWeb.createElement("Hola que tal", "h1"));
elementosWeb.push(sitioWeb.createElement("Este es mi sitio", "p"));
elementosWeb.push(sitioWeb.createElement("../dinero.svg", "img"));
elementosWeb.push(sitioWeb.createElement("conoce mas", "input"));

elementosWeb.forEach((element) => {
  element.show();
});

