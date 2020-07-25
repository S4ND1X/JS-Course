//Fetching data from API

const quoteContainer = document.getElementById("quote-container");
const quotePlaceHolder = document.getElementById("quote");
const authorPlaceHolder = document.getElementById("author");
const tweetBtn = document.getElementById("twitter");
const quoteBtn = document.getElementById("new-quote");

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

quoteBtn.addEventListener("click", () => {
  getQuote()
    .then((response) => {
      updateInterface(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

function updateInterface({ author, en }) {
  if (en.lenght > 60) {
    quotePlaceHolder.classList.add("long-quote");
  } else {
    quotePlaceHolder.classList.remove("long-quote");
  }

  quotePlaceHolder.innerText = en;
  authorPlaceHolder.innerText = author;
}
