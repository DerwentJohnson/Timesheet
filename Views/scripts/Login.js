window.onload = function(){
     var submit = document.getElementById('loginButton');
     var username = document.getElementById('username').value;
     var password = document.getElementById("userpassword");

    

     
     OnSubmit(submit,username,password);
    

function OnSubmit(submit,username,password){
    submit.addEventListener('click', function(e){
        e.preventDefault();
        if(ValidatePassword(password) && ValidateUsername(username)){
            SendToServer(username, password.value)
        }
    })
}
}

//Check if the username entered is valid
function ValidateUsername(username,submitionData){
    if (username.trim() !== ''){
        return true;
    }else{
        let errorMessage = document.getElementById('usernameError');
        errorMessage.innerHTML = "<h5 class ='formError'>Username must not be empty</h5>"
    }
    
}

//Check if the password entered is valid
function ValidatePassword(password){
    if (password.value.trim() !== ''){
        return true;
    }else{
        let errorMessage = document.getElementById('passwordError');
        errorMessage.innerHTML = "<h5 class ='formError'>Password must not be empty</h5>"
    }
}

//Ajax post request

function SendToServer(username, password){
    let xhr = new XMLHttpRequest();
    let userData = JSON.stringify({'username': username, 'password':password});
    

    xhr.open('POST','/login',true);
    // console.log(this.readystate)
    xhr.setRequestHeader('Content-type','application/json')

    xhr.onload = function(){
        let errorMessage = document.getElementById('passwordError');
        if (this.status == 200){ //handle return message from server.
            window.location = this.responseURL
        }
        
    }
    xhr.send(userData);
}
