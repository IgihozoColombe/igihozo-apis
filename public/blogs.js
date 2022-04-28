const form = document.querySelector('#create-account-form');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const statusInput = document.querySelector('#status');
const fileInput = document.querySelector('#image');

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
    
    if(titleInput.value.trim()==''){
        setError(titleInput, 'Title can not be empty');
    }else if(titleInput.value.trim().length <5 || titleInput.value.trim().length > 30){
        setError(titleInput, 'Title must be min 5 and max 15 charecters');
    }else {
        setSuccess(titleInput);
    }

    if(bodyInput.value.trim()==''){
        setError(bodyInput, 'Body can not be empty');
    }else if(bodyInput.value.trim().length <10 || bodyInput.value.trim().length >1000){
        setError(bodyInput, 'Body min 10 max 100 charecters');
    }else {
        setSuccess(bodyInput);
    }

    if(statusInput.value.trim()==''){
        setError(statusInput, 'Body can not be empty');
    }else if(statusInput.value.trim().length <3 || statusInput.value.trim().length >100){
        setError(statusInput, 'Body min 13 max 100 charecters');
    }else {
        setSuccess(statusInput);
    } 

    if(fileInput.value.trim()==''){
        setError(fileInput, 'file can not be empty');
    }else if(fileValidation()){
        setError(fileInput, 'Must be of valid type');
    }else {
        setSuccess(fileInput);
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

function fileValidation() {
            var fileInput = 
                document.getElementById('image');
              
            var filePath = fileInput.value;
          
            // Allowing file type
            var allowedExtensions = 
                    /(\.jpg|\.jpeg|\.png|\.gif)$/i;
              
            if (!allowedExtensions.exec(filePath)) {
                alert('Invalid file type');
                fileInput.value = '';
                return false;
            } 
            else 
            {
              
                // Image preview
                if (fileInput.files && fileInput.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        document.getElementById(
                            'imagePreview').innerHTML = 
                            '<img src="' + e.target.result
                            + '"/>';
                    };
                      
                    reader.readAsDataURL(fileInput.files[0]);
                }
            }
        }


