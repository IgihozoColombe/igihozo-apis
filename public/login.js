function loginUser(){
    document.getElementById("loginError").style.display = "none";
  
  let isValidEmail = validateEmail();
  let isValidPassword = validatePassword();
  
  if(isValidEmail == true && isValidPassword == true){
  
    let emails = document.getElementById("useremail").value.trim();
    let pass = document.getElementById("password").value;
  
    fetch("https://emmanueldufitumukiza.herokuapp.com/api/login", {
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
                if(data.user.email == "igihozocolombe2003@gmail.com"){
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