const userBudget = prompt("Cual es tu presupuesto semanal?");

const form = document.getElementById("agregar-gasto");

let budget;

class Budget {
  constructor(userBudget) {
    this.userBudget = Number(userBudget);
    this.userBudgetLeft = Number(userBudget);
  }

  userBudgetLeftFunc(quantity) {
    return (this.userBudgetLeft -= Number(quantity));
  }
}

class Interface {
  insertBudget(quantity) {
    const budgetSpan = document.querySelector("span#total");
    const budgetLeft = document.querySelector("span#restante");

    budgetSpan.innerHTML = `${quantity}`;
    budgetLeft.innerHTML = `${quantity}`;
  }

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

  budgetLeftUser(expenseQuantity) {
    const budgetLeftText = document.querySelector("span#restante");
    const leftOver = budget.userBudgetLeftFunc(expenseQuantity);
    budgetLeftText.innerHTML = leftOver;

    this.checkBudget();
  }

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

    console.log(budget);
  }
}

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
