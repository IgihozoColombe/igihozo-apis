// const emailInput = document.querySelector('#email');
// const passwordInput = document.querySelector('#password');


// function loginUser(event){
//   event.preventDefault();
//     document.getElementById("loginError").style.display = "none";

//   if(validateForm()){
  
//     let emails = document.getElementById("email").value.trim();
//     let pass = document.getElementById("password").value;
  
//     fetch("/user/signin", {
//                   method: 'POST',
//                   headers: {
//                       'Content-Type': 'application/json'
//                   },
//                   body: JSON.stringify({
//                       email: emails,
//                       password: pass
//                   })
//               }).then((res) => res.json())
//               .then((data) =>{
//               if(data.error){
//                 console.log(data.error)
//               //  return document.getElementById("loginError").style.display = "flex";
//               }else{
//                 // document.getElementById("loginError").style.display = "none";
//                 console.log()
//                 localStorage.setItem("token", data.token);
//                 if(data.user.email == "igihozocolombe2003@gmail.com"){
//                   return window.location = "./dashboard.html";
//                 }
  
//               return isLogged(data.user.username);
//               }
//               })
//               .catch((error)=>{
//                 console.log(error)
//               })
//   }
//   }
//   function validateForm() {
//     if(emailInput.value.trim()==''){
//         setError(emailInput, 'Provide email address');
//     }else if(isEmailValid(emailInput.value)){
//         setSuccess(emailInput);
//     }else{
//         setError(emailInput, 'Provide valid email address');
//     }

//     //PASSWORD
//     if(passwordInput.value.trim()==''){
//         setError(passwordInput, 'Password can not be empty');
//     }else if(passwordInput.value.trim().length <6 || passwordInput.value.trim().length >20){
//         setError(passwordInput, 'Password min 6 max 20 charecters');
//     }else {
//         setSuccess(passwordInput);
//     }

// }
// function isEmailValid(email){
//   const reg =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

//   return reg.test(email);
// }
// function setError(element, errorMessage) {
//   const parent = element.parentElement;
//   if(parent.classList.contains('success')){
//       parent.classList.remove('success');
//   }
//   parent.classList.add('error');
//   const paragraph = parent.querySelector('p');
//   paragraph.textContent = errorMessage;
// }

// function setSuccess(element){
//   const parent = element.parentElement;
//   if(parent.classList.contains('error')){
//       parent.classList.remove('error');
//   }
//   parent.classList.add('success');
// }
function loginUser(){
  document.getElementById("loginError").style.display = "none";

let isValidEmail = validateEmail();
let isValidPassword = validatePassword();

if(isValidEmail == true && isValidPassword == true){

  let emails = document.getElementById("email").value.trim();
  let pass = document.getElementById("password").value;

  fetch("/user/signin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emails,
                    password: pass
                })
            }).then((res) => res.json())
            .then((data) =>{
            if(data.error){
             return document.getElementById("loginError").style.display = "flex";
            }else{
              document.getElementById("loginError").style.display = "none";
              localStorage.setItem("token", data.token);
              if(data.user.role == "padmin"){
                return window.location = "./admin.blogs.html";
              }

            return isLogged(data.user.username);
            }
            })
            .catch((error)=>{
              console.log(error)
            })
}
}