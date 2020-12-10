//

const count = 10;
const apiKey = "GVQFdMYB2OHduR1ng45kr5-bjd_CXLTzkGRHkB0M5hg";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

async function getImages() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}


function displayImages(){

}

getImages();
