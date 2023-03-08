let registerButton = document.getElementsByTagName('button')[0];
let signInButton = document.getElementsByTagName('button')[1];
registerButton.addEventListener('click', register);
signInButton.addEventListener('click', signIn);

function signIn(){
    username = document.getElementById('uname').value;
    psw = document.getElementById('psw').value;
    let user=JSON.stringify({name:username, password:psw});

    let request=new FXMLHttpRequest();    
    request.onload= function() {
        if (this.status == 200) {
        if(request.responseText==="true"){
            console.log("user exists");
            cleanInputs();
            window.location.replace("./main.html");
        }
    }};
    request.open("USER", "login/check",user);
    request.send();  
}

function register(){  
    username = document.getElementById('uname').value;
    psw = document.getElementById('psw').value;
    let user=JSON.stringify({name:username, password:psw});

    let request=new FXMLHttpRequest();    
    request.onload= function() {
        if (this.status == 200) {
        if(request.responseText==="true"){
            console.log("user added");
            cleanInputs
            window.location.replace("./main.html");
        }
    }};
    request.open("USER", "login/add",user);
    request.send(); 
}

function cleanInputs(){
    document.getElementById('uname').value = "";
    document.getElementById('psw').value = "";
}