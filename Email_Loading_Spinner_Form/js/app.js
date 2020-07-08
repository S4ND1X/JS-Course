
//Obtener todos los componentes html de los elementos a necesitar
const emailInput = document.getElementById('email');

const motiveInput = document.getElementById('asunto');

const messageInput = document.getElementById('mensaje');

const submitBtn = document.getElementById('enviar');

const formContainer = document.getElementById('enviar-email');

const resetBtn = document.getElementById('resetBtn');


//Llamada a la funcion que agrega los eventListeners a todos los botones
eventListeners();


function eventListeners(){

    //* Una vez se cargue el documento este deshabilitara el boton de submit ya que no hay datos
    document.addEventListener('DOMContentLoaded', () =>{
        submitBtn.disabled = true;
    })

    //? Se utiliza blur para saber cuando paso de estar seleccionado a ya no estarlo
    emailInput.addEventListener('blur', validate);
    motiveInput.addEventListener('blur', validate);
    messageInput.addEventListener('blur', validate);
    submitBtn.addEventListener('click', sendEmail);
    resetBtn.addEventListener('click', resetField);

}

//Este metodo valida todos los campos, tanto si estan vacios como si la informacion es la correcta
function validate(){

    //Validar que no esten vacios los campos
    validateLength(this);


    if(this.type === 'email'){
        validateEmail(this);
    }

    let errors = document.querySelectorAll('.error');
    if(emailInput.value !== '' && motiveInput.value !== '' && messageInput.value !== '' && errors.length === 0){
            submitBtn.disabled = false;
    }else{
        submitBtn.disabled = true;
    }
    

}


function validateLength(field){
    //Si existe algo escrito en el input, se da un feedback visual y se quita la clase de error
    if(field.value.length > 0){
        field.style.borderBottomColor = 'green';
        field.classList.remove('error');
    }else{
        field.style.borderBottomColor = 'red';
        field.classList.add('error');
    }
}


function validateEmail(field){
    //Se lee el valor del input y mediante RegEx se comprueba que el eamil tenga caracteres validos al principio, un @ en medio y otra vez caracteres validos al final
    const emailStr =  field.value;
    let email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(emailStr);
    //De ser valido se da la misma retroalimentacion visual, si no se descativa el boton de enviar
    if(email){
        field.style.borderBottomColor = 'green';
        field.classList.remove('error');
    }else{
        field.style.borderBottomColor = 'red';
        field.classList.add('error');
        submitBtn.disabled = true; 
    }

}


function sendEmail(e){
    e.preventDefault();


    //*Se obtiene la clase spinner
    const spinnerGif = document.querySelector('#spinner');
    spinnerGif.style.display = 'block';

    //*Sea cre un elemento img con el gif de enviado
    const delivered = document.createElement('img');
    delivered.src = 'img/mail.gif';

    delivered.style.display = 'block';

    //* se ejecuta una funcion y dura x tiempo, en este caso se despliega el spinner y añade el gif de enviado com hijo, espero 5 segundos y despues lo borra y se resetean los campos del formulario
    setTimeout(()=>{
        spinnerGif.style.display = 'none';

        document.querySelector('#loaders').appendChild(delivered);

        setTimeout(()=>{
            delivered.remove();
            resetField();
        }, 5000)
    },3000);
}

//Esta funcion resetea todos los campos a blanco
function resetField(e){
    emailInput.value = '';
    motiveInput.value = '';
    messageInput.value = '';

    e.preventDefault();
}

