const btn = document.getElementById("cargar");

const listado = document.getElementById("listado");

//*Detectar click para hacer el request al restApi

btn.addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);

  //* Una vez haya tenido exito el request este obtendra todos los objetos los convierte y por cada uno se hace su template
  xhr.onload = function () {
    if (this.status === 200) {
      const posts = JSON.parse(this.responseText);
      let postHtml;
      posts.forEach((post) => {
        postHtml += `
            <h1>${post.title}</h1>
            <p>${post.body}</p>
        `;
        listado.innerHTML = postHtml;
      });
    }
  };
  xhr.send();
});
