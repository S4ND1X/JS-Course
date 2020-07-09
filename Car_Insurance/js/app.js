const form = document.getElementById('cotizar-seguro');

function Seguro(brand, year, type) {
    this.brand = brand;
    this.year = year;
    this.type = type;
}
Seguro.prototype.cotizarSeguro = function(){


    let cantidad;
    const basePrice = 2000;
    console.log(this.brand);
    console.log(basePrice);
    switch(this.brand){
        case '1': 
            cantidad = basePrice*1.15;
            break;
        case '2':  
            cantidad = basePrice*1.05;
            break;
        case '3': 
            cantidad = basePrice*1.35;
            break;
    }

    const yearDiff = new Date().getFullYear() - this.year;

    cantidad -= ((yearDiff * 3) * cantidad) /100;

    if(this.type === 'basico'){
        cantidad *= 1.3;
    }else{
        cantidad *= 1.5;
    }

    return cantidad;

}


function Interface(){


    Interface.prototype.showError = (message, type) =>{
        const div = document.createElement('div');

        if(type === 'error'){
            div.classList.add('mensaje', 'error');
        }else{
            div.classList.add('mensaje', 'correcto');
        }

        div.innerHTML = `${message}`;
        form.insertBefore(div, document.querySelector('.form-group'));

        setTimeout(() =>{
            document.querySelector('.mensaje').remove();
        }, 3000)
    }


    Interface.prototype.showAnswer = (seguro, quantity) =>{
        const resultado =  document.getElementById('resultado');
        let marca;
        
        switch(seguro.brand){
            case '1':
                marca = 'Americano';
                break;
            case '2':
                marca = 'Asiatico';
                break;
            case '3':
                marca = 'Europeo';
                break;
        }

        const div = document.createElement('div');

        div.innerHTML = `
            <p class='header'>Resumen:</p>
            <p>Marca ${marca}</p>
            <p>Año: ${seguro.year}</p>
            <p>Tipo: ${seguro.type}</p>
            <p>Total: $ ${quantity}</p>
        `;

        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        formButton.disabled = true;
        formButton.style.cursor = 'progress'
        setTimeout(()=>{
            spinner.style.display = 'none';
            resultado.appendChild(div);
            formButton.disabled = false;
            formButton.style.cursor = 'pointer';
        }, 3000)
    }


    console.log(formButton);
   

}

const formButton = document.querySelector('.form-group button');

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const brand = document.getElementById('marca');
    const brandChoosen = brand.options[brand.selectedIndex].value;
    
    const year = document.getElementById('anio');
    const yearChoosen = year.options[year.selectedIndex].value;

    
    const type = document.querySelector('input[name="tipo"]:checked').value;



    const interface = new Interface();

    if(brandChoosen === '' || yearChoosen === '' || type ===''){
        interface.showError('Please fill all data', 'error');
    }else{

        const resultados = document.querySelector('#resultado div');

        if(resultados != null){
            resultados.remove();
        }

        const seguro = new Seguro(brandChoosen, yearChoosen, type);

        const quantity = seguro.cotizarSeguro();
        interface.showAnswer(seguro, quantity);
        interface.showError('Cotizando...', 'correcto');
    }
    
});

const max = new Date().getFullYear(),
  min = max - 20;

console.log(max);

const selectYear = document.getElementById("anio");

for (let index = max; index >=min; index--) {
   let option = document.createElement('option');
   option.value = index;
   option.innerHTML = index;
   selectYear.appendChild(option);
}
