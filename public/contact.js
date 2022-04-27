const form = document.querySelector('#create-account-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const subjectInput = document.querySelector('#subject');
const messageInput = document.querySelector('#message');

form.addEventListener('submit', (event)=>{
    
    validateForm();
    console.log(isFormValid());
    if(isFormValid()==true){
        form.submit();
     }else {
         event.preventDefault();
     }

});

function isFormValid(){
    const inputContainers = form.querySelectorAll('.input-group');
    let result = true;
    inputContainers.forEach((container)=>{
        if(container.classList.contains('error')){
            result = false;
        }
    });
    return result;
}

function validateForm() {
    
    if(nameInput.value.trim()==''){
        setError(nameInput, 'Name can not be empty');
    }else if(nameInput.value.trim().length <5 || nameInput.value.trim().length > 20){
        setError(nameInput, 'Name must be min 5 and max 15 charecters');
    }else {
        setSuccess(nameInput);
    }
    //EMAIL
    if(emailInput.value.trim()==''){
        setError(emailInput, 'Provide email address');
    }else if(isEmailValid(emailInput.value)){
        setSuccess(emailInput);
    }else{
        setError(emailInput, 'Provide valid email address');
    }

    //PASSWORD
    if(subjectInput.value.trim()==''){
        setError(subjectInput, 'Password can not be empty');
    }else if(subjectInput.value.trim().length <6 || subjectInput.value.trim().length >20){
        setError(subjectInput, 'Password min 6 max 20 charecters');
    }else {
        setSuccess(subjectInput);
    }
    //CONFIRM PASSWORD
    if(messageInput.value.trim()==''){
        setError(messageInput, 'Password can not be empty');
    }else if(messageInput.value !== messageInput.value){
        setError(messageInput, 'Password does not match');
    }else {
        setSuccess(messageInput);
    }
}

function setError(element, errorMessage) {
    const parent = element.parentElement;
    if(parent.classList.contains('success')){
        parent.classList.remove('success');
    }
    parent.classList.add('error');
    const paragraph = parent.querySelector('p');
    paragraph.textContent = errorMessage;
}

function setSuccess(element){
    const parent = element.parentElement;
    if(parent.classList.contains('error')){
        parent.classList.remove('error');
    }
    parent.classList.add('success');
}

function isEmailValid(email){
    const reg =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return reg.test(email);
}


