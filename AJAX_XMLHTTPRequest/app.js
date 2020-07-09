const submit = document.getElementById("cargar");



//Detectar el click y ejecutar la funcion
submit.addEventListener("click", () => {

    //? Se crea un objeto de tipo XMLHttpRequest el cual ayuda a solicitar informacion sin necesidad de recrgar toda la pagina
  const xhr = new XMLHttpRequest();
  //? Se utiliza el metodo open donde se configura la conexion, Get es para decir que quieres obtener informacion, despues se la pasa la url o la ubicacion de a que hacer la peticion y true es para inidicar que si es asincrona la conexion
  xhr.open("GET", "datos.txt", true);

  //?On load es para indicar que una vez que la conexion haya carga se ejcuta alguna funcion
  xhr.onload = function(){
    //* 200 Correcto, 403: prohibido, 404: no encontrado
    if (this.status === 200) {
      document.getElementById('listado').innerHTML = `<h1> ${this.responseText} </h1>`
    }
  };

  //?Al final es cuando se llama a la conexion, aqui es donde se envia la conexion y despues se ejecuta onLoad
  xhr.send();
});
