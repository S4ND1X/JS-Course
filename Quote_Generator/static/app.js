//Fetching data from API

const quoteContainer = document.getElementById("quote-container");
// Esenciales
const quotePlaceHolder = document.getElementById("quote");
const authorPlaceHolder = document.getElementById("author");
const tweetBtn = document.getElementById("twitter");
const quoteBtn = document.getElementById("new-quote");

const loader = document.getElementById("loader");

// Loader
function loading() {
  loader.innerHTML = `
                    <div></div>
                    <div></div>`;
  quoteContainer.hidden = true;
}

function completed() {
  quoteContainer.hidden = false;
  loader.innerHTML = ``;
}

document.addEventListener("DOMContentLoaded", () => {
  loading();
  getQuote()
    .then((response) => {
      updateInterface(response);
      completed();
    })
    .catch((error) => {
      console.log(error);
    });
});

// Fetch to API

async function getQuote() {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  try {
    const apiUrl =
      "https://programming-quotes-api.herokuapp.com/quotes/random/lang/en";
    const response = await fetch(apiUrl);

    return await response.json();
  } catch (error) {
    getQuote();
  }
}

// Twitter api

function tweetQuote() {
  const quote = quotePlaceHolder.innerText;
  const author = authorPlaceHolder.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// New quote button calls the api function and updates the interface
quoteBtn.addEventListener("click", () => {
  loading();
  getQuote()
    .then((response) => {
      updateInterface(response);
      completed();
    })
    .catch((error) => {
      console.log(error);
    });
});

tweetBtn.addEventListener("click", tweetQuote);

// Get the placeholer and insert the author

function updateInterface({ author, en }) {
  if (en.lenght > 60) {
    quotePlaceHolder.classList.add("long-quote");
  } else {
    quotePlaceHolder.classList.remove("long-quote");
  }

  quotePlaceHolder.innerText = en;
  authorPlaceHolder.innerText = author;
  completed();
}
