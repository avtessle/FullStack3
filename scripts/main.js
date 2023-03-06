//Initialize with a default page
function init(){
    displayPage("login");
    history.replaceState({}, 'Login', '#login');
    window.addEventListener('popstate', poppin);
}

//Navigation between the pages
function nav(ev){
    ev.preventDefault(); 
    document.body.removeChild(document.body.lastElementChild)
    let pageId=ev.target.getAttribute('target');
    displayPage(pageId);
    history.pushState({}, pageId, `#${pageId}`);
}

//Display chosen page
function displayPage(pageId){
    let temp = document.getElementById(pageId);
    let clon = temp.content.cloneNode(true);
    document.body.appendChild(clon);

    document.querySelectorAll('.nav-link').forEach((link)=>{
        link.addEventListener('click', nav);
    })

    switch(pageId){
        case "application":
            initApp();
            break;
        case "login":
            initLogin();
            break;
        case "register":
            initRegister(); 
    }
}

//Event of url change
function poppin(){
    let hash = location.hash.replace('#' ,'');
    document.body.removeChild(document.body.lastElementChild)
    displayPage(hash)
}

//Add event listeners to the buttons of Application
function initApp(){
    let seeAllButton= document.getElementById("seeAll");
    let seeRecordButton= document.getElementById("seeRecord");
    let addButton= document.getElementById("add");
    seeAllButton.addEventListener("click",seeAll);
    seeRecordButton.addEventListener("click",seeRecord);
    addButton.addEventListener("click",newRecordInfo);
}

//Initialize the app
document.addEventListener('DOMContentLoaded', init);

//login and register- move to login.js
// function initLogin(){
//     let logInButton = document.getElementById("loginBtn")
//     logInButton.addEventListener('click', login);
// }

// function initRegister(){
//     let registerButton = document.getElementById("registerBtn")
//     registerButton.addEventListener('click', register);
// }