const shoppingCart = document.getElementById("carrito");

const courses = document.getElementById("lista-cursos");

const shoppingCartList = document.querySelector("#lista-carrito tbody");

const clearShoppingCart = document.getElementById("vaciar-carrito");

eventListeners();

function eventListeners() {
  courses.addEventListener("click", courseToAdd);

  shoppingCart.addEventListener("click", removeCourse);

  clearShoppingCart.addEventListener("click", clearCart);

  document.addEventListener("DOMContentLoaded", readLocalStorage);
}

function courseToAdd(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const course = e.target.parentElement.parentElement;

    getCourseData(course);
  }
}

function getCourseData(course) {
  const courseData = {
    img: course.querySelector("img").src,
    title: course.querySelector("h4").textContent,
    price: course.querySelector(".precio span").textContent,
    id: course.querySelector("a").getAttribute("data-id"),
  };

  insertCourse(courseData);
}

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

function clearCart(e) {
  e.preventDefault();

  while (shoppingCartList.firstChild) {
    shoppingCartList.removeChild(shoppingCartList.firstChild);
  }

  localStorage.clear();
}

function saveCourseLocalStorage(courseData) {
  let courses = getCoursesLocalStorage();

  courses.push(courseData);

  localStorage.setItem("courses", JSON.stringify(courses));
}

function getCoursesLocalStorage() {
  let coursesLS;

  if (localStorage.getItem("courses") === null) {
    coursesLS = [];
  } else {
    coursesLS = JSON.parse(localStorage.getItem("courses"));
  }

  return coursesLS;
}

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

function removeCourseLocalStorage(courseID) {
  let coursesLS = getCoursesLocalStorage();

  coursesLS.forEach((course, index) => {
    if (course.id === courseID) {
      coursesLS.splice(index, 1);
    }
  });
  localStorage.setItem("courses", JSON.stringify(coursesLS));
}
