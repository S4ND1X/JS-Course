//* Seleccionar el contender o el div que contendra a los elementos de los tweets
const listaTweets = document.querySelector("#lista-tweets");

//* Funcion en la cual se agregan todos los eventsListeners que se necesitaran
eventListeners();

function eventListeners() {
  //* Cuando se da click a al boton con el id tweet_btn se ejecuta la funcion agregarTweet
  document.querySelector("#tweet_btn").addEventListener("click", agregarTweet);

  //* Borrar tweets (delegation), se le agrega el listener al contendor de tweets para que no se tenga que detectar el elemento en toda la pagina
  //? Delegation es el delegar la accion de escuchar un evento a algun componente mas especifico a la region en la que se espera tener un click
  listaTweets.addEventListener("click", borrarTweet);

  //? DOMContentLoaded se usa cuando necesitas detectar si el DOM ya ha sido cargado, es decir cuando se quiere detectar que el HTML ya fue cargado y parseado a DOM, pero sin haber cargado todavia imagenes y hojas de estilo.
  document.addEventListener("DOMContentLoaded", cargarTweetsInicio);
}

// Añadir a la lista
function agregarTweet(e) {
  //? e.preventDefault se usa para prevenir la accion por default de ese evento, por ejemplo cuando le das click a un boton de submit la accion por default sera hacer un submit, pero haciendo esto puedes tener control de que accion se va a ejecutar al hacer el submit
  e.preventDefault();

  //* Se busca el elemento que tenga el id tweet_text, en este caso es el textarea, por lo que se obtiene el string de lo que este escrito
  const tweet = document.querySelector("#tweet_text").value.trim();

  //* Se crea un link para que se le pueda dar click y que funcione como boton de elimiar el tweet al que este ahijado
  const borrar_tweet = document.createElement("a");
  //* Se le agrega la clase borrar-tweet que servira tantao para estilos, como para referenciarlo
  borrar_tweet.classList = "borrar-tweet";
  borrar_tweet.innerText = "X";

  //* Se crea un list item el cual tendra como texto el tweet que se obtuvo en el textarea y ademas a este se le agrega el link de borrar tweet, o sea tiene tanto un texto como <a> con el icono de borrar
  const tweet_list_item = document.createElement("li");
  //Darle el valor del text area
  tweet_list_item.innerText = tweet;
  //Agregarle a la lista de tweet un link para poder borrarlo
  tweet_list_item.appendChild(borrar_tweet);

  //* Se accede al contenedor de los tweets y se le agregara como hijo el nuevo list item 
  listaTweets.appendChild(tweet_list_item);

  //* Ademas el string del textarea se guarda en el local storage para que ya este ahi
  agregarTweetToLocalStorage(tweet);
}

//Elimnar tweet del dom
function borrarTweet(e) {
  e.preventDefault();

  //* Se detecta el click dentro de la lista de tweets, pero unicamente si a lo que se le dio click tiene la clase borrar-tweet entonces ahi es donde se sube un nivel y borra el elemento, como el link de borrar es hijo del LI que contiene tanto el tweet como el mismo icono de borrar, por eso se borra el padre del link, ademas se borra del local storage el string del tweet
  if (e.target.className === "borrar-tweet") {
    e.target.parentElement.remove();
    borrarTweetLocalStorage(e.target.parentElement.innerText);
  }
}

//* Se obtienen todos los datos guardados del local storage, a ese arreglo se le agrega el nuevo tweet y se vuelve a guardar todo el arreglo en formato de string 
function agregarTweetToLocalStorage(tweet) {
  let tweets = obtenerTweetsLocalStorage();

  tweets.push(tweet);

  localStorage.setItem("tweets", JSON.stringify(tweets));
}

//* Se comprueba si ya extisten tweets, de ser asi se convierten todos los datos a un JSON
function obtenerTweetsLocalStorage() {
  let tweets;

  if (localStorage.getItem("tweets") === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem("tweets"));
  }

  return tweets;
}


//* Se obtienen todos los datos de tweets que esten guardados en el local storage, y para cada uno de ellos se crea de nuevo tanto el list item, como el icono de borrar, al final es como agregar un tweet solo que en este caso este metodo se ejecuta siempre que se recarge la pagina
function cargarTweetsInicio() {
  let tweets = obtenerTweetsLocalStorage();

  tweets.forEach((tweet) => {
    const borrar_tweet = document.createElement("a");
    borrar_tweet.classList = "borrar-tweet";
    borrar_tweet.innerText = "X";

    // Crear un li para agregarlo al componente de lista de tweets
    const tweet_list_item = document.createElement("li");
    //Darle el valor del text area
    tweet_list_item.innerText = tweet;
    //Agregarle a la lista de tweet un link para poder borrarlo
    tweet_list_item.appendChild(borrar_tweet);

    //Agregar a la lista de tweets el nuevo list item que es un tweet
    listaTweets.appendChild(tweet_list_item);
  });
}

//* para borrar los tweets se obtienen todos los tweets, y del tweet a borrar se le quita el character del boton de borrar, ya se que guardo de la siguiente manera, myTweetX, entonces siempre se le quitara el ultimo elemento, y por cada tweet,se recorre el arreglo y se busca que coicida el tweet a borrar como el guardado en el local storage, por lo que se borra el que este en la posicion que coincidan por ultimo se guarda el nuevo arreglo en el local storag convirtiendo el json de los tweets a un string
function borrarTweetLocalStorage(tweet) {
  let tweets = obtenerTweetsLocalStorage();
  let tweetABorrar = tweet.substring(0, tweet.length - 1);

  tweets.forEach((tweet, index) => {
    if (tweetABorrar === tweet) {
      tweets.splice(index, 1);
    }
  });

  localStorage.setItem("tweets", JSON.stringify(tweets));
}
