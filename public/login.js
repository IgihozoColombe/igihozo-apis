const form = document.querySelector('#create-account-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

form.addEventListener('submit', (event)=>{
    validateForm();

    console.log(isFormValid());
    if(isFormValid()==true){
        login();
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

function login() {
    fetch("user/signin",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,
            password
        })
    })  
    .then(res=>{
        console.log(res)
       if(res.error){
      
         alert(res.error)
       }
       else{
           localStorage.setItem("jwt",res.data.token)
           localStorage.setItem("user",JSON.stringify(res.data.user))
          alert("logged in")
       }
    }).catch(err=>{
        console.log(err)
    })
}
function validateForm() {
   

    if(emailInput.value.trim()==''){
        setError(emailInput, 'Provide email address');
    }else if(isEmailValid(emailInput.value)){
        setSuccess(emailInput);
    }else{
        setError(emailInput, 'Provide valid email address');
    }

   
    if(passwordInput.value.trim()==''){
        setError(passwordInput, 'Password can not be empty');
    }else if(passwordInput.value.trim().length <6 || passwordInput.value.trim().length >20){
        setError(passwordInput, 'Password min 6 max 20 charecters');
    }else {
        setSuccess(passwordInput);
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


