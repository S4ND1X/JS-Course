//* Mensaje pidiendo input del presupueto de la semana en cuanto inicia la aplicacion
const userBudget = prompt("Cual es tu presupuesto semanal?");

//* Obtener contenedor del formulario
const form = document.getElementById("agregar-gasto");

let budget;

//* Esta clase se encarga de mantener el presupuesto inicial ademas de llevar la cuenta de cuanto se ha gastado
class Budget {
  constructor(userBudget) {
    this.userBudget = Number(userBudget);
    this.userBudgetLeft = Number(userBudget);
  }

  //* El presupuesto que queda es igual al actual menos alguna cantidad
  userBudgetLeftFunc(quantity) {
    return (this.userBudgetLeft -= Number(quantity));
  }
}

//* La clase de interfaz se va a encargar de mostrrar todos los componentes visuales
class Interface {
  //* Se recibe la cantidad a desplegar y se obtiene el elemento en donde se va a mostra y se pone
  insertBudget(quantity) {
    const budgetSpan = document.querySelector("span#total");
    const budgetLeft = document.querySelector("span#restante");

    budgetSpan.innerHTML = `${quantity}`;
    budgetLeft.innerHTML = `${quantity}`;
  }

  //* Se muestra un mensaje y dependiendo el tipo seria rojo o verde
  showMessage(message, type) {
    const divMessage = document.createElement("div");
    divMessage.classList.add("text-center", "alert");
    if (type === "error") {
      divMessage.classList.add("alert-danger");
    } else {
      divMessage.classList.add("alert-success");
    }

    divMessage.appendChild(document.createTextNode(message));

    document.querySelector(".primario").insertBefore(divMessage, form);
  }

  //* Se obtiene el gasto con su nombre para posteriormente desplegarlo como un hijo de la lista desordenada
  addExpenseList(expenseName, expenseQuantity) {
    const expenseList = document.querySelector("#gastos ul");
    const li = document.createElement("li");

    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
        ${expenseName}
        <span class="badge badge-primary badge-pill">$ ${expenseQuantity}</span>
      `;

    expenseList.appendChild(li);
  }

  //* Se obtiene cuando se gasto, se actualiza la interfaz y al mismo tiempo se comprueba cuanto porcentaje del total queda
  budgetLeftUser(expenseQuantity) {
    const budgetLeftText = document.querySelector("span#restante");
    const leftOver = budget.userBudgetLeftFunc(expenseQuantity);
    budgetLeftText.innerHTML = leftOver;

    this.checkBudget();
  }

  //* Dependiendo del porcentaje total del presupuesto que queda es el color que se despliega
  checkBudget() {
    const totalBudget = budget.userBudget;
    const totalLeftBudget = budget.userBudgetLeft;

    if (totalBudget / 4 > totalLeftBudget) {
      const left = document.querySelector(".restante");
      left.classList.remove("alert-success", "alert-warning");
      left.classList.add("alert-danger100");
    } else if (totalBudget / 2 > totalLeftBudget) {
      const left = document.querySelector(".restante");
      left.classList.remove("alert-success");
      left.classList.add("alert-warning");
    }
  }
}

//* Se comprueba al cargar la pagina que el presupuesto ingresado sea valido
document.addEventListener("DOMContentLoaded", () => {
  if (userBudget === null || userBudget == "") {
    window.location.reload();
  } else {
    budget = new Budget(userBudget);

    const ui = new Interface();
    ui.insertBudget(budget.userBudget);

    console.log(budget.userBudget);
  }
});

//* Se detecta cuando se envia el formulario, se comprueba que sea valido, se obtienen los valores y se pasan a el objeto budget para que hara las respectivas evaluaciones

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const expenseName = document.querySelector("#gasto").value;
  const expenseQuantity = document.querySelector("#cantidad").value;

  const ui = new Interface();

  if (expenseName === "" || expenseQuantity === "") {
    ui.showMessage("No Data", "error");
  } else {
    ui.showMessage("Done", "correcto");
    ui.addExpenseList(expenseName, expenseQuantity);
    ui.budgetLeftUser(expenseQuantity);
  }

  setTimeout(() => {
    document.querySelector(".primario .alert").remove();
    form.reset();
  }, 3000);
});
