async function contactUs(event){
    document.getElementById("loginError").style.display = "none";
  event.preventDefault();
  
  let name = document.getElementById("name").value
  let emails = document.getElementById("email").value.trim();
  let subject = document.getElementById("subject").value.trim();
  let msg = document.getElementById("message").value;
  
  let headers = new Headers();
  
  const token = localStorage.getItem("token");
  console.log("token " + token)
    fetch("/user/signin", {
                  method: 'POST',
                  headers:{
                    'Authorization ':token
                  },
                  body: JSON.stringify({
                     name:name,
                      email: emails,
                      subject: subject,
                      meggase:msg
                  })
              }).then((res) => res.json())
              console.log(result.user.email);
              if(result.error){
               return document.getElementById("loginError").style.display = "flex";
              }else{
                document.getElementById("loginError").style.display = "none";
                localStorage.setItem("token", result.token);
                sessionStorage.setItem("AuthenticationState", "token");
                
                //This authentication key will expire in 1 hour.
                sessionStorage.setItem("AuthenticationExpires", Date.now.addHours(1));
                if(result.user.email == "igihozocolombe2003@gmail.com"){
                  return window.location = "./dashboard.html";
                }
                else if(result.user.email != "igihozocolombe2003@gmail.com") {
                  return window.location = "./blogsList.html";
                }
              }
          
           
  }
function verifyToken(){
  if (localStorage.length > 0){
    //Items are stored in local storage
}else{
    //Local storage is empty
}
}
    
    