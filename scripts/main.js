let pages=[];
let client=new Client();

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
    let addButton= document.getElementById("add");
    seeAllButton.addEventListener("click",client.seeAll);
    addButton.addEventListener("click",newRecordInfo);
}

function newRecordInfo(){
    let record={id:0, name:"a", date:new Date(2018, 11, 24, 10, 33)};
    client.add(JSON.stringify(record));
}

document.addEventListener('DOMContentLoaded', init);