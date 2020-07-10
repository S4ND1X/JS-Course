
const employees = document.getElementById('empleados');
const employee = document.getElementById('empleado');

const btn = document.getElementById('boton1');
const btn2 = document.getElementById('boton2');


btn.addEventListener('click', ()=>{
    const xhr = new XMLHttpRequest();
        xhr.open('GET', 'empleado.json', true);

    xhr.onload = function(){
        if(this.status === 200){
           const persona = (JSON.parse(this.responseText));

           const htmlTempl = `
           <ul>
            <li> ID: ${persona.id}</li>
            <li> Nombre: ${persona.nombre}</li>
            <li> Empresa: ${persona.empresa}</li>
            <li> Actividades: ${persona.trabajo}</li>
           </ul>
           `

           employee.innerHTML = htmlTempl;
        }
    }

    xhr.send();

});

btn2.addEventListener('click', ()=>{
    const xhr = new XMLHttpRequest();
        xhr.open('GET', 'empleados.json', true);

    xhr.onload = function(){
        if(this.status === 200){
           const personas = (JSON.parse(this.responseText));

           let htmlTempl;
           personas.forEach(persona =>{
            htmlTempl += `
            <ul>
             <li> ID: ${persona.id}</li>
             <li> Nombre: ${persona.nombre}</li>
             <li> Empresa: ${persona.empresa}</li>
             <li> Actividades: ${persona.trabajo}</li>
            </ul>
            `;
        })
            employee.innerHTML = htmlTempl;
        }
    }

    xhr.send();

});
