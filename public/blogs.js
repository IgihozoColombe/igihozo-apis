
async function loginUser(event){
    document.getElementById("loginError").style.display = "none";
  event.preventDefault();
  
    let title = document.getElementById("title").value;
    let body = document.getElementById("body").value;
    let status = document.getElementById("status").value;
    let image = document.getElementById("image").value;
  
    const result=await fetch("/article", {
                  method: 'POST',
                  headers: {
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("token")
                  },
                  body: JSON.stringify({
                      title: title,
                      body: body,
                      body:body,
                      status:status,
                      image:image
                  })
              }).then((res) => res.json())
              if(result.error){
               return document.getElementById("loginError").style.display = "flex";
              }else{
                document.getElementById("loginError").style.display = "none";
                localStorage.getItem("token");
                  return window.location = "./dashboard.html"; 
              }
          
           
  }
  