// Variables

const listaTweets = document.querySelector("#lista-tweets"); //Seleccionar el contenedor de los tweets

// Event Listeners

eventListeners();

function eventListeners() {
  // Cuando se da click a al boton cxon el id twee_btn se ejecuta la funcion agregarTweet
  document.querySelector("#tweet_btn").addEventListener("click", agregarTweet); // Agregar eventListener y con la funcion click ya que es un boton de tipo button

  //Borrar tweets (delegation)
  listaTweets.addEventListener("click", borrarTweet);

  //Contenido cargado
  document.addEventListener("DOMContentLoaded", cargarTweetsInicio);
}

// Funciones

// Añadir a la lista
function agregarTweet(e) {
  e.preventDefault();
  // leer valor de textarea
  const tweet = document.querySelector("#tweet_text").value.trim();

  //Boton para eliminar tweet
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

  //Agregar el contenido del textarea al local storage
  agregarTweetToLocalStorage(tweet);
}

//Elimnar tweet del dom
function borrarTweet(e) {
  e.preventDefault();

  //Detectar si el elemento al que se le hizo click tiene la clase borrar-tweet, si es asi, nos vamos al padre y se borra el elemento padre, es decir el tweet_list_item
  if (e.target.className === "borrar-tweet") {
    e.target.parentElement.remove();
    borrarTweetLocalStorage(e.target.parentElement.innerText);
  }
}

function agregarTweetToLocalStorage(tweet) {
  let tweets = obtenerTweetsLocalStorage();

  tweets.push(tweet);

  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function obtenerTweetsLocalStorage() {
  let tweets;

  if (localStorage.getItem("tweets") === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem("tweets"));
  }

  return tweets;
}

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


function borrarTweetLocalStorage(tweet){
    let tweets = obtenerTweetsLocalStorage();
    let tweetABorrar = tweet.substring(0,tweet.length-1);

    tweets.forEach((tweet, index) => {
        if(tweetABorrar == tweet){
            tweets.splice(index, 1);
        }
    });

    

    localStorage.setItem('tweets', JSON.stringify(tweets));
}
