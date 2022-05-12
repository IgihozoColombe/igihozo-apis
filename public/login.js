
async function loginUser(event){
event.preventDefault();

  let emails = document.getElementById("email").value.trim();
  let pass = document.getElementById("password").value;

  const result=await fetch("/user/signin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emails,
                    password: pass
                })
            }).then((res) => res.json())
            console.log(result.user.email);
            if(result.error){
              console.log(result.error);
            }else{
              document.getElementById("loginError").style.display = "none";
              localStorage.setItem("token", result.token);
              if(result.user.email == "igihozocolombe2003@gmail.com"){
                return window.location = "./dashboard.html";
              }
              else if(result.user.email != "igihozocolombe2003@gmail.com") {
                return window.location = "./blogsList.html";
              }
            }
        
         
}
function logout(){
  localStorage.removeItem("token");
 return isLogged();
}

function isLogged(username){

 let token = localStorage.getItem("token")

 if(token){

  fetch("user/info/loggedinuser", {
    method: 'GET',
    headers: {
        'Authorization': token
    }
  })
  .then((res) => res.json())
    .then((res) =>{
      if(res.username){
        document.getElementById("logSign").style.display = "none"
   document.getElementById("profileauth").style.display = "flex"
   document.getElementById("username-display").innerHTML  = res.username;
   window.location = "./blogs.html"
   return ;
      }else{
        document.getElementById("logSign").style.display = "block"
   document.getElementById("profileauth").style.display = "none"
      }
    });
 }if(!token){
  document.getElementById("logSign").style.display = "block"
   document.getElementById("profileauth").style.display = "none"
 }
}

window.onload = function(){
  isLogged('')
}