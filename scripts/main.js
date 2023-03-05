function init(){
    displayPage("login");
    history.replaceState({}, 'Login', '#login');
    window.addEventListener('popstate', poppin);
}

function nav(ev){
    ev.preventDefault(); 
    document.body.removeChild(document.body.lastElementChild)
    let pageId=ev.target.getAttribute('target');
    displayPage(pageId);
    history.pushState({}, pageId, `#${pageId}`);
}

function displayPage(pageId){
    let temp = document.getElementById(pageId);
    let clon = temp.content.cloneNode(true);
    document.body.appendChild(clon);

    document.querySelectorAll('.nav-link').forEach((link)=>{
        link.addEventListener('click', nav);
    })
    if(pageId==="application"){
        initDataButtons();
    }
}

function poppin(){
    let hash = location.hash.replace('#' ,'');
    document.body.removeChild(document.body.lastElementChild)
    displayPage(hash)
}

function initDataButtons(){
    let seeAllButton= document.getElementById("seeAll");
    let seeRecordButton= document.getElementById("seeRecord");
    let addButton= document.getElementById("add");
    seeAllButton.addEventListener("click",seeAll);
    seeRecordButton.addEventListener("click",seeRecord);
    addButton.addEventListener("click",newRecordInfo);
}

function newRecordInfo(){
    let record={id:0, name:"a", date:new Date(2018, 11, 24, 10, 33)};
    add(JSON.stringify(record));
}

document.addEventListener('DOMContentLoaded', init);

function seeAll(){
    let request=new FXMLHttpRequest();    
    request.onload= function() {
        if (this.status == 200) {
        document.getElementById("request").innerHTML = request.responseText;
    }};
    request.open("GET", "application/all");
    request.send();   
}

function seeRecord(){
    let id=0;
    let request=new FXMLHttpRequest();    
    request.onload= function() {
        if (this.status == 200) {
        document.getElementById("request").innerHTML = request.responseText;
    }};
    request.open("GET", `application/${id}`);
    request.send();
}

function add(newRecord){
    let request=new FXMLHttpRequest();    
    request.onload= function() {
        if (this.status == 200) {
        document.getElementById("request").innerHTML = request.responseText;
    }};
    request.open("POST", "application/add",newRecord);
    request.send();   
}