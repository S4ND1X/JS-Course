//Object literal
const client = {
  name: "Juan",
  salary: 500,
  clientType: () => {
    let type;
    if (this.salary > 1000) {
      type = "Gold";
    } else {
      type = "Silver";
    }
    return type;
  },
};

console.log(client.clientType());

//?Protipos te perimite agregar funciones a tus objetos sin hacerlos muy granes de esta manera

const ClientProto = {
  name: "Pedro",
  salary: 100000,
}

ClientProto.prototype.clientType2 = function()  {
    let type;
    if (this.salary > 1000) {
      type = "Gold";
    } else {
      type = "Silver";
    }
    return type;
  };


  console.log(ClientProto.clientType2());
