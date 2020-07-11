//* Para simular la encapsulacion  se crea esta estructura que lo que esta dentro de mostrar boleto es publico mientras que lo que esta dentro de comprarBoleto es privado
const comprarBoleto = (function () {
  let evento = "Udemy Bootcamp";

  const adquirirBolet = () => {
    const elemento = document.createElement("p");
    elemento.textContent = `Comprando boleto para ${evento}`;
    document.getElementById("app").appendChild(elemento);
  };

  return {
    mostrarBoleto: function () {
      adquirirBolet();
    },
  };
})();

//* Se ejecuta ya que mostrar boleto esta dentro del scope publico
comprarBoleto.mostrarBoleto();
//* Esta linea dara error ya que evento es privado
console.log(comprarBoleto.evento);
