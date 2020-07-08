

const emailInput = document.getElementById('email');

const motiveInput = document.getElementById('asunto');

const messageInput = document.getElementById('mensaje');

const submitBtn = document.getElementById('enviar');



eventListeners();


function eventListeners(){


    document.addEventListener('DOMContentLoaded', () =>{
        submitBtn.disabled = true;
    })

    submitBtn.addEventListener('submit')

}

