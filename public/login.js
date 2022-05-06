

form.addEventListener('submit', (event)=>{
function login(event) {
    event.preventDefault();
 const email=document.getElementById('email');
 const password=document.getElementById('password');
    fetch("/user/signin",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,
            password
        })
    })  
    .then((res) => {
            console.log("here is the data",res);
    })
    .then(data => {
        localStorage.setItem("token", data.token)
        logResponse("loginResponse", `localStorage set with token value: ${data.token}`)
    })
    .catch(console.error)
}
})
