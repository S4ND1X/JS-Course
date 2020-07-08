//Obtener elementos de html
const shoppingCart = document.getElementById("carrito");

const courses = document.getElementById("lista-cursos");

const shoppingCartList = document.querySelector("#lista-carrito tbody");

const clearShoppingCart = document.getElementById("vaciar-carrito");

//Agregar los eventsListeners
eventListeners();


function eventListeners() {
  courses.addEventListener("click", courseToAdd);

  shoppingCart.addEventListener("click", removeCourse);

  clearShoppingCart.addEventListener("click", clearCart);

  document.addEventListener("DOMContentLoaded", readLocalStorage);
}

//*Mediante delegation se obtiene el click y si al elemento al que le dio contenia la clase 'agregar-carrito' se obtenia la informacion del curso
function courseToAdd(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    //?Se sube dos niveles ya que el boton de agregar esta como hijo del hijo de el contendor de la informacion del curso
    const course = e.target.parentElement.parentElement;

    getCourseData(course);
  }
}


//*Se obtiene toda la informacion del curso haciendo queries del elemento a sus respectivas clases, y asignandolas a los atributos del objeto courseData
function getCourseData(course) {
  const courseData = {
    img: course.querySelector("img").src,
    title: course.querySelector("h4").textContent,
    price: course.querySelector(".precio span").textContent,
    id: course.querySelector("a").getAttribute("data-id"),
  };

  insertCourse(courseData);
}

//* Ya con la informacion se crea un table row y que mediante template literals se crea el objeto html que contiene la informacion del curso al que cual se le hizo click y se agrega como un hijo del container del carrito ademas de guardarse en el local storage
function insertCourse(courseData) {
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>
            <img src="${courseData.img}">
        </td>
        <td>${courseData.title}</td>
        <td>${courseData.price}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${courseData.id}">x</a>
        </td>
    `;

  shoppingCartList.appendChild(row);
  saveCourseLocalStorage(courseData);
}

//* Para remover un curso se detecta el click en el boton de borrar, se sube dos niveles al container del curso y se borra del dom, ademas de guardar su id para posteriormente borrarlo de Local Storage
function removeCourse(e) {
  e.preventDefault();

  let course, courseID;

  if (e.target.classList.contains("borrar-curso")) {
    e.target.parentElement.parentElement.remove();
    course = e.target.parentElement.parentElement;
    courseID = course.querySelector("a").getAttribute("data-id");
  }
  removeCourseLocalStorage(courseID);
}

//* Esta funcion elimina todos los hijos contenidos en el carrito y limpia todo el Local Storage
function clearCart(e) {
  e.preventDefault();

  while (shoppingCartList.firstChild) {
    shoppingCartList.removeChild(shoppingCartList.firstChild);
  }

  localStorage.clear();
}

//* Se obtiene la informacion actual de local storage, si habia algo se agrega el nuevo curso y se guarda como string en el Local Storage
function saveCourseLocalStorage(courseData) {
  let courses = getCoursesLocalStorage();

  courses.push(courseData);

  localStorage.setItem("courses", JSON.stringify(courses));
}

//* Para obtener los cursos se comprueba que no este vacio, de estarlo se creo un array vacio o de lo contrario se obtiene la informacion en formato de string y se convierte a array mediante la libreria de JSON
function getCoursesLocalStorage() {
  let coursesLS;

  if (localStorage.getItem("courses") === null) {
    coursesLS = [];
  } else {
    coursesLS = JSON.parse(localStorage.getItem("courses"));
  }

  return coursesLS;
}

//* Para desplegar los cursos al cargar la pagina se obtienen los datos actuales y para cada curso encontrado se crea su elemento html y se hace un append al contendor del carrito
function readLocalStorage() {
  let coursesLS = getCoursesLocalStorage();

  console.log(coursesLS);

  coursesLS.forEach((course) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
                <img src="${course.img}">
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${course.id}">x</a>
            </td>
        `;
    shoppingCartList.appendChild(row);
  });
}

//* Para borrar un curso del local storage, se recorre cada curso y si el ID recibido es igual al guardado se remueve del array mediante la funcion splice, despues se guarda el nuevo array como string en el Lolcal Storage
function removeCourseLocalStorage(courseID) {
  let coursesLS = getCoursesLocalStorage();

  coursesLS.forEach((course, index) => {
    if (course.id === courseID) {
      coursesLS.splice(index, 1);
    }
  });
  localStorage.setItem("courses", JSON.stringify(coursesLS));
}
