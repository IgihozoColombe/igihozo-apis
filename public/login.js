
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
// }