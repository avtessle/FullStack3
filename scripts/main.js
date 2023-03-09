//Initialize with a default page
function init(){
    displayPage("home");
    history.replaceState({}, 'Home', '#home');
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
        case "home":
            initHome();
            break;
        case "appointment":
            initApp();
            break;
        case "search":
            initSearch(); 
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
   document.getElementById("cdate").setAttribute("min",Date.now.Date);
    // let addSubbmit= document.getElementById("addMeating");

    //addSubbmit.addEventListener("click",newRecordInfo);
}

function validateForm(){

    if(checkPattern("cname") && checkPattern("cphone"))
    {
    //    checkDate();

        newRecordInfo();

    }
    return false;
}

// function checkDate(){
//     var today = new Date(Date.now());
//     var cdate = document.getElementById("cdate").value;
//     alert(today.to " today\n"+ cdate + " choose");
// }

function checkPattern(id){
    var elem = document.getElementById(id);

    var pattern = elem.getAttribute("pattern");
    var re = new RegExp(pattern);
    if (re.test(elem.value)) {
        return true;
    }
    return false;
}

//Initialize the app
document.addEventListener('DOMContentLoaded', init);

// login and register- move to login.js
function initHome(){
    // let logInButton = document.getElementById("loginBtn")
    // logInButton.addEventListener('click', login);
}

function initSearch(){
    document.getElementById("searchnameB").addEventListener('click', searchName());
    // let registerButton = document.getElementById("registerBtn")
    // registerButton.addEventListener('click', register);
}

function searchName(){
    let name = document.getElementById("search_name").value;
    alert("hi! "+name+" gooooood!");
}