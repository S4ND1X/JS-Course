//Fetching data from API

const quoteContainer = document.getElementById("quote-container");
const quotePlaceHolder = document.getElementById("quote");
const authorPlaceHolder = document.getElementById("author");
const tweetBtn = document.getElementById("twitter");
const quoteBtn = document.getElementById("new-quote");

document.addEventListener("DOMContentLoaded", () => {
  getQuote()
    .then((response) => {
      updateInterface(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

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

function tweetQuote() {
  const quote = quotePlaceHolder.innerText;
  const author = authorPlaceHolder.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

quoteBtn.addEventListener("click", () => {
  getQuote()
    .then((response) => {
      updateInterface(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

tweetBtn.addEventListener("click", tweetQuote);

function updateInterface({ author, en }) {
  if (en.lenght > 60) {
    quotePlaceHolder.classList.add("long-quote");
  } else {
    quotePlaceHolder.classList.remove("long-quote");
  }

  quotePlaceHolder.innerText = en;
  authorPlaceHolder.innerText = author;
}
