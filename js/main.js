var userName = document.getElementById("userName");
var userEmail = document.getElementById("userEmail");
var userPass = document.getElementById("userPass");
var signEmail = document.getElementById("signEmail");
var signPass = document.getElementById("signPass");

var users ;

//there is no data stored 
if(localStorage.getItem("usersList")==null){
    var users=[];
}
else{
    users = JSON.parse(localStorage.getItem("usersList"));
}

function addUser() {
    if (!checkIsEmptyLogin()) {
        if (isEmailFound()) {
            displayEmailFound();
        } else {
            if (validEmail(userEmail.value)) {  
                var user = {
                    name: userName.value,
                    email: userEmail.value,
                    password: userPass.value
                };
                users.push(user);
                localStorage.setItem("usersList", JSON.stringify(users));
                displaySucess();
                clearForm()
            } else {
                displayEmailValid();
            }
        }
    } else {
        displayRequired();
    }
};

//to make it only accepts the valid email
function validEmail(email) {
    var emailValid = email.trim();
    var validEmailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

    if (validEmailPattern.test(emailValid)) { 
        return true;
    } else {
        return false;
    }
}

//to make sure that email dose not exist
function isEmailFound(){
    for(var i=0;i<users.length;i++){
        if(users[i].email==userEmail.value ){
            return true; 
        }
    }
    return false;
}

//to make sure thet enterd data is not empty in page login
function checkIsEmptyLogin(){
    if(userName.value!="" && userPass.value !="" && userEmail.value !=""){
        return false;
    }
    else{
        return true;
    }
};

//to clear input
function clearForm(){
    userName.value="";
    userEmail.value="";
    userPass.value="";
   
};

//to ensure that the enterd data is appropriate with the stored data
function checkLogin(){
for(var i=0 ; i < users.length ; i++){
    if(users[i].email == signEmail.value && users[i].password == signPass.value){
        var name=users[i].name;
        localStorage.setItem("homeList",JSON.stringify(name));
        location.replace("home.html");
    return true;
    }
}
};

//to ensure that the enterd data is not empty and then verify the validity of the enterd data
function searchUser(){
    if(checkIsEmptySign()){
        displayRequiredSign();
    }
    else{
        if( checkLogin()){
        }
        else{
            displayIncorrect();
        }   
    }
};

//to make sure thet enterd data is not empty in signin
function checkIsEmptySign(){
    if(signEmail.value =="" || signPass.value =="" ){
        return true;
    }
    else{
        return false;
    }
};

//get the name of user and put it in homepage in html
function  welcome(){
    document.getElementById("welcome").innerHTML = ` ${JSON.parse(localStorage.getItem("homeList"))}`;
};



//messege showed in html to explain to the user what happened 
 function displayRequired(){
    document.getElementById("required").innerHTML=`<span class=' text-danger'>inputs is required</span>`;
};

function displayEmailFound(){
    document.getElementById("required").innerHTML=`<span class=' text-danger'>email already exists</span>`;
};

function displayEmailValid(){
    document.getElementById("required").innerHTML=`<span class=' text-danger'>email not valid</span>`;
};

function displaySucess(){
    document.getElementById("required").innerHTML=`<span class=' text-success'>Success</span>`;
};

function displayIncorrect(){
    document.getElementById("result-sign").innerHTML=`<span class=' text-danger'>incorrect email or password</span>`;
};

function displayRequiredSign(){
    document.getElementById("result-sign").innerHTML=`<span class=' text-danger'>All inputs is required</span>`;
};