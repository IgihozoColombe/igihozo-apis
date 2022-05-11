
async function createBlog(event){
  // document.getElementById("loginError").style.display = "none";
  event.preventDefault();
  // console.log()
  // alert(localStorage.getItem("token"))
    let title = document.getElementById("title").value;
    let body = document.getElementById("body").value;
    let status = document.getElementById("status").value;
    let image = document.getElementById("image").value;
  
    const result=await fetch("/article", {
                  method: 'POST',
                  headers: {
                    'Authorization': localStorage.getItem('token')
                  },
                      body: JSON.stringify({
                      title: title,
                      body: body,
                      body:body,
                      status:status,
                      image:image
                  })
              }).then((res) => res)
              if(result.error){
               console.log(result.error);
               }else{
                 console.log(result);
                  //  return window.location = "./blogsList.html";
                 }   
                }
          
           
  
  